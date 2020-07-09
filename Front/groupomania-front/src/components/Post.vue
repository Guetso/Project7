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
        <button>LIKER</button>
        <button v-show="userId === currentUser || this.$store.state.auth.user.privilege === 'admin'" @click="modifyMessage" :data-id="messageId" >Modifier</button>
        <button v-show="userId === currentUser || this.$store.state.auth.user.privilege === 'admin'" @click.prevent="deleteMyMessage">Supprimer</button>
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
    likes: Number,
    currentUser: Number,
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
      formMethod: { modify: "modifyMyMessage", reply: "replyMessage" }
    };
  },
  methods: {
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

<style lang="scss" scoped>
#Message {
  .post {
    border: 3px blue solid;
    margin: 1rem;
    &__body {
      margin: 2rem;
    }
    &__infos {
      display: flex;
      justify-content: space-around;
    }
  }
  #reply {
    border: 2px rgb(0, 132, 255) solid;
    #Message {
      .post {
        border: 1px rgb(0, 225, 255) solid;
      }
    }
  }
}
</style>