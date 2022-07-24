<template>
  <div class="flex flex-col justify-between h-screen">
    <Header/>
    <div class="flex flex-col xl:flex-row items-center xl:justify-center gap-12 pt-16 pb-16 p-4 text-white">
      <div class="h-[650px] bg-gradient-to-br from-blue-300 to-blue-800 max-w-screen-sm rounded-lg p-4 hover:scale-105 ease-in-out duration-300">
        <div class="flex flex-col gap-4">
          <div>
            <h3 class="font-bold text-xl">Guess Actors</h3>
            <p class="text-lg text-justify">This game mode consists in finding the <span class="border-b-2">name of an actor</span> from a blurred image of the latter. The more you are wrong, the clearer the image will be. You only have 5 tries per person.</p>
          </div>

          <img class="p-6 lg:last:h-[400px] rounded-lg" src="../assets/rdj.jpg" alt="Guess Actors">

          <div class="text-right">
            <router-link to="/guess-actors"><i class="fa fa-circle-arrow-right fa-2xl"></i></router-link>
          </div>
        </div>
      </div>
      <div class="h-[650px] bg-gradient-to-br from-fuchsia-600 to-red-500 max-w-screen-sm rounded-lg p-4 hover:scale-105 ease-in-out duration-300">
        <div class="flex flex-col gap-4">
          <div>
            <h3 class="font-bold text-xl">Guess Characters</h3>
            <p class="text-lg text-justify">This game mode consists in finding the <span class="border-b-2">name of a character</span> from a blurred image of it. The more you get it wrong, the clearer the image will be. You only have 5 tries per person.</p>
          </div>

          <div class="rounded-lg">
            <img class="p-6 lg:h-[400px]" src="../assets/wanda.jpg" alt="Guess Actors"/>
          </div>

          <div class="text-right">
            <router-link to="/guess-characters"><i class="fa fa-circle-arrow-right fa-2xl"></i></router-link>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
	name: 'HomeView',
	components: {
		Header,
		Footer
	}
}
</script>
