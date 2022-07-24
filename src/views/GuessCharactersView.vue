<template>
  <div class="flex flex-col justify-between h-screen">
    <Header/>
    <Guess gameType="characters"/>
    <Footer/>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Guess from '@/components/Guess.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'GuessCharactersView',
  components: {
    Header,
    Guess,
    Footer
  }
}
</script>
