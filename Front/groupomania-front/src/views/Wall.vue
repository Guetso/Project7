<template>
  <div id="Wall">
    <h2>Vous êtes connecté {{ currentUser.username }} !</h2>
    <form class="myMessageForm" @submit.prevent="postMyMessage" v-if="show">
      <label for="myMessageTitle">Titre de votre message:</label>
      <input type="text" name="myMessageTitle" required v-model="message.title" />

      <label for="myMessageContent">Votre message:</label>
      <textarea type="text" name="myMessageContent" required v-model="message.content"></textarea>

      <button type="submit">Valider</button>
    </form>

    <div class="myWall">
      <ul></ul>
    </div>

    <div class="messageService" v-if="feedbacks.length">
      <ul>
        <p v-for="(feedback, index) in feedbacks" :key="index">{{ feedback.message }}</p>
      </ul>
    </div>

    <button @click="logOut">LOGOUT</button>
  </div>
</template>

<script>
import Message from "../models/message";

export default {
  name: "Wall",
  data() {
    return {
      show: true,
      message: new Message ("",""),
      feedbacks: []
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    postMyMessage() {
      this.$store.dispatch("auth/createMessage", this.message).then(
        data => {
          console.log(this.message);
          this.showForm = false;
          this.successful = true;
          this.feedbacks.push(data.message);
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
    },
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/");
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  }
};
</script>