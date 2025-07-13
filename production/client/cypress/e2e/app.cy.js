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

    cy.intercept('POST', 'http://gateway:8080/graphql', req => req).as('register');
    cy.get('button[type=submit]').click();
    // cy.get('form').submit();
    // console.log(cy.wait('@register'))
    cy.wait('@register')
      .its('request.body')
      .should('deep.equal', {
        "query": "\n    mutation register($username: String!, $password: String!, $email: String!, $returnUrl: String) {\n  register(\n    registerInput: {username: $username, email: $email, password: $password, returnUrl: $returnUrl}\n  )\n}\n    ",
        "variables": {
          "username": "Username",
          "password": "12345678910XD~~",
          "email": "email@gmail.com",
          "returnUrl": "/"
        },
        "operationName": "register"
      })

    cy.wait(5000);
    cy.task('getLastEmail', 'email@gmail.com').then((html) => {
      console.log(html);
      const $ = cheerio.load(html || '');
      const href = $('a[href*="confirm-email"]').attr('href');
      console.log('href', href);
      expect(href).to.match(/^http:\/\/client:3000\/confirm-email\?/);
      cy.visit(href);
    })
    cy.wait(5000);
    cy.get('h1').contains('Share your');
    cy.get('[data-testid="avatar-button"]').click();
    cy.get('a[href*="/profile/"]').click();

    cy.wait(2500);
    cy.get('h2').contains('Username');
    cy.get('[data-testid="avatar-button"]').click();
    cy.get('a[href*="/create"]').click();

    // cy.wait(2500);
    // cy.get('[data-testid="save-work"]').click();

    cy.wait(2000);
    cy.get('input[name="title"]').type('My Post title');

    cy.get('input[name="topics"]').type('email@gmail.com{enter}');
    cy.get('input[name="subTopics"]').type('12345678910XD~~{enter}');
    cy.get('button[name="publish"]').click();

    cy.wait(3000);
    cy.get('h1').contains('My Post title');
    // cy.task('extractConfirmationLink','email@example.com').then(href => {
    // });
  });
});