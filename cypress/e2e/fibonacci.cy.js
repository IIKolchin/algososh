beforeEach(() => {
  cy.visit('http://localhost:3000/fibonacci');
});

const arr = [0, 1, 1, 2];

describe('Fibonacci component', () => {
  it('if input clear, button disabled', () => {
    cy.get('input').clear;
    cy.get('button').should('be.disabled');
  });

  it('numbers are generated correctly', () => {
    cy.get('input').type('3');
    cy.get('button').eq(1).click();

    cy.get('div[class*="circle_circle__xMxdD"').each(($el, index) => {
      expect($el).to.have.text(arr[index]);
    });
  });
});
