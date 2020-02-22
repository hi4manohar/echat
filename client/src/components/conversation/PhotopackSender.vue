<template lang="pug">
  .photopack
    //- @TODO display all this correctly
    //- in two rows, under the Conversation component
    //- and open it up when the sticker is clicked
    .photopack-row
      img(
        v-for="photo in profilePhotopack"
        :src="photo | decryptPImage"
      )
    .photopack-row
      img(
        v-for="photo in globalPhotopack"
        :src="photo | decryptPhotopackImage"
      )


</template>

<script>
import { mapState, mapGetters } from 'vuex'
import dcrypt from '@/filters/dcrypt'

export default {
  name: 'PhotopackSender',
  computed: {
    ...mapState(['active', 'photopack']),
    ...mapGetters(['profileFromId']),

    profilePhotopack() {
      return this.profileFromId(this.active.profileId).pPhotopack
    },

    globalPhotopack() {
      console.log(this.photopack)
      return this.photopack
    },
  },
  filters: {
    decryptPImage: dcrypt.pImg,
    decryptPhotopackImage: dcrypt.photopack,
  },
}
</script>

<style lang="stylus" scoped>
.photopack img
  width 10em
</style>
