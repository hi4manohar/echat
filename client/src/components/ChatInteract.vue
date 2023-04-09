<template lang="pug">
	.chat-footer
		v-row
			v-col(sm='12' cols='12')
				.msg-type-area
					.msg-input
						textarea(class="msg-area" placeholder="Type Message Here..")
						v-btn.msg-sent-icon
							v-icon(class="mdi-send mdi")
					v-btn.attach-file(@click="setPhotoPackView(true)")
						v-icon(class="mdi-attachment mdi")
					v-btn.attach-file
						v-icon(class="mdi mdi-image")
</template>

<script>
import { mapState } from 'vuex'
import fb from '../db/firebase'
import 'firebase/auth'
import 'firebase/database'

export default {
  name: 'ChatInteract',
  data: () => ({}),
  computed: {
  	...mapState(['active']),
  },
  props: ['displayPhotoPack'],
  methods: {
    setPhotoPackView(val) {
    	this.addConversation();
      this.$emit('photopackChangeStatus', val)
    },
    addConversation() {
    	var conversation = {
    		fromAgent: this.active['profileId'],
    		msgBody: 'Welcome to chat',
    		msgTime: fb.fbTimestamp,
    		mId: fb.db.ref().child("messages").push().getKey()
    	}
    	console.log(conversation);

    	fb.db.ref().child("messages").child(conversation.mId).set(conversation);
    	fb.db.ref().child("lastMsg").set(conversation);
    	// fb.database().child("userUnreadMsgCount").setValue(cvsObj.userUnreadMsgCount);
    }
  },
}
</script>

<style lang="stylus" scoped>
.chat-footer
	height 100px
	background #1e1e1e
	padding 7px 20px

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

.msg-type-area
	display flex

.msg-sent-icon
	position absolute
	min-width 40px !important
	height 40px !important
	border-radius 50%
	background #fff !important
	box-shadow none
	color #2d2d2d
	right 5px
	top 5px
	text-align center
	padding 0px !important
	cursor pointer

.attach-file
	min-width 50px !important
	height 50px !important
	background #2d2d2d
	margin-left 2px
	border-radius 50%
	text-align center
	padding 0px !important
	cursor pointer
</style>
