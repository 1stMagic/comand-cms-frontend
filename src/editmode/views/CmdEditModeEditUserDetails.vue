<template>
    <CmdWidthLimitationWrapper>
        <CmdMainHeadline main-headline="Edit user details"/>
        <div class="flex-container no-gap" id="user-details">
            <CmdSlideButton v-if="allUsers.length" @click.prevent="switchToUser('prev')" slideButtonType="prev" :slideButtons="previousUser"></CmdSlideButton>
            <div class="flex-container vertical">
                <fieldset class="flex-container">
                    <!--
                    <legend v-if="$route.params.userId">Details for user: {{ fullName() }}</legend>
                    <legend v-else>Details for new user</legend>
                    -->
                    <h2>User profile</h2>
                    <div class="flex-container">
                        <div class="flex-container vertical">
                            <h3>Name</h3>
                            <div class="flex-container">
                                <div class="label no-flex">
                                    <span>Salutation:</span>
                                    <span class="flex-container no-flex">
                                        <CmdFormElement element="input" type="radio" :replace-input-type="true" labelText="Mr." v-model:value="userDetail.salutation" inputValue="mr"/>
                                        <CmdFormElement element="input" type="radio" :replace-input-type="true" labelText="Mrs." v-model:value="userDetail.salutation" inputValue="mrs"/>
                                    </span>
                                </div>
                                <CmdFormElement element="input" type="text" labelText="First name:" v-model:value="userDetail.firstName" placeholder="First name"/>
                                <CmdFormElement element="input" type="text" labelText="Last name:" v-model:value="userDetail.lastName" required="required" placeholder="Last name"/>
                            </div>
                            <div class="flex-container">
                                <CmdFormElement element="input"
                                                type="password"
                                                inner-icon-class="icon-security-settings"
                                                labelText="Password:"
                                                v-model:value="password"
                                                :required="!userDetail.id"
                                                placeholder="Password"/>
                                <CmdFormElement element="input"
                                                id="repeat-password"
                                                type="password"
                                                inner-icon-class="icon-security-settings"
                                                labelText="Repeat password:"
                                                v-model:value="passwordRepeat"
                                                @blur="blurRepeatPassword"
                                                :required="!userDetail.id || password"
                                                placeholder="Repeat password"/>
                            </div>
                        </div>
                        <div class="flex-container vertical">
                            <h3>Picture</h3>
                            <div class="flex-container">
                                <div class="image-wrapper">
                                    <img v-if="userDetail.image" src="" :alt="'Picture of ' + userDetail.firstName + ' ' + userDetail.lastName" :title="userDetail.firstName + ' ' + userDetail.lastName" />
                                    <span v-else class="icon-user-profile" title="No user image"></span>
                                    <div class="action-wrapper">
                                        <a href="#" @click.prevent=""><span class="icon-upload" title="Upload new image"></span></a>
                                        <a href="#" @click.prevent=""><span class="icon-file-image" title="Replace image with new one from media center"></span></a>
                                        <a href="#" @click.prevent="" :class="{disabled:!userDetail.image}"><span class="icon-enlarge" title="Open large image"></span></a>
                                        <a href="#" @click.prevent="" :class="{disabled:!userDetail.image}"><span class="icon-delete" title="Remove image"></span></a>
                                    </div>
                                </div>
                                <dl>
                                    <dt>File name:</dt>
                                    <dd>-</dd>
                                    <dt>File format:</dt>
                                    <dd>-</dd>
                                    <dt>File size:</dt>
                                    <dd>-</dd>
                                    <dt>Dimensions:</dt>
                                    <dd>-</dd>
                                    <dt>Path to file:</dt>
                                    <dd>-</dd>
                                </dl>
                            </div>
                        </div>
                        <div class="flex-container vertical">
                            <h3>Groups</h3>
                            <div class="label">
                                <span>Assigned groups:</span>
                                <span class="flex-container no-flex">
                                    <template v-for="(group, index) in userGroups" :key="index">
                                        <CmdFormElement element="input" type="checkbox" :replace-input-type="true" :labelText="group.name" :inputValue="group.id" v-model:value="userDetail.groups"/>
                                    </template>
                                </span>
                            </div>
                            <h3>Status</h3>
                            <div class="label inline">
                                <span>Current profile status:</span>
                                <CmdSwitchButton id="toggle-status"
                                                 type="checkbox"
                                                 onLabel="Active"
                                                 offLabel="Inactive"
                                                 v-model:value="userDetail.active"
                                                 :colored="true"
                                />
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div class="flex-container">
                        <div class="flex-container vertical">
                            <h2>Contact</h2>
                            <CmdFormElement element="input" type="email" inner-icon-class="icon-mail" labelText="Email address:" v-model:value="userDetail.email" placeholder="Email address" required="required"/>
                            <CmdFormElement element="input" type="tel" inner-icon-class="icon-phone" labelText="Telephone:" v-model:value="userDetail.telephone" placeholder="Telephone number"/>
                            <CmdFormElement element="input" type="tel" inner-icon-class="icon-device-smartphone" labelText="Mobile phone:" v-model:value="userDetail.mobilephone" placeholder="Mobile phone number"/>
                            <CmdFormElement element="input" type="email" inner-icon-class="icon-fax" labelText="Fax:" v-model:value="userDetail.fax" placeholder="Fax number"/>
                            <CmdFormElement element="input" type="url" inner-icon-class="icon-globe" labelText="Website:" v-model:value="userDetail.website" placeholder="URL to website"/>
                        </div>
                        <div class="flex-container vertical">
                            <h2>Address</h2>
                            <CmdFormElement element="input" type="text" labelText="Street/No:" v-model:value="userDetail.street" placeholder="Street"/>
                            <CmdFormElement element="input" type="text" labelText="P.O. Box:" v-model:value="userDetail.postOfficeBox" placeholder="P.O. Box"/>
                            <div class="flex-container input-wrapper">
                                <CmdFormElement element="input" type="text" labelText="Zip:" v-model:value="userDetail.zip" placeholder="Zip"/>
                                <CmdFormElement element="input" type="text" labelText="City:" v-model:value="userDetail.city" placeholder="City"/>
                            </div>
                            <CmdFakeSelect type="country" labelText="Country:" pathFlags="/media/images/flags" v-model:value="userDetail.country" :select-data='[
                                {
                                "value": "cn",
                                "text": "China",
                                },
                                {
                                "value": "de",
                                "text": "Germany",
                                },
                                {
                                "value": "en",
                                "text": "United Kingdom",
                                },
                                {
                                "value": "es",
                                "text": "Spain",
                                },
                                {
                                "value": "fr",
                                "text": "France",
                                },
                                {
                                "value": "it",
                                "text": "Italy",
                                },
                                {
                                "value": "ru",
                                "text": "Russia",
                                }
                            ]'/>
                            <CmdFormElement element="input" type="text" labelText="Misc. info:" v-model:value="userDetail.otherInformation" placeholder="Miscellaneous information"/>
                        </div>
                    </div>
                </fieldset>
                <div class="button-wrapper">
                    <button type="button" class="button add" @click="updateChanges()">
                        <span class="icon-check"></span><span>Save changes</span>
                    </button>
                    <router-link :to="{ name: 'CmdEditModeEditUsersPage', params: getRouterParams() }" class="button cancel">
                        <span class="icon-cancel"></span><span>Cancel changes</span>
                    </router-link>
                    <button type="button" :class="['button delete', {'disabled': !this.$route.params.userId}]" :disabled="!this.$route.params.userId" @click="deleteUser()">
                        <span class="icon-remove-user"></span><span>Delete user</span>
                    </button>
                    <router-link :to="{ name: 'CmdEditModeEditUsersPage', params: {language: this.$store.state.language }}" class="button">
                        <span class="icon-single-arrow-left"></span><span>Back to list of users</span>
                    </router-link>
                </div>
            </div>
            <CmdSlideButton v-if="allUsers.length" @click.prevent="switchToUser('next')" :slideButtons="nextUser"></CmdSlideButton>
        </div>
    </CmdWidthLimitationWrapper>
</template>

<script>
// import components from comand-component-library
import CmdFakeSelect from "comand-component-library/src/components/CmdFakeSelect"
import CmdFormElement from "comand-component-library/src/components/CmdFormElement"
import CmdMainHeadline from "comand-component-library/src/components/CmdMainHeadline"
import CmdSlideButton from "comand-component-library/src/components/CmdSlideButton"
import CmdSwitchButton from "comand-component-library/src/components/CmdSwitchButton"
import CmdWidthLimitationWrapper from "comand-component-library/src/components/CmdWidthLimitationWrapper"

// import backend-client from cms
import {CmsBackendClient} from "../../client/CmsClient"

// import utilities
import {fullName} from "../../utilities/user"
import {navigateTo} from "../../utilities/router"

// import mixins
import GetRouterParams from "../../mixins/GetRouterParams"

export default {
    name: "CmdEditModeEditUserDetails",
    data() {
        return {
            userDetail: {},
            allUsers: [],
            indexOfUser: 0,
            password: "",
            passwordRepeat: ""
        }
    },
    components: {
        CmdFakeSelect,
        CmdFormElement,
        CmdMainHeadline,
        CmdSlideButton,
        CmdSwitchButton,
        CmdWidthLimitationWrapper
    },
    mixins: [
        GetRouterParams
    ],
    computed: {
        previousUser() {
            let userNumber = 0
            if(this.indexOfUser === 0) {
                userNumber = this.allUsers.length
            } else {
                userNumber = this.indexOfUser
            }
            return {
                prev: {
                    iconClass: "icon-single-arrow-left",
                    tooltip: "Previous user (#" + userNumber + "/" + this.allUsers.length + ")"
                }
            }
        },
        nextUser() {
            let userNumber = 0
            if(this.indexOfUser + 1 === this.allUsers.length) {
                userNumber = 1
            } else {
                userNumber = this.indexOfUser + 2
            }
            return {
                next: {
                    iconClass: "icon-single-arrow-right",
                    tooltip: "Next user (#" + userNumber + "/" + this.allUsers.length + ")"
                }
            }
        },
        userGroups() {
            return this.$store.state.userGroups.filter(userGroup => userGroup.active)
        }
    },
    created() {
        // get userId (= email-address) from URL-/router-parameter
        let userId = this.$route.params.userId

        // if no userId exists, reset all fields (to create new user)
        if (!userId) {
            this.resetUserData()
            return
        }

        // load all users
        new CmsBackendClient().loadUsers()
            .then(responseData => {
                // assign all users to data-property
                this.allUsers = responseData

                // iterate over responseData with find()
                let loadedUserDetail = responseData.find((user, index) => {
                    if (user.email === userId) {
                        this.indexOfUser = index
                        return true
                    }
                    return false
                })

                // check if user exists
                if (loadedUserDetail === undefined) {
                    this.$store.commit("systemMessage", {status: "error", message: "User not found!"})

                    // go to page edit-users
                    this.$router.push({name: 'CmdEditModeEditUsersPage'})
                    return
                }

                /* call replaceNull method to replace null by string to avoid console-error for CmdFormElement
                   and assign to data-property (to keep method clean) */
                this.userDetail = this.replaceNull(loadedUserDetail)
            })
            .catch(error => {
                this.$store.commit("systemMessage", {status: "error", message: "The users could not be loaded!"})
                console.error(error)
            })
    },
    methods: {
        blurRepeatPassword() {
            this.checkPasswords()
        },
        checkPasswords() {
            if(this.password !== this.passwordRepeat) {
                this.$store.commit("systemMessage", {status: "error", message: "Passwords do not match!"})
                document.querySelector("#repeat-password").focus()
                return false
            }
            return true
        },
        resetUserData() {
            // if userId empty set userDetail-keys to empty
            this.userDetail = {
                salutation: "mr",
                firstName: "",
                lastName: "",
                groups: ["USER"],
                email: "",
                telephone: "",
                mobilephone: "",
                fax: "",
                website: "",
                street: "",
                zip: "",
                city: "",
                country: "de",
                active: false
            }

            // password will not be send with userDetail-information from backend
            this.password = ""
            this.passwordRepeat = ""
        },
        updateChanges() {
            // check if checkPassword returns true (else return)
            if(!this.checkPasswords()) {
                return
            }

            // update current user
            if (this.userDetail.id) {
                if(this.password) {
                    // add password to userDetail to save it
                    this.userDetail.password = this.password
                }

                new CmsBackendClient().updateUser(this.userDetail)
                    .then(() => {
                        this.$store.commit("systemMessage", {status: "success", message: "The user " + fullName(this.userDetail) + " has been saved!"})
                        navigateTo("CmdEditModeEditUsersPage")
                    })
                    .catch(error => {
                        this.$store.commit("systemMessage", {status: "error", message: "The changes for user " + fullName(this.userDetail) + " could not be saved!"})
                        console.error(error)
                    })
            }

            // create new user
            else {
                // add password to userDetail to save it
                this.userDetail.password = this.password

                new CmsBackendClient().createUser(this.userDetail)
                    .then(() => {
                        this.$store.commit("systemMessage", {status: "success", message: "The user " + fullName(this.userDetail) + " has been created!"})
                        this.$router.push({name: 'CmdEditModeEditUsersPage'})
                    })
                    .catch(error => {
                        this.$store.commit("systemMessage", {status: "error", message: "The changes for " + fullName(this.userDetail) + " could not be saved!"})
                        console.error(error)
                    })
            }


        },
        deleteUser() {
            if (!confirm("Delete profile of " + fullName(this.userDetail) + " completely?")) {
                return
            }

            new CmsBackendClient().deleteUser(this.userDetail.id)
                .then(() => {
                    this.$store.commit("systemMessage", {status: "success", message: "The user " + fullName(this.userDetail) + " has been deleted successfully!"})
                    this.$router.push({name: 'CmdEditModeEditUsersPage'})
                })
                .catch(error => {
                    this.$store.commit("systemMessage", {status: "error", message: "The changes for user " + fullName(this.userDetail) + " could not be deleted!"})
                    console.error(error)
                })
        },
        replaceNull(userData) {
            // assign copy of loadedUserDetail to data-property
            const userEntry = JSON.parse(JSON.stringify(userData))

            this.password = ""
            this.passwordRepeat = ""

            for (const key in userEntry) {
                if (userEntry[key] === null) {
                    userEntry[key] = ""
                }
            }
            return userEntry
        },
        switchToUser(direction) {
            if (direction === 'next') {
                if (this.indexOfUser < this.allUsers.length - 1) {
                    this.indexOfUser++
                } else {
                    this.indexOfUser = 0
                }
            } else {
                if (this.indexOfUser > 0) {
                    this.indexOfUser--
                } else {
                    this.indexOfUser = this.allUsers.length - 1
                }
            }

            /* call replaceNull method to replace null by string to avoid console-error for CmdFormElement
             and assign to data-property (to keep method clean) */
            this.userDetail = this.replaceNull(this.allUsers[this.indexOfUser])
        }
    },
    watch: {
        $route() {
            if (!this.$route.params.userId) {
                this.resetUserData()
                this.allUsers = []
            }
        }
    }
}
</script>

<style lang="scss">
#user-details {
    .cmd-slide-button {
        position: relative;
    }

    .image-wrapper {
        > img {
            width: 5rem;
            height: 5rem;
            background: var(--pure-white);
        }

        > span[class*="icon"] {
            display: inline-flex;
            font-size: 7rem;
            padding: 2rem;
            border: var(--default-border);
            background: var(--pure-white);
        }
    }

    .button-wrapper {
        > *:last-child {
          margin-right: auto;
        }
    }
}
</style>