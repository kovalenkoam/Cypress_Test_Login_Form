import {mockRequests} from '../mock'

context('Тестирование функции копирования', function () {
    beforeEach(function () {
        mockRequests()
        cy.intercept('PATCH', '**/resources/kovalenko**', {statusCode: 200}).as('resourcesRequest')
        cy.visit('/')
        cy.login('kovalenko', '1')
    })

    it('Успешное копирование', () => {
        //ждем перехвата и выполнения первого запроса Resources
        cy.wait('@resources')
        //перехватываем следующий Resources, которые приходит после копирования
        cy.intercept('GET', '**/resources/', {fixture: 'resourcesClone.json'}).as('resourcesClone')
        cy.get('[aria-label="kovalenko"]').should('exist').click()
        cy.get('[aria-label="Скопировать файл"]').click()
        cy.get('[aria-label="Копировать"]').click()
        cy.wait('@resourcesRequest').its('request.url').should('include', 'action=copy&destination=%2Fkovalenko&override=false&rename=true')
        cy.wait('@resourcesClone')
        cy.get('[aria-label="kovalenko(1)"]').should('exist')
    })
})