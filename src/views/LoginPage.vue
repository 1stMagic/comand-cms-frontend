<template>
    <CmdWidthLimitationWrapper>
        <h1>Login</h1>
        <form method="post" @submit="submitLogin" action="/login" novalidate="novalidate">
            <CmdLoginForm v-model="loginData"/>
        </form>
    </CmdWidthLimitationWrapper>
</template>

<script>
// import components from comand-component-library
import CmdLoginForm from "comand-component-library/src/components/CmdLoginForm"
import CmdWidthLimitationWrapper from "comand-component-library/src/components/CmdWidthLimitationWrapper"

// import axios
import axios from "axios"

export default {
    data() {
        return {
            loginData: {}
        }
    },
    components: {
        CmdLoginForm,
        CmdWidthLimitationWrapper
    },
    methods: {
        submitLogin(event) {
            event.preventDefault()
            console.log(event)
            axios.post(event.target.action, this.loginData).then(
                response => response.data
            ).then(() => console.log("Login correct"))
            .catch(error => {
                this.$store.commit("systemMessage", {status: "error", message: "Login failed!"})
                console.error(error)
            })
            return false
        }
    }
}
</script>