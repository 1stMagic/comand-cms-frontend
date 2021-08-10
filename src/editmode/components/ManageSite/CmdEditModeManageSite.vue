<template>
  <aside class="cmd-edit-mode-manage-site" :class="{'close' : !openManageSiteSidebar}">
    <div>
      <h2>Manage site</h2>
      <CmdAccordion :accordionData="1">
        <template v-slot:accordionHeadline0>
          <h3>
            <span class="icon-bars"></span><span>Navigation</span>
          </h3>
        </template>
        <template v-slot:accordionContent0>
          <CmdEditModeManageNavigation />
        </template>
      </CmdAccordion>
      <CmdAccordion :accordionData="1">
        <template v-slot:accordionHeadline0>
          <h3>
            <span class="icon-user-group"></span><span>User groups</span>
          </h3>
        </template>
        <template v-slot:accordionContent0>
          <CmdEditModeManageUserGroups />
        </template>
      </CmdAccordion>
      <CmdAccordion :accordionData="1">
        <template v-slot:accordionHeadline0>
          <h3>
            <span class="icon-download"></span><span>Backups</span>
          </h3>
        </template>
        <template v-slot:accordionContent0>
          <CmdEditModeManageBackups />
        </template>
      </CmdAccordion>
      <CmdAccordion :accordionData="1">
        <template v-slot:accordionHeadline0>
          <h3>
            <span class="icon-globe"></span><span>Localization</span>
          </h3>
        </template>
        <template v-slot:accordionContent0>
          <CmdEditModeManageLocalization />
        </template>
      </CmdAccordion>
      <CmdAccordion :accordionData="1">
        <template v-slot:accordionHeadline0>
          <h3>
            <span class="icon-google-analytics"></span><span>Google&trade; Tools</span>
          </h3>
        </template>
        <template v-slot:accordionContent0>
          <CmdEditModeManageGoogleTools />
        </template>
      </CmdAccordion>
      <ul>
        <li>
          <a href="#">
            <span class="icon-help"></span>
            <span>CoManD-Help</span>
          </a>
        </li>
        <li>
          <a href="#">
            <span class="icon-euro"></span>
            <span>Donate</span>
          </a>
        </li>
        <li>
          <a href="#" @click.prevent="$store.commit('login', false)" :title="'Logout ' + username">
            <span class="icon-logout"></span>
            <div class="flex-container no-flex">
              <span class="icon-user-profile"></span>
              <span>{{ username }}</span>
            </div>

          </a>
        </li>
      </ul>
      <small>
        &copy; CoManD-CMS v0.01
      </small>
    </div>
    <a href="#" @click.prevent="toggleSideBar('manageSite')" title="Toggle 'Manage Site-side-bar'">
      <span v-if="openManageSiteSidebar" class="icon-single-arrow-left"></span>
      <span v-else class="icon-single-arrow-right"></span>
    </a>
  </aside>
</template>

<script>
    // import EditMode-components
    import CmdEditModeManageNavigation from "@/editmode/components/ManageSite/CmdEditModeManageNavigation"
    import CmdEditModeManageUserGroups from "@/editmode/components/ManageSite/CmdEditModeManageUserGroups"
    import CmdEditModeManageBackups from "@/editmode/components/ManageSite/CmdEditModeManageBackups"
    import CmdEditModeManageGoogleTools from "@/editmode/components/ManageSite/CmdEditModeManageGoogleTools"
    import CmdEditModeManageLocalization from "@/editmode/components/ManageSite/CmdEditModeManageLocalization"

    // import Cmd-components
    import CmdAccordion from "comand-component-library/src/components/CmdAccordion"

    export default {
        data () {
          return {
              openManageSiteSidebar: true,
              userLoggedIn: true,
              username: "Raphael Biock"
          }
        },
        components: {
            CmdEditModeManageNavigation,
            CmdEditModeManageUserGroups,
            CmdEditModeManageBackups,
            CmdEditModeManageGoogleTools,
            CmdEditModeManageLocalization,
            CmdAccordion
        },
        methods: {
            toggleSideBar(sidebar) {
                if(sidebar === "manageSite") {
                    return this.openManageSiteSidebar = !this.openManageSiteSidebar
                }
                return  this.openManageContentSidebar = !this.openManageContentSidebar
            }
        }
    }
</script>

<style lang="scss">

</style>