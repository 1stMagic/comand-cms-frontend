<template>
  <fieldset class="flex-container">
    <CmdFormElement element="input" type="text" labelText="Title:" />
    <CmdFormElement element="input" type="text" labelText="Keywords:" />
    <CmdFormElement element="textarea" labelText="Description:" />
    <CmdFormElement element="select" labelText="index/follow:" select-options="[
      {
        name: 'index, follow',
        value: 'index, follow'
      },
      {
        name: 'index, nofollow',
        value: 'index, nofollow'
      },
       {
        name: 'noindex, follow',
        value: 'noindex, follow'
      },
      {
        name: 'noindex, nofollow',
        value: 'noindex, nofollow'
      }
    ]" />
  </fieldset>
</template>

<script>
    // import Cmd-components
    import CmdFormElement from "comand-component-library/src/components/CmdFormElement"

  export default {
      name: "CmdEditModeMeta",
      components: {
          CmdFormElement
      }
  }
</script>