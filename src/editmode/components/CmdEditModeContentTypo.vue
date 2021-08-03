<template>
  <div class="cmd-edit-mode-manage-content-typo">
    <ul>
      <li v-for="(textElement, index) in textElementsData" :key="index">
        <a href="">
          <span>{{ textElement.tag }}</span>
          <span>{{ textElement.description }}</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import textElementsData from "@/assets/data/editmode/text-elements.json"

export default {
    name: "CmdEditModeContentTypo",
    data() {
        return {
            textElementsData
        }
    }
}
</script>

<style lang="scss">
.cmd-edit-mode-manage-content-typo {
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