<template>
  <div id="Signup">
    <h2>{{ title }}</h2>

    <form class="signupForm" @submit.prevent="registerMe" v-if="showForm">
      <label for="email">E-mail:</label>
      <input
        type="email"
        name="email"
        v-model="user.email"
        placeholder="Email"
        pattern=".+@groupomania.com"
        required
        maxlength="50"
      />
      <aside>
        <p>L'adresse mail doit être celle de votre mail interne</p>
      </aside>
      <label for="userName">Nom d'utilisateur:</label>
      <input
        type="text"
        name="userName"
        v-model="user.username"
        placeholder="User"
        required
        maxlength="50"
      />
      <aside>
        <p>Le choix du nom d'utilisateur est libre, il doit néanmoins répondre aux exigences de  <router-link :to="{ name: 'About' }">la charte d'utilisation du service</router-link> </p>
      </aside>
      <label for="password">Mot de passe:</label>
      <input
        type="password"
        name="password"
        v-model="user.password"
        placeholder="Password"
        pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_])([-+!*$@%_\w]{8,15})$"
      />
      <aside class="passwordConditions" v-if="showForm">
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
      <button type="submit">Valider</button>
    </form>

    <div class="messageService" v-if="feedbacks.length">
      <ul>
        <p v-for="(feedback, index) in feedbacks" :key="index">
          {{ feedback.message }}
          <router-link v-if="successful" :to="{ name: 'Login' }">Se connecter</router-link>
          <router-link v-if="!successful" :to="{ name: 'Signup' }">Recommencer</router-link>
        </p>
      </ul>
    </div>
  </div>
</template>

<script>
import User from "../models/user";

export default {
  name: "Signup",
  data() {
    return {
      title: "Créer un compte",
      user: new User("", "", ""),
      feedbacks: [], // Nous permets d'afficher les informations suite à la soumission du formulaire, contient des objets au format {message : 'contenu du message'},il n'apparait que si non vide
      showForm: true, // Le formulaire doit il être affiché
      successful: false
    };
  },
  methods: {
    registerMe() {
      this.$store.dispatch("auth/register", this.user).then(
        data => {
          console.log(data.message);
          this.showForm = false;
          this.successful = true;
          this.feedbacks.push(data.message);
          window.alert(data.message);
        },
        error => {
          console.log(error.response);
          this.showForm = false;
          if (error.response.data.indexOf("users.email_UNIQUE") !== -1) {
            this.feedbacks.push({
              message: "Cet email est déjà utilisé !"
            });
            this.feedbacks.route = "signup";
          }
          if (error.response.data.indexOf("users.username_UNIQUE") !== -1) {
            this.feedbacks.push({
              message: "Ce nom d'utilisateur est déjà utilisé !"
            });
          }
        }
      );
    }
  }
};
</script>