<template>
  <div id="app">
    <Nav></Nav>
    <Header title="Bienvenue dans votre Espace Groupomania"></Header>
    <router-view />
  </div>
</template>

<script>
import Nav from "./components/Nav.vue";
import Header from "./components/Header.vue";
export default {
  components: {
    Nav,
    Header
  }
};
</script>

<style lang="scss">
@import "./sass/main";
</style>

