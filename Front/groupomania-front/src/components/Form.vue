<template>
  <div id="Form">
    <form class="myMessageForm" @submit.prevent="onSubmitMethod">
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
  </div>
</template>

<script>
import Message from "../models/message";

export default {
  name: "Form",
  props: {
    onSubmit: String,
    title: String,
    content: String,
    userId: Number,
    messageId: Number
  },
  data() {
    return {
      message: ""
    };
  },
  methods: {
    typeOfMessage() {
      if (this.onSubmit === "modifyMyMessage") {
        this.message = { title: this.title, content: this.content };
      }
      if (this.onSubmit === "postMyMessage") {
        this.message = new Message("", "");
      }
    },
    onSubmitMethod(event) {
      if (this.onSubmit === "modifyMyMessage") {
        this.modifyMyMessage();
      }
      if (this.onSubmit === "postMyMessage") {
        this.postMyMessage(event);
      }
    },
    modifyMyMessage() {
      let payload = {
        id: this.messageId,
        message: this.message
      };
      this.$store.dispatch("message/modifyMessage", payload).then(
        data => {
          this.$store.dispatch("message/getAllMessage");
          this.$emit("modifyFeedback", data.message);
          this.$emit("changeView", "onDisplay");
          this.message = new Message("", "");
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
    },
    postMyMessage(event) {
      this.$store.dispatch("message/createMessage", this.message).then(
        data => {
          this.$store.dispatch("message/getAllMessage");
          this.$emit("addFeedback", data.message);
          this.message = new Message("", "");
          event.target.reset();
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
    }
  },
  mounted() {
    this.typeOfMessage();
  }
};
</script>

<style lang="scss" scoped>
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
</style>