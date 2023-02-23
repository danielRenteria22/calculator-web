<script>
import {login_request} from '@/api/user_requests.js'
import { showDialog } from 'vant';
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    onSubmit(){
      login_request(this.username,this.password).then((data) =>{
        if(data.error) {
          showDialog({
            title: 'Ups...',
            message: 'Credetials were not valid',
            confirmButtonText: 'Ok'
          })
        } else {
          let accessToken = data.data.access_token.access_token
          let refreshToken = data.data.access_token.refresh_token
          localStorage.setItem('accessToken',accessToken)
          localStorage.setItem('refreshToken',refreshToken)
          this.$router.push('/home')
        }
      })
    },
  }
}
</script>

<template>
  <main>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="username"
          name="Username"
          label="Username"
          placeholder="Username"
          :rules="[{ required: true, message: 'Username is required' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="Password"
          label="Password"
          placeholder="Password"
          :rules="[{ required: true, message: 'Password is required' }]"
        />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          Submit
        </van-button>
      </div>
    </van-form>
    New? Create an account
  </main>
</template>

<style scoped>

</style>
