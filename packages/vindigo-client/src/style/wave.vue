<style lang="postcss">

.w-notification-manager {
	@apply overflow-x-hidden;
}

/* Input fields */
.w-input {
	&:not(&--outline) {
		@apply border-none;
	}
}

/* Input fields */
.w-input__input-wrap {
	@apply border-none ring-4 ring-white bg-white ring-opacity-30 text-sm h-9;

	&--round input {
		@apply rounded-full;
	}

	&::after {
		display: none;
	}
}

/* Textarea fields */
.w-textarea__textarea-wrap {
	@apply border-none ring-4 ring-white bg-white ring-opacity-30 text-sm;

	&--round input {
		@apply rounded-full;
	}

	&::after {
		display: none;
	}
}

/* Checkboxes */
.w-checkbox__input {
	@apply text-red-500;

	&::after {
		@apply border-white;
	}
}

/* Buttons */
.w-button {
	@apply leading-none px-4 py-4 rounded-lg ml-2 font-semibold;

	&:not(&--outline) {
		@apply border-none;
	}

	&--round .w-button__loader {
		@apply rounded-full;
	}

	&--icon {
		@apply bg-transparent border-none !important;
	}
}

/** Divider */
.w-divider {
	@apply my-3 bg-gray-900 dark:bg-gray-300;
}

/** Select */
.w-select {
	@apply dark:text-white;

	&__selection, &__label {
		@apply dark:text-gray-50;
	}

	&__menu {
		@apply dark:bg-gray-700;
	}
}

/** List */
.w-list {

	&__item-label.primary {
		@apply dark:bg-white;
	}
}

</style>