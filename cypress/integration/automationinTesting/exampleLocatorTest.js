import {mockRequests} from './mock'

context('Проверка элементов на странице', function () {

    beforeEach(function () {
        mockRequests()
        cy.intercept('GET', '**/branding', {fixture: 'automationinTesting/branding.json'}).as('branding')
        cy.intercept('GET', '**/room', {fixture: 'automationinTesting/room.json'}).as('room')
        cy.intercept('POST', '**/message', {statusCode: 201, fixture: 'automationinTesting/message.json'}).as('message')
        cy.visit('/')
    })

    //добавить тест на посещение страницы

    //Тестовый пример для демонстрации определения локаторов различными способами
    it('typesOfLocators', () => {

        //Data атрибуты !Самый стабильный способ использования локаторов в тестах
        cy.get('[data-testid="ContactName"]')

        //Текстовые селекторы: позволяют выбирать элементы на странице по их текстовому содержимому
        cy.contains('Rooms')

        //XPath: позволяет выбирать элементы на странице по их пути в DOM-дереве.
        //Выбор элемента с атрибутом "href" равным "https://github.com/mwinteringham/restful-booker-platform" будет выглядеть так:
        cy.get('a[href="https://github.com/mwinteringham/restful-booker-platform"]').eq(1)

        //CSS-селекторы позволяют выбирать элементы на странице по их CSS-свойствам
        cy.get('.contact')

        //Индексы: позволяют выбирать элементы на странице по их порядковому номеру
        cy.get('button[type="button"]').eq(2)
    })

    //Начнем с простого способа определения локатора, показать мишень, копирование локаторов
    it('getLocatorMessageForm', () => {

        //определить вместе локаторы для полей Email, Phone, Subject, Message
        //определить локатор кнопки Submit
    })

    //Найти локаторы кнопок "Book this room" и "Submit"
    it('getLocatorButton', () => {

    })

    //определеим элемент в контактах, где указан номер телефона
    it('getLocatorContact', () => {
        cy.get('.contact > :nth-child(3) > :nth-child(3)')//хороший пример локатора или нет? Почему?
        cy.contains('012345678901')//хороший пример локатора или нет? Почему?
        cy.get('[class="col-sm-5"] > p').eq('2')//хороший пример локатора или нет? Почему?
    })
})