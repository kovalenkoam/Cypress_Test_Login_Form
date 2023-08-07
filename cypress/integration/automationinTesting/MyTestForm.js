import {mockRequests} from "./mock";

context('Тестирование заполнения формы с валидацией запроса', function () {

    beforeEach(function () {
        mockRequests()
        cy.intercept('GET', '**/branding', {fixture: 'automationinTesting/branding.json'}).as('branding')
        cy.intercept('GET', '**/room', {fixture: 'automationinTesting/room.json'}).as('room')
        cy.intercept('POST', '**/message', {statusCode: 201, fixture: 'automationinTesting/message.json'}).as('message')
        cy.visit('/')
    })

    function fioForm() {
        cy.wait(['@branding', '@room'])
        cy.get('[data-testid="ContactName"]').type('Alexey Kovalenko')
        cy.get('[data-testid="ContactEmail"]').type('kowalalex@mail.ru')
        cy.get('[data-testid="ContactPhone"]').type('+79627778317')
        cy.get('[data-testid="ContactSubject"]').type('Telegram')
        cy.get('[data-testid="ContactDescription"]').type('I am automation quality assurance')
    }

    it('checkRequest', () => {
        fioForm()
        cy.contains('Submit').click()
        cy.wait('@message').should(xhr => {
            expect(xhr.request.body).have.property('description', 'I am automation quality assurance')
            expect(xhr.request.body).have.property('email', 'kowalalex@mail.ru')
            expect(xhr.request.body).have.property('name', 'Alexey Kovalenko')
            expect(xhr.request.body).have.property('phone', '+79627778317')
            expect(xhr.request.body).have.property('subject', 'Telegram')
        })
    })
})