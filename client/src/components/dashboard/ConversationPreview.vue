<template lang="pug">
  .conversation-preview(
    v-if="conversation.profileId"
    @click="setActive"
  )
    .profile-name {{ conversation.profileId }}
    .msg-preview {{ conversation.lastMsg.msgBody }}
</template>

<script>
export default {
  name: 'ConversationPreview',
  props: ['conversation'],
  data: () => ({}),
  methods: {
    setActive() {
      this.$store.dispatch('setActive', this.conversation)
    },
  },
}
</script>
