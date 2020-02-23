<template lang="pug">
  v-container.login(fluid)
    v-row(align="center" justify="center")
      v-col(cols="12" sm="8" md="4")
        v-card
          v-toolbar(color="primary" flat)
            v-toolbar-title LogIn
          v-card-text
            v-form
              v-text-field(
                label="Email"
                name="email"
                type="email"
                v-model="user.email"
              )
              v-text-field(
                label="Password"
                name="password"
                type="password"
                v-model="user.password"
              )
            v-card-actions
              v-spacer
              v-btn(@click="submitLogin" color="primary") Login
</template>

<script>
import fb from "../db/firebase.js";

export default {
  name: "Login",
  data: () => ({
    user: {
      email: ``,
      password: ``
    }
  }),
  methods: {
    async submitLogin() {
      // @TODO add try/catch and error here
      const user = await fb.auth.signInWithEmailAndPassword(
        this.user.email,
        this.user.password
      );
      this.$store.commit("SET_CURRENT_USER", user.user);
      this.$router.push("/dashboard");
      return true;
    }
  }
};
</script>

<style lang="stylus" scoped>
.v-toolbar__title
  margin 0 auto
  font-size 20px
</style>
