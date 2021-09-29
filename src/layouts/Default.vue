<template>
    <div class="vue-container editmode">
        <CmdSystemMessage v-show="$store.getters.showSystemMessage" :status="$store.state.systemMessage.status"
                          :message="$store.state.systemMessage.message "/>
        <transition name="fade">
            <CmdEditModeManageSite v-if="$store.state.login"/>
        </transition>
        <CmdSiteHeader :navigation-entries="[]" :languages="[]" :close-offcanvas="{}"
                       :mainNavigationEntries="$store.state.site.mainNavigation" :sticky="true" @click="onNavigation">
            <template v-slot:top-header>
                <CmdTopHeaderNavigation v-if="topHeaderNavigationData" :topHeaderNavigationData="topHeaderNavigationData" />
            </template>
            <template v-slot:logo>
                <CmdCompanyLogo altText="CoManD Logo" :pathDefaultLogo="require('@/assets/images/logo.svg')"
                                :pathDarkmodeLogo="require('@/assets/images/logo-darkmode.svg')"
                                :link="{type:'', tooltip:''}"/>
            </template>
        </CmdSiteHeader>
        <main class="container" id="content">
            <!-- begin content from page.vue -->
            <router-view/>
            <!-- end content from page.vue -->
        </main>
        <CmdWidthLimitationWrapper id="site-footer" inner-component="footer">
            <CmdSwitchLanguage :languages="languagesData"/>
            <CmdFooterNavigation :footerNavigation="footerNavigationData" headline="Links"/>
            <CmdOpeningHours :openingHours="openingHoursData" :closed="true" headline="Opening hours"
                             textOpenClosed="Closed right now!" textHolidaysClosed="Closed on holidays"
                             textMiscInfo="Miscellaneous information"/>
            <CmdAddressData :addressData="$store.state.site.contactData" headline="Contact"/>
        </CmdWidthLimitationWrapper>
        <CmdBackToTopButton tooltip="Back to top"/>
        <transition name="fade">
            <CmdEditModeManageContents v-if="$store.state.login && $store.state.pageInformation"/>
        </transition>
        <transition name="fade">
            <CmdFancyBox v-model:show="$store.state.fancybox.show" :fancyboxOptions="{printButtons: false}">
                <CmdEditModePageSettings v-if="$store.state.fancybox.type === 'page'" />
                <CmdEditModeUserGroupSettings v-else-if="$store.state.fancybox.type === 'usergroup'" />
            </CmdFancyBox>
        </transition>
    </div>
</template>

<script>
import accordionData from "@/assets/data/accordion.json"
import boxUserData from "@/assets/data/box-user.json"
import boxProductData from "@/assets/data/box-product.json"
import openingHoursData from "@/assets/data/opening-hours.json"

// EditMode
import CmdEditModeManageSite from "@/editmode/components/ManageSite/CmdEditModeManageSite"
import CmdEditModeManageContents from "@/editmode/components/ManageContents/CmdEditModeManageContents"
import CmdEditModePageSettings from "@/editmode/components/ManageSite/CmdEditModePageSettings"
import CmdEditModeUserGroupSettings from "@/editmode/components/ManageSite/CmdEditModeUserGroupSettings"

import CmdBackToTopButton from "comand-component-library/src/components/CmdBackToTopButton"
import CmdSiteHeader from "comand-component-library/src/components/CmdSiteHeader"
import CmdTopHeaderNavigation from "comand-component-library/src/components/CmdTopHeaderNavigation"
import CmdCompanyLogo from "comand-component-library/src/components/CmdCompanyLogo"
import CmdWidthLimitationWrapper from "comand-component-library/src/components/CmdWidthLimitationWrapper"
// import CmdBreadcrumbs from "comand-component-library/src/components/CmdBreadcrumbs"
import CmdSwitchLanguage from "comand-component-library/src/components/CmdSwitchLanguage"
import CmdFooterNavigation from "comand-component-library/src/components/CmdFooterNavigation"
import CmdOpeningHours from "comand-component-library/src/components/CmdOpeningHours"
import CmdSystemMessage from "comand-component-library/src/components/CmdSystemMessage"
import CmdAddressData from "comand-component-library/src/components/CmdAddressData"
import CmdFancyBox from "comand-component-library/src/components/CmdFancyBox"
import {CmsFrontendClient} from "../client/CmsClient"
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
            loginStatus: false
        }
    },
    components: {
        CmdEditModeManageSite,
        CmdEditModeManageContents,
        CmdEditModePageSettings,
        CmdEditModeUserGroupSettings,
        CmdBackToTopButton,
        CmdSiteHeader,
        CmdTopHeaderNavigation,
        CmdCompanyLogo,
        CmdWidthLimitationWrapper,
        CmdFancyBox,
        // CmdBreadcrumbs,
        CmdSwitchLanguage,
        CmdFooterNavigation,
        CmdOpeningHours,
        CmdSystemMessage,
        CmdAddressData
    },
    computed: {
        languagesData() {
            const supportedLanguages = this.$store.state.site.supportedLanguages
            const languages = []
            for (let i = 0; i < supportedLanguages.length; i++) {
                if(supportedLanguages[i].active) {
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
            }
            return languages
        },
        topHeaderNavigationData() {
            let items = this.$store.state.site.topNavigation
            let mappedItems = []
            mappedItems.push({
                linkType: "href",
                path: "#login",
                text: "Login",
                icon: {}
            })
            for (let i = 0; i < items.length; i++) {
                mappedItems.push({
                    linkType: "href",
                    path: items[i].href,
                    target: items[i].target,
                    text: items[i].name,
                    icon: {
                        iconClass: items[i].iconClass
                    }
                })
            }
            return mappedItems
        },
        footerNavigationData() {
            let items = this.$store.state.site.footerNavigation
            let mappedItems = []
            for (let i = 0; i < items.length; i++) {
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
        getOptionName(option) {
            for (let i = 0; i < this.fakeSelectOptionsData.length; i++) {
                if (option === this.fakeSelectOptionsData[i].optionValue) {
                    return this.fakeSelectOptionsData[i].optionName
                }
            }
            return null
        },
        executeSearch() {
            let result = Math.floor(Math.random() * 100)
            return result
        },
        onNavigation(event) {
            const link = event.target.closest("a")
            if (link.target) {
                return
            }
            event.preventDefault()
            if (link.attributes.href.nodeValue === '#login') {
                this.$store.commit('login', true)
            }
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
        "$store.state.language": {
            handler() {
                document.querySelector("html").lang = this.$store.state.language
                new CmsFrontendClient()
                    .loadSite()
                    .then(({
                               supportedLanguages,
                               mainNavigation,
                               topNavigation,
                               footerNavigation
                           }) => ({
                        ...this.$store.state.site,
                        supportedLanguages,
                        mainNavigation,
                        topNavigation,
                        footerNavigation
                    }))
                    .then(site => store.commit("site", site))
                    .catch(error => console.error(error))
            }, immediate: true
        }
    }
}
</script>

<style lang="scss">

</style>
