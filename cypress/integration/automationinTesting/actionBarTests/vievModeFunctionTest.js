import {mockRequests} from '../mock'

context('Тестирование функции изменения вида', function () {
    beforeEach(function () {
        mockRequests()
        cy.visit('/')
        cy.login('kovalenko', '1')
    })
    it("Отображение иконок в соответствии с выбранным видом", () => {
        cy.intercept('PUT', '**/users/6', {statusCode:200}).as("view")
        cy.wait('@usage')
        cy.wait('@resources')
        for (let i = 0; i < 3; i++) {
            cy.get('[aria-label="Вид"] > .material-icons').click()
            cy.get('[aria-label="Вид"] > .material-icons').then(el => {
                if (el.text() == 'view_module') {
                    cy.get('#listing').should('have.class', 'list file-icons')
                    cy.wait('@view').its('request.body').should('include', 'list')
                }
                if (el.text() == 'grid_view') {
                    cy.get('#listing').should('have.class', 'mosaic file-icons')
                    cy.wait('@view').its('request.body').should('include', 'mosaic')
                }
                if (el.text() == 'view_list') {
                    cy.get('#listing').should('have.class', 'mosaic gallery file-icons')
                    cy.wait('@view').its('request.body').should('include', 'mosaic gallery')
                }
            })
        }
    })
})