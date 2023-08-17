import {mockRequests} from '../mock'

context('Тестирование функции переименования', function () {
    beforeEach(function () {
        mockRequests()
        cy.intercept('PATCH', '**/resources/kovalenko**', {statusCode: 200}).as('resourcesRequest')
        cy.visit('/')
        cy.login('kovalenko', '1')
    })

    it('Успешное переименование', () => {
        //ждем перехвата и выполнения первого запроса Resources
        cy.wait('@resources')
        //перехватываем следующий Resources, которые приходит после переименования
        cy.intercept('GET', '**/resources/', {fixture: 'resourcesRename.json'}).as('resourcesRename') //размещен в тесте, подругому работать не хочет)
        cy.get('[aria-label="kovalenko"]').should('exist').click()
        cy.get('[aria-label="Переименовать"]> .material-icons').click()
        cy.get('.input').clear().type('new name')
        cy.get('[type="submit"]').click()
        cy.wait('@resourcesRequest').its('request.url').should('include', 'action=rename&destination=%2Fnew%2520name&override=false&rename=false')
        cy.wait('@resourcesRename')
        cy.get('[aria-label="new name"]').should('exist')
    })
})