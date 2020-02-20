<template lang="pug">
  .conversations-list
    .conversations-block(
      v-for="conversationsBlock in selectedConversations"
      :key="conversationsBlock[0].userId"
    )
      // @TODO fetch once and get the user's detail here,
      // replacing the id
      .name {{ getUser(conversationsBlock[0].userId).pName }}
      // List all user's conversations, click to activate and open in pane
      ConversationPreview(
        v-for="conversation in conversationsBlock"
        :conversation="conversation"
        :key="conversation.cvsId"
      )
</template>

<script>
import { mapState } from 'vuex'
import ConversationPreview from './dashboard/ConversationPreview'

export default {
  name: 'ConversationsList',
  data: () => ({}),
  components: {
    ConversationPreview,
  },
  computed: {
    ...mapState(['conversations', 'linkedUsers']),

    // @TODO replace with pagination
    selectedConversations() {
      return this.conversations.slice(0, 20)
    },

    getUser() {
      return userId => this.linkedUsers[userId] || {}
    },
  },
}
</script>

<style lang="stylus" scoped>
.conversations-list
  height calc(100vh - 112px)
  overflow-y auto

.conversations-block
  margin 0 0 1em
</style>
