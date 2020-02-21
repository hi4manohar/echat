<template lang="pug">
  v-container.dashboard(fluid)
    v-row
      v-col(cols="3")
        ConversationsList
      v-col(cols="6" class="conv-section")
        .conv-column
          Conversation
        v-footer(color="primary lighten-1" padless)
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
  height calc(100vh - 88px)
  display flex
  flex-direction column
  max-width 100%
  max-height 100%
  justify-content space-between
  overflow-y: auto;
.conv-section
  background: #31312e;
  margin: 0;
  padding: 0;
.conv-column
  margin: 10px;
footer
  order: 3;
  position: fixed;
  width: 50%;
  bottom: 0px;
  height: 63px;
</style>
