<template>
  <h3>Google Maps&trade;</h3>
  <fieldset class="flex-container">
    <CmdFormElement element="input" type="checkbox" labelText="Activate" v-model="activated" />
    <CmdFormElement element="input" type="checkbox" labelText="Link all addresses with Google Maps&trade;" />
    <CmdFormElement element="input" type="checkbox" labelText="Enable Google Maps&trade; as component" />
  </fieldset>
</template>

<script>
  // import axios from "axios"

  import CmdFormElement from "comand-component-library/src/components/CmdFormElement"

  export default {
      name: "CmdEditModeMGoogleMaps",
      components: {
          CmdFormElement
      }
  }
</script>