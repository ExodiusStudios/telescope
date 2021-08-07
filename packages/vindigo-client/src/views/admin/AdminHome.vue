<template>
	<section v-show="user.role == 'admin'" class="admin-home">
		<toolbar class="pl-0" />
		<div class="admin">
			This is the admin dashboard
		</div>

		<span class="homeButton">
			<w-button
				class="ml-0"
				color="white"
				bg-color="accent-1"
				:route="'/'"
			>
				Return Home
			</w-button>
		</span>
	</section>
</template>

<script lang="ts">
import Vue from 'vue';
import { Optional } from "../../typings/types";
import { Profile } from "../../model/profile";

export default Vue.extend({
	name: 'AdminHome',

	computed: {
		user(): Optional<Profile> {
			return this.$vuex.state.profile;
		}
	},

	created() {
		if(this.user == null || this.user.role != 'admin') {
			this.$router.push('/');
			console.log(`Invalid permissions, returning home...`);
		}
	},
});
</script>

<style scoped>
.homeButton {
	display: flex;
	justify-content: center;
	margin-top: 100px;
}
.admin {
	margin-top: 20px;
	font-weight: bold;
	font-size: 30px;
	display: flex;
	justify-content: center;
}
</style>