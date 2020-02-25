<template lang="pug">    
    .profile(v-if="!!data.pName")
      .user-block(v-if="type === 'user'")
        .user-profile-img
          img(:src="data.pAvatars[0]")
        .user-profile-detail
          .name {{ data.pName }}
          .bio {{ data.pBio }}
      .agent-block(v-if="type === 'agent'")
        .agent-profile-img
          img(:src="data.pAvatars[0] | decryptPImage")
        .agent-profile-detail
          .name {{ data.pName }}
          .bio {{ data.pBio }}

</template>

<script>
import { mapState } from 'vuex'
import { fbHelper } from '../mixins/fb-helper'
import dcrypt from '../filters/dcrypt'
import fb from '../db/firebase'

export default {
  name: 'Profile',
  data: () => ({
    data: {},
  }),
  props: ['type'],
  mixins: [fbHelper],
  filters: {
    decryptPImage: dcrypt.pImg,
  },
  computed: {
    ...mapState(['active']),
    typeRef() {
      return {
        agent: `agent_profile`,
        user: `profile`,
      }[this.type]
    },
    typeKey() {
      return {
        agent: `profileId`,
        user: `userId`,
      }[this.type]
    },
    fbRef() {
      return k => `${this.typeRef}/${k}`
    },
  },
  watch: {
    active: function(n, old) {
      const key = this.typeKey
      if (!!n[key] && n[key] !== old[key]) {
        this.deleteListener(old[key])
        this.loadProfile()
      }
    },
  },
  methods: {
    /**
     * Subscribe to profile info
     */
    loadProfile() {
      if (!this.active[this.typeKey]) return false
      const profileRef = fb.db.ref(this.fbRef(this.active[this.typeKey]))
      // helper to load profile
      const _loadProfile = subType => {
        profileRef[subType]('value', profileSnapshot => {
          const profile = profileSnapshot.val()
          this.data = profile
        })
      }
      // only load once for agent's profile, it never changes
      _loadProfile(this.type === 'agent' ? 'once' : 'on')
    },

    /** Delete any old listener */
    deleteListener(oldId) {
      this.fbDeleteListener(this.fbRef(oldId))
    },
  },
}
</script>

<style lang="stylus" scoped>
.profile
  padding 20px 20px 0px 20px

.user-profile-img, .agent-profile-img
  width 200px
  height 200px
  border-radius 50%
  overflow hidden
  margin 0 auto

.user-profile-img img, .agent-profile-img img
  width 100%
  height 100%

.user-profile-detail, .agent-profile-detail
  text-align center
  padding 10px 0px
  margin-bottom 10px

.bio
  font-size 12px
  color #9e9e9e
</style>
