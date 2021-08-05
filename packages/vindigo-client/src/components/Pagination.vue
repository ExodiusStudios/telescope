<template>
	<div class="pagination">
		<w-button
			v-if="showArrows"
			class="pagination__prev w-8 h-8 mx-1 rounded-full"
			icon="mdi mdi-chevron-left"
			bg-color="transparent"
			lg
			:disabled="pageNumber <= 1"
			@click="$emit('input', value - 1)"
		/>
		<w-button
			v-for="(i, j) in visiblePages"
			:key="j"
			class="pagination__btn w-7 h-7 mx-1 rounded-full"
			:class="buttonClass(i)"
			@click="$emit('input', i - 1)"
		>
			{{ i }}
		</w-button>
		<w-button
			v-if="showArrows"
			class="pagination__next w-8 h-8 mx-1 rounded-full"
			icon="mdi mdi-chevron-right"
			bg-color="transparent"
			lg
			:disabled="pageNumber >= total"
			@click="$emit('input', value + 1)"
		/>
	</div>
</template>

<script lang="ts">
import { range } from 'lodash';
import Vue from 'vue';

export default Vue.extend({
	name: 'Pagination',
	props: {
		value: {
			type: Number,
			required: true
		},
		total: {
			type: Number,
			required: true
		},
		visible: {
			type: Number,
			default: 5
		},
		showArrows: {
			type: Boolean,
			default: true
		}
	},

	computed: {
		pageNumber(): number {
			return this.value + 1;
		},
		visiblePages(): number[] {
			if(this.visible % 2 == 0) {
				throw new Error('visible must be odd');
			}

			const amount = Math.max(Math.min(this.total, this.visible), 1);
			const offset = Math.floor(amount / 2);

			return range(
				Math.min(Math.max(this.pageNumber - offset, 1), this.total - amount + 1),
				Math.min(Math.max(this.pageNumber + offset, amount), this.total) + 1
			);
		}
	},

	methods: {
		buttonClass(i: number): any {
			return i == this.pageNumber || !this.total
				? 'pagination__btn--active'
				: undefined;
		}
	}
});
</script>

<style lang="postcss">
.pagination {
	@apply flex justify-center;

	&__btn {
		@apply bg-light-2 text-dark-2 dark:bg-dark-3 dark:text-light-1 font-semibold text-sm !important;

		&--active {
			@apply bg-accent-1 dark:bg-accent-1 text-light dark:text-light !important;
		}
	}
}
</style>