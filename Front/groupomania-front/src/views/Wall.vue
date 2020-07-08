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
          :createdAt="post.created_at_formated"
          :likes=" post.likes"
          :currentUser="currentUser.userId"
          :messageParent="post.message_parent"
          :username="post.username"
          @deleteFeedback="setFeedback"
          @modifyFeedback="setFeedback"
        >
          <div v-for="(reply, index) in replies" :key="index">
            <post
              v-if="reply.message_parent === post.idMESSAGES"
              :title="reply.title"
              :content="reply.content"
              :messageId="reply.idMESSAGES"
              :userId="reply.idUSERS"
              :createdAt="reply.created_at_formated"
              :likes="reply.likes"
              :currentUser="currentUser.userId"
              :messageParent="reply.message_parent"
              :username="reply.username"
              @deleteFeedback="setFeedback"
              @modifyFeedback="setFeedback"
            ></post>
          </div>
        </post>
      </section>
    </div>
    <button @click="logOut">LOGOUT</button>
  </div>
</template>

<script>
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
      feedbacks: null,
      formMethod: "postMyMessage"
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    posts() {
      const allMessages = this.$store.state.message.messages;
      const posts = [];
      for (let i = 0; i < allMessages.length; i++) {
        const post = allMessages[i];
        if (post.message_parent == null) {
          posts.push(post);
        }
      }
      return posts;
    },
    replies() {
      const allMessages = this.$store.state.message.messages;
      const replies = [];
      for (let i = 0; i < allMessages.length; i++) {
        const post = allMessages[i];
        if (post.message_parent != null) {
          replies.push(post);
        }
      }
      return replies;
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
    console.log(this.$store.state.auth.user.privilege)
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