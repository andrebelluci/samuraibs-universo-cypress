class DashPage {

    welcome(expectedText) {
        cy.contains('div span', 'Bem-vindo,')
            .should('be.visible')
        cy.contains('a strong', expectedText)
            .should('have.text', expectedText)
    }
}

export default new DashPage()

