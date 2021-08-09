<template>
  <div class="cmd-edit-mode-manage-page-information">
    <dl>
      <template v-for="(information, index) in pageInformationData" :key="index">
        <dt>{{ information.label }}</dt>
        <dd>{{ information.data }}</dd>
      </template>
    </dl>
  </div>
</template>

<script>
import pageInformationData from "@/assets/data/editmode/page-information.json"

export default {
    name: "CmdEditModePageInformation",
    data() {
        return {
            pageInformationData
        }
    }
}
</script>