<template>
  <div id="Signup">

    <h2>{{ title }}</h2>

    <form class="signupForm">
      <label for="userName">Nom d'utilisateur:</label>
      <input type="text" name="userName" placeholder="User" />
      <label for="password">Mot de passe:</label>
      <input type="text" name="password" placeholder="Password" />
      <button type="submit">Valider</button>
    </form>

  </div>
</template>

<script>
export default {
  name: "Signup",
  data: function() {
    return {
      title: "Signup"
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../sass/main";
</style>