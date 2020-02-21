<template lang="pug">
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <h1>eChat</h1>
      </div>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  components: {},

  data: () => ({
    //
  }),
}
</script>

<style lang="stylus">
.v-content
  padding: 88px 0px 0px;
html
  overflow-y: hidden !important;
</style>
