/// <reference types='../support/index' />

describe('404', () => {
  it('should navigate to home when clicking `Go Home` button', () => {
    cy.visit('/404/');
    cy.url().should('equal', `${window.location.origin}/404/`);

    cy.findByRole('link', { name: 'Go Home' }).click().waitForRouteChange();
    cy.url().should('equal', `${window.location.origin}/`);
  });
});
