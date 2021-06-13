describe('Navigation', () => {
  const navLinkNames = ['About', 'Services', 'Portfolio', 'Contact'];

  context('desktop', () => {
    it('should display navigation links', () => {
      cy.visit('/');
      cy.findByRole('link', { name: 'thedchu' }).should('be.visible');
      cy.findByRole('button', { name: 'Toggle navigation' }).should(
        'not.exist'
      );
      navLinkNames.forEach((name) => {
        cy.findByRole('link', { name }).should('be.visible');
      });
    });
  });

  context('mobile', () => {
    beforeEach(() => {
      cy.viewport('samsung-s10');
    });

    const assertNavMenuVisible = () => {
      navLinkNames.forEach((name) => {
        cy.findByRole('link', { name }).should('be.visible');
      });
    };

    const assertNavMenuHidden = () => {
      navLinkNames.forEach((name) => {
        cy.findByRole('link', { name }).should('not.exist');
      });
    };

    it('should display and hide navigation menu when clicking `Toggle navigation` button', () => {
      cy.visit('/');
      cy.findByRole('link', { name: 'thedchu' }).should('be.visible');
      cy.findByRole('button', { name: 'Toggle navigation' }).should(
        'be.visible'
      );
      assertNavMenuHidden();

      cy.findByRole('button', { name: 'Toggle navigation' }).click();
      assertNavMenuVisible();

      cy.findByRole('button', { name: 'Toggle navigation' }).click();
      assertNavMenuHidden();
    });

    navLinkNames.forEach((name) => {
      it(`should hide navigation menu when clicking ${name} link`, () => {
        cy.visit('/');
        assertNavMenuHidden();

        cy.findByRole('button', { name: 'Toggle navigation' }).click();
        assertNavMenuVisible();

        cy.findByRole('link', { name }).click();
        assertNavMenuHidden();
      });
    });
  });
});
