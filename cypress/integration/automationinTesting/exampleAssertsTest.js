import {mockRequests} from './mock'

context('Примеры использования различных видов проверок(asserts)', function () {

    beforeEach(function () {
        mockRequests()
        cy.intercept('GET', '**/branding', {fixture: 'automationinTesting/branding.json'}).as('branding')
        cy.intercept('GET', '**/room', {fixture: 'automationinTesting/room.json'}).as('room')
        cy.intercept('POST', '**/message', {statusCode: 201, fixture: 'automationinTesting/message.json'}).as('message')
        cy.visit('/')
    })

    function fillForm() {
        cy.wait(['@branding', '@room'])
        cy.get('[data-testid="ContactName"]').type('Petr Ivanov')
        cy.get('[data-testid="ContactEmail"]').type('olja-0801@mail.ru')
        cy.get('[data-testid="ContactPhone"]').type('89833337878')
        cy.get('[data-testid="ContactSubject"]').type('room')
        cy.get('[data-testid="ContactDescription"]').type('Lorem ipsum dolor sit amet, consectetur adipiscing elit')
    }

    it('shouldAnd', () => {
        cy.contains('Курсы').should('not.exist')
        //множественные утверждения
        cy.get('[class="col-sm-3 content"]').eq(1).should('be.visible').and('contain', 'Automation')
    })

    it('exampleAssertionsShould', () => {
        //проверка наличия элемента DOM структуре
        cy.get('[class="col-sm-3 content"]').should('exist')
        cy.get('[class="col-sm-3 content"] > p').eq(2).should('have.text', 'Check out the restful-booker-platform source code to learn more about the various APIs and JavaScript features to practise your Automation in Testing skills.')

        //проверка на то, что элемент не только есть в разметке, но и виден на странице (используется, когда есть атрибут hidden у элемента)
        cy.get('[class="col-sm-3 content"]').should('be.visible')

        cy.contains('Let me hack!').click()
        cy.contains('Let me hack').should('not.exist')
    })

    it('exampleAssertionsShould2', () => {
        cy.get('[data-testid="ContactName"]').should('be.empty')
        cy.get('[data-testid="ContactName"]').should('have.attr', 'placeholder', 'Name')
        cy.get('[data-testid="ContactName"]').should('have.class', 'form-control' )
        cy.contains('Submit').should('have.css', 'color', 'rgb(0, 123, 255)')
    })

    //Нормальный тест на проверку позитивного сценария отправки запроса на бронирование
    it('checkRequest', () => {
        fillForm()
        cy.contains('Submit').click()

        //проверка параметров запроса, которые отправляются как объект
        cy.wait('@message').should(xhr => {
            expect(xhr.request.body).have.property('description', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit')
            expect(xhr.request.body).have.property('email', 'olja-0801@mail.ru')
            expect(xhr.request.body).have.property('name', 'Petr Ivanov')
            expect(xhr.request.body).have.property('phone', '89833337878')
            expect(xhr.request.body).have.property('subject', 'room')
        })

        cy.get('.contact').children().should('contain', 'Thanks for getting in touch Petr Ivanov!').and('contain', 'room')
    })

    it('checkResponse', () => {
        fillForm()
        cy.contains('Submit').click()

        //проверка параметров ответа
        cy.wait('@message').should(xhr => {
            expect(xhr.response.body).have.property('name', 'Petr Ivanov')
        })
    })
})