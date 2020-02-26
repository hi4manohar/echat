<template lang="pug">
  .photopack
    v-row(justify='center')
      v-dialog(v-model='photopackStatus.isPhotopackSenderVisible', width='600px' @click:outside="changePhotopackStatus(false)")
        v-card
          v-card-title.text-center.d-block
            span.headline.title Photopack Images
          .btn-con
            v-btn(
              :color='defaultActive === "local" ? "primary" : "black"'
              @click="changeDefaultActive('local')"
            ) Local
            v-spacer
            v-btn(
              :color='defaultActive === "global" ? "primary" : "black"'
              @click="changeDefaultActive('global')"
            ) Global
          v-col(cols='12', sm='12')
            v-card
              v-container(fluid='')
                v-row(v-show="defaultActive === 'local' ? true : false")
                  v-col.d-flex.child-flex(
                    v-for="(photo, index) in profilePhotopack",
                    :key='`photo${index}`', cols='3',
                    :class="{highlight:`photo${index}` == selected}" @click="selected = `photo${index}`"
                  )
                    v-card.d-flex(flat='', tile='')
                      v-img.grey.lighten-2(
                        :src='photo | decryptPImage',
                        :lazy-src='photo | decryptPImage', aspect-ratio='1'
                      )
                        template(v-slot:placeholder='')
                          v-row.fill-height.ma-0(align='center', justify='center')
                            v-progress-circular(
                              indeterminate='',
                              color='grey lighten-5'
                            )
                v-row(v-show="defaultActive === 'global' ? true : false")
                  v-col.d-flex.child-flex(
                    v-for="(photo, index) in globalPhotopack",
                    :key='`photo${index}`',
                    cols='3',
                    :class="{highlight:`photo${index}` == selected}" @click="selected = `photo${index}`"
                  )
                    v-card.d-flex(flat='', tile='')
                      v-img.grey.lighten-2(
                        :src='photo | decryptPhotopackImage',
                        :lazy-src='photo | decryptPImage',
                        aspect-ratio='1'
                      )
                        template(v-slot:placeholder='')
                          v-row.fill-height.ma-0(
                            align='center',
                            justify='center'
                          )
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
  props: {
    photopackStatus: {
      type: Object,
    },
  },
  data: () => ({
    dialog: true,
    defaultActive: 'local',
    selected: undefined,
  }),
  computed: {
    ...mapState(['active', 'photopack']),
    ...mapGetters(['profileFromId']),

    profilePhotopack() {
      return this.profileFromId(this.active.profileId).pPhotopack
    },

    globalPhotopack() {
      return this.photopack
    },
  },
  filters: {
    decryptPImage: dcrypt.pImg,
    decryptPhotopackImage: dcrypt.photopack,
  },
  methods: {
    changeDefaultActive(type) {
      if (type === 'local' || type === 'global')
        return (this.defaultActive = type)
    },
    changePhotopackStatus(val) {
      this.$emit('photopackChangeStatus', val)
    },
  },
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
.highlight
  border 2px solid green
  background black
</style>
