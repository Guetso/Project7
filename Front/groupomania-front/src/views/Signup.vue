<template>
  <div id="Signup">
    <h2>{{ title }}</h2>

    <form class="signupForm" @submit="submitForm" v-if="!show">
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
        <li v-for="feedback in feedbacks" :key="feedback.message"> {{ feedback.message }}</li>
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
      feedbacks: [],
      show: false
    };
  },
  methods: {
    submitForm: function(e) {
      e.preventDefault();
      post("http://localhost:3000/api/auth/signup", this.formData)
        .then(
          (this.show = true),
          this.feedbacks.push({message:"Bienvenue ! Vous pouvez vous connecter"})
        )
        .catch(error => console.log(error));
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../sass/main";
</style>