<template>
	<header>
		<div class="bg-red-600">
			<div class="container flex items-center lg:justify-between mx-auto p-6 text-white">
				<router-link class="flex gap-2 mx-auto lg:mx-0" to="/">
					<img class="w-20 mb-1" src="../assets/marvel-white.png" alt="Marvel">
					<h1 class="text-4xl font-mcu">Guesser</h1>
				</router-link>
				<div class="text-xl gap-6 hidden lg:flex">
					<Nav />
				</div>
				<div class="flex lg:hidden">
					<div @click="toggleActive">
						<i v-if="!active" class="fa fa-bars fa-2x w-7"></i>
						<i v-else class="fa fa-xmark text-4xl w-7"></i>
					</div>
					<div v-if="active" id="nav-burger" class="gap-6 absolute flex flex-col bg-gray-900 fill-white z-10 translate-y-10 rounded w-72 text-2xl p-2 pl-4">
						<Nav/>
					</div>
				</div>
			</div>
		</div>
	</header>
</template>

<script>

import Nav from './Nav.vue'
export default {
	name: "Header",
	data() {
		return {
			active: false
		}
	},
	methods: {
		toggleActive() {
			this.active = !this.active;
		}
	},
	components: { Nav }
}



</script>

<style>
.link-underline {
	border-bottom-width: 0;
	background-image: linear-gradient(transparent, transparent), linear-gradient(#fff, #fff);
	background-size: 0 3px;
	padding-bottom: 2px;
	background-position: 0 100%;
	background-repeat: no-repeat;
	transition: background-size .5s ease-in-out;
}

.link-underline-color {
	background-image: linear-gradient(transparent, transparent), linear-gradient(#fff, #fff)
}

.link-underline:hover {
	background-size: 100% 3px;
	background-position: 0 100%
}

#nav-burger {
	--tw-translate-x: -90%;
}
</style>