describe('User sign up to the app', () => {
  it('shows the signup page', () => {
    cy.visit('http://localhost:3000/signup');
    cy.get('h1').should('contain', 'Sign up');
    cy.get('h2').should('contain', 'Commenteer');
    cy.get('h3').should('contain', 'Hi there!');
    cy.get('input[name="register-email"]').should('exist');
    cy.get('input[name="register-password"]').should('exist');
    cy.get('input[name="register-confirm-password"]').should('exist');
    cy.get('a:contains("Log In")').should('exist');
  });

  it('lets the user sign up and shows up the error', () => {
    cy.visit('http://localhost:3000/signup');
    cy.get('input[name="register-email"]').type('test@mazur.codes');
    cy.get('input[name="register-password"]').type('abcabc');
    cy.get('input[name="register-confirm-password"]').type('abcabc');
    cy.get('input[type="submit"]').click();
    cy.get('span').should('contain', 'Error: email already in use');
  });

  it('lets the user go to the login page', () => {
    cy.visit('http://localhost:3000/signup');
    cy.get('p').should('contain', 'Already a member?');
    cy.get('a:contains("Log In")').click();
    cy.url().should('eq', 'http://localhost:3000/login');
    cy.get('h1').should('contain', 'Login');
  });
});
