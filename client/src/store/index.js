import Vue from 'vue'
import Vuex from 'vuex'

import fb from '../db/firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: null,
    active: {},
    conversations: [[{}]],
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
  },
  actions: {
    /**
     * Get all conversations for current logged in user
     */
    async fetchCurrentConversations({ state, commit }) {
      let currentConversations = []
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
        })
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

    /**
     * Fetch all initial details for initialization
     * and set loops for them to run throttled as needed
     */
    async fetchAllCurrent({ dispatch }) {
      dispatch('fetchUser')
      dispatch('fetchCurrentConversations')
      // update conversations every 5 minutes
      setTimeout(() => {
        dispatch('fetchAllCurrent')
      }, 1 * 60 * 1000)
    },

    /**
     * Load a given conversation ID as the primary conversation
     */
    async setActive({ commit }, { cvsId, userId, profileId }) {
      commit('SET_ACTIVE', { cvsId, userId, profileId })
    },
  },
  modules: {},
})
