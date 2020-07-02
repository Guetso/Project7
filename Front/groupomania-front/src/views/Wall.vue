<template>
  <div id="Wall">
    <h2>Vous êtes connecté {{ currentUser.username }} !</h2>

    <form class="myMessageForm" @submit.prevent="postMyMessage">
      <label for="myMessageTitle">Titre de votre message:</label>
      <input type="text" name="myMessageTitle" required v-model="message.title" />

      <label for="myMessageContent">Votre message:</label>
      <textarea
        class="myMessageForm__textarea"
        type="text"
        name="myMessageContent"
        required
        v-model="message.content"
      ></textarea>

      <button type="submit">Valider</button>
    </form>

    <div class="messageService" v-if="feedbacks">
      <span>{{ feedbacks }}</span>
    </div>

    <div class="myWall">
      <section>
        <post
          v-for="(post, index) in posts"
          :key="index"
          :title="post.title"
          :content="post.content"
          :messageId="post.idMESSAGES"
          :userId="post.idUSERS"
          :currentUser="currentUser.userId"
          @deleteFeedback="setFeedback"
          @modifyFeedback="setFeedback"
        ></post>
      </section>
    </div>
    <button @click="logOut">LOGOUT</button>
  </div>
</template>

<script>
import Message from "../models/message";
import Post from "../components/Post";

export default {
  name: "Wall",
  components: {
    Post
  },
  data() {
    return {
      showForm: true,
      message: new Message("", ""),
      feedbacks: null
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    posts() {
      return this.$store.state.message.messages;
    }
  },
  methods: {
    postMyMessage() {
      this.$store.dispatch("message/createMessage", this.message).then(
        data => {
          console.log(data);
          this.$store.dispatch("message/getAllMessage");
          this.showForm = false;
          this.feedbacks = data.message;
          this.message.title = null;
          this.message.content = null;
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
    setFeedback(postFeedback) {
      this.feedbacks = postFeedback
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
    this.$store.dispatch("message/getAllMessage");
  },
  updated() {
    console.log("up");
  }
};
</script>

<style lang="scss" scoped>
#Wall {
  margin-bottom: 2rem;
  .myMessageForm {
    border: solid 1px red;
    margin: 2rem 1rem;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    &__textarea {
      width: 100%;
      height: 5rem;
    }
  }
  .myWall {
    border: solid 1px green;
    margin: 2rem 0;
  }
}
</style>