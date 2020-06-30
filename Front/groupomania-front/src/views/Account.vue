<template>
  <div id="Account">
    <h2>Votre compte</h2>
    <div>
      <h3>Votre nom d'utilisateur:</h3>
      <p>{{currentUser.username}}</p>
    </div>
    <div>
      <h3>Votre identifiant:</h3>
      <p>{{currentUser.userId}}</p>
    </div>
    <div>
      <h3>Votre adresse mail:</h3>
      <p>{{currentUser.email}}</p>
    </div>
    <div>
      <h3>Votre statut:</h3>
      <p>{{ currentUser.privilege }}</p>
      <ul>
        <li v-for="(role, index) in currentUser.roles" :key="index">{{ role }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Account",
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/");
    }
  }
};
</script>