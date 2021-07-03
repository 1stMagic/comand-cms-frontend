<template>
  <div>ERROR: {{ errorMessage }}</div>
</template>

<script>
    export default {
        name: "Error",
        props: {
            error: String
        },
        computed: {
            errorMessage() {
                if (process.env.NODE_ENV === "production") {
                    return "Technical Error!"
                }
                return this.error
            }
        }
    }
</script>

<style scoped>

</style>