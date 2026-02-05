
const { pathToFileURL: pathToFileURLAdminPanel } = require('url')

const AuthManager = require('./assets/js/authmanager')
const Lang = require('./assets/js/langloader')



const crypto = require('crypto')
const { pathToFileURL: pathToFileURLAdminPanel } = require('url')

const Lang = require('./assets/js/langloader')

const fs = require('fs-extra')
const path = require('path')
const crypto = require('crypto')





const { pathToFileURL: pathToFileURLAdminPanel } = require('url')

const AuthManager = require('./assets/js/authmanager')
const ConfigManager = require('./assets/js/configmanager')
const Lang = require('./assets/js/langloader')



const { pathToFileURL } = require('url')

const AuthManager = require('./assets/js/authmanager')
const ConfigManager = require('./assets/js/configmanager')

const Lang = require('./assets/js/langloader')







const adminPanelCancelContainer = document.getElementById('adminPanelCancelContainer')
const adminPanelCancelButton = document.getElementById('adminPanelCancelButton')
const adminPanelLoginSection = document.getElementById('adminPanelLoginSection')
const adminPanelManageSection = document.getElementById('adminPanelManageSection')

const adminLoginUsername = document.getElementById('adminLoginUsername')
const adminLoginPassword = document.getElementById('adminLoginPassword')
const adminLoginButton = document.getElementById('adminLoginButton')
const adminLoginError = document.getElementById('adminLoginError')

const offlineAccountUsername = document.getElementById('offlineAccountUsername')
const offlineAccountPassword = document.getElementById('offlineAccountPassword')
const offlineAccountSkin = document.getElementById('offlineAccountSkin')
const offlineAccountCreateButton = document.getElementById('offlineAccountCreateButton')
const adminCreateError = document.getElementById('adminCreateError')
const adminOfflineAccountsList = document.getElementById('adminOfflineAccountsList')


window.adminPanelViewOnCancel = typeof VIEWS !== 'undefined' ? VIEWS.loginOptions : null
window.adminPanelCancelHandler = null

const validUsername = /^[a-zA-Z0-9_]{1,16}$/
let adminToken = null

function getSkinPreviewPath(account) {


window.adminPanelViewOnCancel = typeof VIEWS !== 'undefined' ? VIEWS.loginOptions : null
window.adminPanelCancelHandler = null

const OFFLINE_API_BASE = 'https://backend-nho6.onrender.com'
const validUsername = /^[a-zA-Z0-9_]{1,16}$/
let adminToken = null


window.adminPanelViewOnCancel = typeof VIEWS !== 'undefined' ? VIEWS.loginOptions : null
window.adminPanelCancelHandler = null



window.adminPanelViewOnCancel = typeof VIEWS !== 'undefined' ? VIEWS.loginOptions : null
window.adminPanelCancelHandler = null


window.adminPanelViewOnCancel = VIEWS.loginOptions
window.adminPanelCancelHandler = null


window.adminPanelViewOnCancel = VIEWS.loginOptions
window.adminPanelCancelHandler = null

let adminPanelViewOnCancel = VIEWS.loginOptions
let adminPanelCancelHandler





const ADMIN_USERNAME = 'admin'
const ADMIN_PASSWORD = 'rp123'
const validUsername = /^[a-zA-Z0-9_]{1,16}$/


function generateOfflineUUID(username) {
    const md5 = crypto.createHash('md5').update(`OfflinePlayer:${username}`).digest('hex')
    return `${md5.substring(0, 8)}-${md5.substring(8, 12)}-${md5.substring(12, 16)}-${md5.substring(16, 20)}-${md5.substring(20)}`
}

function getSkinPreviewPath(account) {


    const skinPath = account.skinPath ?? account.skin_url ?? account.skinUrl
    if(skinPath) {
        if(/^https?:\/\//.test(skinPath)) {
            return skinPath
        }
        return pathToFileURLAdminPanel(skinPath).toString()


    if(account.skinPath) {

        return pathToFileURLAdminPanel(account.skinPath).toString()


        return pathToFileURLAdminPanel(account.skinPath).toString()


        return pathToFileURLAdminPanel(account.skinPath).toString()

        return pathToFileURL(account.skinPath).toString()




    }
    return `https://mc-heads.net/head/${account.uuid}/40`
}

function adminPanelCancelEnabled(val){
    if(val){
        $(adminPanelCancelContainer).show()
    } else {
        $(adminPanelCancelContainer).hide()
    }
}

window.adminPanelCancelEnabled = adminPanelCancelEnabled



window.adminPanelCancelEnabled = adminPanelCancelEnabled



window.adminPanelCancelEnabled = adminPanelCancelEnabled


window.adminPanelCancelEnabled = adminPanelCancelEnabled



window.adminPanelCancelEnabled = adminPanelCancelEnabled


window.adminPanelCancelEnabled = adminPanelCancelEnabled







function resetAdminPanel(){
    adminPanelLoginSection.style.display = ''
    adminPanelManageSection.style.display = 'none'
    adminLoginUsername.value = ''
    adminLoginPassword.value = ''
    offlineAccountUsername.value = ''
    offlineAccountPassword.value = ''
    offlineAccountSkin.value = ''
    adminLoginError.style.opacity = 0
    adminCreateError.style.opacity = 0



    adminToken = null
}

async function populateOfflineAccounts() {

    const accounts = await AuthManager.getOnlineOfflineAccounts()

    const response = await fetch(`${OFFLINE_API_BASE}/offline-accounts`)
    if(!response.ok) {
        throw new Error('Failed to load offline accounts.')
    }
    const accounts = await response.json()

    if(accounts.length === 0) {
        adminOfflineAccountsList.innerHTML = `<span class="adminPanelEmpty">${Lang.queryJS('adminPanel.noOfflineAccounts')}</span>`
        return
    }
    adminOfflineAccountsList.innerHTML = accounts.map((account) => {


}

function populateOfflineAccounts() {
    const accounts = ConfigManager.getOfflineAccounts()
    const accountKeys = Object.keys(accounts)
    if(accountKeys.length === 0) {
        adminOfflineAccountsList.innerHTML = `<span class="adminPanelEmpty">${Lang.queryJS('adminPanel.noOfflineAccounts')}</span>`
        return
    }
    adminOfflineAccountsList.innerHTML = accountKeys.map((key) => {
        const account = accounts[key]


        return `<div class="adminPanelAccountRow">
            <img class="adminPanelAccountAvatar" src="${getSkinPreviewPath(account)}" alt="${account.username}">
            <div class="adminPanelAccountMeta">
                <div class="adminPanelAccountName">${account.username}</div>
                <div class="adminPanelAccountUUID">${account.uuid}</div>
            </div>
        </div>`
    }).join('')
}

adminPanelCancelButton.onclick = () => {














    switchView(getCurrentView(), window.adminPanelViewOnCancel, 500, 500, () => {
        resetAdminPanel()
        adminPanelCancelEnabled(false)
        if(window.adminPanelCancelHandler != null){
            window.adminPanelCancelHandler()
            window.adminPanelCancelHandler = null



        }
    })
}

adminLoginButton.onclick = async () => {
    const username = adminLoginUsername.value.trim()
    const password = adminLoginPassword.value
    try {

        adminToken = await AuthManager.loginOfflineAdmin(username, password)

        const response = await fetch(`${OFFLINE_API_BASE}/admin/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        if(!response.ok) {
            adminLoginError.style.opacity = 1
            return
        }
        const data = await response.json()
        adminToken = data.token

        adminLoginError.style.opacity = 0
        adminPanelLoginSection.style.display = 'none'
        adminPanelManageSection.style.display = ''
        await populateOfflineAccounts()
        return
    } catch (err) {
        adminLoginError.style.opacity = 1
    }
}

offlineAccountCreateButton.onclick = async () => {






    switchView(getCurrentView(), adminPanelViewOnCancel, 500, 500, () => {
        resetAdminPanel()
        adminPanelCancelEnabled(false)
        if(adminPanelCancelHandler != null){
            adminPanelCancelHandler()
            adminPanelCancelHandler = null




        }
    })
}

adminLoginButton.onclick = () => {
    const username = adminLoginUsername.value.trim()
    const password = adminLoginPassword.value
    if(username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        adminLoginError.style.opacity = 0
        adminPanelLoginSection.style.display = 'none'
        adminPanelManageSection.style.display = ''
        populateOfflineAccounts()
        return
    }
    adminLoginError.style.opacity = 1
}

offlineAccountCreateButton.onclick = () => {

    const username = offlineAccountUsername.value.trim()
    const password = offlineAccountPassword.value
    if(!validUsername.test(username) || !password) {
        adminCreateError.innerText = Lang.queryJS('adminPanel.createError')
        adminCreateError.style.opacity = 1
        return
    }

    try {
        await AuthManager.createOnlineOfflineAccount(adminToken, username, password, null)


    try {
        const response = await fetch(`${OFFLINE_API_BASE}/admin/offline-accounts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${adminToken}`
            },
            body: JSON.stringify({
                username,
                password,
                uuid: generateOfflineUUID(username),
                skinUrl: null
            })
        })
        if(!response.ok) {
            const errData = await response.json().catch(() => ({ error: 'Failed to create account.' }))
            throw new Error(errData.error || 'Failed to create account.')
        }

    let skinPath = null
    const skinFile = offlineAccountSkin.files?.[0]
    if(skinFile?.path) {
        const skinUUID = generateOfflineUUID(username)
        const skinsDir = path.join(ConfigManager.getLauncherDirectory(), 'offline-skins')
        fs.ensureDirSync(skinsDir)
        skinPath = path.join(skinsDir, `${skinUUID}.png`)
        fs.copyFileSync(skinFile.path, skinPath)
    }
    try {
        AuthManager.createOfflineAccount(username, password, skinPath)


        adminCreateError.style.opacity = 0
        offlineAccountUsername.value = ''
        offlineAccountPassword.value = ''
        offlineAccountSkin.value = ''

        await populateOfflineAccounts()


        await populateOfflineAccounts()

        populateOfflineAccounts()


    } catch (err) {
        adminCreateError.innerText = err.message
        adminCreateError.style.opacity = 1
    }
}
