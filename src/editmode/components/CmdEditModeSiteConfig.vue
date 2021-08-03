<template>
  <aside class="cmd-edit-mode-manage-site">
    <h2>Manage site</h2>
    <CmdAccordion :accordionData="1">
      <template v-slot:accordionHeadline0>
        <h3>Navigation</h3>
      </template>
      <template v-slot:accordionContent0>
        <CmdEditModeNavigationConfig />
      </template>
    </CmdAccordion>
    <CmdAccordion :accordionData="1">
      <template v-slot:accordionHeadline0>
        <h3>User groups</h3>
      </template>
      <template v-slot:accordionContent0>
        <CmdEditModeUserGroupsConfig />
      </template>
    </CmdAccordion>
    <small>
      &copy; CoManD-CMS v0.01
    </small>
  </aside>
</template>

<script>
// import EditMode-components
import CmdEditModeNavigationConfig from "@/editmode/components/CmdEditModeNavigationConfig"
import CmdEditModeUserGroupsConfig from "@/editmode/components/CmdEditModeUserGroupsConfig"

// import Cmd-components
import CmdAccordion from "comand-component-library/src/components/CmdAccordion"

export default {
    components: {
        CmdEditModeNavigationConfig,
        CmdEditModeUserGroupsConfig,
        CmdAccordion
    }
}
</script>

<style lang="scss">
.cmd-edit-mode-manage-site {
  width: 30rem;
  max-width: 30rem;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: var(--default-padding);
  background: rgba(var(--pure-white-rgb-values), .9);
  backdrop-filter: blur(.5rem);
  box-shadow: .2rem 0 .2rem hsla(0, 100%, 0%, 20%);
  z-index: 1000;

  > small:last-child {
    margin-top: auto;
    text-align: center;
  }
}
</style>