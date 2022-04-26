import { el } from './elements'

class Toast {
    shouldHaveText(expectText) {
        cy.get(el.toast)
            .should('be.visible')
            //screenshot de elemento com animação sai com a animação 100% visível
            .should('have.css', 'opacity', '1')
            .find('p')
            .should('have.text', expectText)
    }
}

export default new Toast()