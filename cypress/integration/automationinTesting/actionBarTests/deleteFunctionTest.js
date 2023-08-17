import {mockRequests} from '../mock'

context('Тестирование функции перемещения', function () {
    beforeEach(function () {
        mockRequests()
        cy.intercept('DELETE', '**/resources/kovalenko', {statusCode: 200}).as('resourcesRequest')
        cy.visit('/')
        cy.login('kovalenko', '1')
    })

    it('Успешное удаление файла', () => {
        //ждем перехвата и выполнения первого запроса Resources
        cy.wait('@resources')
        //перехватываем следующий Resources, которые приходит после удаления
        cy.intercept('GET', '**/resources/**', {fixture: 'resourcesDelete.json'}).as('resourcesDelete')
        cy.get('[aria-label="kovalenko"]').should('exist').click()
        cy.get('[aria-label="Удалить"]> .material-icons').click()
        cy.get('.button--red').click()
        cy.wait('@resourcesDelete')
        cy.get('[aria-label="kovalenko"]').should('not.exist')
    })
})