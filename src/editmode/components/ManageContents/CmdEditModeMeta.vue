<template>
  <fieldset class="flex-container">
    <CmdFormElement element="input" type="text" required="required" labelText="Title:" placeholder="Title (60 characters max.)" max-length="60" />
    <CmdFormElement element="textarea" required="required" labelText="Description:" placeholder="Description (160 characters max.)" max-length="160" />
    <CmdFormElement element="select" labelText="Robots:" :selectOptions="[
      {
        text: 'index, follow',
        value: 'index, follow',
        selected: true
      },
      {
        text: 'index, nofollow',
        value: 'index, nofollow'
      },
       {
        text: 'noindex, follow',
        value: 'noindex, follow'
      },
      {
        text: 'noindex, nofollow',
        value: 'noindex, nofollow'
      }
    ]" />
    <CmdFormElement element="select" labelText="Rating:" :selectOptions="[
      {
        text: 'safe for kids',
        value: 'safe',
        selected: true
      },
      {
        text: '14 years',
        value: '14'
      },
       {
        text: 'mature',
        value: 'mature'
      },
      {
        text: 'general',
        value: 'general'
      },
      {
        text: 'restricted',
        value: 'restricted'
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