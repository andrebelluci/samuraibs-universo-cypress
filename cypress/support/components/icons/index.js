import { el } from './elements'

class Icons {
    shouldBeVisible(order) {
        cy.get(el.icon)
            .eq(order)
            .should('be.visible')
    }
}

export default new Icons()