import loginPage from '../support/pages/login'
import dashPage from '../support/pages/dash'

describe('login', function () {

    context('quando realizar login com credenciais válidas', function () {
        const user = {
            name: 'André Samurai',
            email: 'andre@samuraibs.com',
            password: 'pwd123',
            is_provider: true
        }

        before(function () {
            cy.task('removeUser', user.email)
                .then(function (result) {
                    console.log(result)
                })

            cy.request('POST', 'http://localhost:3333/users', user)
                .then(function (response) {
                    expect(response.status).to.eq(200)
                })
        })
        it('deve logar com sucesso', function () {
            loginPage.go()
            loginPage.form(user)
            loginPage.login()
            dashPage.welcome('André Samurai')
        })
    })

    context('quando tentar realizar login com credenciais erradas', function () {
        const credentials = [
            { email: 'andr3@samuraibs.com', password: 'pwd123', msg: 'quando o e-mail não está cadastrado' },
            { email: 'andre@samuraibs.com', password: 'abc123', msg: 'quando a senha está errada' }
        ]

        credentials.forEach(c => {
            it('deve exibir mensagem de erro ' + c.msg, function () {
                loginPage.go()
                loginPage.form(c)
                loginPage.login()
                loginPage.toast.shouldHaveText('Ocorreu um erro ao fazer login, verifique suas credenciais.')
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
            loginPage.login()
        })

        alertMessages.forEach(function (alert) {
            it('deve exibir ' + alert.toLowerCase(), function () {
                loginPage.alertHaveText(alert)
            })
        })
    })
})
