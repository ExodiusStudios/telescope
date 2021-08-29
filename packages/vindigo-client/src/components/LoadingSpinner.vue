<template>
	<div>
		<w-progress
			ref="spinner"
			circle
			:size="110"
			:width="2"
			:stroke="2"
			bg-color="light-2"
		>
			<img
				:src="require('/src/assets/icon.svg')"
				class="w-209 h-20 max-w-none"
				importance="high"
				@dragstart.prevent
			>
		</w-progress>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({

	mounted() {
		const spinner = (this.$refs.spinner as Vue).$el;
		const svg = spinner.querySelector('.w-progress__progress') as HTMLElement;

		svg?.insertAdjacentHTML('afterbegin', `
			<defs>
				<linearGradient id="gradient">
					<stop offset="0%" stop-color="#6A42FF" />
					<stop offset="100%" stop-color="#00C9FF" />
				</linearGradient>
			</defs>
		`);

		const circle = svg.lastElementChild! as HTMLElement;

		circle.style.stroke = 'url(#gradient)';
	}
});
</script>