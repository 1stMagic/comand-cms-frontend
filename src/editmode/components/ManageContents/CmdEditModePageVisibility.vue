<template>
    <div class="cmd-edit-mode-manage-page-visibility">
        <fieldset class="flex-container">
            <legend class="hidden">Page visibility settings</legend>
            <div class="label">
                <span>This page is visible for:</span>
                <CmdFormElement labelText="For all users" name="restricted" :replaceInputType="true" id="restricted-none" element="input" type="radio" v-model:value="restricted" inputValue="none"/>
                <CmdFormElement labelText="For specific group(s) only" name="restricted" :replaceInputType="true" id="restricted-specific" element="input" type="radio" v-model:value="restricted" inputValue="specific" />
            </div>
            <CmdFakeSelect v-if="restricted === 'specific'" labelText="Select user group(s)" type="filterList" id="user-groups" v-model:value="selectedUserGroups" :selectData="allUserGroups"/>
        </fieldset>
        <div class="button-wrapper">
            <button type="button" class="button add" @click="savePageVisibility">
                <span class="icon-check"></span>
                <span>Save</span>
            </button>
            <button type="button" class="button cancel" @click="cancelPageVisibility">
                <span class="icon-cancel"></span>
                <span>Cancel</span>
            </button>
        </div>
    </div>
</template>

<script>
// import Cms-backend-client
import {CmsBackendClient} from "../../../client/CmsClient"

// import Cmd-components
import CmdFakeSelect from "comand-component-library/src/components/CmdFakeSelect"
import CmdFormElement from "comand-component-library/src/components/CmdFormElement"

export default {
    name: "CmdEditModePageVisibility",
    components: {
        CmdFakeSelect,
        CmdFormElement
    },
    data() {
        return {
            restricted: "none",
            selectedUserGroups: [],
            allUserGroups: []
        }
    },
    created() {
        this.loadUserGroups()
    },
    methods: {
        loadUserGroups() {
            new CmsBackendClient()
                .loadUserGroups()
                .then(userGroups => this.assignUserGroups(userGroups))
                .catch(error => {
                    this.$store.commit("systemMessage", {status: "error", message: "User groups could not be loaded!"})
                    console.error(error)
                })
        },
        assignUserGroups(userGroups) {
            for (let i = 0; i < userGroups.length; i++) {
                if (userGroups[i].active) {
                    this.allUserGroups.push({
                        optionName: userGroups[i].name,
                        optionValue: userGroups[i].id,
                    })
                }
            }
        },
        setSelectedUserGroups() {
            this.selectedUserGroups = []

            if(this.$store.state.pageInformation?.restricted) {
                this.restricted = "specific"
                this.selectedUserGroups = this.$store.state.pageInformation.requiredGroups
            } else {
                this.restricted = "none"
            }
        },
        savePageVisibility() {
            alert("Save page visibility settings!")
        },
        cancelPageVisibility() {
            this.setSelectedUserGroups()
        }

    },
    watch: {
        "$store.state.pageInformation": function() {
            this.setSelectedUserGroups()
        }
    }
}
</script>