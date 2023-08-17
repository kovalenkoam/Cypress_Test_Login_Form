import {mockRequests} from '../mock'

context('Тестирование функции перемещения', function () {
    beforeEach(function () {
        mockRequests()
        cy.intercept('PATCH', '**/resources/kovalenko**', {statusCode: 200}).as('resourcesRequest')
        cy.visit('/')
        cy.login('kovalenko', '1')
    })

    it('Успешное перемещение файла', () => {
        //ждем перехвата и выполнения первого запроса Resources
        cy.wait('@resources')
        //перехватываем следующий Resources, которые приходит после перемещения
        cy.intercept('GET', '**/resources/**', {fixture: 'resourcesMove.json'}).as('resourcesMove')
        cy.get('[aria-label="kovalenko"]').should('exist').click()
        cy.get('[aria-label="Переместить файл"]> .material-icons').click()
        cy.get('li').click()
        cy.get('[aria-label="Переместить"]').click()
        /*
        * Следующий пункт - костыль, и подругому работать не хочет, подмененный ответ с новой иерархией
        * приходит сразу после нажатия кнопки, и вылазить диалог с перезаписью файла, так как по факту ответ при шел и он уже как бы перемещен
        */
        cy.get('[aria-label="Перезаписать"]').click()
        cy.wait('@resourcesRequest').its('request.url').should('include', 'action=rename&destination=%2Fnew%2520folder%2Fkovalenko&override=true&rename=false')
        cy.wait('@resourcesMove')
        cy.get('[aria-label="kovalenko"]').should('exist')
    })
})