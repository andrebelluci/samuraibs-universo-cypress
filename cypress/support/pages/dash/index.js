import toast from '../../components/toast'
import icons from '../../components/icons'
import { el } from './elements'

class DashPage {
    constructor() {
        this.toast = toast
        this.icons = icons
    }
    
    welcome(expectedText) {
        cy.contains(el.welcome, 'Bem-vindo,')
            .should('be.visible')
        cy.contains(el.name, expectedText)
            .should('have.text', expectedText)
    }
}

export default new DashPage()

