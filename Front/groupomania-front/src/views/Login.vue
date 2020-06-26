<template>
  <div id="Login">
    <h2>{{ title }}</h2>
    <form class="loginForm" @submit.prevent="submitForm" v-if="show">
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
const axios = require("axios");

export default {
  name: "Login",
  data: function() {
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
    submitForm(e) {
      // lorsque le bouton de validation du formulaire est cliqué :
      e.preventDefault(); // On bloque la redirection
      axios({
        method: "post",
        url: "http://localhost:3000/api/auth/login",
        data: this.formData
      })
        .then(response => {
          console.log(response);
          this.$router.push("/wall");
        })
        .catch(error => {
          console.log(error.response);
          this.feedbacks.push({ message: error.response.data.message });
        });
    }
  }
};
</script>

<style lang="scss" scoped>
//scss directement
@import "../sass/main";
</style>