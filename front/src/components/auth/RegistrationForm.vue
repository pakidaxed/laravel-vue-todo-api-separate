<template>
  <div class="form-box">
    <form @submit.prevent="register">
      <div class="form-control">
        <label for="name">Name:</label>
        <input type="text" name="name" id="name" v-model="regData.name"/>
      </div>
      <span class="error" v-if="error.name">{{ error.name }}</span>
      <div class="form-control">
        <label for="email">E-mail:</label>
        <input type="email" name="email" id="email" v-model="regData.email"/>
      </div>
      <span class="error" v-if="error.email">{{ error.email }}</span>
      <div class="form-control">
        <label for="password">Password:</label>
        <input type="password" name="password" id="password" v-model="regData.password"/>
        <span class="error" v-if="error.password">{{ error.password }}</span>
      </div>
      <div class="form-control">
        <label for="confirm_password">Confirm Password:</label>
        <input type="password" name="confirm_password" id="confirm_password" v-model="regData.confirmPassword"/>
      </div>
      <span class="error" v-if="error.confirmPassword">{{ error.confirmPassword }}</span>
      <div class="form-control">
        <label for="confirm_password">Role:</label>
        <select name="role" id="role" v-model="regData.role">
          <option value="ROLE_USER">Simple user</option>
          <option value="ROLE_ADMIN">Admin (test)</option>
        </select>
      </div>
      <span class="error" v-if="error.role">{{ error.role }}</span>
      <div class="form-actions">
        <button>Register</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RegistrationForm",
  data() {
    return {
      regData: {
        name: null,
        email: null,
        password: null,
        confirmPassword: null,
        role: 'ROLE_USER'
      },
      error: {
        name: null,
        email: null,
        password: null,
        confirmPassword: null,
        role: null
      }
    }
  },
  methods: {
    register() {
      axios
          .post('http://localhost:8000/api/registration', {
            "name": this.regData.name,
            "email": this.regData.email,
            "password": this.regData.password,
            "confirm_password": this.regData.confirmPassword,
            "role": this.regData.role
          })

          .then(response => {
            if (!response.data.success) {
              console.log(response.data)
              if (response.data.name) this.error.name = response.data.name
              if (response.data.email) this.error.email = response.data.email
              if (response.data.password) this.error.password = response.data.password
              if (response.data.confirm_password) this.error.confirmPassword = response.data.confirm_password
              if (response.data.role) this.error.role = response.data.role
            } else {
              this.$router.push('/');
            }
          })
          .catch(error => console.log(error))


    }
  }

}
</script>

<style scoped>
.error {
  color: crimson;

}

.form-box {
  width: 500px;
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