import {mockRequests} from './mock'

context('Testing the login form', function () {

    beforeEach(function () {
        mockRequests()
        cy.intercept('POST', '**/login').as('login')
    })

    /*
    Вынес валидацию для всех негативных кейсов в отдельную ФУНКЦИЮ (не знаю корректно это или нет)
     */

    function validateError() {
        cy.wait('@login').its('response.statusCode').should('eq', 403)
        cy.get('.wrong').should('exist')
            .and('have.text', 'Неверные данные')
            .and('have.css', 'background-color', 'rgb(244, 67, 54)')
    }

    it('Сorrect authorization', () => {
        cy.login('admin', 'admin')
        cy.wait('@login').its('response.statusCode').should('eq', 200)
        cy.url().should('eq', 'http://51.250.1.158:49153/files/')
    })

    it('Correct exit', () => {
        cy.login('admin', 'admin')
        cy.get('#logout').click()
        cy.url().should('eq', 'http://51.250.1.158:49153/login')
    })

    it('Sending an empty login', () => {
        cy.visit('/')
        cy.get('.button').click()
        validateError()
    })

    it('Incorrect authorization ', () => {
        cy.login('Alexey', 'Kovalenko')
        cy.get('.button').click()
        validateError()
    })

    it('Incorrect login and correct password ', () => {
        cy.login('Alexey', 'admin')
        cy.get('.button').click()
        validateError()
    })

    it('Correct login and incorrect password ', () => {
        cy.login('admin', 'Kovalenko')
        validateError()
    })

    it('Submit form with login only', () => {
        cy.visit('/')
        cy.get('[type="text"]').type('admin')
        cy.get('.button').click()
        validateError()
    })

    it('Submit form with password only', () => {
        cy.visit('/')
        cy.get('[type="password"]').type('admin')
        cy.get('.button').click()
        validateError()
    })
})