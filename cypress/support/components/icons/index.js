import { el } from './elements'

class Icons {
    shouldBeVisible() {
        cy.get(el.icon)
            .should('be.visible')
    }
}

export default new Icons()