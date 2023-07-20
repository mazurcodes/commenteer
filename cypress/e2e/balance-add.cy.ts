describe('User add money to balance by Stripe', () => {
  it('shows the balance page', () => {
    cy.visit('http://localhost:3000/balance');
    cy.get('h1').should('contain', 'Current balance');
    cy.get('h2').should('contain', 'Commenteer');

    cy.get('a[href="/balance"]').should('contain', 'Balance');
  });

  it('shows preset amount button row', () => {
    cy.visit('http://localhost:3000/balance');
    cy.get('input[name="login-email"]').type('test@mazur.codes');
    cy.get('input[name="login-password"]').type('wrongpassword');
    cy.get('input[type="submit"]').click();
    cy.get('span').should('contain', 'Error:');
  });

  // shows the custom amoutn button
  // shows the flow information
  // shows the payment icons
  // shows the transaction history
});
