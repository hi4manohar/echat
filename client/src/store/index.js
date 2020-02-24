import Vue from 'vue'
import Vuex from 'vuex'

import fb from '../db/firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: null,
    active: {},
    conversations: [[{}]],
    linkedUsers: {},
    linkedProfiles: {},
    photopack: [],
    isPhotopackSenderVisible: false
  },
  mutations: {
    SET_CURRENT_USER(state, val) {
      state.currentUser = val
    },
    SET_CURRENT_CONVERSATIONS(state, val) {
      state.conversations = val
    },
    SET_ACTIVE(state, val) {
      state.active = val
    },
    SET_LINKED_USERS(state, val) {
      state.linkedUsers = val
    },
    SET_LINKED_PROFILES(state, val) {
      state.linkedProfiles = val
    },
    SET_PHOTOPACK(state, val) {
      state.photopack = val
    },
    SET_ISPHOTOPACKSENDERVISIBLE(state, val) {
      state.isPhotopackSenderVisible = val
    }
  },
  getters: {
    profileFromId: state => id => state.linkedProfiles[id],
  },
  actions: {
    /**
     * Fetch linked data based on provided active data generically
     */
    async fetchLinked({ commit }, [ref, linkedIds, mutationName]) {
      const allRef = fb.db.ref(ref)
      // first, do a one-time fetch of all conversations
      allRef.once('value', allSnapshot => {
        const allData = allSnapshot.val()
        const linkedData = {}
        Object.keys(allData)
          .filter(id => linkedIds.includes(id))
          .map(id => {
            linkedData[id] = allData[id]
          })
        commit(mutationName, linkedData)
      })
    },
    /**
     * Get all conversations for current logged in user
     */
    async fetchCurrentConversations({ state, commit, dispatch }) {
      let currentConversations = []
      const linkedUsersIds = []
      const linkedProfileIds = []
      const currentAgentId = state.currentUser.uid
      const conversationRef = fb.db.ref('conversation')
      // first, do a one-time fetch of all conversations
      conversationRef.once('value', conversationSnapshot => {
        // loop through all conversations and select only those
        // by logged in user
        const allConversations = conversationSnapshot.val()
        Object.keys(allConversations).forEach(cvsId => {
          const cvs = allConversations[cvsId]
          if (cvs.agentId === currentAgentId) {
            currentConversations.push(cvs)
          }
        })
        // then, sort currentConversations -- MAIN sorting algorithm used
        // first, prepare ordered list by userId
        const userLastMsgTimeMap = {}
        // this finds the most recent last message for all users
        currentConversations.forEach(cvs => {
          userLastMsgTimeMap[cvs.userId] = userLastMsgTimeMap[cvs.userId] || -1
          if (userLastMsgTimeMap[cvs.userId] < cvs.lastMsg.msgTime) {
            userLastMsgTimeMap[cvs.userId] = cvs.lastMsg.msgTime
          }
          // at the same time, store the user's ID in active match list
          !linkedUsersIds.includes(cvs.userId) &&
            linkedUsersIds.push(cvs.userId)
          !linkedProfileIds.includes(cvs.profileId) &&
            linkedProfileIds.push(cvs.profileId)
        })
        // dispatch user & profile fetch at the same time
        dispatch('fetchLinked', ['profile', linkedUsersIds, 'SET_LINKED_USERS'])
        dispatch('fetchLinked', [
          'agent_profile',
          linkedProfileIds,
          'SET_LINKED_PROFILES',
        ])
        // then, sort the list
        currentConversations = currentConversations.sort((a, b) => {
          // first, find the most recent user and get them to top
          // within it, order by recent time
          return a.userId !== b.userId
            ? userLastMsgTimeMap[b.userId] - userLastMsgTimeMap[a.userId]
            : b.lastMsg.msgTime - a.lastMsg.msgTime
        })
        // then, group by users
        const groupedCurrentConversations = currentConversations.reduce(
          (grouped, x) => {
            ;(grouped[x.userId] = grouped[x.userId] || []).push(x)
            return grouped
          },
          {}
        )
        currentConversations = Object.values(groupedCurrentConversations)

        commit('SET_CURRENT_CONVERSATIONS', currentConversations)
      })
    },

    /**
     * Try to get logged in user from memory
     */
    async fetchUser({ state, commit }) {
      if (!state.currentUser && !!fb.auth.currentUser) {
        commit('SET_CURRENT_USER', fb.auth.currentUser)
      }
    },

    async fetchPhotopack({ commit }) {
      const photopackRef = fb.db.ref('global_photopack')
      photopackRef.once('value', photopackSnapshot => {
        const photopackData = photopackSnapshot.val()
        const photopack = Object.values(photopackData).map(p => p.i)
        commit('SET_PHOTOPACK', photopack)
      })
    },

    /**
     * Fetch all initial details for initialization
     * and set loops for them to run throttled as needed
     */
    async fetchAll({ dispatch }) {
      // fetch static data once
      dispatch('fetchPhotopack')
      // update current data every 5 minutes
      const _fetchAllCurrent = () => {
        dispatch('fetchUser')
        dispatch('fetchCurrentConversations')
      }
      setTimeout(() => _fetchAllCurrent, 1 * 60 * 1000)
      _fetchAllCurrent()
    },

    /**
     * Load a given conversation ID as the primary conversation
     */
    async setActive({ commit }, { cvsId, userId, profileId }) {
      commit('SET_ACTIVE', { cvsId, userId, profileId })
    },

    //set isPhotopackSenderVisible Status
    async setIsPhotopackSenderVisible({commit}, status) {
      commit('SET_ISPHOTOPACKSENDERVISIBLE', status)
    }
  },
  modules: {},
})
