<template>
  <div id="Login">
    <h2>{{ title }}</h2>
    <form class="loginForm" @submit.prevent="loginMe" v-if="show">
      <label for="userName">Nom d'utilisateur:</label>
      <input
        type="text"
        name="userName"
        v-model="user.username"
        placeholder="User"
        required
        maxlength="50"
      />
      <label for="password">Mot de passe:</label>
      <input
        type="password"
        name="password"
        v-model="user.password"
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
import User from "../models/user";

export default {
  name: "Login",
  data() {
    return {
      title: 'Se connecter à mon compte',
      user: new User("", ""),
      feedbacks: [], // Nous permets d'afficher les informations suite à la soumission du formulaire, contient des objets au format {message : 'contenu du message'},il n'apparait que si non vide
      show: true // Le formulaire doit il être affiché
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedin;
    }
  },
  created() {
    if (this.loggedin) {
      this.$router.push("/wall");
    }
  },
  methods: {
    loginMe() {
      this.$store.dispatch("auth/login", this.user).then(
        () => {
          this.$router.push("/wall");
        },
        error => {
          this.feedbacks.push(error.response && error.response.data) ||
            error.message ||
            error.toString();
        }
      );
    }
  }
};
</script>