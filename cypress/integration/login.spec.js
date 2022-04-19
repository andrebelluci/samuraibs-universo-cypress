import loginPage from '../support/pages/login'
import dashPage from '../support/pages/dash'

describe('login', function () {

    context('quando realizar login com credenciais válidas', function () {
        const user = {
            name: 'André Login',
            email: 'andre.login@samuraibs.com',
            password: 'pwd123',
            is_provider: true
        }

        before(function () {
            cy.postUser(user)
        })

        it('deve logar com sucesso', function () {
            loginPage.go()
            loginPage.form(user)
            loginPage.submit()
            dashPage.header.userLoggedIn(user.name)
        })
    })

    context('quando o usuário é válido mas a senha é incorreta', function () {

        //let ao invés de const, constante não pode ter alteração de valor, precisa ser uma variável
        let user = {
            name: 'André IncorrectPass',
            email: 'andre.incopass@samuraibs.com',
            password: 'pwd123',
            is_provider: true
        }

        before(function () {
            cy.postUser(user)
                .then(function () {
                    //Alterar a senha da massa, não no banco
                    user.password = 'abc123'
                })
        })

        it('deve notificar erro de credenciais ', function () {
            loginPage.go()
            loginPage.form(user)
            loginPage.submit()

            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
            loginPage.toast.shouldHaveText(message)
        })

    })

    context('quando o usuário é válido mas algo foi digitado incorretamente', function () {

        //let ao invés de const, constante não pode ter alteração de valor, precisa ser uma variável
        let user = {
            name: 'André IncorrectUser',
            email: 'andre.incouser@samuraibs.com',
            password: 'pwd123',
            is_provider: true
        }

        before(function () {
            cy.postUser(user)
                .then(function () {
                    //Alterar a senha da massa, não no banco
                    user.email = 'andre.incouse@samuraibs.com'
                })
        })

        it('deve notificar erro de credenciais ', function () {
            loginPage.go()
            loginPage.form(user)
            loginPage.submit()

            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
            loginPage.toast.shouldHaveText(message)
        })

    })

    context('quando o e-mail não estiver no formato correto', function () {
        const credentials = [
            { email: 'andr3samuraibs.com', password: 'pwd123', msg: 'faltar arroba' },
            { email: 'andre@samuraibs.', password: 'pwd123', msg: 'não houver nada após o último ponto' },
            { email: '@samuraibs.com', password: 'pwd123', msg: 'faltar usuário do e-mail' }
        ]

        before(function () {
            loginPage.go()
        })

        credentials.forEach(function (c) {
            it('deve exibir alerta informando que o e-mail não é válido quando ' + c.msg, function () {
                loginPage.form(c)
                loginPage.submit()
                loginPage.alert.haveText('Informe um email válido')
            })
        })
    })

    context('quando não preencho nenhum dos campos', function () {
        const alertMessages = [
            'E-mail é obrigatório',
            'Senha é obrigatória'
        ]

        before(function () {
            loginPage.go()
            loginPage.submit()
        })

        alertMessages.forEach(function (alert) {
            it('deve exibir ' + alert.toLowerCase(), function () {
                loginPage.alert.haveText(alert)
            })
        })
    })
})

