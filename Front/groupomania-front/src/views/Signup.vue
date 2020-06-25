<template>
  <div id="Signup">
    <h2>{{ title }}</h2>

    <form class="signupForm" @submit="submitForm" v-if="show">
      <label for="email">E-mail:</label>
      <input
        type="email"
        name="email"
        v-model="formData.user.email"
        placeholder="Email"
        required
        maxlength="50"
      />

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
        pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_])([-+!*$@%_\w]{8,15})$"
      />

      <button type="submit">Valider</button>
    </form>

    <div class="messageService" v-if="feedbacks.length">
      <ul>
        <p v-for="feedback in feedbacks" :key="feedback.message">
          {{ feedback.message }}
          <router-link :to="{ name: 'Login' }">Login</router-link>
        </p>
      </ul>
    </div>

    <aside class="passwordConditions" v-if="show">
      Pour des raisons de sécurité votre mot de passe doit contenir au moins:
      <br />
      <ul>
        <li>entre 8 à 15 caractères</li>
        <li>une lettre minuscule</li>
        <li>une lettre majuscule</li>
        <li>un chiffre</li>
        <li>un de ces caractères spéciaux: $ @ % * + - _ !</li>
      </ul>
    </aside>
  </div>
</template>

<script>

const xhr = require("../js/xhr");

export default {
  name: "Signup",
  data: function() {
    return {
      title: "Signup",
      formData: {
        user: { email: null, userName: null, password: null, isAdmin: 0 }
      },
      feedbacks: [], // Nous permets d'afficher les informations suite à la soumission du formulaire, contient des objets au format {message : 'contenu du message'},il n'apparait que si non vide
      show: true // Le formulaire doit il être affiché
    };
  },
  methods: {
    submitForm: function(e) {
      // lorsque le bouton de validation du formulaire est cliqué :
      e.preventDefault(); // On bloque la redirection
      xhr.post('api/auth/signup', 201, this.formData) // On appelle la fonction POST (requête XHR), Cette fonction renvoie une promesse
        .then(response => {
          // En cas de réussite de la requête (resolve), la fonction nous renvoie la réponse du serveur
          this.show = false; // On cache le formulaire
          this.feedbacks.push({
            // On pousse le message de la réponse dans le tableau feedbacks
            message: response.message // le feedback s'affiche car il n'est plus vide
          });
        })
        .catch(error => {
          // En cas d'échec de la requête
          this.show = false; //  On cache le formulaire
          console.error(error.response); // La console renvoie la réponse de l'erreur
          if (error.response.indexOf("users.email_UNIQUE") !== -1) {
            // Dans le cas d'un email déjà utilisé
            this.feedbacks.push({ message: "Cet email est déjà utilisé !" });
          }
          if (error.response.indexOf("users.username_UNIQUE") !== -1) {
            // Dans le cas d'un username déjà utiisé
            this.feedbacks.push({
              message: "Ce nom d'utilisateur est déjà utilisé !"
            });
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../sass/main";
</style>