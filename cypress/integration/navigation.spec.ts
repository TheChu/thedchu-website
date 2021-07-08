/// <reference types='../support/index' />

describe('Navigation', () => {
  const navLinkNames = ['About', 'Photos'];
  const socialLinks = [
    { name: 'Instagram', url: 'https://instagram.com/thedchu' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/thedchu' },
    { name: 'Github', url: 'https://github.com/thechu' },
    { name: 'Email', url: 'mailto:chu.david.a@gmail.com' },
  ];

  context('desktop', () => {
    it('should display navigation links', () => {
      cy.visit('/');
      cy.get('nav').findAllByRole('link').should('have.length', 6);
      cy.get('nav').findByRole('link', { name: 'DChu' }).should('not.exist');
      cy.get('nav')
        .findByRole('button', { name: 'Toggle navigation' })
        .should('not.exist');

      navLinkNames.forEach((name) => {
        cy.get('nav').findByRole('link', { name }).should('be.visible');
      });

      socialLinks.forEach(({ name, url }) => {
        cy.get('nav')
          .findByRole('link', { name })
          .should('be.visible')
          .then((link) => link.prop('href'))
          .then((href) => {
            expect(href).to.eq(url);
          });
      });
    });

    it('should navigate to `About` page when clicking `About`', () => {
      cy.visit('/');
      cy.url().should('equal', `${window.location.origin}/`);

      cy.get('nav')
        .findByRole('link', { name: 'About' })
        .click()
        .waitForRouteChange();
      cy.url().should('equal', `${window.location.origin}/about`);
    });

    // TODO: Add navigation and scroll tests once dual link/scroll implentation done

    it('should display logo only after scrolling down', () => {
      cy.visit('/');
      cy.get('nav').findByRole('link', { name: 'DChu' }).should('not.exist');

      cy.scrollTo(0, 400);
      cy.get('nav').findByRole('link', { name: 'DChu' }).should('be.visible');
    });
  });

  context('mobile', () => {
    beforeEach(() => {
      cy.viewport('samsung-s10');
    });

    const assertNavMenuVisible = () => {
      navLinkNames.forEach((name) => {
        cy.get('nav').findByRole('link', { name }).should('be.visible');
      });
    };

    const assertNavMenuHidden = () => {
      navLinkNames.forEach((name) => {
        cy.get('nav').findByRole('link', { name }).should('not.exist');
      });
    };

    it('should display and hide navigation menu when clicking `Toggle navigation` button', () => {
      cy.visit('/');
      cy.get('nav').findByRole('link', { name: 'DChu' }).should('be.visible');
      cy.get('nav')
        .findByRole('button', { name: 'Toggle navigation' })
        .should('be.visible');
      assertNavMenuHidden();

      cy.get('nav').findByRole('button', { name: 'Toggle navigation' }).click();
      assertNavMenuVisible();

      cy.get('nav').findByRole('button', { name: 'Toggle navigation' }).click();
      assertNavMenuHidden();
    });

    navLinkNames.forEach((name) => {
      it(`should hide navigation menu when clicking ${name} link`, () => {
        cy.visit('/');
        assertNavMenuHidden();

        cy.get('nav')
          .findByRole('button', { name: 'Toggle navigation' })
          .click();
        assertNavMenuVisible();

        cy.get('nav').findByRole('link', { name }).click();
        assertNavMenuHidden();
      });
    });
  });
});
