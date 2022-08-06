beforeEach(() => {
  cy.visit('http://localhost:3000/list');
});

const defaultColor = 'circle_default__cxxRQ';
const changingColor = 'circle_changing__gSgfT';
const modifiedColor = 'circle_modified__-tITb';

describe('List component', () => {
  it('if input clear, add and delete buttons are disabled', () => {
    cy.get('input').first().clear;
    cy.get('input').eq(1).clear;
    cy.get('button').eq(1).should('be.disabled');
    cy.get('button').eq(2).should('be.disabled');
    cy.get('button').eq(5).should('be.disabled');
    cy.get('button').eq(6).should('be.disabled');
  });

  it('render default list', () => {
    cy.get('div[class*="circle_circle__xMxdD"').should('have.length', 5);
    cy.get('div[class*="circle_head__E38zo"')
      .first()
      .should(($div) => {
        expect($div).to.have.text('head');
      });
    cy.get('div[class*="circle_tail60__Q5Aq5"')
      .eq(4)
      .should(($div) => {
        expect($div).to.have.text('tail');
      });
  });

  it('add element to head', () => {
    cy.get('input').first().type('1');
    cy.get('button').eq(1).click();

    cy.get('div[class*="topCircle"')
      .first()
      .should(($div) => {
        expect($div).to.have.text('1');
        expect($div)
          .to.have.attr('class')
          .to.equal('circle_content__Adc7A list-page_topCircle__lav62');
      });
    cy.wait(500);
    cy.get('div[class*="circle_circle__xMxdD"')
      .first()
      .should(($div) => {
        expect($div).to.have.text('1');
        expect($div)
          .to.have.attr('class')
          .to.equal('circle_circle__xMxdD   ' + modifiedColor);
      });
    cy.wait(500);
    cy.get('div[class*="circle_circle__xMxdD"')
      .first()
      .should(($div) => {
        expect($div).to.have.text('1');
        expect($div)
          .to.have.attr('class')
          .to.equal('circle_circle__xMxdD   ' + defaultColor);
      });
  });

  it('add element to tail', () => {
    cy.get('input').first().type('1');
    cy.get('button').eq(2).click();

    cy.get('div[class*="topCircle"')
      .first()
      .should(($div) => {
        expect($div).to.have.text('1');
        expect($div)
          .to.have.attr('class')
          .to.equal('circle_content__Adc7A list-page_topCircle__lav62');
      });
    cy.wait(500);
    cy.get('div[class*="topCircle"').should(($div) => {
      expect($div).to.have.text('1');
      expect($div)
        .to.have.attr('class')
        .to.equal('circle_content__Adc7A list-page_topCircle__lav62');
    });
    cy.get('div[class*="circle_circle__xMxdD"')
      .first()
      .should(($div) => {
        expect($div)
          .to.have.attr('class')
          .to.equal('circle_circle__xMxdD   ' + changingColor);
      });

    cy.wait(500);
    cy.get('div[class*="topCircle"').should(($div) => {
      expect($div).to.have.text('1');
      expect($div)
        .to.have.attr('class')
        .to.equal('circle_content__Adc7A list-page_topCircle__lav62');
    });
    cy.get('div[class*="circle_circle__xMxdD"').should(($div) => {
      expect($div)
        .to.have.attr('class')
        .to.equal('circle_circle__xMxdD   ' + changingColor);
    });

    cy.wait(500);
    cy.get('div[class*="topCircle"').should(($div) => {
      expect($div).to.have.text('1');
      expect($div)
        .to.have.attr('class')
        .to.equal('circle_content__Adc7A list-page_topCircle__lav62');
    });
    cy.get('div[class*="circle_circle__xMxdD"')
      .eq(2)
      .should(($div) => {
        expect($div)
          .to.have.attr('class')
          .to.equal('circle_circle__xMxdD   ' + changingColor);
      });

    cy.wait(500);
    cy.get('div[class*="topCircle"').should(($div) => {
      expect($div).to.have.text('1');
      expect($div)
        .to.have.attr('class')
        .to.equal('circle_content__Adc7A list-page_topCircle__lav62');
    });
    cy.get('div[class*="circle_circle__xMxdD"')
      .eq(3)
      .should(($div) => {
        expect($div)
          .to.have.attr('class')
          .to.equal('circle_circle__xMxdD   ' + changingColor);
      });

    cy.wait(500);
    cy.get('div[class*="topCircle"').should(($div) => {
      expect($div).to.have.text('1');
      expect($div)
        .to.have.attr('class')
        .to.equal('circle_content__Adc7A list-page_topCircle__lav62');
    });
    cy.get('div[class*="circle_circle__xMxdD"')
      .eq(4)
      .should(($div) => {
        expect($div)
          .to.have.attr('class')
          .to.equal('circle_circle__xMxdD   ' + changingColor);
      });

    cy.wait(500);
    cy.get('div[class*="circle_circle__xMxdD"')
      .eq(5)
      .should(($div) => {
        expect($div).to.have.text('1');
        expect($div)
          .to.have.attr('class')
          .to.equal('circle_circle__xMxdD   ' + modifiedColor);
      });
    cy.wait(500);

    cy.get('div[class*="circle_circle__xMxdD"')
      .eq(5)
      .should(($div) => {
        expect($div).to.have.text('1');
        expect($div)
          .to.have.attr('class')
          .to.equal('circle_circle__xMxdD   ' + defaultColor);
      });
  });

  it('add by index', () => {
    cy.get('input').first().type('2');
    cy.get('input').eq(1).type('1');
    cy.get('button').eq(5).click();

    cy.get('div[class*="topCircle"')
      .first()
      .should(($div) => {
        expect($div).to.have.text('2');
        expect($div)
          .to.have.attr('class')
          .to.equal('circle_content__Adc7A list-page_topCircle__lav62');
      });
    cy.wait(500);
    cy.get('div[class*="topCircle"').should(($div) => {
      expect($div).to.have.text('2');
      expect($div)
        .to.have.attr('class')
        .to.equal('circle_content__Adc7A list-page_topCircle__lav62');
    });
    cy.get('div[class*="circle_circle__xMxdD"')
      .first()
      .should(($div) => {
        expect($div)
          .to.have.attr('class')
          .to.equal('circle_circle__xMxdD   ' + changingColor);
      });
    cy.get('div[class*="circle_circle__xMxdD"')
      .eq(1)
      .should(($div) => {
        expect($div).to.have.text('2');
        expect($div)
          .to.have.attr('class')
          .to.equal('circle_circle__xMxdD   ' + modifiedColor);
      });
    cy.wait(500);
    cy.get('div[class*="circle_circle__xMxdD"')
      .eq(1)
      .should(($div) => {
        expect($div).to.have.text('2');
        expect($div)
          .to.have.attr('class')
          .to.equal('circle_circle__xMxdD   ' + defaultColor);
      });
    cy.get('div[class*="circle_circle__xMxdD"').should('have.length', 6);
  });

  it('delete element from head', () => {
    cy.get('button').eq(3).click();

    cy.get('div[class*="circle_circle__xMxdD"')
      .first()
      .should(($div) => {
        expect($div).to.have.text('');
        expect($div)
          .to.have.attr('class')
          .to.equal('circle_circle__xMxdD   ' + defaultColor);
      });
    cy.get('div[class*="lowCircle"').should(($div) => {
      expect($div)
        .to.have.attr('class')
        .to.equal('circle_content__Adc7A list-page_lowCircle__7ZcGp');
    });
    cy.wait(500);
    cy.get('div[class*="circle_circle__xMxdD"')
      .first()
      .should(($div) => {
        expect($div)
          .to.have.attr('class')
          .to.equal('circle_circle__xMxdD   ' + modifiedColor);
      });
    cy.wait(500);
    cy.get('div[class*="circle_circle__xMxdD"')
      .first()
      .should(($div) => {
        expect($div)
          .to.have.attr('class')
          .to.equal('circle_circle__xMxdD   ' + defaultColor);
      });
    cy.get('div[class*="circle_circle__xMxdD"').should('have.length', 4);
  });

  it('delete element from tail', () => {
    cy.get('button').eq(4).click();

    cy.get('div[class*="lowCircle"').should(($div) => {
      expect($div)
        .to.have.attr('class')
        .to.equal('circle_content__Adc7A list-page_lowCircle__7ZcGp');
    });
    cy.get('div[class*="circle_circle__xMxdD"')
      .eq(4)
      .should(($div) => {
        expect($div).to.have.text('');
        expect($div)
          .to.have.attr('class')
          .to.equal('circle_circle__xMxdD   ' + defaultColor);
      });

    cy.wait(500);
    cy.get('div[class*="circle_circle__xMxdD"')
      .last()
      .should(($div) => {
        expect($div)
          .to.have.attr('class')
          .to.equal('circle_circle__xMxdD   ' + modifiedColor);
      });
    cy.wait(500);
    cy.get('div[class*="circle_circle__xMxdD"')
      .last()
      .should(($div) => {
        expect($div)
          .to.have.attr('class')
          .to.equal('circle_circle__xMxdD   ' + defaultColor);
      });
    cy.get('div[class*="circle_circle__xMxdD"').should('have.length', 4);
  });

  it('delete by index', () => {
    cy.get('input').eq(1).type('1');
    cy.get('button').eq(6).click();

    cy.get('div[class*="circle_circle__xMxdD"')
      .first()
      .should(($div) => {
        expect($div)
          .to.have.attr('class')
          .to.equal('circle_circle__xMxdD   ' + changingColor);
      });
    cy.get('div[class*="circle_circle__xMxdD"')
      .eq(1)
      .should(($div) => {
        expect($div)
          .to.have.attr('class')
          .to.equal('circle_circle__xMxdD   ' + changingColor);
      });
    cy.get('div[class*="circle_circle__xMxdD"')
      .eq(1)
      .should(($div) => {
        expect($div).to.have.text('');
      });
    cy.get('div[class*="lowCircle"').should(($div) => {
      expect($div)
        .to.have.attr('class')
        .to.equal('circle_content__Adc7A list-page_lowCircle__7ZcGp');
    });
    cy.get('div[class*="circle_circle__xMxdD"').should('have.length', 4);
  });
});
