describe('User login', () => {
  it('shows the login page', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('h1').should('contain', 'Login');
    cy.get('h2').should('contain', 'Commenteer');
    cy.get('h3').should('contain', 'Welcome!');
    cy.get('input[name="login-email"]').should('exist');
    cy.get('input[name="login-password"]').should('exist');
    cy.get('input[type="submit"]').should('exist');
  });

  it('login user with wrong credentials and shows up the error', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('input[name="login-email"]').type('test@mazur.codes');
    cy.get('input[name="login-password"]').type('wrongpassword');
    cy.get('input[type="submit"]').click();
    cy.get('span').should('contain', 'Error:');
  });

  it('lets the user go to the reset password page', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('p').should('contain', 'Not a member?');
    cy.get('a:contains("Forgot password?")').click();
    cy.url().should('eq', 'http://localhost:3000/login/reset');
    cy.get('h1').should('contain', 'Reset password');
  });

  it('lets the user go to the signup page', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('p').should('contain', 'Not a member?');
    cy.get('a:contains("Sign up")').click();
    cy.url().should('eq', 'http://localhost:3000/signup');
    cy.get('h1').should('contain', 'Sign up');
  });

  it('login user with test credentials and redirects to main page', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('input[name="login-email"]').type('test@mazur.codes');
    cy.get('input[name="login-password"]').type('abcabc');
    cy.get('input[type="submit"]').click();
    cy.url().should('eq', 'http://localhost:3000/');
  });
});
