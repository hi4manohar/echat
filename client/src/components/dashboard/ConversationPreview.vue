<template lang="pug">
  .conversation-preview(
    v-if="conversation.profileId"
    @click="setActive"
  )
    .profile-name {{ getProfile(conversation.profileId).pName }}
    .msg-preview.ellipsis {{ conversation.lastMsg.msgBody }}
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ConversationPreview',
  props: ['conversation'],
  data: () => ({}),
  computed: {
    ...mapState(['linkedProfiles']),

    getProfile() {
      return profileId => this.linkedProfiles[profileId] || {}
    },
  },
  methods: {
    setActive() {
      this.$store.dispatch('setActive', this.conversation)
    },
  },
}
</script>

<style lang="stylus" scoped>
.conversation-preview
  margin-left 1em
  background rgba(black, .1)
  max-width: 80%;
  margin-left: 4em;
  margin-bottom: 7px;
  cursor: pointer;
.msg-preview
  font-size 12px
.ellipsis
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
</style>
