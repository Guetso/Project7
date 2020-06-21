<template>
  <div class="home" v-bind:title="message">
    <router-link :to="{ name: 'Login' }">Login</router-link>
    <router-link :to="{ name: 'Signup' }">Signup</router-link>
  </div>
</template>

<script>
// @ is an alias to /src
//import Header from "@/components/Header.vue";

export default {
  name: "Home",
  /* components: {
    Header
  } */
  data: function() {
    return { message: "Page d'accueil" };
  }
};
</script>

<style lang="scss">
@import "../sass/main";
</style>
