<template>
    <CmdWidthLimitationWrapper>
        <CmdMainHeadline main-headline="Edit user details"/>
        <div class="flex-container no-gap" id="user-details">
            <CmdSlideButton @click.prevent="switchToUser('prev')" slideButtonType="prev" :slideButtons="previousUser"></CmdSlideButton>
            <div class="flex-container vertical">
                <fieldset class="flex-container">
                    <!--
                    <legend v-if="$route.params.userId">Details for user: {{ fullName() }}</legend>
                    <legend v-else>Details for new user</legend>
                    -->
                    <div class="flex-container">
                        <div class="flex-container vertical">
                            <h2>Name</h2>
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
                        </div>
                        <div class="flex-container vertical">
                            <h2>Groups</h2>
                            <div class="label">
                                <span>Assigned groups:</span>
                                <span class="flex-container no-flex">
                                    <template v-for="(group, index) in userGroups" :key="index">
                                        <CmdFormElement element="input" type="checkbox" :replace-input-type="true" :labelText="group.name" :inputValue="group.id" v-model:value="userDetail.groups"/>
                                    </template>
                                </span>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div class="flex-container">
                        <div class="flex-container vertical">
                            <h2>Contact</h2>
                            <CmdFormElement element="input" type="email" labelText="Email address:" v-model:value="userDetail.email" placeholder="Email address" required="required"/>
                            <CmdFormElement element="input" type="tel" labelText="Telephone:" v-model:value="userDetail.telephone" placeholder="Telephone number"/>
                            <CmdFormElement element="input" type="tel" labelText="Mobile phone:" v-model:value="userDetail.mobilephone" placeholder="Mobile phone number"/>
                            <CmdFormElement element="input" type="email" labelText="Fax:" v-model:value="userDetail.fax" placeholder="Fax number"/>
                            <CmdFormElement element="input" type="url" labelText="Website:" v-model:value="userDetail.website" placeholder="URL to website"/>
                        </div>
                        <div class="flex-container vertical">
                            <h2>Address</h2>
                            <CmdFormElement element="input" type="text" labelText="Street/No:" v-model:value="userDetail.street" placeholder="Street"/>
                            <div class="flex-contaier input-wrapper">
                                <CmdFormElement element="input" type="text" labelText="Zip:" v-model:value="userDetail.zip" placeholder="Zip"/>
                                <CmdFormElement element="input" type="text" labelText="City:" v-model:value="userDetail.city" placeholder="City"/>
                            </div>
                            <CmdFakeSelect type="country" labelText="Country:" pathFlags="/media/images/flags" v-model:value="userDetail.country" :select-data='[
                                {
                                "isoCode": "cn",
                                "countryName": "China",
                                },
                                {
                                "isoCode": "de",
                                "countryName": "Germany",
                                },
                                {
                                "isoCode": "en",
                                "countryName": "United Kingdom",
                                },
                                {
                                "isoCode": "es",
                                "countryName": "Spain",
                                },
                                {
                                "isoCode": "fr",
                                "countryName": "France",
                                },
                                {
                                "isoCode": "it",
                                "countryName": "Italy",
                                },
                                {
                                "isoCode": "ru",
                                "countryName": "Russia",
                                }
                            ]'/>
                        </div>
                    </div>
                </fieldset>
                <div class="button-wrapper">
                    <button type="button" class="button add" @click="updateChanges()">
                        <span class="icon-check"></span><span>Save changes</span>
                    </button>
                    <router-link :to="{ name: 'CmdEditModeEditUsersPage' }" class="button cancel">
                        <span class="icon-cancel"></span><span>Cancel changes</span>
                    </router-link>
                    <button type="button" class="button delete" @click="deleteUser()">
                        <span class="icon-remove-user"></span><span>Delete user</span>
                    </button>
                </div>
            </div>
            <CmdSlideButton @click.prevent="switchToUser('next')" :slideButtons="nextUser"></CmdSlideButton>
        </div>
    </CmdWidthLimitationWrapper>
</template>

<script>
// import components from comand-component-library
import CmdFakeSelect from "comand-component-library/src/components/CmdFakeSelect"
import CmdFormElement from "comand-component-library/src/components/CmdFormElement"
import CmdMainHeadline from "comand-component-library/src/components/CmdMainHeadline"
import CmdSlideButton from "comand-component-library/src/components/CmdSlideButton"
import CmdWidthLimitationWrapper from "comand-component-library/src/components/CmdWidthLimitationWrapper"

// import backend-client from cms
import {CmsBackendClient} from "../../client/CmsClient"

// import utilities
import {fullName} from "../../utilities/user"

export default {
    name: "CmdEditModeEditUserDetails",
    data() {
        return {
            userDetail: {},
            userGroups: [],
            allUsers: [],
            indexOfUser: 0
        }
    },
    components: {
        CmdFakeSelect,
        CmdFormElement,
        CmdMainHeadline,
        CmdSlideButton,
        CmdWidthLimitationWrapper,
    },
    computed: {
        previousUser() {
            return {
                prev: {
                    iconClass: "icon-single-arrow-left",
                    tooltip: "Previous User (#" + this.indexOfUser - 1 + ")"
                }
            }
        },
        nextUser() {
            return {
                next: {
                    iconClass: "icon-single-arrow-right",
                    tooltip: "Next User (#" + this.indexOfUser + 1 + ")"
                }
            }
        }
        /*
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
        }*/
    },
    created() {
        // get userId (= email-address) from URL-/router-parameter
        let userId = this.$route.params.userId

        // load active user groups
        new CmsBackendClient().loadUserGroups()
            .then(responseData =>
                // check for active-flag in userGroups-array with filter() and assign to data-property
                this.userGroups = responseData.filter(userGroup => userGroup.active)
            )
            .catch(error => {
                this.$store.commit("systemMessage", {status: "error", message: "The user groups could not be loaded!"})
                console.error(error)
            })

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

                console.log("loadedUserDetail: ", loadedUserDetail)

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
                country: "de"
            }
        },
        updateChanges() {
            // update current user
            if (this.userDetail.id) {
                new CmsBackendClient().updateUser(this.userDetail)
                    .then(() => {
                        this.$store.commit("systemMessage", {status: "success", message: "The user " + fullName(this.userDetail) + " has been saved!"})
                    })
                    .catch(error => {
                        this.$store.commit("systemMessage", {status: "error", message: "The changes for user " + fullName(this.userDetail) + " could not be saved!"})
                        console.error(error)
                    })
            }

            // create new user
            else {
                new CmsBackendClient().createUser(this.userDetail)
                    .then(() => {
                        this.$store.commit("systemMessage", {status: "success", message: "The user " + this.userDetail.fullName() + " has been created!"})
                    })
                    .catch(error => {
                        this.$store.commit("systemMessage", {status: "error", message: "The changes for " + this.userDetail.fullName() + " could not be saved!"})
                        console.error(error)
                    })
            }
        },
        deleteUser() {
            if (!confirm("Delete profile of " + this.userDetail.fullName() + " completely?")) {
                return
            }

            new CmsBackendClient().deleteUser(this.userDetail.id)
                .then(() => {
                    this.$store.commit("systemMessage", {status: "success", message: "The user " + this.userDetail.fullName() + " has been deleted successfully!"})
                    this.$router.push({name: 'CmdEditModeEditUsersPage'})
                })
                .catch(error => {
                    this.$store.commit("systemMessage", {status: "error", message: "The changes for user " + this.userDetail.fullName() + " could not be deleted!"})
                    console.error(error)
                })
        },
        replaceNull(userData) {
            // assign copy of loadedUserDetail to data-property
            const userEntry = JSON.parse(JSON.stringify(userData))

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
}
</style>