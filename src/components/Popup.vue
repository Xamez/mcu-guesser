<template>
	<div class="fixed flex inset-0 items-center justify-center bg-gray-800 bg-opacity-70">
		<div class="flex flex-col gap-3 text-white rounded-xl p-4" :class="(state === 'win') ? 'bg-green-500' : 'bg-red-600'">
			<div class="flex justify-between">
				<h2 v-if="state === 'win'" class="font-bold text-2xl">You won!</h2>
                <h2 v-else class="font-bold text-2xl">You loose!</h2>
				<i :class="(state === 'win') ? 'fa fa-circle-arrow-right text-2xl' : 'fa-xmark' " class="fa cursor-pointer" @click="callback()"></i>
			</div>
			<p>The answer was: <span class="border-b-2">{{ personToGuess }}</span></p>
			<img class="w-[450px] rounded-lg" :src="imgToGuess" :alt="personToGuess">
		</div>
	</div>
</template>

<script>
export default {
	name: 'Popup',
    props: ['state', 'callback', 'imgToGuess', 'personToGuess'],
}
</script>