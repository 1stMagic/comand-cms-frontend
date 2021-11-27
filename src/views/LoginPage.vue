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
import { CmsFrontendClient } from "../client/CmsClient"
import {navigateTo} from "../utilities/router"

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
            new CmsFrontendClient().login(this.loginData)
                .then(token => {
                    // write loginToken into store
                    this.$store.commit("login", {token: token, firstName: 'Raphael', lastName: 'Biock'})

                    // call action-method in store to load user-groups
                    this.$store.dispatch("loadUserGroups")

                    // load login-page next
                    navigateTo("Index")

                    // show system-message
                    this.$store.commit("systemMessage", {status: "success", message: "Login successful!"})
                })
                .catch(error => {
                    this.$store.commit("systemMessage", {status: "error", message: "Login failed!"})
                    console.error(error)
                })
            return false
        }
    }
}
</script>