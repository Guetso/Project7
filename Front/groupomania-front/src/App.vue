<template>
  <v-app>
    <div id="app">
      <v-app-bar color="primary" class="appBar" id="scroll-target" v-scroll="onScroll" ref="appbar">
        <img
          class="logo"
          alt="Groupomania logo"
          src="./assets/Groupomania_Logos/icon-left-font-monochrome-white.svg"
        />
      </v-app-bar>
      <Nav :scroll="offsetTop" :appbarRect="appbarRect"></Nav>
      <Header title="Bienvenue dans votre Espace Groupomania"></Header>
      <router-view />
    </div>
  </v-app>
</template>

<script>
import Nav from "./components/Nav.vue";
import Header from "./components/Header.vue";
export default {
  components: {
    Nav,
    Header
  },
  data: () => ({
    offsetTop: 0,
    appbarRect: {},
  }),
  methods: {
    onScroll() {
      this.offsetTop++;
    }
  },
  mounted() {
    const constraint = this.$refs.appbar.$el;
    const rect = constraint.getBoundingClientRect();
    this.appbarRect = rect;
    console.log(this.appbarRect);
  }
};
</script>

<style lang="scss">
@import "./sass/main";
</style>

