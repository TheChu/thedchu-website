describe('Home', () => {
  it('should go to top when clicking logo on navigation bar', () => {
    cy.visit('/').wait(500);
    cy.scrollTo('bottom')
      .window()
      .its('scrollY')
      .should('not.equal', 0);
    cy.get('nav')
      .findByRole('link', { name: 'DChu' })
      .click();
    cy.window()
      .its('scrollY')
      .should('equal', 0);
  });

  it('should scroll down to photos when clicking `Find out more` button', () => {
    cy.visit('/').wait(500);

    // The window should scroll to the photos section's top position unless
    // that position is below the maximun scroll position (i.e. when you scroll
    // to the bottom, the photos section's position is in view), in which case
    // the window should scroll to that position.
    cy.scrollTo('bottom')
      .window()
      .its('scrollY')
      .should('not.equal', 0)
      .then((maxScrollY) => {
        cy.scrollTo('top')
          .window()
          .its('scrollY')
          .should('equal', 0);
        cy.findByRole('link', { name: 'Find Out More' }).click();
        cy.findByRole('region', { name: 'photos' })
          .then((element) => element[0].offsetTop)
          .then((offset) => {
            if (offset > maxScrollY) {
              cy.window()
                .its('scrollY')
                .should('equal', maxScrollY);
            } else {
              cy.window()
                .its('scrollY')
                .should('equal', offset);
            }
          });
      });
  });
});
