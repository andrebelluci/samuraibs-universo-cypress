import dashPage from '../support/pages/dash'
import { customer, provider, appointment } from '../support/factories/dash'

describe('dashboard', function () {

    context('quando o cliente terceira pessoa faz o agendamento mobile', function () {

        before(function () {
            cy.postUser(provider)
            cy.postUser(customer)

            cy.apiLogin(customer)            
            cy.setProviderId(provider.email)
            cy.createAppointment(appointment.hour)

            //Loga no relatório do Cypress, não no Console do navegador
            //cy.log('Conseguimos pegar o token ' + Cypress.env('apiToken'))
        })

        it('o mesmo deve ser exibido no dashboard', function () {
            const date = Cypress.env('appointmentDate')

            //Login com App Actions
            //cy.uiLogin(provider)
            //Login com local Storage
            cy.apiLogin(provider, true)

            dashPage.calendarShouldBeVisible()
            dashPage.selectDay(date)
            dashPage.appointmentShouldBeVisible(customer, appointment.hour)
        })
    })
})