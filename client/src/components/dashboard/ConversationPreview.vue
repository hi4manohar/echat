<template lang="pug">
  .user-profile-block(
    v-if="conversation.profileId"
    @click="setActive"
  )
    v-expansion-panel-content
      .user-profile 
        .agent-image(
          v-if="getProfile(conversation.profileId).pAvatars"
        )
          img(class="img-round" :src="(getProfile(conversation.profileId).pAvatars)[0] | dcryptPAvatar")
        .agent-details
          div.agent-name {{ getProfile(conversation.profileId).pName }}
          div.msg-preview.ellipsis {{ conversation.lastMsg.msgBody }}
</template>

<script>
import { mapState } from "vuex";
import dcrypt from "../../filters/dcrypt";
export default {
  name: "ConversationPreview",
  props: ["conversation"],
  filters: {
    dcryptPAvatar: dcrypt.pAvatar
  },
  data: () => ({}),
  computed: {
    ...mapState(["linkedProfiles"]),

    getProfile() {
      return profileId => this.linkedProfiles[profileId] || {};
    }
  },
  methods: {
    setActive() {
      this.$store.dispatch("setActive", this.conversation);
    }
  }
};
</script>

<style lang="stylus" scoped>
.conversation-preview
  margin-left 1em
  background rgba(black, 0.1)
  max-width 80%
  margin-left 4em
  margin-bottom 7px
  cursor pointer

.msg-preview
  font-size 12px
  font-size 11px
  font-weight 400
  color #9a9a9a
  margin-top 5px

.ellipsis
  white-space nowrap
  overflow hidden
  text-overflow ellipsis

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
  padding 0px 20px
  cursor pointer

.agent-details
  width 70%
  padding 10px 0px 10px 10px
  height 50px
</style>
