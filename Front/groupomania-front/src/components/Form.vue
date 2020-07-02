<template>
  <div id="Form">
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
  </div>
</template>

<script>
import Message from "../models/message";

export default {
  name: "Form",
  data() {
    return {
      message: new Message("", "")
    };
  },
  methods: {
    postMyMessage(event) {
      this.$store.dispatch("message/createMessage", this.message).then(
        data => {
          console.log(data);
          this.$store.dispatch("message/getAllMessage");
          this.$emit("addFeedback", data.message);
          this.message= new Message('','')
          event.target.reset();
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