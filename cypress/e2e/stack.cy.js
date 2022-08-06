beforeEach(() => {
  cy.visit('http://localhost:3000/stack');
});

const defaultColor = 'circle_default';
const changingColor = 'circle_changing';

const data = [
  [{ value: '3', color: changingColor }],
  [{ value: '3', color: defaultColor }],
];

describe('Stack component', () => {
  it('if input clear, add button disabled', () => {
    cy.get('input').clear;
    cy.get('button').should('be.disabled');
  });

  it('elements are added to the stack', () => {
    cy.get('input').type('3');
    cy.get('button').eq(1).click();

    cy.get('div[class*="circle_absolute"').should(($div) => {
      expect($div).to.have.text('top');
    });

    data.forEach((el) => {
      cy.get('div[class*="circle_circle"').each(($el, index) => {
        expect($el).to.have.text(el[index].value);
        expect($el).to.have.attr('class').contains(el[index].color);
      });
      cy.wait(1000);
    });
  });

  it('items are removed from the stack', () => {
    cy.get('input').type('3');
    cy.get('button').eq(1).click();
    cy.get('input').type('1');
    cy.get('button').eq(1).click();

    cy.get('div[class*="circle_circle"').should('have.length', 2);
    cy.get('button').eq(2).click();
    cy.get('div[class*="circle_circle"').should('have.length', 1);

    cy.get('div[class*="circle_circle"').should(($div) => {
      expect($div).to.have.text('3');
      expect($div).to.have.attr('class').contains(changingColor);
    });
    cy.wait(1000);
    cy.get('div[class*="circle_circle"').should(($div) => {
      expect($div).to.have.text('3');
      expect($div).to.have.attr('class').contains(defaultColor);
    });
  });

  it('clearing the stack by click', () => {
    cy.get('input').type('3');
    cy.get('button').eq(1).click();
    cy.get('input').type('1');
    cy.get('button').eq(1).click();
    cy.get('div[class*="circle_circle"').should('have.length', 2);
    cy.get('button').eq(3).click();
    cy.get('div[class*="circle_circle"').should('have.length', 0);
  });
});
