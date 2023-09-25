describe('Employees specs', () => {
  it('should visit the login page', () => {
    cy.visit('/employees');
  });

  it('should load five rows of employees', () => {
    cy.visit('/employees');
    cy.findAllByRole('row').should('have.length', 6);
  });

  it('should open a dialog when clicking on the delete button', () => {
    cy.visit('/employees');

    cy.findAllByRole('button', { name: 'deleteIcon' }).eq(1).as('deleteButton');
    cy.get('@deleteButton').click();
    cy.findByRole('dialog').as('dialog');

    cy.get('@dialog').should('be.visible');
  });

  it('should delete the selected employee', () => {
    cy.visit('/employees');

    cy.get('tr') // Selecciona todas las filas de la tabla
      .contains('td', 'Jose') // Busca una celda <td> que contenga el texto "Jose"
      .closest('tr') // Selecciona la fila más cercana (la que contiene la celda con "Jose")
      .then((row) => {
        // Realiza acciones en la fila, por ejemplo, hacer clic en un botón en esa fila
        cy.wrap(row).findByRole('button', { name: 'deleteIcon' }).click();
      });
    cy.findByRole('button', { name: /aceptar/i }).click();

    cy.get('tr').contains('td', 'Jose').should('not.exist');
  });

  it('should keep the selected employee when clicking on cancel', () => {
    cy.visit('/employees');

    cy.get('tr')
      .contains('td', 'Jose')
      .closest('tr')
      .then((row) => {
        cy.wrap(row).findByRole('button', { name: 'deleteIcon' }).click();
      });
    cy.findByRole('button', { name: /cancelar/i }).click();

    cy.get('tr').contains('td', 'Jose').should('exist');
  });
});
