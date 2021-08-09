<template>
  <h3>Backup files</h3>
  <CmdEditModeBackupLevel />
</template>

<script>
  // import axios from "axios"
  import CmdEditModeBackupLevel from "./CmdEditModeBackupLevel"

  export default {
      name: "CmdEditModeManageBackups",
      components: {
          CmdEditModeBackupLevel
      }
  }
</script>