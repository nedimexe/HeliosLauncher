const loginOptionsCancelContainer = document.getElementById('loginOptionCancelContainer')
const loginOptionOffline = document.getElementById('loginOptionOffline')
const loginOptionAdmin = document.getElementById('loginOptionAdmin')
const loginOptionsCancelButton = document.getElementById('loginOptionCancelButton')

let loginOptionsCancellable = false

let loginOptionsViewOnLoginSuccess
let loginOptionsViewOnLoginCancel
let loginOptionsViewOnCancel
let loginOptionsViewCancelHandler

function loginOptionsCancelEnabled(val){
    if(val){
        $(loginOptionsCancelContainer).show()
    } else {
        $(loginOptionsCancelContainer).hide()
    }
}

loginOptionOffline.onclick = (e) => {
    switchView(getCurrentView(), VIEWS.login, 500, 500, () => {
        loginViewOnSuccess = loginOptionsViewOnLoginSuccess
        loginViewOnCancel = loginOptionsViewOnLoginCancel
        loginCancelEnabled(true)
    })
}

loginOptionAdmin.onclick = (e) => {
    switchView(getCurrentView(), VIEWS.adminPanel, 500, 500, () => {





        if(typeof window.adminPanelViewOnCancel !== 'undefined'){
            window.adminPanelViewOnCancel = loginOptionsViewOnLoginCancel
        }
        if(typeof window.adminPanelCancelEnabled === 'function'){
            window.adminPanelCancelEnabled(true)
        }




        adminPanelViewOnCancel = loginOptionsViewOnLoginCancel
        adminPanelCancelEnabled(true)



    })
}

loginOptionsCancelButton.onclick = (e) => {
    switchView(getCurrentView(), loginOptionsViewOnCancel, 500, 500, () => {
        // Clear login values (Offline login)
        loginUsername.value = ''
        loginPassword.value = ''
        if(loginOptionsViewCancelHandler != null){
            loginOptionsViewCancelHandler()
            loginOptionsViewCancelHandler = null
        }
    })
}
