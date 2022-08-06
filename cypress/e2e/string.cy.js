beforeEach(() => {
  cy.visit('http://localhost:3000/recursion');
});

const defaultColor = 'circle_default';
const changingColor = 'circle_changing';
const modifiedColor = 'circle_modified';

const data = [
  [
    { value: 'r', color: changingColor },
    { value: 'e', color: defaultColor },
    { value: 'a', color: defaultColor },
    { value: 'c', color: defaultColor },
    { value: 't', color: changingColor },
  ],
  [
    { value: 't', color: modifiedColor },
    { value: 'e', color: changingColor },
    { value: 'a', color: defaultColor },
    { value: 'c', color: changingColor },
    { value: 'r', color: modifiedColor },
  ],
  [
    { value: 't', color: modifiedColor },
    { value: 'c', color: modifiedColor },
    { value: 'a', color: changingColor },
    { value: 'e', color: modifiedColor },
    { value: 'r', color: modifiedColor },
  ],
  [
    { value: 't', color: modifiedColor },
    { value: 'c', color: modifiedColor },
    { value: 'a', color: modifiedColor },
    { value: 'e', color: modifiedColor },
    { value: 'r', color: modifiedColor },
  ],
];

describe('String component', () => {
  it('if input clear, button disabled', () => {
    cy.get('input').clear;
    cy.get('button').should('be.disabled');
  });

  it('line unfolds correctly', () => {
    cy.get('input').type('react');
    cy.get('button').eq(1).click();

    data.forEach((el) => {
      cy.get('div[class*="circle_circle"').each(($el, index) => {
        expect($el).to.have.text(el[index].value);
        expect($el).to.have.attr('class').contains(el[index].color);
      });
      cy.wait(2000);
    });
  });
});
