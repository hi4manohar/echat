<template lang="pug">
  v-container.login(fluid)
    v-row(align="center" justify="center")
      v-col(cols="12" sm="8" md="4")
        v-card
          v-toolbar(color="primary" flat)
            v-toolbar-title login
          v-card-text
            v-form(@submit="submitLogin")
              v-text-field(
                label="Email"
                name="email"
                prepend-icon="email"
                type="email"
                v-model="user.email"
              )
              v-text-field(
                label="Password"
                name="password"
                prepend-icon="lock"
                type="password"
                v-model="user.password"
              )
          v-card-actions
            v-spacer
            v-btn(color="primary") Login
</template>

<script>
export default {
  name: "Login",
  data: () => ({
    user: {
      email: ``,
      password: ``
    }
  }),
  methods: {
    submitLogin() {
      // @TODO handle firebase auth
      return true
    }
  }
}
</script>
