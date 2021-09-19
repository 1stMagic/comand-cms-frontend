import axios from "axios"
import store from "../store"

class CmsClient {
    #baseUrl
    #site

    constructor(baseUrl = null, site = null) {
        this.#baseUrl = baseUrl || store.state.site?.api?.baseUrl
        this.#site = site || store.state.site?.name
    }

    get(url, options = null) {
        return this.#doRequest(axios.get(this.buildUrl(url), this.buildRequestOptions(options)))
    }

    post(url, data = null, options = null) {
        return this.#doRequest(axios.post(this.buildUrl(url), data, this.buildRequestOptions(options)))
    }

    put(url, data = null, options = null) {
        return this.#doRequest(axios.put(this.buildUrl(url), data, this.buildRequestOptions(options)))
    }

    delete(url, options = null) {
        return this.#doRequest(axios.delete(this.buildUrl(url), this.buildRequestOptions(options)))
    }

    buildUrl(url, searchParams = {}) {
        let resolvedUrl = url;
        if (typeof url === "function") {
            resolvedUrl = url.call(this, this.#baseUrl, this.#site)
        }
        if (!(resolvedUrl instanceof URL)) {
            resolvedUrl = new URL(resolvedUrl.replace("{site}", encodeURIComponent(this.#site)), this.#baseUrl)
        }
        Object.entries(searchParams || {})
            .forEach(([name, value]) => resolvedUrl.searchParams.set(name, value))
        return resolvedUrl.href
    }

    buildRequestOptions(options = null) {
        const requestOptions = options ? JSON.parse(JSON.stringify(options)) : {}
        if (store.state.language && (!requestOptions.headers || !requestOptions.headers["Accept-Language"])) {
            requestOptions.headers = requestOptions.headers || {}
            requestOptions.headers["Accept-Language"] = store.state.language
        }
        return requestOptions
    }

    static #parseResponse(response) {
        if (response.success) {
            return response.payload
        }
        throw new Error(response.messages)
    }

    #doRequest(request) {
        return request
            .then(response => response.data)
            .then(CmsClient.#parseResponse)
            .catch(error => {
                if (error?.response?.data?.messages) {
                    throw new Error(error.response.data.messages.join("\n"))
                }
                throw new Error(error)
            })
    }
}

export class CmsFrontendClient {
    #client

    constructor(baseUrl = null, site = null) {
        this.#client = new CmsClient(baseUrl, site)
    }

    loadSite() {
        return this.#client.get("sites/{site}")
    }

    loadPage(pageName) {
        return this.#client.get(
            this.#client.buildUrl(
                "pages/of-site/{site}",
                {relativePagePath: pageName.replace(/\.html$/, "")}))
    }
}

export class CmsBackendClient {
    #client

    constructor(baseUrl = null, site = null) {
        this.#client = new CmsClient(baseUrl, site)
    }

    loadSiteNavigation() {
        return this.#client.get(`backend/sites/{site}/navigation`)
    }

    createTopNavigationPage(title, afterPageId = null, parentId = null) {
        return this.createPage(title, { showInTopNavigation: true }, afterPageId, parentId)
    }

    createMainNavigationPage(title, afterPageId = null, parentId = null) {
        return this.createPage(title, { showInMainNavigation: true }, afterPageId, parentId)
    }

    createFooterNavigationPage(title, afterPageId = null, parentId = null) {
        return this.createPage(title, { showInFooterNavigation: true }, afterPageId, parentId)
    }

    createPage(title, data, afterPageId = null, parentId = null) {
        return this.#client.post("backend/pages/{site}", {
            ...(data || {}),
            parentId,
            afterPageId,
            title: {
                [store.state.language]: title
            }
        })
    }

    updateActiveState(pageId, active) {
        return this.#client.put(`backend/pages/{site}/${encodeURIComponent(pageId)}`, {active})
    }

    updatePageTitle(pageId, title) {
        return this.#client.put(`backend/pages/{site}/${encodeURIComponent(pageId)}`, {
            mainNavigationTitle: {
                [store.state.language]: title
            }
        })
    }

    updatePage(pageId, data) {
        return this.#client.put(`backend/pages/{site}/${encodeURIComponent(pageId)}`, data)
    }

    clonePage(pageId) {
        return this.#client.post(`backend/pages/{site}/clone/${encodeURIComponent(pageId)}`, {
            afterPageId: pageId,
            showInMainNavigation: true
        })
    }

    deletePage(pageId) {
        return this.#client.delete(`backend/pages/{site}/${encodeURIComponent(pageId)}`)
    }

    loadPage(pageId) {
        return this.#client.get(`backend/pages/{site}/${encodeURIComponent(pageId)}`)
    }

    //user groups
    loadUserGroups() {
        return this.#client.get("backend/sites/{site}/user-groups")
    }

    updateUserGroupActiveState(userGroupId, active) {
        console.log("userGroupId: " + userGroupId + "\nactive: " + active)
        return Promise.resolve(true)
    }

    deleteUserGroup(userGroupId) {
        console.log("userGroupId: " + userGroupId)
        return Promise.resolve(true)
    }

    updateUserGroup(userGroupId) {
        console.log("userGroupId: " + userGroupId)
        return Promise.resolve(true)
    }

    createUserGroup(userGroupId) {
        console.log("userGroupId: " + userGroupId)
        return Promise.resolve(true)
    }

    //users
    loadUsers() {
        return this.#client.get("backend/sites/{site}/users")
    }

    saveUserDetail(userDetail) {
        console.log("userDetail: ", userDetail)
        return Promise.resolve(true)
    }
}
