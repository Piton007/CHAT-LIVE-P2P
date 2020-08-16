<template>
	<div class="container p-5">
		<div class="row justify content-center">
			<div class="col">
				<b-card header="Register" bg-variant="info" text-variant="white"   class="text-center" tag="main">
				
				<b-form @submit.prevent="register">
					<b-form-group
						id="input-group-1"
						label="Your Name:"
						label-for="input-1"
					>
						<b-form-input
							id="input-1"
							v-model="name"
							required
							placeholder="Enter username"
						></b-form-input>
					</b-form-group>
					<b-form-group
						id="input-group-2"
						label="Your Avatar:"
						label-for="input-1"
					>
						<b-form-file
							id="input-2"
							v-model="avatar"
							accept="image/*" 
							:state="Boolean(avatar)"
							placeholder="Choose a file or drop it here..."
							drop-placeholder="Drop file here..."
						>
						</b-form-file>
					</b-form-group>
                    <b-button type="submit" variant="primary">GO</b-button>
				</b-form>
                </b-card>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Register",
		data: () => ({
			name: "",
			avatar: [],
		}),
		methods: {
			register() {
				this.$store.dispatch("register", {
					name: this.name,
					avatar: this.avatar,
				}).then((data)=>{
                    this.$router.push('chat')
                }).catch(()=>{
                    alert("error")
                });
			},
		},
	};
</script>

<style></style>
