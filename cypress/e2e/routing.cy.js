describe('routing is available', function () {
  it('the path to the page /recursion works', function () {
    cy.visit('http://localhost:3000/recursion');
    cy.contains('Строка');
  });
  it('the path to the page /fibonacci works', function () {
    cy.visit('http://localhost:3000/fibonacci');
    cy.contains('Последовательность Фибоначчи');
  });
  it('the path to the page /sorting works', function () {
    cy.visit('http://localhost:3000/sorting');
    cy.contains('Сортировка массива');
  });
  it('the path to the page /stack works', function () {
    cy.visit('http://localhost:3000/stack');
    cy.contains('Стек');
  });
  it('the path to the page /queue works', function () {
    cy.visit('http://localhost:3000/queue');
    cy.contains('Очередь');
  });
  it('the path to the page /list works', function () {
    cy.visit('http://localhost:3000/list');
    cy.contains('Связный список');
  });
});
