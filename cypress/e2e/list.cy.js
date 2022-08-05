beforeEach(() => {
    cy.visit('http://localhost:3000/list');
  });

  describe('List component', () => {
    it('if input clear, add button disabled', () => {
      cy.get('input').first().clear;
      cy.get('input').eq(1).clear;
      cy.get('button').eq(1).should('be.disabled');
      cy.get('button').eq(2).should('be.disabled');
      cy.get('button').eq(5).should('be.disabled');
      cy.get('button').eq(6).should('be.disabled');
    });


});