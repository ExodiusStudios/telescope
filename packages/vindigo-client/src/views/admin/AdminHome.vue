<template>
	<section v-show="user.role == 'admin'" class="admin-home">
		<toolbar class="pl-0" />
		<div class="container">
			<section class="flex mt-4" wrap>
				<div 
					v-for="i in 4" :key="i" 
					class="flex-1 p-4"
				>
					<w-card class="bg-white dark:bg-gray-800">
						<w-flex class="adminpanel__card-header">
							<div class="adminpanel__card-header__left">
								<small>Users</small>
								<h1>350,000</h1>
							</div>
							<spacer />
							<div class="adminpanel__card-header__right">
								<w-icon size="30px" class="dark:text-purple-600">
									mdi mdi-account
								</w-icon>
							</div>
						</w-flex>
						<div>
							<w-icon class="text-green-400">
								mdi mdi-arrow-up
							</w-icon>
							<small class="text-green-400">
								3.4%
							</small>
							<small class="ml-2">
								Since last month
							</small>
						</div>
					</w-card>
				</div>
			</section>
			<section class="mx-4 mt-4 grid grid-cols-12 gap-8">
				<div class="dashboard__analytics p-4 col-span-9 rounded-sm dark:bg-gray-800">
					Analytics
				</div>
				<div class="col-span-3">
					<div class="w-full rounded-sm dark:bg-gray-800">
						<w-flex class="p-4">
							Maintanance
							<spacer />
							<w-switch />
						</w-flex>
					</div>
					<div class="rounded-sm mt-8 dark:bg-gray-800">
						<div class="p-4">
							<div class="w-full p-4 dark:bg-green-500">
								You are running <b>Vindigo</b>
								<br>
								v1.0.0 
							</div>
							<div>
								<w-button class="mt-4 rounded-none m-0 w-full bg-blue-500">
									Check for updates
								</w-button>
							</div>
						</div>
					</div>
					<div class="rounded-sm mt-8 dark:bg-gray-800">
						<div class="p-4">
							Active Users
						</div>
						<section class="grid grid-cols-5 justify-items-center gap-4 pb-4 px-4">
							<div v-for="i in 12" :key="i">
								<avatar
									:profile="$vuex.state.profile"
									:open-profile="false"
									size="40"
								/>
							</div>
						</section>
					</div>
				</div>
			</section>
		</div>
	</section>
</template>

<script lang="ts">
import Vue from 'vue';
import { Optional } from "../../typings/types";
import { Profile } from "../../model/profile";
import Avatar from '../../components/Avatar.vue';

export default Vue.extend({
  components: { Avatar },
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

<style lang="postcss" scoped>

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

.dashboard__analytics {
	height: max-content !important;
}

</style>