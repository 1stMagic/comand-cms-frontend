<template>
  <div class="vue-container">
    <CmdEditModeSiteConfig />
    <CmdSiteHeader :navigation-entries="[]" :languages="[]" :close-offcanvas="{}" :mainNavigationEntries="$store.state.site.mainNavigation" :sticky="true" @click="onNavigation">
      <template v-slot:top-header>
        <CmdTopHeaderNavigation :topHeaderNavigationData="topHeaderNavigationData" v-if="topHeaderNavigationData" />
      </template>
      <template v-slot:logo>
        <CmdLogo altText="CoManD Logo" :pathDefaultLogo="require('@/assets/images/logo.svg')" :pathDarkmodeLogo="require('@/assets/images/logo-darkmode.svg')" />
      </template>
    </CmdSiteHeader>
    <main class="container" id="content">
      <router-view />
    </main>
    <CmdWidthLimitationWrapper id="site-footer" inner-component="footer">
      <CmdSwitchLanguage :languages="languagesData" />
      <CmdFooterNavigation :footerNavigation="footerNavigationData" headline="Links" />
      <CmdOpeningHours :openingHours="openingHoursData" :closed="true" headline="Opening hours" textOpenClosed="Closed right now!" textHolidaysClosed="Closed on holidays" textMiscInfo="Miscellaneous information" />
      <CmdAddressData :addressData="$store.state.site.contactData" :linkGoogleMaps="true" headline="Contact" />
    </CmdWidthLimitationWrapper>
    <CmdBackToTopButton tooltip="Back to top" />
    <CmdEditModeManageContent />
  </div>
</template>

<script>
import accordionData from "@/assets/data/accordion.json"
import boxUserData from "@/assets/data/box-user.json"
import boxProductData from "@/assets/data/box-product.json"
// import topHeaderNavigationData from "@/assets/data/top-header-navigation.json"
// import footerNavigationData from "@/assets/data/footer-navigation.json"
import openingHoursData from "@/assets/data/opening-hours.json"
// import addressData from "@/assets/data/address.json"

// EditMode
import CmdEditModeSiteConfig from "@/editmode/components/CmdEditModeSiteConfig"
import CmdEditModeManageContent from "@/editmode/components/CmdEditModeManageContent"

import CmdBackToTopButton from "comand-component-library/src/components/CmdBackToTopButton"
import CmdSiteHeader from "comand-component-library/src/components/CmdSiteHeader"
import CmdTopHeaderNavigation from "comand-component-library/src/components/CmdTopHeaderNavigation"
import CmdLogo from "comand-component-library/src/components/CmdLogo"
import CmdWidthLimitationWrapper from "comand-component-library/src/components/CmdWidthLimitationWrapper"
// import CmdBreadcrumbs from "comand-component-library/src/components/CmdBreadcrumbs"
import CmdSwitchLanguage from "comand-component-library/src/components/CmdSwitchLanguage"
import CmdFooterNavigation from "comand-component-library/src/components/CmdFooterNavigation"
import CmdOpeningHours from "comand-component-library/src/components/CmdOpeningHours"
import CmdAddressData from "comand-component-library/src/components/CmdAddressData"
import axios from "axios"
import store from "../store"

  export default {
    data() {
      return {
        accordionData,
        boxUserData,
        boxProductData,
        // footerNavigationData,
        // topHeaderNavigationData,
        openingHoursData,
        // addressData
      }
    },
    components: {
        CmdEditModeSiteConfig,
        CmdEditModeManageContent,
        CmdBackToTopButton,
        CmdSiteHeader,
        CmdTopHeaderNavigation,
        CmdLogo,
        CmdWidthLimitationWrapper,
        // CmdBreadcrumbs,
        CmdSwitchLanguage,
        CmdFooterNavigation,
        CmdOpeningHours,
        CmdAddressData
    },
    computed: {
        languagesData() {
          const supportedLanguages = this.$store.state.site.supportedLanguages
          const languages = []
          for(let i = 0; i < supportedLanguages.length; i++) {
              languages.push({
                  "iso2": supportedLanguages[i].language,
                  "tooltip": supportedLanguages[i].title,
                  "name": supportedLanguages[i].title,
                  "link": {
                      "type": "router",
                      "name": "Page",
                      "params": {
                          "language": supportedLanguages[i].language,
                          "page": this.$route.params.page
                      }
                  }
              })
          }
          return languages
        },
        topHeaderNavigationData() {
            let items = this.$store.state.site.topNavigation
            let mappedItems = []
            for(let i = 0; i < items.length; i++) {
                mappedItems.push({
                    type: "href",
                    path: items[i].href,
                    target: items[i].target,
                    linkName: items[i].name,
                    iconClass: items[i].iconClass
                })
            }
            return mappedItems
        },
        footerNavigationData() {
            let items = this.$store.state.site.footerNavigation
            let mappedItems = []
            for(let i = 0; i < items.length; i++) {
                mappedItems.push({
                    type: "href",
                    path: items[i].href,
                    target: items[i].target,
                    linkName: items[i].name,
                    iconClass: items[i].iconClass
                })
            }
            return mappedItems
        }
    },
    methods: {
       /* showFancyBox(type, content) {
            if(type === 'text') {
                openFancyBox({content: content})
            } else if(type === 'image') {
                openFancyBox({url: content})
            }
        },
        */
        getOptionName (option) {
            for(let i = 0 ; i < this.fakeSelectOptionsData.length ; i++) {
                if (option === this.fakeSelectOptionsData[i].optionValue) {
                    return this.fakeSelectOptionsData[i].optionName
                }
            }
            return null
        },
        executeSearch () {
            let result = Math.floor(Math.random() * 100)
            return result
        },
        onNavigation(event) {
            const link = event.target.closest("a")
            if (link.target) {
                return
            }
            event.preventDefault()
            this.$router.push({
                name: "Page",
                params: {
                    language: this.$store.state.language,
                    page: link.attributes.href.nodeValue.split("/")
                }
            })
        }
    },
      watch: {
        "$store.state.language":{
          handler() {
            document.querySelector("html").lang = this.$store.state.language
              const url = new URL(`sites/${this.$store.state.site.name}`, this.$store.state.site.api.baseUrl)
              axios.get(url.href, {headers: {"Accept-Language": this.$store.state.language}})
                  .then(response => response.data)
                  .then(({supportedLanguages, mainNavigation, topNavigation, footerNavigation}) => ({ ...this.$store.state.site, supportedLanguages, mainNavigation, topNavigation, footerNavigation }))
                  .then(site => store.commit("site", site))
                  .catch(error => console.error(error))
          }, immediate: true
        }
      }
  }
</script>

<style lang="scss">

</style>
