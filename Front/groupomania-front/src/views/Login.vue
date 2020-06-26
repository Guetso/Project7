<template>
  <div id="Login">
    <h2>{{ title }}</h2>
    <form class="loginForm" @submit.prevent="login" v-if="show">
      <label for="userName">Nom d'utilisateur:</label>
      <input
        type="text"
        name="userName"
        v-model="formData.user.userName"
        placeholder="User"
        required
        maxlength="50"
      />
      <label for="password">Mot de passe:</label>
      <input
        type="password"
        name="password"
        v-model="formData.user.password"
        placeholder="Password"
        required
      />
      <button type="submit">Valider</button>
    </form>

    <div class="messageService" v-if="feedbacks.length">
      <ul>
        <p v-for="feedback in feedbacks" :key="feedback.message">{{ feedback.message }}</p>
      </ul>
    </div>
  </div>
</template>

<script>
import { AUTH_REQUEST } from "../store/actions/auth";

export default {
  name: "Login",
  data() {
    return {
      title: "Login",
      formData: {
        user: { userName: null, password: null }
      },
      feedbacks: [], // Nous permets d'afficher les informations suite à la soumission du formulaire, contient des objets au format {message : 'contenu du message'},il n'apparait que si non vide
      show: true // Le formulaire doit il être affiché
    };
  },
  methods: {
    login() {
      const { user } = this.formData;
      this.$store.dispatch(AUTH_REQUEST, { user }).then(() => {
        this.$router.push("/wall");
      });
    }
  }
};
</script>

<style lang="scss" scoped>
//scss directement
@import "../sass/main";
</style>