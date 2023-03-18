<template>
	<Header/>
	<div class="flex flex-col items-center pt-16 pb-16 gap-6">
		<div class="flex flex-col sm:flex-row justify-center items-center gap-4">
			<h3 class="text-2xl">Guess the {{ gameType.substring(0, gameType.length - 1) }}</h3>
			<ComboBoxVue :people="people" :callback="callback"/>
		</div>
		<div class="flex flex-row justify-center gap-6">
			<p class="bg-green-500 text-white rounded-lg p-2">Win series: {{ userStats.winSeries }}</p>
			<p class="bg-red-600 text-white rounded-lg p-2">Loose series: {{ userStats.looseSeries }}</p>
			<p class="bg-blue-600 text-white rounded-lg p-2">Guess: {{ userStats.guess }}/{{ userStats.total }}</p>
		</div>
		<div class="flex flex-row gap-2">
			<i v-for="i in 5 - game.tries" :key="i" class="fa fa-square-xmark text-3xl text-red-600"></i>
		</div>
		<canvas :class="(game.tries === 5) ? 'pt-[36px]' : ''" id="canvas" class="w-[600px]"></canvas>
	</div>

	<Popup v-show="game.winPopup" state="win" :callback="winAction" :imgToGuess="imageSource"
		   :personToGuess="game.personToGuess"/>
	<Popup v-show="game.loosePopup" state="loose" :callback="looseAction" :imgToGuess="imageSource"
		   :personToGuess="game.personToGuess"/>

	<Footer/>
</template>


<script>
// @ is an alias to /src
import ComboBoxVue from '@/components/ComboBox.vue'
import Popup from '../components/Popup.vue'

export default {
	name: 'Guess',
	components: {
		ComboBoxVue,
		Popup
	},
	props: {
		gameType: {
			type: String,
			required: true
		}
	},
	data() {
		const sampleSize = this.gameType === 'actors' ? 90 : 12;
		return {
			personFiles: [],
			people: [],
			imageSource: '',
			game: {
				personToGuess: '',
				tries: 5,
				sampleSize: sampleSize,
				loosePopup: false,
				winPopup: false
			},
			userStats: {
				winSeries: 0,
				looseSeries: 0,
				guess: 0,
				total: 0
			},
		}
	},
	mounted() {
		switch (this.gameType) {
			case "actors":
				this.personFiles = Array.from(require.context('@/assets/actors', true, /^.*\.jpg$/).keys())
				break;
			case "characters":
				this.personFiles = Array.from(require.context('@/assets/characters', true, /^.*\.jpg$/).keys())
				break;
			default:
				break;
		}
		this.people = this.personFiles.map(key => key.replace(/^\.\/(.*)\.jpg$/, '$1'))

		if (localStorage.getItem(this.gameType + '-game')) {
			this.game = JSON.parse(localStorage.getItem(this.gameType + '-game'))
		}
		if (localStorage.getItem(this.gameType + '-userStats')) {
			this.userStats = JSON.parse(localStorage.getItem(this.gameType + '-userStats'))
		}
		let shouldGenerateANewPerson = this.game.personToGuess.length <= 0
		this.generateNewPersonToGuess(shouldGenerateANewPerson)
	},
	methods: {
		reset() {
			this.game.tries = 5;
			this.game.sampleSize = this.gameType === 'actors' ? 90 : 12;
			this.generateNewPersonToGuess()
		},
		callback(selected) {
			if (selected === undefined || selected === '') return; // guess is empty
			this.game.tries--
			if (selected === this.game.personToGuess) { // guess is correct
				this.game.winPopup = true
			} else if (this.game.tries === 0) { // no more tries
				this.game.loosePopup = true
			} else { // guess is wrong
				this.game.sampleSize -= this.gameType === 'actors' ? 15 : 2;
				this.generateNewPersonToGuess(false)
			}
		},
		winAction() {
			this.reset()
			this.game.winPopup = false
			this.userStats.winSeries++
			this.userStats.looseSeries = 0
			this.userStats.guess++
			this.userStats.total++
		},
		looseAction() {
			this.reset()
			this.game.loosePopup = false
			this.userStats.winSeries = 0
			this.userStats.looseSeries++
			this.userStats.total++
		},
		generateNewPersonToGuess(shouldGenerateNewActor = true) {
			if (this.people.length === 0) return;
			if (shouldGenerateNewActor) {
				if (this.game.personToGuess === '') {
					this.game.personToGuess = this.people[Math.floor(Math.random() * this.people.length)]
				} else {
					let oldActorToGuess = this.game.personToGuess
					while (oldActorToGuess === this.game.personToGuess) {
						this.game.personToGuess = this.people[Math.floor(Math.random() * this.people.length)]
					}
				}
			}
			this.imageSource = require('@/assets/' + this.gameType + '/' + this.game.personToGuess + '.jpg')
			let canvas = document.getElementById('canvas')
			let ctx = canvas.getContext('2d')
			let image = new Image()
			let sampleSize = this.game.sampleSize;
			image.onload = function () {
				canvas.width = image.width
				canvas.height = image.height

				ctx.drawImage(image, 0, 0)

				let pixelArr = ctx.getImageData(0, 0, image.width, image.height).data
				for (let y = 0; y < image.height; y += sampleSize) {
					for (let x = 0; x < image.width; x += sampleSize) {
						let index = (y * image.width + x) * 4
						ctx.fillStyle = 'rgba(' + pixelArr[index] + ',' + pixelArr[index + 1] + ',' + pixelArr[index + 2] + ',' + pixelArr[index + 3] + ')'
						ctx.fillRect(x, y, sampleSize, sampleSize)
					}
				}
			}
			image.src = this.imageSource
		}
	},
	watch: {
		game: {
			handler() {
				localStorage.setItem(this.gameType + '-game', JSON.stringify(this.game))
			},
			deep: true,
		},
		userStats: {
			handler() {
				localStorage.setItem(this.gameType + '-userStats', JSON.stringify(this.userStats))
			},
			deep: true,
		}
	}
}

</script>