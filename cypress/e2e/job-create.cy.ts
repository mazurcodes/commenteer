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
    // description have dropdown managed by the app state
    // so after click we need to wait for the text area to appear
    cy.get('label').contains('Description').click();
    cy.get('#description').type('Test Description');

    cy.get('label').contains('How many comments').click().type('100');

    cy.get('input[name=name]').should('have.value', 'Test Job');
    cy.get('textarea[name=description]').should(
      'have.value',
      'Test Description'
    );
    cy.get('input[name=amount]').should('have.value', '100');

    cy.get('p').contains('Cost:').find('span').should('have.text', '0.20 $');
    cy.get('p')
      .contains('Current balance:')
      .find('span')
      .should('have.text', '0 $');

    cy.get('button').contains('Not enough balance').should('exist');
  });
});
