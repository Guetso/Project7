<template>
  <div id="Login">
    <h2>{{ title }}</h2>
    <form class="loginForm" @submit="submitForm" v-if="show">
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
const xhr = require("../js/xhr");

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
    submitForm: function(e) {
      // lorsque le bouton de validation du formulaire est cliqué :
      e.preventDefault(); // On bloque la redirection
      xhr
        .post("api/auth/login", 200, this.formData) // On appelle la fonction POST (requête XHR), Cette fonction renvoie une promesse
        .then(response => {
          // En cas de réussite de la requête (resolve), la fonction nous renvoie la réponse du serveur
          this.show = false; // On cache le formulaire
          this.feedbacks.push({
            // On pousse le message de la réponse du serveur dans le tableau feedbacks
            message: response.message // le feedback s'affiche car il n'est plus vide
          });
        })
        .catch(error => {
          // En cas d'échec de la requête
          const serverMessage = JSON.parse(error.responseText);
          this.show = false; //  On cache le formulaire
          console.error(serverMessage.message); // La console renvoie la réponse de l'erreur
          this.feedbacks.push({
            message: serverMessage.message
          });
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../sass/main";
</style>