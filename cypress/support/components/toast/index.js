import { el } from './elements'

class Toast {
    shouldHaveText(expectText) {
        cy.get(el.toast, { timeout: 7000 })
            .should('be.visible')
            .find('p')
            .should('have.text', expectText)

    }
}

export default new Toast()