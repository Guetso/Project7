<template>
  <div id="Wall">
    <h2>Vous êtes connecté !</h2>
    <form class="myMessageForm" @submit.prevent="postMyMessage">
      <label for="myMessageTitle">Titre de votre message:</label>
      <input type="text" name="myMessageTitle" required v-model="formData.message.title" />

      <label for="myMessageContent">Votre message:</label>
      <input type="text" name="myMessageContent" required v-model="formData.message.content" />

      <button type="submit">Valider</button>
    </form>

    <div class="myWall">
      <ul></ul>
    </div>

    <button @click="logout">LOGOUT</button>
  </div>
</template>

<script>
const axios = require("axios");
import { AUTH_LOGOUT } from "../store/actions/auth";

export default {
  name: "Wall",
  data() {
    return {
      title: "Login",
      formData: {
        message: { title: null, content: null, idUSERS: this.$store.getters.userId }
      }
    };
  },
  methods: {
    postMyMessage() {
      axios({
        method: "post",
        url: "http://localhost:3000/api/messages",
        data: this.formData
      })
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error.response);
        });
    },
    logout() {
      this.$store.dispatch(AUTH_LOGOUT).then(() => {
        this.$router.push("/");
      });
    }
  }
};
</script>