/// <reference types='../support/index' />

describe('About', () => {
  beforeEach(() => {
    cy.visit('/about').waitForRouteChange();
  });

  it('should scroll down to `About` section when clicking `Find out more` button', () => {
    // The window should scroll to the about section's top position unless
    // that position is below the maximun scroll position (i.e. when you scroll
    // to the bottom, the about section's position is in view), in which case
    // the window should scroll to that position.
    cy.scrollTo('bottom')
      .window()
      .its('scrollY')
      .should('not.equal', 0)
      .then((maxScrollY) => {
        cy.scrollTo('top').window().its('scrollY').should('equal', 0);
        cy.findByRole('link', { name: 'Find Out More' }).click();
        cy.findByRole('region', { name: 'About' })
          .then((element) => element[0].offsetTop)
          .then((offset) => {
            if (offset > maxScrollY) {
              cy.window().its('scrollY').should('equal', maxScrollY);
            } else {
              cy.window().its('scrollY').should('equal', offset);
            }
          });
      });
  });
});
