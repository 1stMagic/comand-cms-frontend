<template>
  <div class="cmd-edit-mode-component-elements">
    <h4>Component-Elements</h4>
    <ul>
      <li v-for="(componentElement, index) in componentsElementsData" :key="index">
        <a href="#">
          <span :class="componentElement.iconClass"></span>
          <span>{{ componentElement.description }}</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import componentsElementsData from "@/assets/data/editmode/component-elements.json"

export default {
    name: "CmdEditModeComponentElements",
    data() {
        return {
            componentsElementsData
        }
    }
}
</script>

<style lang="scss">
.cmd-edit-mode-manage-text-elements {
  ul {
    display: flex;
    gap: var(--default-gap);
    flex-wrap: wrap;

    li {
      list-style-type: none;
      margin: 0;

      a {
        border: var(--default-border);
        display: block;
        padding: var(--default-padding);

        span {
          display: block;
          margin: 0 auto;
          text-align: center;
        }
      }
    }
  }
}
</style>