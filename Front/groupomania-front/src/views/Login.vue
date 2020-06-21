<template>
<div id="Login">
    <h2> {{ title }} </h2>
  <form class="loginForm">
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
    name : 'Login',
    data: function () {
       return {
           title: 'Login'
       }
    }
}
</script>

<style lang="scss" scoped>
@import "../sass/main";
</style>