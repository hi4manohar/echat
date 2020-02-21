<template lang="pug">
  .conversations-list
    .conversations-block(
      v-for="conversationsBlock in selectedConversations"
      :key="conversationsBlock[0].userId"
    )
      // @TODO fetch once and get the user's detail here,
      // replacing the id
      .agent-profile
        .agent-image
          img(class="img-round" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTktrJrpzwPQ_a-rdg_ECfCFmIx5jKfbfU85eVgaDevH4T6fFR4")
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
  height calc(100vh - 88px)
  overflow-y auto
.name
  margin-left: 11px;

.conversations-block
  margin 0 0 1em
.agent-image
  height 49px
  width 49px
.agent-profile
  flex none
  display flex
  align-items center
.img-round
  display block
  position relative
  transition opacity .15s ease-out
  width 100%
  height 100%
  z-index 100
  overflow hidden
  border-radius 50%
</style>
