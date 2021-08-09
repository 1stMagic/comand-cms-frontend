<template>
  <h3>Google Analytics&trade;</h3>
  <fieldset class="flex-container">
    <CmdFormElement element="input" type="checkbox" labelText="Activate" />
    <CmdFormElement element="textarea" labelText="Script:" placeholder="Enter script (without <script>-tag)" />
  </fieldset>
</template>

<script>
  // import axios from "axios"

  import CmdFormElement from "comand-component-library/src/components/CmdFormElement"

  export default {
      name: "CmdEditModeManageGoogleTools",
      components: {
          CmdFormElement
      }
  }
</script>