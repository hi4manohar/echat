<template lang="pug">
  v-container.dashboard(fluid)
    v-row
      v-col(cols="3")
        ConversationsList
      v-col(cols="6")
        Conversation
      v-col(cols="3")
        .profiles-container
          Profile(type="user")
          Profile(type="agent")
</template>

<script>
import ConversationsList from '../components/ConversationsList'
import Conversation from '../components/Conversation'
import Profile from '../components/Profile'

export default {
  name: 'Dashboard',
  data: () => ({}),
  components: {
    ConversationsList,
    Conversation,
    Profile,
  },
  methods: {
    loadAllCurrent() {
      this.$store.dispatch('fetchAllCurrent')
    },
  },
  created() {
    this.loadAllCurrent()
  },
}
</script>

<style lang="stylus" scoped>
.profiles-container
  height calc(100vh - 112px)
  display flex
  flex-direction column
  max-width 100%
  max-height 100%
  justify-content space-between
</style>
