<template>
  <aside class="cmd-edit-mode-manage-content" :class="{'close' : !openManageContentSidebar}">
    <a href="#" @click.prevent="toggleSideBar('manageContent')" title="Toggle 'Manage Content-side-bar'">
      <span v-if="openManageContentSidebar" class="icon-single-arrow-right"></span>
      <span v-else class="icon-single-arrow-left"></span>
    </a>
    <div>
      <h2>Manage contents</h2>
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
          <CmdEditModeTextElements />
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
          <CmdEditModeTextElements />
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
          <CmdEditModeTextElements />
        </template>
      </CmdAccordion>
      <CmdAccordion :accordionData="1">
        <template v-slot:accordionHeadline0>
          <h3>
            <span class="icon-visible"></span>
            <span>Page visibility</span>
          </h3>
        </template>
        <template v-slot:accordionContent0>
          <CmdEditModePageVisibility />
        </template>
      </CmdAccordion>
      <CmdAccordion :accordionData="1">
        <template v-slot:accordionHeadline0>
          <h3>
            <span class="icon-content"></span>
            <span>Page information</span>
          </h3>
        </template>
        <template v-slot:accordionContent0>
          <CmdEditModePageInformation />
        </template>
      </CmdAccordion>
    </div>
  </aside>
</template>

<script>
// import EditMode-components
import CmdEditModeMeta from "@/editmode/components/ManageContents/CmdEditModeMeta"
import CmdEditModeTextElements from "@/editmode/components/ManageContents/CmdEditModeTextElements"
import CmdEditModePageVisibility from "@/editmode/components/ManageContents/CmdEditModePageVisibility"
import CmdEditModePageInformation from "@/editmode/components/ManageContents/CmdEditModePageInformation"

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
        CmdEditModeTextElements,
        CmdEditModeMeta,
        CmdEditModePageVisibility,
        CmdEditModePageInformation,
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