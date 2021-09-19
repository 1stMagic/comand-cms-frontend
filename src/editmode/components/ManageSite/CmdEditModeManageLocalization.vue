<template>
  <CmdEditModeLanguages />
  <hr />
  <CmdEditModeTimeAndCurrency />
</template>

<script>
  // import edit-mode-componenents
  import CmdEditModeLanguages from "@/editmode/components/ManageSite/CmdEditModeLanguages"
  import CmdEditModeTimeAndCurrency from "@/editmode/components/ManageSite/CmdEditModeTimeAndCurrency"

  export default {
      name: "CmdEditModeManageLocalization",
      components: {
          CmdEditModeLanguages,
          CmdEditModeTimeAndCurrency
      }
  }
</script>