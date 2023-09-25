describe('Login specs', () => {
  it('should visit the login page', () => {
    cy.visit('/');
  });

  it('should name input has the focus when it click on it', () => {
    cy.visit('/');

    //creamos alias
    cy.findByRole('textbox').as('userInput');
    cy.get('@userInput').click();
    cy.get('@userInput').should('have.focus');
  });

  it('should write the credentials in the input fields', () => {
    const user = 'admin';
    const password = 'test';

    cy.visit('/');

    cy.findByRole('textbox').as('userInput');
    cy.get('input[name="password"]').as('passwordInput');
    cy.get('@userInput').type(user);
    cy.get('@passwordInput').type(password);

    cy.get('@userInput').should('have.value', user);
    cy.get('@passwordInput').should('have.value', password);
  });

  it('should show an error message when the login was not succesfull', () => {
    const user = 'admin';
    const password = 'testa';
    cy.visit('/');
    cy.findByRole('textbox').as('userInput');
    cy.get('input[name="password"]').as('passwordInput');
    cy.get('@userInput').type(user);
    cy.get('@passwordInput').type(password);
    cy.get('button[type="submit"]').click();
    cy.findAllByRole('alert').should('have.length', 1);
  });

  it('should navigate to /submodule-list when the login was succesfull', () => {
    const user = 'admin';
    const password = 'test';
    cy.visit('/');
    cy.findByRole('textbox').as('userInput');
    cy.get('input[name="password"]').as('passwordInput');
    cy.get('@userInput').type(user);
    cy.get('@passwordInput').type(password);
    cy.get('button[type="submit"]').click();

    cy.url().should('equal', 'http://localhost:8080/#/submodule-list');
  });
});
