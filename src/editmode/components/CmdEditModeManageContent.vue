<template>
  <aside class="cmd-edit-mode-manage-content">
    <h2>Manage content</h2>
    <CmdAccordion :accordionData="1">
      <template v-slot:accordionHeadline0>
        <h3>Text elements</h3>
      </template>
      <template v-slot:accordionContent0>
        <CmdEditModeContentTypo />
      </template>
    </CmdAccordion>
  </aside>
</template>

<script>
// import EditMode-components
import CmdEditModeContentTypo from "@/editmode/components/CmdEditModeContentTypo"

// import Cmd-components
import CmdAccordion from "comand-component-library/src/components/CmdAccordion"

export default {
    name: "CmdEditModeManageContent",
    components: {
        CmdEditModeContentTypo,
        CmdAccordion
    }
}
</script>

<style lang="scss">
.cmd-edit-mode-manage-content {
  width: 30rem;
  max-width: 30rem;
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: var(--default-padding);
  background: rgba(var(--pure-white-rgb-values), .9);
  backdrop-filter: blur(.5rem);
  box-shadow: -.2rem 0 .2rem hsla(0, 100%, 0%, 20%);
  z-index: 1000;
}
</style>