import {mockRequests} from './mock'

context('Примеры использования базовых методов и команд', function () {

    beforeEach(function () {
        mockRequests()
        cy.intercept('GET', '**/branding', {fixture: 'automationinTesting/branding.json'}).as('branding')
        cy.intercept('GET', '**/room', {fixture: 'automationinTesting/room.json'}).as('room')
        cy.intercept('POST', '**/message', {statusCode: 201, fixture: 'automationinTesting/message.json'}).as('message')
        cy.intercept('GET', '**/1').as('UnavailableDate')
        cy.visit('/')
    })

    //основные методы
    it('visitAndUrl', () => {
        cy.visit('/')
        cy.url()//Получить URL-адрес активной страницы.
    })

    it('wait', () => {
        cy.wait(3000)
        cy.wait('@room')
    })

    //visit, wait, get, type, clear, click, contains, url
    it('getTypeClearContainsClick', () => {
        cy.get('[data-testid="ContactName"]').type('Anna')
        cy.get('[data-testid="ContactName"]').type('{end}{backspace}')//использование опций при вызове медода
        cy.get('[data-testid="ContactName"]').clear().type('1')//можно вызывать несколько методов подряд
        cy.contains('Submit').click()
    })

    //Команды
    it('focusAndBlur', () => {
        cy.contains('Submit').focus()
        cy.contains('Submit').blur()

    })

    //Опции
    it('optionsForMetod', () => {
        cy.get('[data-testid="ContactName"]').type('{end}{backspace}')//использование опций при вызове медода
    })
})