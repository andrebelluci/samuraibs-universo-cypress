import recoverPage from '../support/pages/forgotpass'

describe('esqueci minha senha', function () {

    context('quando digitar um e-mail e clicar em recuperar', function () {
        const emails = [
            {
                email: 'andr3@samuraibs.com',
                toast: 'Ocorreu um erro ao tentar realizar a recuperação de senha',
                msg: "e-mail não existe"
            },
            {
                email: 'andre@samuraibs.com',
                toast: 'Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada.',
                msg: "e-mail não existe"
            }
        ]

        emails.forEach(e => {
            it('se ' + e.msg + ' deve exibir a mensagem ' + e.toast.toLowerCase(), function () {
                recoverPage.go()
                recoverPage.form(e.email)
                recoverPage.recover()
                recoverPage.toast.shouldHaveText(e.toast)
            })
        })
    })

    context('quando não preencho o campo', function () {
        it('deve exibir mensagem de e-mail é obrigatório', function () {
            recoverPage.go()
            recoverPage.recover()
            recoverPage.alertHaveText('E-mail é obrigatório')
        })
    });
})