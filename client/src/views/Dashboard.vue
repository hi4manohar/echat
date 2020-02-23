<template lang="pug">
  v-container.dashboard(fluid)
    v-row
      v-col(cols="3")
        ConversationsList
      v-col(cols="6" class="conv-section")
        .conv-column
          Conversation
      v-col(cols="3")
        .profiles-container
          Profile(type="user")
          Profile(type="agent")
</template>

<script>
import ConversationsList from "../components/ConversationsList";
import Conversation from "../components/Conversation";
import Profile from "../components/Profile";

export default {
  name: "Dashboard",
  data: () => ({}),
  components: {
    ConversationsList,
    Conversation,
    Profile,
    CharacterData
  },
  methods: {
    loadAllCurrent() {
      this.$store.dispatch("fetchAllCurrent");
    }
  },
  created() {
    this.loadAllCurrent();
  }
};
</script>

$color-1 = #121212
$color-2 = #424242
$color-3 = #f1f1f1
$color-4 = #888
$color-5 = #555

.container
    height 100vh

.row
    height 100vh

.col-3
    padding 0px 10px

.conversations-list
    height 100vh

.profiles-container
    height 100vh
    max-width 100%
    max-height 100%
    overflow-y auto

.conv-section
    background $color-1
    margin 0
    padding 0
    border-left 4px solid $color-2
    border-right 4px solid $color-2

.conv-column
    margin 0px

footer
    order 3
    position fixed
    width 50%
    bottom 0px
    height 63px

::-webkit-scrollbar
    width 4px

::-webkit-scrollbar-track
    background $color-3

::-webkit-scrollbar-thumb
    background $color-4

::-webkit-scrollbar-thumb:hover
    background $color-5


<style lang="stylus" scoped>
.container
  height 100vh

.row
  height 100vh

.col-3
  padding 0px 10px

.conversations-list
  height 100vh

.profiles-container
  height 100vh
  max-width 100%
  max-height 100%
  overflow-y auto

.conv-section
  background #121212
  margin 0
  padding 0
  border-left 4px solid #424242
  border-right 4px solid #424242

.conv-column
  margin 0px

footer
  order 3
  position fixed
  width 50%
  bottom 0px
  height 63px

::-webkit-scrollbar
  width 4px

::-webkit-scrollbar-track
  background #f1f1f1

::-webkit-scrollbar-thumb
  background #888
  &:hover
    background #555
</style>
