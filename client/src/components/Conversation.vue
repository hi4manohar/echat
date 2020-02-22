<template lang="pug">
  .convcon
    .chat-profile
      .agent-image
          img(class="img-round" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTktrJrpzwPQ_a-rdg_ECfCFmIx5jKfbfU85eVgaDevH4T6fFR4")
    .conversation(ref="conversation")
      .message-row(
        v-for="message in messages"
        :class="{ 'from-agent': message.fromAgent }"
      )
        .message {{ message.msgBody }} 
          .timestamp {{timeConversion(message.msgTime)}}
        
      //- @TODO add small timestamp next to message and full timestamp on hover (like messenger)

    .chat-footer
      v-row
        v-col(sm='6' cols='12')
          v-textarea(v-model='model' :auto-grow='autoGrow' :clearable='clearable' :counter='counter ? counter : false' :filled='filled' :flat='flat' :hint='hint' :label='label' :loading='loading' :no-resize='noResize' :outlined='outlined' :persistent-hint='persistentHint' :placeholder='placeholder' :rounded='rounded' :row-height='rowHeight' :rows='rows' :shaped='shaped' :single-line='singleLine' :solo='solo')


</template>

<script>
import { mapState } from 'vuex'
import fb from '../db/firebase'

export default {
  name: 'Conversation',
  data: () => ({
    messages: {},
    textarea: {
      autoGrow: false,
      autofocus: true,
      clearable: false,
      counter: 0,
      filled: false,
      flat: false,
      hint: '',
      label: '',
      loading: false,
      model: "I'm a textarea.",
      noResize: true,
      outlined: true,
      persistentHint: false,
      placeholder: '',
      rounded: true,
      rowHeight: 24,
      rows: 1,
      shaped: false,
      singleLine: false,
      solo: false,
    },
  }),
  computed: {
    ...mapState(['active']),
    fbRef() {
      return k => `conversation/${k}/messages`
    },
  },
  watch: {
    active: function(n, old) {
      if (!!n.cvsId && n.cvsId !== old.cvsId) {
        this.deleteListener(old.cvsId)
        this.loadConversation()
      }
    },
  },
  methods: {
    /** Subscribe to latest conversation */
    loadConversation() {
      if (!this.active.cvsId) return false
      const messagesRef = fb.db.ref(this.fbRef(this.active.cvsId))
      messagesRef.on('value', cvsSnapshot => {
        const cvs = cvsSnapshot.val()
        this.messages = cvs
        this.updateScroll()
      })
      // @TODO mark isRead true as this is considered viewed
    },

    /** Delete any old listener */
    deleteListener(oldCvsId) {
      const messagesRef = fb.db.ref(this.fbRef(oldCvsId))
      messagesRef.off('value')
    },

    /** Scroll to bottom of messages pane */
    updateScroll() {
      // @TODO test and fix
      const container = this.$refs.conversation
      container.scrollTop = container.scrollHeight
    },
    timeConversion(timestamp) {
      let d = new Date(timestamp)
      let hours = d.getHours()
      let minutes = d.getMinutes()
      let ampm = hours >= 12 ? 'pm' : 'am'
      hours = hours % 12
      hours = hours ? hours : 12 // the hour '0' should be '12'
      minutes = minutes < 10 ? '0' + minutes : minutes
      let strTime = hours + ':' + minutes + ' ' + ampm
      return strTime
    },
  },
}
</script>

<style lang="stylus" scoped>
.convcon
  height:100vh

.chat-profile
  height:65px
  background:#1e1e1e
  padding: 7px 20px;

.conversation
    height: calc(100vh - 130px);
    overflow-y: auto;
    background: rgba(0, 0, 0, 0.87);
    padding: 20px;
.chat-footer
  height:65px
  background:#357ae8
  padding: 7px 20px;

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
// @TODO improve styles
.message-row
  display flex

  &.from-agent
    justify-content flex-end
    .message
      background:#080808

.message
  background: rgba(255,255,255,0.1);
  border-radius: 10px;
  padding: 9px 15px;
  font-size: 14px;
  font-weight: 300;
  color: #e0e0e0;
  margin-bottom:5px;

.timestamp
  font-size:10px
  margin-left: 2px;
  display: block;
  text-align: right;
  color: #9e9e9e;
</style>
