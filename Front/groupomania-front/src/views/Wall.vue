<template>
  <div id="Wall">
    <h2>Vous êtes connecté {{ currentUser.username }} !</h2>

    <div class="messageService" v-if="feedbacks">
      <span>{{ feedbacks }}</span>
    </div>

    <v-card>
      <Form @addFeedback="setFeedback" :onSubmit="formMethod"></Form>
    </v-card>

    <div class="myWall">
      <section>
        <post
          v-for="(paginedPost, index) in paginedPosts"
          :key="index"
          :title="paginedPost.title"
          :content="paginedPost.content"
          :messageId="paginedPost.idMESSAGES"
          :userId="paginedPost.idUSERS"
          :createdAt="paginedPost.created_at_formated"
          :likes=" paginedPost.likes"
          :myLikes=" paginedPost.myLikes"
          :currentUser="currentUser.userId"
          :messageParent="paginedPost.message_parent"
          :username="paginedPost.username"
          @deleteFeedback="setFeedback"
          @modifyFeedback="setFeedback"
        >
          <div v-for="(reply, index) in replies" :key="index">
            <post
              v-if="reply.message_parent === paginedPost.idMESSAGES"
              :title="reply.title"
              :content="reply.content"
              :messageId="reply.idMESSAGES"
              :userId="reply.idUSERS"
              :createdAt="reply.created_at_formated"
              :likes="reply.likes"
              :myLikes="reply.myLikes"
              :currentUser="currentUser.userId"
              :messageParent="reply.message_parent"
              :username="reply.username"
              @deleteFeedback="setFeedback"
              @modifyFeedback="setFeedback"
            ></post>
          </div>
        </post>
        <button @click="nextPosts" v-if="hasNextPosts">Next</button>
      </section>
    </div>
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
      formMethod: "postMyMessage",
      wallSize: 10
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
    paginedPosts() {
      return this.posts.slice(0, this.wallSize);
    },
    hasNextPosts() {
      return this.wallSize < this.posts.length;
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
      replies.reverse();
      return replies;
    }
  },
  methods: {
    setFeedback(postFeedback) {
      this.feedbacks = postFeedback;
    },
    nextPosts() {
      setTimeout(() => {
        this.wallSize += 5;
      }, 1000);
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