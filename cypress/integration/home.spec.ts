describe('Home', () => {
  it('should scroll to top when clicking site title on navigation bar', () => {
    cy.visit('/');
    cy.scrollTo('bottom')
      .window()
      .its('scrollY')
      .should('not.equal', 0);
    cy.findByRole('link', { name: 'thedchu' }).click();
    cy.window()
      .its('scrollY')
      .should('equal', 0);
  });

  it('should scroll down to portfolio when clicking `Find out more` button', () => {
    cy.visit('/');

    // The window should scroll to the portfolio section's top position unless
    // that position is below the maximun scroll position (i.e. when you scroll
    // to the bottom, the portfolio's position is in view), in which case the
    // window should scroll to that position.
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
        cy.findByRole('region', { name: 'portfolio' })
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
