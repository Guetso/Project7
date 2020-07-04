<template>
  <div id="Message">
    <div class="onDisplay" v-show="view === 'onDisplay'">
      <h3>{{ title}}</h3>
      <p>{{ content }}</p>
      <span>De: {{ userId }}</span>
      <span>Le: {{ createdAt }}</span>
      <aside>
        <button v-show="userId === currentUser" @click="view = 'onModify'">Modifier</button>
        <button v-show="userId === currentUser" @click.prevent="deleteMyMessage">Supprimer</button>
        <button @click.prevent="replyMessage">Commenter</button>
      </aside>
    </div>

    <Form
      v-show="view ==='onModify'"
      :title="title"
      :content="content"
      :messageId="messageId"
      :userId="userId"
      :onSubmit="formMethod"
      @changeView="changeView"
      @modifyFeedback="passFeedback"
    ></Form>
  </div>
</template>

<script>
import Form from "./Form";
export default {
  name: "Message",
  components: { Form },
  props: {
    title: String,
    content: String,
    messageId: Number,
    userId: Number,
    createdAt: String,
    currentUser: Number,
    onModifyTitle: String,
    onModifyContent: String
  },
  data() {
    return {
      view: "onDisplay",
      message: {
        title: this.title,
        content: this.content
      },
      formMethod: "modifyMyMessage",
    };
  },
  methods: {
    passFeedback(formFeedback) {
      this.$emit("modifyFeedback", formFeedback)
    },
    changeView(View) {
      this.view = View;
    },
    replyMessage() {
      console.log("reponse");
    },
    deleteMyMessage() {
      let payload = this.messageId;
      this.$store.dispatch("message/deleteMessage", payload).then(
        data => {
          this.$store.dispatch("message/getAllMessage");
          this.$emit("deleteFeedback", data.message);
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
#Message {
  border: solid 1px black;
}
</style>