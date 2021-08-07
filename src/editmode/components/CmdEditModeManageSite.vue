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
          <CmdEditModeNavigationConfig/>
        </template>
      </CmdAccordion>
      <CmdAccordion :accordionData="1">
        <template v-slot:accordionHeadline0>
          <h3>
            <span class="icon-user-group"></span><span>User groups</span>
          </h3>
        </template>
        <template v-slot:accordionContent0>
          <CmdEditModeUserGroupsConfig/>
        </template>
      </CmdAccordion>
      <ul>
        <li>
          <a href="#">
            <span class="icon-help"></span>
            <span>CoManD-Hilfe</span>
          </a>
        </li>
        <li>
          <a href="#">
            <span class="icon-euro"></span>
            <span>Spenden</span>
          </a>
        </li>
        <li>
          <a v-if="$store.state.login" href="#" @click.prevent="$store.commit('login', false)">
            <span class="icon-logout"></span>
            <span>{{ username }} abmelden</span>
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
    import CmdEditModeNavigationConfig from "@/editmode/components/CmdEditModeNavigationConfig"
    import CmdEditModeUserGroupsConfig from "@/editmode/components/CmdEditModeUserGroupsConfig"

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
            CmdEditModeNavigationConfig,
            CmdEditModeUserGroupsConfig,
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