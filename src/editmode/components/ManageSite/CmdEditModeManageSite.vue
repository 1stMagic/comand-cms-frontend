<template>
    <aside class="cmd-edit-mode-manage-site" :class="{'closed' : !openManageSiteSidebar}">
        <div>
            <h2>Manage site</h2>
            <CmdAccordion :accordionData="6" :gapBetween="false" :useTransition="false" ref="accordionsManageSiteSidebar" @click="openManageSiteSidebar = true">
                <!-- begin navigation -->
                <template v-slot:accordionHeadline0>
                    <h3>
                        <span class="icon-bars" title="Navigation"></span>
                        <span>Navigation</span>
                    </h3>
                </template>
                <template v-slot:accordionContent0>
                    <CmdEditModeManageNavigation/>
                </template>
                <!-- end navigation -->

                <!-- begin user groups -->
                <template v-slot:accordionHeadline1>
                    <h3>
                        <span class="icon-user-group" title="User groups"></span>
                        <span>User groups</span>
                    </h3>
                </template>
                <template v-slot:accordionContent1>
                    <CmdEditModeManageUserGroups/>
                </template>
                <!-- end user groups -->

                <!-- begin users -->
                <template v-slot:accordionHeadline2>
                    <h3>
                        <span class="icon-users" title="Users"></span>
                        <span>Users</span>
                    </h3>
                </template>
                <template v-slot:accordionContent2>
                    <CmdEditModeManageUsers />
                </template>
                <!-- end users -->

                <!-- begin backups -->
                <template v-slot:accordionHeadline3>
                    <h3>
                        <span class="icon-download" title="Backups"></span>
                        <span>Backups</span>
                    </h3>
                </template>
                <template v-slot:accordionContent3>
                    <CmdEditModeManageBackups/>
                </template>
                <!-- end backups -->

                <!-- begin localization -->
                <template v-slot:accordionHeadline4>
                    <h3>
                        <span class="icon-globe" title="Localization"></span>
                        <span>Localization</span>
                    </h3>
                </template>
                <template v-slot:accordionContent4>
                    <CmdEditModeManageLocalization/>
                </template>
                <!-- end localization -->

                <!-- begin google tools -->
                <template v-slot:accordionHeadline5>
                    <h3>
                        <span class="icon-google-analytics" title="Google&trade; Tools"></span>
                        <span>Google&trade; Tools</span>
                    </h3>
                </template>
                <template v-slot:accordionContent5>
                    <CmdEditModeManageGoogleTools/>
                </template>
                <!-- end localization -->
            </CmdAccordion>
            <h2>Miscellaneous</h2>
            <ul>
                <li>
                    <a href="#">
                        <span class="icon-help" title="CoManD-Help"></span>
                        <span>CoManD-Help</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span class="icon-euro" title="Donate"></span>
                        <span>Donate</span>
                    </a>
                </li>
                <li>
                    <router-link :to=" { name: 'CmdEditModeEditUserDetails', params: { userId:'kai.schofield@gmx.de'}}">
                        <span class="icon-user-profile" title="My profile"></span>
                        <span>My profile</span>
                    </router-link>
                </li>
                <li>
                    <a href="#" @click.prevent="logout">
                        <span class="icon-logout" :title="'Logout ' + $store.state.login.firstName + ' ' + $store.state.login.lastName"></span>
                        <span>Logout {{ $store.state.login.firstName + ' ' + $store.state.login.lastName }}</span>
                    </a>
                </li>
            </ul>
            <small>
                &copy; CoManD-CMS v0.01
            </small>
        </div>
        <a href="#" @click.prevent="toggleSideBar('manageSite')" title="Toggle 'Manage Site'-sidebar">
            <span v-if="openManageSiteSidebar" class="icon-single-arrow-left"></span>
            <span v-else class="icon-single-arrow-right"></span>
        </a>
    </aside>
</template>

<script>
// import EditMode-components
import CmdEditModeManageNavigation from "@/editmode/components/ManageSite/CmdEditModeManageNavigation"
import CmdEditModeManageUsers from "@/editmode/components/ManageSite/CmdEditModeManageUsers"
import CmdEditModeManageUserGroups from "@/editmode/components/ManageSite/CmdEditModeManageUserGroups"
import CmdEditModeManageBackups from "@/editmode/components/ManageSite/CmdEditModeManageBackups"
import CmdEditModeManageGoogleTools from "@/editmode/components/ManageSite/CmdEditModeManageGoogleTools"
import CmdEditModeManageLocalization from "@/editmode/components/ManageSite/CmdEditModeManageLocalization"

// import Cmd-components
import CmdAccordion from "comand-component-library/src/components/CmdAccordion"

import {navigateTo} from "../../../utilities/router"

export default {
    data() {
        return {
            openManageSiteSidebar: true,
            userLoggedIn: true
        }
    },
    components: {
        CmdEditModeManageNavigation,
        CmdEditModeManageUserGroups,
        CmdEditModeManageUsers,
        CmdEditModeManageBackups,
        CmdEditModeManageGoogleTools,
        CmdEditModeManageLocalization,
        CmdAccordion
    },
    methods: {
        toggleSideBar(sidebar) {
            if (sidebar === "manageSite") {
                this.$refs.accordionsManageSiteSidebar.closeAll()
                return this.openManageSiteSidebar = !this.openManageSiteSidebar

            }
            return this.openManageContentSidebar = !this.openManageContentSidebar
        },
        logout() {
            // show system-message
            this.$store.commit("systemMessage", {status: "success", message: "You were logged out successful!"})

            // set logout status in store (also removes token from localStorage)
            this.$store.commit("login", "")

            // load index-page
            navigateTo("Index")
        }
    }
}
</script>