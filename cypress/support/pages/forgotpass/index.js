import { el } from './elements'
import toast from '../../components/toast'

class RecoverPage {

    //função executada automaticamente
    constructor() {
        this.toast = toast
    }

    go() {
        cy.visit('/forgot-password')
    }

    form(email) {
        cy.get(el.email)
            .type(email)
    }

    recover(){
        cy.get(el.recoverButton)
            .click()
    } 
    
    alertHaveText(expectedText) {
        cy.contains('.alert-error', expectedText)
            .should('be.visible')
    }
}

export default new RecoverPage()