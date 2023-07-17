describe('Welcome screen', () => {
  it('Shows the welcome screen with login and signup buttons', () => {
    cy.visit('http://localhost:3000');
    cy.get('h1').should('contain', 'Commenteer');
    cy.get('a:contains("Login")').should('exist');
    cy.get('a:contains("Signup")').should('exist');
  });

  it('Shows the login screen when clicking on login button', () => {
    cy.visit('http://localhost:3000');
    cy.get('a:contains("Login")').click();
    cy.url().should('include', '/login');
    cy.get('h1').should('contain', 'Login');
  });

  it('Shows the signup screen when clicking on signup button', () => {
    cy.visit('http://localhost:3000');
    cy.get('a:contains("Signup")').click();
    cy.url().should('include', '/signup');
    cy.get('h1').should('contain', 'Sign up');
  });
});
