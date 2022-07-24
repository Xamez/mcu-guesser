<template>
	<footer class="flex flex-col items-center w-full h-16 bg-gray-900 mx-auto text-white text-sm p-4">
		<p v-if="year > 2022">&copy; 2022 - {{ year }} Copyright: MCU Guesser</p>
		<p v-else>&copy; 2022 Copyright: MCU Guesser</p>
		<p>Fait avec <i class="fa fa-heart text-red-600"></i> par <span class="text-red-600">Xamez</span></p>
	</footer>
</template>

<script>
export default {
	name: 'Footer',
	data() {
		return {
			year: new Date().getFullYear()
		}
	},
}
</script>