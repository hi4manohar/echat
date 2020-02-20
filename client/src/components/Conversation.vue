<template lang="pug">
  .conversation(ref="conversation")
    .message-row(
      v-for="message in messages"
      :class="{ 'from-agent': message.fromAgent }"
    )
      .message {{ message.msgBody }}
    //- @TODO add small timestamp next to message and full timestamp on hover (like messenger)

</template>

<script>
import { mapState } from 'vuex'
import fb from '../db/firebase'

export default {
  name: 'Conversation',
  data: () => ({
    messages: {},
  }),
  computed: {
    ...mapState(['active']),
    fbRef() {
      return k => `conversation/${k}/messages`
    },
  },
  watch: {
    active: function(n, old) {
      if (!!n.cvsId && n.cvsId !== old.cvsId) {
        this.deleteListener(old.cvsId)
        this.loadConversation()
      }
    },
  },
  methods: {
    /** Subscribe to latest conversation */
    loadConversation() {
      if (!this.active.cvsId) return false
      const messagesRef = fb.db.ref(this.fbRef(this.active.cvsId))
      messagesRef.on('value', cvsSnapshot => {
        const cvs = cvsSnapshot.val()
        this.messages = cvs
        this.updateScroll()
      })
      // @TODO mark isRead true as this is considered viewed
    },

    /** Delete any old listener */
    deleteListener(oldCvsId) {
      const messagesRef = fb.db.ref(this.fbRef(oldCvsId))
      messagesRef.off('value')
    },

    /** Scroll to bottom of messages pane */
    updateScroll() {
      // @TODO test and fix
      const container = this.$refs.conversation
      container.scrollTop = container.scrollHeight
    },
  },
}
</script>

<style lang="stylus" scoped>
.conversation
  max-height calc(100vh - 112px)
  overflow-y auto

// @TODO improve styles
.message-row
  display flex

  &.from-agent
    justify-content flex-end
    .message
      background rgba(black,.4)

.message
  padding .5em
  background rgba(white,.1)
</style>
