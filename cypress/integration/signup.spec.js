//import faker from '@faker-js/faker'
import signupPage from '../support/pages/signup'
import { loginSuccess, loginDup, invalidLogin, shortPassword } from '../support/factories/signup'


describe('cadastro', function () {

    context('quando o usuário é novato', function () {

        before(function () {
            cy.task('removeUser', loginSuccess.email)
                .then(function (result) {
                    console.log(result)
                })
        })

        it('deve cadastrar com sucesso', function () {
            signupPage.go()
            signupPage.form(loginSuccess)
            signupPage.submit()
            signupPage.toast.shouldHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')
        });

    })

    context('quando o e-mail já existe', function () {

        before(function () {
            cy.postUser(loginDup)
        })

        it('não deve cadastrar o usuário', function () {
            signupPage.go()
            signupPage.form(loginDup)
            signupPage.submit()
            signupPage.toast.shouldHaveText('Email já cadastrado para outro usuário.')
        });
    })

    context('quando o e-mail é incorreto', function () {

        it('deve exibir mensagem de alerta', function () {
            signupPage.go()
            signupPage.form(invalidLogin)
            signupPage.submit()
            signupPage.alert.haveText('Informe um email válido')
        })
    })

    context('quando a senha tem menos de 6 caracteres', function () {
        const passwords = [
            '1',
            '1!',
            '@nd',
            '!23$',
            '54321',
        ]

        beforeEach(function () {
            signupPage.go()
        });

        passwords.forEach(function (p) {
            it('deve exibir mensagem de alerta com a senha: ' + p, function () {

                shortPassword.password = p

                signupPage.form(shortPassword)
                signupPage.submit()
            })
        })

        afterEach(function () {
            signupPage.alert.haveText('Pelo menos 6 caracteres')
        });


    })

    context('quando não preencho nenhum dos campos', function () {
        const alertMessages = [
            'Nome é obrigatório',
            'E-mail é obrigatório',
            'Senha é obrigatória'
        ]

        before(function () {
            signupPage.go()
            signupPage.submit()
        })

        alertMessages.forEach(function (alert) {
            it('deve exibir ' + alert.toLowerCase(), function () {
                signupPage.alert.haveText(alert)
            })
        })
    })
})