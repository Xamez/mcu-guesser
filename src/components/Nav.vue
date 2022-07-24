<template>
  <router-link to="/"><span class="link link-underline link-underline-color">Home</span></router-link>
  <router-link to="/guess-actors"><span class="link link-underline link-underline-color">Guess Actors</span></router-link>
  <router-link to="/guess-characters"><span class="link link-underline link-underline-color">Guess Characters</span></router-link>
</template>

<script>

export default {
  name: 'Nav',
  props: {
  }
}
</script>