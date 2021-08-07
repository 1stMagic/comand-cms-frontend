<template>
  <aside class="cmd-edit-mode-manage-content" :class="{'close' : !openManageContentSidebar}">
    <a href="#" @click.prevent="toggleSideBar('manageContent')" title="Toggle 'Manage Content-side-bar'">
      <span v-if="openManageContentSidebar" class="icon-single-arrow-right"></span>
      <span v-else class="icon-single-arrow-left"></span>
    </a>
    <div>
      <h2>Manage content</h2>
      <CmdAccordion :accordionData="1">
        <template v-slot:accordionHeadline0>
          <h3>
            <span class="icon-list"></span>
            <span>Meta data</span>
          </h3>
        </template>
        <template v-slot:accordionContent0>
          <CmdEditModeMeta />
        </template>
      </CmdAccordion>
      <CmdAccordion :accordionData="1">
        <template v-slot:accordionHeadline0>
          <h3>
            <span class="icon-list"></span>
            <span>Text elements</span>
          </h3>
        </template>
        <template v-slot:accordionContent0>
          <CmdEditModeContentTypo />
        </template>
      </CmdAccordion>
      <CmdAccordion :accordionData="1">
        <template v-slot:accordionHeadline0>
          <h3>
            <span class="icon-content"></span>
            <span>Media center</span>
          </h3>
        </template>
        <template v-slot:accordionContent0>
          <CmdEditModeContentTypo />
        </template>
      </CmdAccordion>
      <CmdAccordion :accordionData="1">
        <template v-slot:accordionHeadline0>
          <h3>
            <span class="icon-configuration"></span>
            <span>Components</span>
          </h3>
        </template>
        <template v-slot:accordionContent0>
          <CmdEditModeContentTypo />
        </template>
      </CmdAccordion>
    </div>
  </aside>
</template>

<script>
// import EditMode-components
import CmdEditModeMeta from "@/editmode/components/CmdEditModeMeta"
import CmdEditModeContentTypo from "@/editmode/components/CmdEditModeContentTypo"

// import Cmd-components
import CmdAccordion from "comand-component-library/src/components/CmdAccordion"

export default {
    name: "CmdEditModeManageContent",
    data () {
        return {
            openManageContentSidebar: true
        }
    },
    components: {
        CmdEditModeContentTypo,
        CmdEditModeMeta,
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