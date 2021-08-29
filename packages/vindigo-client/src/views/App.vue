<template>
	<w-app class="min-h-screen bg-light-1 dark:bg-dark-1 dark:text-gray-100">
		<template v-if="isReady">
			<maintenance v-if="hasMaintenance" />
			<router-view v-else />
		</template>

		<!-- Loading overlay -->
		<fade-transition>
			<div v-if="showSpinner" class="loading-overlay">
				<div class="relative select-none">
					<loading-spinner />
					<div class="loading-overlay__text">
						Loading...
					</div>
				</div>
			</div>
		</fade-transition>
	</w-app>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import Maintenance from './Maintenance.vue';

export default Vue.extend({
	name: "Vindigo",
	components: {
		Maintenance
	},

	computed: {
		hasMaintenance(): boolean {
			return this.$config.maintenance && this.$vuex.state.profile?.role != 'admin';
		},
		showSpinner(): boolean {
			return !this.isReady || !this.isRendered;
		},
		...mapState(['isReady', 'isRendered'])
	},

	watch: {
		'$store.state.isDark'() {
			this.updateTheme();
		}
	},

	created() {
		this.updateTheme();
	},

	methods: {
		updateTheme() {
			const html = document.documentElement;

			if(this.$store.state.isDark) {
				html.classList.add('dark');
			} else {
				html.classList.remove('dark');
			}
		}
	}
});
</script>

<style lang="postcss">
.loading-overlay {
	@apply bg-light-1 dark:bg-dark-1 h-screen fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center;

	&__text {
		@apply text-xl mt-2 text-center opacity-30 uppercase font-semibold dark:text-white;
	}
}
</style>