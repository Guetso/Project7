<template >
  <div id="Message">
    <div class="post" v-show="view === 'onDisplay' || view === 'onReply'">
      <div class="post__body">
        <h3>{{ title}}</h3>
        <p>{{ content }}</p>
      </div>
      <div class="post__infos">
        <span>De: {{ username }}</span>
        <span>Le: {{ createdAt }}</span>
        <span>Likes: {{ likes }}</span>
      </div>
      <aside>
        <button @click.prevent="addLike">J'aime !</button>
        <button @click.prevent="removeLike">Je n'aime plus !</button>
        <button
          v-show="userId === currentUser || this.$store.state.auth.user.privilege === 'admin'"
          @click="modifyMessage"
          :data-id="messageId"
        >Modifier</button>
        <button
          v-show="userId === currentUser || this.$store.state.auth.user.privilege === 'admin'"
          @click.prevent="deleteMyMessage"
        >Supprimer</button>
        <button @click.prevent="replyMessage" :data-id="messageId" v-show="!isReply()">Commenter</button>
      </aside>

      <Form
        v-if="view ==='onReply'"
        :title="title"
        :content="content"
        :messageId="messageId"
        :userId="userId"
        :onSubmit="formMethod.reply"
        :messageParent="messageParent"
        :currentId="currentId"
        @changeView="changeView"
        @modifyFeedback="passFeedback"
      />

      <div id="reply">
        <slot></slot>
      </div>
    </div>

    <Form
      v-if="view ==='onModify'"
      :title="title"
      :content="content"
      :messageId="messageId"
      :userId="userId"
      :onSubmit="formMethod.modify"
      :messageParent="messageParent"
      :currentId="currentId"
      @changeView="changeView"
      @modifyFeedback="passFeedback"
    />
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
    likes: Number,
    username: String,
    messageParent: Number,
    onModifyTitle: String,
    onModifyContent: String
  },
  data() {
    return {
      view: "onDisplay",
      currentId: null,
      message: {
        title: this.title,
        content: this.content
      },
      formMethod: { modify: "modifyMyMessage", reply: "replyMessage" },
    };
  },
  methods: {
    addLike() {
      let payload = this.messageId;
      this.$store.dispatch("message/addLike", payload).then(
        data => {
          this.$store.dispatch("message/getAllMessage");
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
    },
    removeLike() {
      let payload = this.messageId;
      this.$store.dispatch("message/removeLike", payload).then(
        data => {
          this.$store.dispatch("message/getAllMessage");
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
    },
    isReply() {
      if (this.messageParent === null || this.messageParent === undefined) {
        return false;
      } else {
        return true;
      }
    },
    passFeedback(formFeedback) {
      this.$emit("modifyFeedback", formFeedback);
    },
    changeView(View) {
      this.view = View;
    },
    replyMessage(event) {
      this.view = "onReply";
      this.currentId = parseInt(event.target.dataset.id, 10);
    },
    modifyMessage(event) {
      this.view = "onModify";
      this.currentId = parseInt(event.target.dataset.id, 10);
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