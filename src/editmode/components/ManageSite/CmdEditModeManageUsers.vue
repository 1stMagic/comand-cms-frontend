<template>
    <h3>Users</h3>
    <div>
        <router-link :to="{ name: 'CmdEditModeEditUsersPage' }">Open list of registered users ({{ numberOfUsers }})</router-link>
        <!--
        <ul class="icon-wrapper" aria-expanded="true">
            <li>
                <a href="#">
                    <span class="icon-cogs"></span>
                </a>
            </li>
        </ul>
        -->
    </div>
</template>

<script>
// import backend-client from cms
import {CmsBackendClient} from "../../../client/CmsClient"

export default {
    name: "CmdEditModeEditManageUsers",
    data: function() {
        return {
            numberOfUsers: 0
        }
    },
    created() {
        new CmsBackendClient().loadUsers()
            .then(responseData => this.numberOfUsers = responseData.length)
            .catch(error => {
                this.$store.commit("systemMessage", {status: "error", message: "The list of users could not be loaded!"})
                console.error(error)
            })
    }
}
</script>