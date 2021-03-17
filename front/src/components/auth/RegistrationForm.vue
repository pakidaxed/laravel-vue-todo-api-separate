<template>
  <div class="container">
    <div class="form-box">
      <form @submit.prevent="register">
        <div class="form-control">
          <label for="name">Name:</label>
          <input type="text" name="name" id="name" v-model="regData.name"/>
        </div>
        <span class="error" v-if="error">{{ error.name }}</span>
        <div class="form-control">
          <label for="email">E-mail:</label>
          <input type="email" name="email" id="email" v-model="regData.email"/>
        </div>
        <span class="error" v-if="error">{{ error.email }}</span>
        <div class="form-control">
          <label for="password">Password:</label>
          <input type="password" name="password" id="password" v-model="regData.password"/>
          <span class="error" v-if="error">{{ error.password }}</span>
        </div>
        <div class="form-control">
          <label for="confirm_password">Confirm Password:</label>
          <input type="password" name="confirm_password" id="confirm_password" v-model="regData.confirm_password"/>
        </div>
        <span class="error" v-if="error">{{ error.confirm_password }}</span>
        <div class="form-control">
          <label for="confirm_password">Role:</label>
          <select name="role" id="role" v-model="regData.role">
            <option value="ROLE_USER">Simple user</option>
            <option value="ROLE_ADMIN">Admin (test)</option>
          </select>
        </div>
        <span class="error" v-if="error">{{ error.role }}</span>
        <div class="form-actions">
          <div class="loading" v-if="loading"><img src="../../assets/loading.gif" alt="loading"/></div>
          <button v-else>Register</button>
          <router-link to="/">Login</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "RegistrationForm",
  data() {
    return {
      loading: false,
      regData: {
        name: null,
        email: null,
        password: null,
        confirm_password: null,
        role: 'ROLE_USER'
      },
      error: null
    }
  },
  methods: {
    async register() {
      this.loading = true
      await this.$store.dispatch('registration', this.regData)
      this.error = this.$store.getters.getErrors
      this.loading = false
    }
  },
}
</script>

<style scoped>
.error {
  color: crimson;

}

.form-box {
  width: 400px;
  margin: 0 auto;
}

.form-control {
  display: flex;
  justify-content: center;
}

label {
  width: 100%;
}

input, select, option {
  width: 100%;
}
</style>