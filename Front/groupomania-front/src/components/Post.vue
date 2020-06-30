<template>
    <div id="Message">
        <h3>{{ title}}</h3>
        <p>{{ content }}</p>
        <aside>
            <span>De: {{ author }}</span>
        </aside>
    </div>
</template>

<script>
export default {
    name: 'Message',
    props: {
        title: String,
        content: String,
        author: Number
    }
}
</script>

<style lang="scss" scoped>

#Message {
    border: solid 1px black ;
}

</style>