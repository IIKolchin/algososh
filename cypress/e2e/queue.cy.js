beforeEach(() => {
  cy.visit('http://localhost:3000/queue');
});

const defaultColor = 'circle_default';
const changingColor = 'circle_changing';

const data = [
  [{ value: '3', color: changingColor }],
  [{ value: '3', color: defaultColor }],
];

describe('Queue component', () => {
  it('if input clear, add button disabled', () => {
    cy.get('input').clear;
    cy.get('button').should('be.disabled');
  });

  it('elements are added to the queue', () => {
    cy.get('input').type('3');
    cy.get('button').eq(1).click();

    cy.get('div[class*="circle_head"').should(($div) => {
      expect($div).to.have.text('head');
    });

    cy.get('div[class*="circle_tail"').should(($div) => {
      expect($div).to.have.text('tail');
    });

    data.forEach((el) => {
      cy.get('div[class*="circle_circle"')
        .first()
        .each(($el, index) => {
          expect($el).to.have.text(el[index].value);
          expect($el).to.have.attr('class').contains(el[index].color);
        });
      cy.wait(1000);
    });

    cy.get('input').type('1');
    cy.get('button').eq(1).click();
    cy.get('div[class*="circle_head"')
      .first()
      .should(($div) => {
        expect($div).to.have.text('head');
      });

    cy.get('div[class*="circle_tail"')
      .eq(1)
      .should(($div) => {
        expect($div).to.have.text('tail');
      });
  });

  it('items are removed from the queue', () => {
    cy.get('input').type('3');
    cy.get('button').eq(1).click();
    cy.get('input').type('1');
    cy.get('button').eq(1).click();
    cy.get('input').type('7');
    cy.get('button').eq(1).click();

    cy.get('div[class*="circle_head"')
      .first()
      .should(($div) => {
        expect($div).to.have.text('head');
      });
    cy.get('div[class*="circle_tail"')
      .eq(2)
      .should(($div) => {
        expect($div).to.have.text('tail');
      });
    cy.get('button').eq(2).click();

    cy.get('div[class*="circle_circle"')
      .first()
      .should(($div) => {
        expect($div).to.have.attr('class').contains(changingColor);
      });
    cy.wait(1000);

    cy.get('div[class*="circle_circle"')
      .first()
      .should(($div) => {
        expect($div).to.have.text('');
        expect($div).to.have.attr('class').contains(defaultColor);
      });
    cy.get('div[class*="circle_head"')
      .eq(1)
      .should(($div) => {
        expect($div).to.have.text('head');
      });
  });

  it('clearing the stack by click', () => {
    cy.get('input').type('3');
    cy.get('button').eq(1).click();
    cy.get('input').type('1');
    cy.get('button').eq(1).click();
    cy.get('input').type('5');
    cy.get('button').eq(1).click();

    cy.get('button').eq(3).click();

    cy.get('div[class*="circle_circle"').each(($el, index) => {
      expect($el).to.have.text('');
      expect($el).to.have.attr('class').contains(defaultColor);
    });
  });
});
