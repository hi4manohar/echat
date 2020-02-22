<template lang="pug">
	.chat-footer
	  v-row
	    v-col(sm='12' cols='12')
	      <!-- v-textarea.msg-area(v-model='model' :auto-grow='autoGrow' :clearable='clearable' :counter='counter ? counter : false' :filled='filled' :flat='flat' :hint='hint' :label='label' :loading='loading' :no-resize='noResize' :outlined='outlined' :persistent-hint='persistentHint' :placeholder='placeholder' :rounded='rounded' :row-height='rowHeight' :rows='rows' :shaped='shaped' :single-line='singleLine' :solo='solo') -->
	      .msg-type-area
	        .msg-input
	          <textarea class="msg-area" placeholder="Type Message Here.."></textarea>
	          .msg-sent-icon
	        .attach-file
	          <i class="fas fa-paperclip"></i>
	        .attach-file
</template>

<script>
	
export default {
  name: 'ChatInteract',
  data: () => ({})
}
</script>
</script>

<style lang="stylus" scoped>	
	.chat-footer
	  height 100px
	  background #1e1e1e
	  padding 7px 20px

	.msg-input
		width: calc( 100% - 104px);
		position:relative

	.msg-area
	  width:100%
	  max-height:50px
	  background: #fff
	  border-radius: 29px
	  outline: none
	  color: #1f1f1f
	  line-height: 20px
	  resize: none
	  padding: 15px 47px 15px 20px
	  font-size: 14px

	.msg-type-area
		display:flex

	.msg-sent-icon
	  position:absolute;
	  width:40px;
	  height:40px;
	  background:#999
	  border-radius:50%
	  right:5px;
	  top:5px;

	.attach-file
	  width:50px;
	  height:50px;
	  background:#eee
	  margin-left:2px;
	  border-radius:50%
</style>