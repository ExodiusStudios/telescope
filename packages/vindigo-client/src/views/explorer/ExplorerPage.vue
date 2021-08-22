<template>
	<section class="explorer-page">
		<toolbar class="pl-0" />
		<div class="explore">
			This is the explore page
		</div>

		<span class="homeButton">
			<w-button
				class="ml-0"
				color="white"
				bg-color="accent-1"
				:route="'/'"
			>
				{{$t("GENERAL_RETURN_HOME")}}
			</w-button>
		</span>
	</section>
</template>

<style scoped>
.homeButton {
	display: flex;
	justify-content: center;
	margin-top: 100px;
}
.explore {
	margin-top: 20px;
	font-weight: bold;
	font-size: 30px;
	display: flex;
	justify-content: center;
}
</style>