describe('Navigation', () => {
  it('should navigate to the about page', () => {
    cy.visit('http://client:3000/')

    cy.get('a[href*="/sign-up?returnUrl=/"]').click()

    cy.url().should('include', '/sign-up')

    cy.get('h1').contains('Join PEPP')
    cy.get('form input[name="username"]').type('Username')
    cy.get('form input[name="email"]').type('email@example.com')
    cy.get('form input[name="password"]').type('12345678910XD~~')



    cy.get('form').submit()

    cy.wait(5000)
  })
})