/// <reference types='../support/index' />

describe('404', () => {
  beforeEach(() => {
    cy.visit('/404/').waitForRouteChange();
    cy.url().should('equal', `${window.location.origin}/404/`);
  });

  it('should navigate to `Home` page when clicking `Go Home` button', () => {
    cy.findByRole('link', { name: 'Go Home' }).click().waitForRouteChange();
    cy.url().should('equal', `${window.location.origin}/`);
  });
});
