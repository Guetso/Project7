<template>
  <div id="Wall">
    <h2>Vous êtes connecté {{ currentUser.username }} !</h2>

    <Form @addFeedback="setFeedback" :onSubmit="formMethod"></Form>

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
          :createdAt="post.created_at"
          :currentUser="currentUser.userId"
          :messageParent="post.message_parent"
          @deleteFeedback="setFeedback"
          @modifyFeedback="setFeedback"
        >
        </post>
      </section>
    </div>
    <button @click="logOut">LOGOUT</button>
  </div>
</template>

<script>
import Message from "../models/message";
import Form from "../components/Form";
import Post from "../components/Post";

export default {
  name: "Wall",
  components: {
    Form,
    Post
  },
  data() {
    return {
      showForm: true,
      message: new Message("", ""),
      feedbacks: null,
      formMethod :'postMyMessage'
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
    setFeedback(postFeedback) {
      this.feedbacks = postFeedback;
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
  }
};
</script>

<style lang="scss" scoped>
#Wall {
  margin-bottom: 2rem;
  .myWall {
    border: solid 1px green;
    margin: 2rem 0;
  }
}
</style>