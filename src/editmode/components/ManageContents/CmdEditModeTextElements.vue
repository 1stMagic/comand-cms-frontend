<template>
  <div class="cmd-edit-mode-text-elements">
    <h4>Text-Elements</h4>
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
    name: "CmdEditModeTextElements",
    data() {
        return {
            textElementsData
        }
    }
}
</script>

<style lang="scss">

</style>