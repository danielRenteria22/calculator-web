<script>
import { login_request, registerUser } from '@/api/user_requests.js'
import { showDialog } from 'vant';
export default {
	data() {
		return {
			username: '',
			password: '',
			register_username: '',
			register_password: '',
			loading: false,
			showingRegister: false,
		}
	},
	methods: {
		onSubmit() {
			this.loading = true
			login_request(this.username, this.password).then((data) => {
				if (data.error) {
					showDialog({
						title: 'Ups...',
						message: 'Credetials were not valid',
						confirmButtonText: 'Ok'
					})
				} else {
					let accessToken = data.data.access_token.access_token
					let refreshToken = data.data.access_token.refresh_token
					localStorage.setItem('accessToken', accessToken)
					localStorage.setItem('refreshToken', refreshToken)
					this.$router.push('/home')
				}
			})
		},
		showRegister() {
			this.showingRegister = true
		},
		registerUser() {
			registerUser(this.register_username,this.register_password).then(data => {
				if(data.error) {
					showDialog({
						title: 'Ups...',
						message: data.message,
						confirmButtonText: 'Ok'
					})
					return
				}

				this.showingRegister = false
				showDialog({
					title: 'Done',
					message: 'You can now log in with those credentials',
					confirmButtonText: 'Ok'
				})
			})
		}
	}
}
</script>

<template>
	<main>

		<van-row justify="center">
			<van-col span="8">
				<h1>Welcome</h1>
				<van-form @submit="onSubmit">
					<van-cell-group inset>
						<van-field v-model="username" name="Username" label="Username" placeholder="Username"
							:rules="[{ required: true, message: 'Username is required' }]" />
						<van-field v-model="password" type="password" name="Password" label="Password" placeholder="Password"
							:rules="[{ required: true, message: 'Password is required' }]" />
					</van-cell-group>
					<div style="margin: 16px;">
						<van-button :loading="loading" round block type="primary" native-type="submit">
							Submit
						</van-button>
					</div>
				</van-form>
				<van-cell is-link @click="showRegister">New? Create an account</van-cell>
			</van-col>
		</van-row>

		<van-popup v-model:show="showingRegister" :style="{ padding: '64px' }">
			<van-form @submit="registerUser">
				<van-cell-group inset>
					<van-field v-model="register_username" name="Username" label="Username" placeholder="Username"
						:rules="[{ required: true, message: 'Username is required' }]" />
					<van-field v-model="register_password" type="password" name="Password" label="Password" placeholder="Password"
						:rules="[{ required: true, message: 'Password is required' }]" />
				</van-cell-group>
				<div style="margin: 16px;">
					<van-button :loading="loading" round block type="primary" native-type="submit">
						Submit
					</van-button>
				</div>
			</van-form>
		</van-popup>
	</main>
</template>

<style scoped></style>
