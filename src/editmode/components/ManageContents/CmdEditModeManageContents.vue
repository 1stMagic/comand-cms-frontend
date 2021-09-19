<template>
  <aside class="cmd-edit-mode-manage-content" :class="{'closed' : !openManageContentsSidebar}">
    <a href="#" @click.prevent="toggleSideBar('manageContents')" title="Toggle 'Manage Content-side-bar'">
      <span v-if="openManageContentsSidebar" class="icon-single-arrow-right"></span>
      <span v-else class="icon-single-arrow-left"></span>
    </a>
    <div>
      <h2>Manage contents</h2>
      <CmdAccordion :accordionData="5" :gapBetween="false" :useTransition="false" ref="accordionsManageContentsSidebar" @click="openManageContentsSidebar = true">
        <!-- begin meta data -->
        <template v-slot:accordionHeadline0>
          <h3>
            <span class="icon-list" title="Meta data"></span>
            <span>Meta data</span>
          </h3>
        </template>
        <template v-slot:accordionContent0>
          <CmdEditModeMeta />
        </template>
        <!-- end meta data -->

        <!-- begin content elements  -->
        <template v-slot:accordionHeadline1>
          <h3>
            <span class="icon-square" title="Content elements"></span>
            <span>Content elements</span>
          </h3>
        </template>
        <template v-slot:accordionContent1>
          <CmdTabs :stretchTabs="true" :tabs="[{name: 'Text-Elements'}, {name: 'Component-Elements'}]" :useComponent="true">
            <template v-slot:tab-content-0>
              <CmdEditModeTextElements />
            </template>
            <template v-slot:tab-content-1>
              <CmdEditModeComponentElements />
            </template>
          </CmdTabs>
        </template>
        <!-- end content elements -->

        <!-- begin media center -->
        <template v-slot:accordionHeadline2>
          <h3>
            <span class="icon-content" title="Media center"></span>
            <span>Media center</span>
          </h3>
        </template>
        <template v-slot:accordionContent2>
          <CmdEditModeTextElements />
        </template>
        <!-- end media center -->

        <!-- begin page visibility -->
        <template v-slot:accordionHeadline3>
          <h3>
            <span class="icon-visible" title="Page visibility"></span>
            <span>Page visibility</span>
          </h3>
        </template>
        <template v-slot:accordionContent3>
          <CmdEditModePageVisibility />
        </template>
        <!-- end page visibility -->

        <!-- begin page information -->
        <template v-slot:accordionHeadline4>
          <h3>
            <span class="icon-content" title="Page information"></span>
            <span>Page information</span>
          </h3>
        </template>
        <template v-slot:accordionContent4>
          <CmdEditModePageInformation />
        </template>
        <!-- end page information -->
      </CmdAccordion>
    </div>
  </aside>
</template>

<script>
// import EditMode-components
import CmdEditModeMeta from "@/editmode/components/ManageContents/CmdEditModeMeta"
import CmdEditModeTextElements from "@/editmode/components/ManageContents/CmdEditModeTextElements"
import CmdEditModeComponentElements from "@/editmode/components/ManageContents/CmdEditModeComponentElements"
import CmdEditModePageVisibility from "@/editmode/components/ManageContents/CmdEditModePageVisibility"
import CmdEditModePageInformation from "@/editmode/components/ManageContents/CmdEditModePageInformation"

// import Cmd-components
import CmdAccordion from "comand-component-library/src/components/CmdAccordion"
import CmdTabs from "comand-component-library/src/components/CmdTabs"

export default {
    name: "CmdEditModeManageContents",
    data () {
        return {
            openManageContentsSidebar: true
        }
    },
    components: {
        CmdEditModeTextElements,
        CmdEditModeComponentElements,
        CmdEditModeMeta,
        CmdEditModePageVisibility,
        CmdEditModePageInformation,
        CmdAccordion,
        CmdTabs
    },
    methods: {
        toggleSideBar() {
            this.$refs.accordionsManageContentsSidebar.closeAll()
            return this.openManageContentsSidebar = !this.openManageContentsSidebar
        }
    }
}
</script>