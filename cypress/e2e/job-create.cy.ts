// Login in the app first

describe('User creates a job', () => {
  it('shows the main/job page', () => {
    cy.visit('http://localhost:3000/');
    cy.get('label').contains('Project name');
    cy.get('label').contains('Description');
    cy.get('label').contains('How many comments');
    cy.get('button').contains('Generate Comments');
  });

  it('lets user input data for the job', () => {
    cy.visit('http://localhost:3000/');
    cy.get('label').contains('Project name').click().type('Test Job');
    cy.get('label').contains('Description').click().type('Test Description');
    cy.get('label').contains('How many comments').click().type('100');

    cy.get('input').contains('Test Job').should('exist');
    cy.get('input').contains('Test Description').should('exist');
    cy.get('input').contains('100').should('exist');

    cy.get('p').contains('Cost:').find('span').should('contain', '2 $');
    cy.get('p')
      .contains('Currnet balance:')
      .find('span')
      .should('contain', '0 $');

    cy.get('button').contains('Not enough balance').should('exist');
  });
});
