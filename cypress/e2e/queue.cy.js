beforeEach(() => {
  cy.visit('http://localhost:3000/queue');
});

const defaultColor = 'circle_default__cxxRQ';
const changingColor = 'circle_changing__gSgfT';

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

    cy.get('div[class*="circle_head__E38zo"').should(($div) => {
      expect($div).to.have.text('head');
    });

    cy.get('div[class*="circle_tail60__Q5Aq5"').should(($div) => {
      expect($div).to.have.text('tail');
    });

    data.forEach((el) => {
      cy.get('div[class*="circle_circle__xMxdD"')
        .first()
        .each(($el, index) => {
          expect($el).to.have.text(el[index].value);
          expect($el)
            .to.have.attr('class')
            .to.equal('circle_circle__xMxdD   ' + el[index].color);
        });
      cy.wait(1000);
    });

    cy.get('input').type('1');
    cy.get('button').eq(1).click();
    cy.get('div[class*="circle_head__E38zo"')
      .first()
      .should(($div) => {
        expect($div).to.have.text('head');
      });

    cy.get('div[class*="circle_tail60__Q5Aq5"')
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

    cy.get('div[class*="circle_head__E38zo"')
      .first()
      .should(($div) => {
        expect($div).to.have.text('head');
      });
    cy.get('div[class*="circle_tail60__Q5Aq5"')
      .eq(2)
      .should(($div) => {
        expect($div).to.have.text('tail');
      });
    cy.get('button').eq(2).click();

    cy.get('div[class*="circle_circle__xMxdD"')
      .first()
      .should(($div) => {
        expect($div).to.have.text('');
      });
    cy.get('div[class*="circle_head__E38zo"')
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

    cy.get('div[class*="circle_circle__xMxdD"').each(($el, index) => {
      expect($el).to.have.text('');
      expect($el)
        .to.have.attr('class')
        .to.equal('circle_circle__xMxdD   ' + defaultColor);
    });
  });
});
