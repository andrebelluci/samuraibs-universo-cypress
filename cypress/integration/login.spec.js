import loginPage from '../support/pages/login'
import dashPage from '../support/pages/dash'

describe('login', function () {

    //login com sucesso
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
            loginPage.icons.shouldBeVisible(0)
            loginPage.icons.shouldBeVisible(1)
            dashPage.welcome(user.name)      
            dashPage.icons.shouldBeVisible(0)            
        })
    })

    //senha incorreta
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

    //e-mail no formato inválido
    context('quando o e-mail não estiver no formato correto', function () {
        const credentials = [
            { email: 'andr3samuraibs.com', password: 'pwd123', msg: 'faltar arroba' },
            { email: 'andre@samuraibs.', password: 'abc123', msg: 'não houver nada após o último ponto' },
            { email: '@samuraibs.com', password: 'abc123', msg: 'faltar usuário do e-mail' }
        ]

        credentials.forEach(function (c) {
            it('deve exibir alerta informando que o e-mail não é válido quando ' + c.msg, function () {
                loginPage.go()
                loginPage.form(c)
                loginPage.login()
                loginPage.alertHaveText('Informe um email válido')
            })
        })
    })

    //campos obrigatórios
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

