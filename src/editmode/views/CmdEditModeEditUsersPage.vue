<template>
    <CmdWidthLimitationWrapper>
        <CmdMainHeadline main-headline="Edit users"/>
        <table>
            <thead>
            <tr>
                <th>Full name</th>
                <th>Email</th>
                <th>Profile activity</th>
                <th>Assigned groups</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(user, index) in allUsers" :key="index">
                <td>
                    <router-link :to="{ name: 'CmdEditModeEditUserDetails',
                    params: {
                        userId: user.email
                    }}" title="View user details">LINK {{ user.lastName }}, {{ user.firstName }}
                    </router-link>
                </td>
                <td><a :href="'mailto:' + user.email" :title="'Send email to ' + user.firstName + ' ' + user.lastName">{{ user.email }}</a></td>
                <td>
                    <CmdSwitchButton id="toggle-profile-activity" type="checkbox" :inputValue="user.active" onLabel="Active" offActive="Inactive" :colored="true" />
                    {{ user.active }}
                </td>
                <td>{{ user.groups.join(', ') }}</td>
            </tr>
            </tbody>
        </table>
    </CmdWidthLimitationWrapper>
</template>

<script>
// import components from comand-component-library
import CmdMainHeadline from "comand-component-library/src/components/CmdMainHeadline"
import CmdSwitchButton from "comand-component-library/src/components/CmdSwitchButton"
import CmdWidthLimitationWrapper from "comand-component-library/src/components/CmdWidthLimitationWrapper"

// import backend-client from cms
import {CmsBackendClient} from "../../client/CmsClient"

export default {
    name: "CmdEditModeEditUsersPage",
    data() {
        return {
            allUsers: []
        }
    },
    components: {
        CmdMainHeadline,
        CmdSwitchButton,
        CmdWidthLimitationWrapper
    },
    created() {
        // load information from all users
        new CmsBackendClient().loadUsers()
            .then(responseData => this.allUsers = responseData)
            .catch(error => {
                this.$store.commit("systemMessage", {status: "error", message: "The list of users could not be loaded!"})
                console.error(error)
            })
    }
}
</script>