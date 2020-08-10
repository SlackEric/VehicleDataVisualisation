<template>
	<div class="background row justify-center items-center">
		<div class="col-md-4 col-xs-8">
			<div class="row">
				<h5 class="text-white q-my-md">AeroRanger</h5>
			</div>
			<q-card>
				<q-form ref="loginForm" class="row justify-center" @submit="submit">
					<div class="col-8 q-ma-lg">
						<q-input outlined v-model="username" label="Username" :rules="[ val => val !== null && val.length > 0 || 'Please input the username!']"></q-input>
						<q-input outlined v-model="password" type="password" label="Password" :rules="[ val => val !== null && val.length > 0 || 'Please input the password!']"></q-input>
						<div class="row justify-center">
							<q-btn @click="submit" color="primary">Login</q-btn>
						</div>
					</div>
				</q-form>
			</q-card>

		</div>
	</div>
</template>

<style lang="scss">
	.background {
		width: 100vw;
		height: 100vh;
		background-color: rgb(7, 171, 247);
	}
</style>

<script>
export default {
	name: 'Login',
	data () {
		return {
			username: null,
			password: null
		};
	},
	methods: {
		async submit () {
			const isInputsValid = await this.$refs.loginForm.validate();

			if (isInputsValid) {
				this.$q.loading.show();
				const params = {
					username: this.username,
					password: this.password
				};

				this.$axios.post('/auth/login', params)
					.then((response) => {
						this.$q.loading.hide();
						this.$q.localStorage.set('token', response.data.id_token);
						this.$router.push('/');
					}).catch(() => {
						this.$q.loading.hide();
						this.$q.notify({
							type: 'negative',
							message: 'Wrong username or password!'
						});
					});
			}
		}
	}
};
</script>
