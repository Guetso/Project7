<template>
  <header class="hello">
    <img class="logo" alt="Groupomania logo" src="../assets/Groupomania_Logos/icon.svg" />
    <h1>{{ title }}</h1>
  </header>
</template>

<script>
export default {
  name: "Header",
  props: {
    title: {
      type: String,
      //required: true,
      default: 'Hello !'
    }
  }
};
</script>

        