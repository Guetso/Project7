<template>
  <div id="Wall">
    <h2>Vous êtes connecté {{ currentUser.username }} !</h2>
    <form class="myMessageForm" @submit.prevent="postMyMessage" v-if="show">
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

    <div class="myWall">
      <section>
        <post
          v-for="(post, index) in posts"
          :key="index"
          :title="post.title"
          :content="post.content"
          :author="post.idUSERS"
        ></post>
      </section>
    </div>

    <div class="messageService" v-if="feedbacks.length">
      <ul>
        <li v-for="(feedback, index) in feedbacks" :key="index">{{ feedback.message }}</li>
      </ul>
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
      show: true,
      message: new Message("", ""),
      feedbacks: [],
      posts: []
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    postMyMessage() {
      this.$store.dispatch("message/createMessage", this.message).then(
        data => {
          console.log(this.message);
          this.showForm = false;
          this.successful = true;
          this.feedbacks.push(data.message);
          this.message.title=null
          this.message.content=null
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
    this.$store.dispatch("message/getAllMessage").then(() => {
      const returnedMessages = this.$store.state.message.messages;
      console.log(returnedMessages);
      for (let i = 0; i < returnedMessages.length; i++) {
        this.posts.push(returnedMessages[i]);
      }
    });
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