<template>
  <div id="Form">
    <form class="myMessageForm" @submit.prevent="onSubmitMethod">
      <label
        for="myMessageTitle"
        v-show="onSubmit != 'replyMessage' && isReply === false && messageParent === undefined"
      >Titre de votre message:</label>
      <input
        type="text"
        name="myMessageTitle"
        v-show="onSubmit != 'replyMessage' && isReply === false"
        :required="onSubmit != 'replyMessage' && isReply === false"
        v-model="message.title"
      />

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
    messageId: Number,
    messageParent: Number,
    currentId: Number
  },
  data() {
    return {
      message: "",
      fromMessage: this.messageId
    };
  },
  computed: {
    isReply() {
      if (this.messageParent === null || this.messageParent === undefined) {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    typeOfMessage() {
      if (this.onSubmit === "modifyMyMessage") {
        this.message = { title: this.title, content: this.content };
      }
      if (this.onSubmit === "postMyMessage") {
        this.message = new Message("", "", "");
      }
      if (this.onSubmit === "replyMessage") {
        this.message = new Message("", "", this.fromMessage);
      }
    },
    onSubmitMethod(event) {
      if (this.onSubmit === "modifyMyMessage") {
        this.modifyMyMessage(event);
      }
      if (this.onSubmit === "postMyMessage") {
        this.postMyMessage(event);
      }
      if (this.onSubmit === "replyMessage") {
        this.replyMessage(event);
      }
    },
    modifyMyMessage() {
      let payload = {
        id: this.currentId,
        message: this.message
      };
      this.$store.dispatch("message/modifyMessage", payload).then(
        data => {
          this.$store.dispatch("message/getAllMessage");
          this.$emit("modifyFeedback", data.message);
          this.$emit("changeView", "onDisplay");
          console.log(data);
          console.log("modify");
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
          console.log("post");
        },
        error => {
          console.log(error);
        }
      );
    },
    replyMessage(event) {
      let payload = {
        id: this.currentId,
        message: this.message
      };
      this.$store.dispatch("message/replyMessage", payload).then(
        data => {
          this.$store.dispatch("message/getAllMessage");
          this.$emit("changeView", "onDisplay");
          this.$emit("addFeedback", data.message);
          this.message = new Message("", "", this.fromMessage);
          event.target.reset();
          console.log(data);
          console.log("reply");
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