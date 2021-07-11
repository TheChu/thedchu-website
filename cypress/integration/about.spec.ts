/// <reference types='../support/index' />

describe('About', () => {
  beforeEach(() => {
    cy.visit('/about/').waitForRouteChange();
  });

  it('should scroll down to `About` section when clicking `Find out more` button', () => {
    cy.window().its('scrollY').should('equal', 0);
    cy.findByRole('link', { name: 'Find Out More' }).click();
    cy.findByRole('region', { name: 'About' })
      .then((element) => element[0].offsetTop - 72)
      .then((offset) => {
        cy.window().its('scrollY').should('equal', offset);
      });
  });
});
