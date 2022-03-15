import { el } from './elements'
import toast from '../../components/toast'
import icons from '../../components/icons'


class LoginPage {

    //função executada automaticamente
    constructor() {
        this.toast = toast
        this.icons = icons
    }

    go() {
        cy.visit('/')
    }

    form(user) {
        cy.get(el.email)
            .type(user.email)
        cy.get(el.password)
            .type(user.password)
    }

    login(){
        cy.contains(el.loginButton)
            .click()
    } 
    
    alertHaveText(expectedText) {
        cy.contains('.alert-error', expectedText)
            .should('be.visible')
    }
}

export default new LoginPage()