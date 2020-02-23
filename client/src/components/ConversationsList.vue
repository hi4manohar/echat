<template lang="pug">
  .conversations-list
      v-expansion-panels
        v-expansion-panel.mb-1.menu(
          v-for="conversationsBlock in selectedConversations" :key="conversationsBlock[0].userId"
        )
          v-expansion-panel-header
            .agent-profile 
              .agent-image
                img(class="img-round" :src="getUser(conversationsBlock[0].userId).pAvatars")
              .agent-details
                div.agent-name.ellipsis {{ getUser(conversationsBlock[0].userId).pName }}

          ConversationPreview(
            v-for="conversation in conversationsBlock"
            :conversation="conversation"
            :key="conversation.cvsId"
          )
</template>

<script>
import { mapState } from "vuex";
import ConversationPreview from "./dashboard/ConversationPreview";

export default {
  name: "ConversationsList",
  data: () => ({}),
  components: {
    ConversationPreview
  },
  computed: {
    ...mapState(["conversations", "linkedUsers"]),

    // @TODO replace with pagination
    selectedConversations() {
      return this.conversations.slice(0, 20);
    },

    getUser() {
      return userId => this.linkedUsers[userId] || {};
    }
  }
};
</script>

<style lang="stylus" scoped>
.conversations-list
  height calc(100vh - 88px)
  overflow-y auto

.name
  margin-left 11px

.conversations-block
  margin 0 0 1em

.agent-image
  height 50px
  width 50px
  background #eee
  border-radius 50px
  overflow hidden

.agent-profile, .user-profile
  flex none
  display flex
  align-items center

.user-profile
  padding 20px

.agent-details
  width 70%
  padding 10px 0px 10px 10px
  height 50px

.name, .agent-designation
  font-size 11px
  font-weight 400
  color #9a9a9a
  margin-top 5px

.user
  background #191818

.v-expansion-panel-content__wrap
  padding 30px

.img-round
  display block
  position relative
  transition opacity 0.15s ease-out
  width 100%
  height 100%
  z-index 100
  overflow hidden
  border-radius 50%

.ellipsis
  white-space nowrap
  overflow hidden
  text-overflow ellipsis
</style>
