import {mockRequests} from '../mock'

context('е2е тестирование формы логина', function () {

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

    it('Успешная авторизация', () => {
        cy.login('admin', 'admin')
        cy.wait('@login').its('response.statusCode').should('eq', 200)
        cy.url().should('eq', 'http://51.250.1.158:49153/files/')
    })

    //е2е тест на разлогин к дз от занятия 35

    it('Успешный выход из Системы', () => {
        cy.login('admin', 'admin')
        cy.get('#logout').click()
        cy.url().should('eq', 'http://51.250.1.158:49153/login')
    })

    it('Неуспешная авторизация - пустой логин/пароль', () => {
        cy.visit('/')
        cy.get('.button').click()
        validateError()
    })

    it('Неуспешная авторизация - неверный логин/пароль', () => {
        cy.login('Alexey', 'Kovalenko')
        cy.get('.button').click()
        validateError()
    })

    it('Неуспешная авторизация - неверный логин', () => {
        cy.login('Alexey', 'admin')
        cy.get('.button').click()
        validateError()
    })

    it('Неуспешная авторизация - неверный пароль', () => {
        cy.login('admin', 'Kovalenko')
        validateError()
    })

    it('Неуспешная авторизация - пустой пароль', () => {
        cy.visit('/')
        cy.get('[type="text"]').type('admin')
        cy.get('.button').click()
        validateError()
    })

    it('Неуспешная авторизация - пустой логин', () => {
        cy.visit('/')
        cy.get('[type="password"]').type('admin')
        cy.get('.button').click()
        validateError()
    })
})