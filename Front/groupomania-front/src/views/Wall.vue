<template>
    <div id="wall">
        <h2> Vous êtes connecté !</h2>
        <p> {{ user }} </p>
    </div>
</template>

<script>
export default {
    computed:{
        user () {
            return this.$store.getters.getUser(1)
        }
    }
}
</script>