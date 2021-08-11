<template>
	<!-- TODO Replace max-width calc -->
	<div class="kanban-page" style="max-width: calc(100vw - 56px);">
		<div
			class="kanban-page__header"
			:style="listHeaderStyle"
		/>
		
		<draggable
			v-model="headers"
			class="kanban-page__grid"
			handle=".kanban-item__header"
			:animation="250"
		>
			<div
				v-for="(header, idx) in headers" :key="header.title"
				class="kanban-item"
			>
				<div class="kanban-item__header">
					<div class="kanban-item__header-left">
						<w-icon class="mr-3">
							mdi {{ header.icon }}
						</w-icon>
						<h1 class="font-bold">
							{{ header.title }}
						</h1>
					</div>
					<div class="kanban-item__header-right">
						<w-icon class="text-[rgba(255,255,255,0.8)]">
							mdi mdi-plus
						</w-icon>
						<w-icon class="text-[rgba(255,255,255,0.8)]">
							mdi mdi-chevron-down
						</w-icon>
					</div>
					<div
						v-if="idx < headers.length - 1"
						class="absolute right-0 top-[4px] h-[40px] w-[2px] bg-[rgba(255,255,255,0.4)]"
					/>
				</div>
				<div class="kanban-item__body" />
			</div>
		</draggable>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
	name: 'KanbanOverview',

	props: {
		project: {
			required: true,
			type: Object
		}
	},

	data: () => ({
		headers: [
			{ title: 'Completed', icon: 'mdi-check', order: 0, items: [] },
			{ title: 'In progress', icon: 'mdi-check', order: 1, items: [] },
			{ title: 'Backlog', icon: 'mdi-check', order: 1, items: [] }
		]
	}),

	computed: {
		listHeaderStyle(): any {
			return {
				backgroundColor: this.project.accentColor
			};
		}
	},

	methods: {
		test() {
			console.log(this);
		}
	}
});
</script>

<style lang="postcss" scoped>
.kanban-page {
	@apply h-full relative;

	&__header {
		@apply h-12 inset-x-0 top-0 absolute;
	}

	&__grid {
		@apply flex h-full overflow-y-hidden overflow-x-scroll;
	}
}

.kanban-item {
	@apply min-w-[350px] max-w-[350px] flex flex-col;

	.kanban-item__header {
		@apply flex items-center justify-between h-12 relative text-white px-5 cursor-move;

		&-left {
			@apply flex items-center;

			h1 {
				@apply mt-[-3px];
			}
		}
		
		&-right {
			@apply flex items-center;
		}

		&-left, &-right {
			@apply cursor-auto;
		}
	}

	&__body {
		@apply bg-[#F1F2F6] p-4 flex-grow;
	}

	&:nth-child(even) &__body {
		@apply bg-[#EAECF2];
	}
}
</style>