const { CopyResponse } = require("pg-protocol/dist/messages")
import loginPage from '../support/pages/login'
import dashPage from '../support/pages/dash'

describe('dashboard', function () {

    context('quando o cliente terceira pessoa faz o agendamento mobile', function () {

        const data = {
            customer: {
                name: 'André Cliente',
                email: 'andre.cliente@gmail.com',
                password: 'pwd123',
                is_provider: false
            },
            provider: {
                name: 'André Samurai',
                email: 'andre.samurai@samuraibs.com',
                password: 'pwd123',
                is_provider: true
            },
            appointmentHour: '14:00'
        }

        before(function () {
            cy.postUser(data.provider)
            cy.postUser(data.customer)

            cy.apiLogin(data.customer)
            //Loga no relatório do Cypress, não no Console do navegador
            //cy.log('Conseguimos pegar o token ' + Cypress.env('apiToken'))
        
            cy.setProviderId(data.provider.email)
            cy.createAppointment(data.appointmentHour)            
        })

        it('o mesmo deve ser exibido no dashboard', function () {
            loginPage.go()
            loginPage.form(data.provider)
            loginPage.submit()

            dashPage.calendarShouldBeVisible()

            const day = Cypress.env('appointmentDay')
            dashPage.selectDay(day)

            dashPage.appointmentShouldBeVisible(data.customer, data.appointmentHour)
        })
    })
})