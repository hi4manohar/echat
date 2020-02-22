<template lang="pug">
  v-container.dashboard(fluid)
    v-row
      v-col(cols="3")
        ConversationsList
      v-col(cols="6" class="conv-section")
        .conv-column
          Conversation

        <!-- v-footer(color="primary lighten-1" padless) -->
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
.container
  height:100vh;
.row
  height:100vh
.col-3
  padding: 0px 10px;
.conversations-list
  height:100vh

.profiles-container
  height:100vh
  max-width 100%
  max-height 100%
  overflow-y: auto;
.conv-section
  background: #121212;
  margin: 0;
  padding: 0;
  border-left:4px solid #424242
  border-right:4px solid #424242
.conv-column
  margin: 0px;
footer
  order: 3;
  position: fixed;
  width: 50%;
  bottom: 0px;
  height: 63px;

/* width */
::-webkit-scrollbar {
  width: 4px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
