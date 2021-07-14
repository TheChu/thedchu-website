/// <reference types='../support/index' />

describe('Home', () => {
  beforeEach(() => {
    cy.visit('/').waitForRouteChange();
    cy.url().should('equal', `${window.location.origin}/`);
    cy.window()
      .its('scrollY')
      .then((scrollY) => {
        if (scrollY !== 0) {
          cy.scrollTo('top').window().its('scrollY').should('equal', 0);
        }
      });
  });

  it('should scroll down to `Photos` section when clicking `below` link in description', () => {
    cy.window().its('scrollY').should('equal', 0);

    cy.get('header').findByRole('link', { name: 'below' }).click();
    cy.findByRole('region', { name: 'Photos' })
      .then((element) => element[0].offsetTop - 72)
      .then((offset) => {
        cy.window().its('scrollY').should('equal', offset);
      });
  });

  it('should navigate to `About` page when clicking `about me` link in description', () => {
    cy.get('header')
      .findByRole('link', { name: 'about me' })
      .click()
      .waitForRouteChange();
    cy.url().should('equal', `${window.location.origin}/about`);
  });

  it('should scroll down to `Photos` section when clicking `Scroll down` button', () => {
    cy.window().its('scrollY').should('equal', 0);

    cy.findByRole('link', { name: 'Scroll down' }).click();
    cy.findByRole('region', { name: 'Photos' })
      .then((element) => element[0].offsetTop - 72)
      .then((offset) => {
        cy.window().its('scrollY').should('equal', offset);
      });
  });
});
