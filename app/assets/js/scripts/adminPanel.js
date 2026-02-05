const { pathToFileURL: pathToFileURLAdminPanel } = require('url')

const AuthManager = require('./assets/js/authmanager')
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
    const skinPath = account.skinPath ?? account.skin_url ?? account.skinUrl
    if(skinPath) {
        if(/^https?:\/\//.test(skinPath)) {
            return skinPath
        }
        return pathToFileURLAdminPanel(skinPath).toString()
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
    if(accounts.length === 0) {
        adminOfflineAccountsList.innerHTML = `<span class="adminPanelEmpty">${Lang.queryJS('adminPanel.noOfflineAccounts')}</span>`
        return
    }
    adminOfflineAccountsList.innerHTML = accounts.map((account) => {
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
    const username = offlineAccountUsername.value.trim()
    const password = offlineAccountPassword.value
    if(!validUsername.test(username) || !password) {
        adminCreateError.innerText = Lang.queryJS('adminPanel.createError')
        adminCreateError.style.opacity = 1
        return
    }
    try {
        await AuthManager.createOnlineOfflineAccount(adminToken, username, password, null)
        adminCreateError.style.opacity = 0
        offlineAccountUsername.value = ''
        offlineAccountPassword.value = ''
        offlineAccountSkin.value = ''
        await populateOfflineAccounts()
    } catch (err) {
        adminCreateError.innerText = err.message
        adminCreateError.style.opacity = 1
    }
}
