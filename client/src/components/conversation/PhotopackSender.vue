<template lang="pug">
  .photopack
    v-row(justify='center')
      v-dialog(
        v-model='isPhotopackSenderVisible',
        width='600px', @click:outside="e => photoPackHandler(e)"
      )
        v-card
          v-card-title.text-center.d-block
            span.headline.title Photopack Images
          .btn-con
            v-btn(
              :color='colorLocal'
              @click="changeDefaultActive('local')"
            ) Local
            v-spacer
            v-btn(
              :color='colorGlobal'
              @click="changeDefaultActive('global')"
            ) Global
          v-col(cols='12', sm='12')
            v-card
              v-container(fluid='')
                v-row(v-show="defaultActive === 'local' ? true : false")
                  v-col.d-flex.child-flex(v-for="globalphoto in profilePhotopack", :key='globalphoto', cols='3')
                    v-card.d-flex(flat='', tile='')
                      v-img.grey.lighten-2(
                        :src='globalphoto | decryptPImage',
                        :lazy-src='globalphoto | decryptPImage', aspect-ratio='1'
                      )
                        template(v-slot:placeholder='')
                          v-row.fill-height.ma-0(align='center', justify='center')
                            v-progress-circular(indeterminate='', color='grey lighten-5')
                v-row(v-show="defaultActive === 'global' ? true : false")
                  v-col.d-flex.child-flex(v-for="photo in globalPhotopack", :key='photo', cols='3')
                    v-card.d-flex(flat='', tile='')
                      v-img.grey.lighten-2(
                        :src='photo | decryptPhotopackImage',
                        :lazy-src='photo | decryptPImage',
                        aspect-ratio='1'
                      )
                        template(v-slot:placeholder='')
                          v-row.fill-height.ma-0(align='center', justify='center')
                            v-progress-circular(indeterminate='', color='grey lighten-5')
          v-card-actions
            v-spacer
            v-btn(color='primary') Send
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import dcrypt from '@/filters/dcrypt'

export default {
  name: 'PhotopackSender',
  data: () => ({
    dialog: true,
    defaultActive: 'local',
    colorLocal: 'primary',
    colorGlobal: 'black'
  }),
  computed: {
    ...mapState(['active', 'photopack', 'isPhotopackSenderVisible']),
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
  methods: {
    photoPackHandler() {
      return this.$store.dispatch('setIsPhotopackSenderVisible', false)
    },
    changeDefaultActive(type) {
      if(type === 'local' || type === 'global') {
        this.colorLocal = type == 'local' ? 'primary' : 'black'
        this.colorGlobal = type == 'global' ? 'primary' : 'black'
        return this.defaultActive = type
      }        
    }
  }
}
</script>

<style lang="stylus" scoped>
.photopack img
  width 10em

.btn-con
  display flex
  width 60%
  margin 0 auto
.local
  color black
</style>
