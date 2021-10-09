<template>
  <h3>Groups</h3>
  <CmdEditModeGroupLevel />
    <a class="button add" href="#" @click.prevent="addNewUserGroup">
        <span class="icon-plus"></span>
        <span>Add new user group</span>
    </a>
</template>

<script>
  import CmdEditModeGroupLevel from "./CmdEditModeGroupLevel"

  export default {
      components: {
          CmdEditModeGroupLevel
      },
      methods: {
          addNewUserGroup() {
              this.$store.commit("editUserGroupSettings", {id: "", name: "", active: false})
              this.$store.commit("fancybox", {show: true, type: "usergroup"})
          }
      }
  }
</script>