<template>
  <nav id="navbar">
    <transition name="slide">
      <div class="menu" v-if="show">
        <button class="menu__close" @click="show = !show">
          <i class="fas fa-times"></i>
        </button>

        <ul class="menu__list">
          <li v-for="item in navItems" :key="item.id" @click="show = !show">
            <router-link :to="{ name: item.name }">{{ item.text }}</router-link>
          </li>
        </ul>
      </div>
    </transition>

    <div class="menu__btn" @click="show = !show">
      <button class="open">
        <i class="fas fa-bars"></i>
        <span>Menu</span>
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Nav",
  data: function() {
    return {
      show: false,
      navItems: [
        { id: 1, text: "Accueil", name: "Home" },
        { id: 2, text: "Votre compte", name: "Account" },
        { id: 3, text: "A propos", name: "About" }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../sass/main";
</style>
