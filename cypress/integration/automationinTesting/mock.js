export const mockRequests = () => {

        cy.intercept('GET', '**/resources/', {fixture: 'resources.json'}).as('resources')
        cy.intercept('GET', '**/usage/', {fixture: 'usage.json'}).as('usage')
        cy.intercept('POST', '**/login').as('login')
}