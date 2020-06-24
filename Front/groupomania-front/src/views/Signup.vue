<template>
  <div id="Signup">
    <h2>{{ title }}</h2>

    <form class="signupForm" @submit="submitForm" v-if="show">
      <label for="email">E-mail:</label>
      <input type="text" name="email" v-model="formData.user.email" placeholder="Email" />

      <label for="userName">Nom d'utilisateur:</label>
      <input type="text" name="userName" v-model="formData.user.userName" placeholder="User" />

      <label for="password">Mot de passe:</label>
      <input type="text" name="password" v-model="formData.user.password" placeholder="Password" />

      <button type="submit">Valider</button>
    </form>

    <aside class="messageService" v-if="feedbacks.length">
      <ul>
        <li v-for="feedback in feedbacks" :key="feedback.message">{{ feedback.message }}</li>
      </ul>
    </aside>
  </div>
</template>

<script>
const post = function(url, toSend) {
  return new Promise(function(resolve, reject) {
    const httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
      if (httpRequest.readyState === 4) {
        if (httpRequest.status === 201) {
          const response = JSON.parse(this.responseText);
          console.log(response);
          resolve(response);
        } else {
          reject(httpRequest);
        }
      }
    };
    httpRequest.open("POST", url, true);
    httpRequest.setRequestHeader("Content-Type", "application/json");
    httpRequest.send(JSON.stringify(toSend));
  });
};

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
    submitForm: function(e) { // lorsque le bouton de validation du formulaire est cliqué :
      e.preventDefault(); // On bloque la redirection
      post("http://localhost:3000/api/auth/signup", this.formData) // On appelle la fonction POST (requête XHR), Cette fonction renvoie une promesse 
        .then(response => { // En cas de réussite de la requête (resolve), la fonction nous renvoie la réponse du serveur
          this.show = false; // On cache le formulaire
          this.feedbacks.push({ // On pousse le message de la réponse dans le tableau feedbacks
            message: response.message // le feedback s'affiche car il n'est plus vide
          });
        })
        .catch(error => { // En cas d'échec de la requête
          this.show = false; //  On cache le formulaire
          console.error(error.response); // La console renvoie la réponse de l'erreur
          if (error.response.indexOf('users.email_UNIQUE')!== -1) { // Dans le cas d'un email déjà utilisé
            this.feedbacks.push({ message: 'Cet email est déjà utilisé !' });
          }
          if (error.response.indexOf('users.username_UNIQUE')!== -1) { // Dans le cas d'un username déjà utiisé
            this.feedbacks.push({message: 'Ce nom d\'utilisateur est déjà utilisé !'})
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../sass/main";
</style>