<template>
  <CmdEditModeLanguages />
  <hr />
  <CmdEditModeTimeAndCurrency />
</template>

<script>
  // import axios from "axios"
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