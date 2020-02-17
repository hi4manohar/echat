<template lang="pug">
  v-container.dashboard(fluid)
    v-row(
      v-for="conversation in currentConversations"
      no-gutters
    )
      ConversationPreview(:conversation="conversation")
</template>

<script>
import ConversationPreview from "../components/dashboard/ConversationPreview"

export default {
  name: "Dashboard",
  components: {
    ConversationPreview
  },
  data: () => ({
  })
}
</script>
