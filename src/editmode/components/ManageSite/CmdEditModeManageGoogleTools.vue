<template>
  <CmdEditModeGoogleRecaptcha />
  <hr />
  <CmdEditModeGoogleMaps />
  <hr />
  <CmdEditModeGoogleAnalytics />
</template>

<script>
  // import axios from "axios"
  import CmdEditModeGoogleRecaptcha from "@/editmode/components/ManageSite/CmdEditModeGoogleRecaptcha"
  import CmdEditModeGoogleMaps from "@/editmode/components/ManageSite/CmdEditModeGoogleMaps"
  import CmdEditModeGoogleAnalytics from "@/editmode/components/ManageSite/CmdEditModeGoogleAnalytics"

  export default {
      name: "CmdEditModeManageGoogleTools",
      components: {
          CmdEditModeGoogleRecaptcha,
          CmdEditModeGoogleMaps,
          CmdEditModeGoogleAnalytics
      }
  }
</script>