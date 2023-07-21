// Login in the app first

describe('User add money to balance by Stripe', () => {
  it('shows the balance page', () => {
    cy.visit('http://localhost:3000/balance');
    cy.get('h1').should('contain', 'Current balance');
    cy.get('h2').should('contain', 'Commenteer');
    cy.get('a[href="/balance"]').should('contain', 'Balance');
  });

  it('shows preset amount button row', () => {
    cy.visit('http://localhost:3000/balance');
    cy.get('p').should('contain', 'Add preset amount:');
    cy.get('button').should('contain', '2 $');
    cy.get('button').should('contain', '5 $');
    cy.get('button').should('contain', '10 $');
  });

  it('shows custom amount button that redirects to stripe.com', () => {
    cy.visit('http://localhost:3000/balance');
    cy.get('button').should('contain', 'Add custom amount');
    cy.get('button:contains("Add custom amount")').click();
    cy.get('h1').should('contain', 'Redirecting to Stripe');
  });

  it('shows the flow information component that can open', () => {
    cy.visit('http://localhost:3000/balance');
    cy.get('p').should('contain', 'Check, what will happen');
    cy.get('p').contains('After clicking').should('not.exist');
    cy.get('p:contains("Check, what will happen")').click();
    cy.get('p:contains("After clicking")').should('exist');
  });

  it('shows the payment icons', () => {
    cy.visit('http://localhost:3000/balance');
    cy.get('[alt*="payment icon"]').should('have.length', 5);
  });

  it('shows the transaction history', () => {
    cy.visit('http://localhost:3000/balance');
    cy.get('p').contains('History').should('exist');
  });
});
