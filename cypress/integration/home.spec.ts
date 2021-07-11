/// <reference types='../support/index' />

describe('Home', () => {
  beforeEach(() => {
    cy.visit('/').waitForRouteChange();
  });

  it('should scroll down to `Photos` section when clicking `Find out more` button', () => {
    cy.window().its('scrollY').should('equal', 0);
    cy.findByRole('link', { name: 'Find Out More' }).click();
    cy.findByRole('region', { name: 'Photos' })
      .then((element) => element[0].offsetTop - 72)
      .then((offset) => {
        cy.window().its('scrollY').should('equal', offset);
      });
  });
});
