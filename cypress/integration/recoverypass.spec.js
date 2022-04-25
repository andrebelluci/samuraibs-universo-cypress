import fpPage from '../support/pages/forgotpass'
import rpPage from '../support/pages/resetpass'
import { recoveryAcc } from '../support/factories/recoverypass'

describe('resgate de senha', function () {

    context('quando o usuário esquece a senha', function () {

        before(function () {
            cy.postUser(recoveryAcc)
        })

        it('deve poder resgatar por email', function () {            

            fpPage.go()
            fpPage.form(recoveryAcc.email)
            fpPage.submit()

            const message = 'Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada.'
            fpPage.toast.shouldHaveText(message)
        })

    })

    context('quando o usuário solicita o resgate', function(){

        before(function () {
            cy.postUser(recoveryAcc)
            cy.recoveryPass(recoveryAcc.email)
        })

        it('deve poder cadastrar uma nova senha', function(){
           
            const token = Cypress.env('recoveryToken')
            rpPage.go(token)
            rpPage.form('abc123', 'abc123')
            rpPage.submit()

            const message = 'Agora você já pode logar com a sua nova senha secreta.'
            rpPage.toast.shouldHaveText(message)
        })
    })

})