describe('Job is shown to the user', () => {
  it('shows the job page', () => {
    cy.visit('http://localhost:3000/j/testjob');
    cy.get('p').contains('Test project').should('exist');
    cy.get('p').contains('Test description').should('exist');
    cy.get('p').contains('100').should('exist');
    cy.get('p').contains('0.20 $').should('exist');
  });
});
