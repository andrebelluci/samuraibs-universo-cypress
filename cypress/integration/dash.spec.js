import loginPage from '../support/pages/login'
import dashPage from '../support/pages/dash'
import { customer, provider, appointment } from '../support/factories/dash'

describe('dashboard', function () {

    context('quando o cliente terceira pessoa faz o agendamento mobile', function () {

        before(function () {
            cy.postUser(provider)
            cy.postUser(customer)

            cy.apiLogin(customer)
            //Loga no relatório do Cypress, não no Console do navegador
            //cy.log('Conseguimos pegar o token ' + Cypress.env('apiToken'))

            cy.setProviderId(provider.email)
            cy.createAppointment(appointment.hour)
        })

        it('o mesmo deve ser exibido no dashboard', function () {
            loginPage.go()
            loginPage.form(provider)
            loginPage.submit()

            dashPage.calendarShouldBeVisible()

            const day = Cypress.env('appointmentDay')
            dashPage.selectDay(day)

            dashPage.appointmentShouldBeVisible(customer, appointment.hour)
        })
    })
})