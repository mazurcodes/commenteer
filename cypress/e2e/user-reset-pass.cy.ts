describe('User reset password', () => {
  it('shows the reset password  page', () => {
    cy.visit('http://localhost:3000/login/reset');
    cy.get('h1').should('contain', 'Reset password');
    cy.get('h2').should('contain', 'Commenteer');
    cy.get('h3').should('contain', 'It happens :)');
    cy.get('input[name="login-email"]').should('exist');
    cy.get('input[type="submit"]').should('exist');
  });

  it('shows up the error with wrong email', () => {
    cy.visit('http://localhost:3000/login/reset');
    cy.get('input[name="login-email"]').type('wrongemail823@mazur.codes');
    cy.get('input[type="submit"]').click();
    cy.get('span').should('contain', 'Error:');
  });

  it('lets the user go back to the login page', () => {
    cy.visit('http://localhost:3000/login/reset');
    cy.get('p').should('contain', 'Remember password?');
    cy.get('a:contains("Login")').click();
    cy.url().should('eq', 'http://localhost:3000/login');
    cy.get('h1').should('contain', 'Login');
  });

  it('after reset password the user is moved to the login page', () => {
    cy.visit('http://localhost:3000/login/reset');
    cy.get('input[name="login-email"]').type('resetpasswordtest@mazur.codes');
    cy.get('input[type="submit"]').click();
    cy.url().should('eq', 'http://localhost:3000/login');
  });
});
