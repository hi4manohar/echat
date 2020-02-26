<template lang="pug">
	.conversation-container(:class="conversationContainerClass")
		.chat-profile
			.agent-image
				img(class="img-round" :src="userProfile.pAvatars[0]" v-if="!!userProfile.pAvatars")
			.agent-details
				.name {{ userProfile.pName }}
		.conversation(ref="conversation")
			.message-row(
				v-for="message in messages"
				:class="{ 'from-agent': message.fromAgent }"
			)
				v-tooltip(right)
					template(v-slot:activator="{ on }")
						.message(v-on="on") {{ message.msgBody }} 
							.timestamp {{ message.msgTime | timeFormat }}
					span {{ message.msgTime | fulltimeFormat }}
		v-row(v-if="active.profileId")
			PhotopackSender(v-on:photopack_change_status="showphotopack" :photopackStatus="meta")
		ChatInteract(v-on:photopack_change_status="showphotopack")
</template>

<script>
import { mapState } from 'vuex'
import fb from '../db/firebase'
import '../filters/moment'
import dcrypt from '../filters/dcrypt'
import ChatInteract from '../components/ChatInteract'
import PhotopackSender from '../components/conversation/PhotopackSender.vue'

export default {
  name: 'Conversation',
  components: {
    ChatInteract,
    PhotopackSender,
  },
  filters: {
    decryptPImage: dcrypt.pImg,
  },
  data: () => ({
    messages: {},
    userProfile: {},
    meta: {
      isPhotopackSenderVisible: false,
    },
  }),
  computed: {
    ...mapState(['active', 'linkedProfiles', 'linkedUsers']),
    // @TODO note how I can set a class using vue, use this
    // new class to modify styles and display photopack correctly
    conversationContainerClass() {
      return {
        'conversation--photopack-visible': this.meta.isPhotopackSenderVisible,
      }
    },
    fbRef() {
      return k => `conversation/${k}/messages`
    },
    getProfile() {
      return userId => this.linkedUsers[userId] || {}
    },
  },
  watch: {
    active: function(n, old) {
      if (!!n.cvsId && n.cvsId !== old.cvsId) {
        this.deleteListener(old.cvsId)
        this.loadConversation()
        this.loadUserProfile()
      }
    },
  },
  methods: {
    showphotopack(val) {
      this.meta.isPhotopackSenderVisible = val
    },
    loadUserProfile() {
      if (!this.active['userId']) return false
      this.userProfile = this.getProfile(this.active['userId'])
    },

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
  },
}
</script>

<style lang="stylus" scoped>
.conversation-container
	height 100vh

.chat-profile
	height 80px
	background #1e1e1e
	padding 15px 20px
	display flex

.agent-details
	width 300px
	padding 5px 0px

.conversation
	height calc(100vh - 165px)
	overflow-y auto
	background rgba(0, 0, 0, 0.87)
	padding 20px

.conversations-list
	height calc(100vh - 88px)
	overflow-y auto

.name
	margin-left 11px

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
	transition opacity 0.15s ease-out
	width 100%
	height 100%
	z-index 100
	overflow hidden
	border-radius 50%

.msg-input
	width calc(100% - 104px)
	position relative

.msg-area
	width 100%
	max-height 50px
	background #fff
	border-radius 29px
	outline none
	color #1f1f1f
	line-height 20px
	resize none
	padding 15px 47px 15px 20px
	font-size 14px

// @TODO improve styles
.message-row
	display flex

&.from-agent
	justify-content flex-end

&.from-agent
	justify-content flex-end

.message
	background rgba(255, 255, 255, 0.1)
	border-radius 10px
	padding 9px 15px
	font-size 14px
	font-weight 300
	color #e0e0e0
	margin-bottom 5px

.timestamp
	font-size 10px
	margin-left 2px
	display block
	text-align right
	color #9e9e9e
</style>
