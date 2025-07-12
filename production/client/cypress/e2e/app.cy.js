import * as cheerio from 'cheerio';

describe('Navigation', () => {
  it('should navigate to the about page', () => {
    cy.visit('http://client:3000/');

    cy.get('a[href*="/sign-up?returnUrl=/"]').click();

    cy.url().should('include', '/sign-up');

    cy.get('h1').contains('Join PEPP');
    cy.get('form input[name="username"]').type('Username');
    cy.get('form input[name="email"]').type('email@gmail.com');
    cy.get('form input[name="password"]').type('12345678910XD~~');
    console.log(cy.get('form input[name="password"]'));

    // cy.intercept('POST', 'http://gateway:8080/graphql', req => req).as('register');
    cy.get('button[type=submit]').click();
    // cy.get('form').submit();
    // cy.wait('@register')
    //   .its('request.body')
    //   .should('deep.equal', {
    //     "query": "\n    mutation register($username: String!, $password: String!, $email: String!, $returnUrl: String) {\n  register(\n    registerInput: {username: $username, email: $email, password: $password, returnUrl: $returnUrl}\n  )\n}\n    ",
    //     "variables": {
    //       "username": "Username",
    //       "password": "12345678910XD~~",
    //       "email": "email@gmail.com",
    //       "returnUrl": "/"
    //     },
    //     "operationName": "register"
    //   });
    //
    cy.wait(5000);
    cy.task('getLastEmail', 'email@gmail.com').then((html) => {
      console.log(html);
      const $ = cheerio.load(html || '');
      const href = $('a[href*="confirm-email"]').attr('href');
      console.log('href', href);
      expect(href).to.match(/^http:\/\/client:3000\/confirm-email\?/);
      cy.visit(href);
    })
    // cy.task('extractConfirmationLink','email@example.com').then(href => {
    // });
  });
});