<template>
  <div id="Message">
    <div class="onDisplay" v-show="view === 'onDisplay'">
      <h3>{{ title}}</h3>
      <p>{{ content }}</p>
      <span>De: {{ userId }}</span>
      <aside>
        <button v-show="userId === currentUser" @click="view = 'onModify'">Modifier</button>
        <button v-show="userId === currentUser" @click.prevent="deleteMyMessage">Supprimer</button>
      </aside>
    </div>

    <div class="onModify" v-show="view === 'onModify'">
      <form class="myMessageForm" @submit.prevent="modifyMyMessage">
        <label for="myMessageTitle">Titre de votre message:</label>
        <input type="text" name="myMessageTitle" v-model="message.title" required />

        <label for="myMessageContent">Votre message:</label>
        <textarea
          class="myMessageForm__textarea"
          type="text"
          name="myMessageContent"
          v-model="message.content"
          required
        ></textarea>

        <button type="submit" @click="view = 'onDisplay'">Valider</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Message",
  props: {
    title: String,
    content: String,
    messageId: Number,
    userId: Number,
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
      }
    };
  },
  methods: {
    modifyMyMessage() {
      let payload = {
        id: this.messageId,
        message: this.message
      };
      this.$store.dispatch("message/modifyMessage", payload).then(
        data => {
          this.$store.dispatch("message/getAllMessage")
          this.$emit('modifyFeedback',data.message)
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
    },
    deleteMyMessage() {
      let payload = this.messageId;
      this.$store.dispatch("message/deleteMessage", payload).then(
        data => {
          this.$store.dispatch("message/getAllMessage")
          this.$emit('deleteFeedback',data.message)
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
    }
  },
};
</script>

<style lang="scss" scoped>
#Message {
  border: solid 1px black;
}
</style>