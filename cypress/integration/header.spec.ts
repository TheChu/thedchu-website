/// <reference types='../support/index' />

describe('Header', () => {
  const navLinkNames = ['About', 'Photos'];
  const socialLinks = [
    { name: 'Instagram', url: 'https://instagram.com/thedchu' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/thedchu' },
    { name: 'Github', url: 'https://github.com/thechu' },
    { name: 'Email', url: 'mailto:chu.david.a@gmail.com' },
  ];

  context('desktop', () => {
    context('Home page', () => {
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

      it('should display navigation links', () => {
        cy.window().its('scrollY').should('equal', 0);
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

      it('should display logo only after scrolling down', () => {
        cy.window().its('scrollY').should('equal', 0);
        cy.get('nav').findAllByRole('link').should('have.length', 6);
        cy.get('nav').findByRole('link', { name: 'DChu' }).should('not.exist');

        cy.scrollTo(0, 400).window().its('scrollY').should('not.equal', 0);
        cy.get('nav').findAllByRole('link').should('have.length', 7);
        cy.get('nav').findByRole('link', { name: 'DChu' }).should('be.visible');
      });

      it('should scroll to top when clicking logo on navigation bar', () => {
        cy.scrollTo(0, 400).window().its('scrollY').should('not.equal', 0);

        cy.get('nav').findByRole('link', { name: 'DChu' }).click();
        cy.url().should('equal', `${window.location.origin}/`);
        cy.window().its('scrollY').should('equal', 0);
      });

      it('should navigate to `About` page when clicking `About`', () => {
        cy.get('nav')
          .findByRole('link', { name: 'About' })
          .click()
          .waitForRouteChange();
        cy.url().should('equal', `${window.location.origin}/about`);
      });

      it('should scroll down to `Photos` section when clicking `Photos`', () => {
        cy.window().its('scrollY').should('equal', 0);
        cy.get('nav').findByRole('link', { name: 'Photos' }).click();
        cy.url().should('equal', `${window.location.origin}/`);
        cy.findByRole('region', { name: 'Photos' })
          .then((element) => element[0].offsetTop - 72)
          .then((offset) => {
            cy.window().its('scrollY').should('equal', offset);
          });
      });
    });

    context('About page', () => {
      beforeEach(() => {
        cy.visit('/about/').waitForRouteChange();
        cy.url().should('equal', `${window.location.origin}/about/`);
        cy.window()
          .its('scrollY')
          .then((scrollY) => {
            if (scrollY !== 0) {
              cy.scrollTo('top').window().its('scrollY').should('equal', 0);
            }
          });
      });

      it('should display logo even at top', () => {
        cy.window().its('scrollY').should('equal', 0);
        cy.get('nav').findAllByRole('link').should('have.length', 7);
        cy.get('nav').findByRole('link', { name: 'DChu' }).should('be.visible');
      });

      it('should navigate to `Home` page when clicking logo', () => {
        cy.get('nav')
          .findByRole('link', { name: 'DChu' })
          .click()
          .waitForRouteChange();
        cy.url().should('equal', `${window.location.origin}/`);
      });

      it('should scroll to top when clicking `About`', () => {
        cy.scrollTo(0, 400).window().its('scrollY').should('not.equal', 0);

        cy.get('nav').findByRole('link', { name: 'About' }).click();
        cy.url().should('equal', `${window.location.origin}/about`);
        cy.window().its('scrollY').should('equal', 0);
      });

      it('should navigate to `Home` page and scroll down to `Photos` section when clicking `Photos`', () => {
        cy.get('nav')
          .findByRole('link', { name: 'Photos' })
          .click()
          .waitForRouteChange();
        cy.url().should('equal', `${window.location.origin}/`);
        cy.findByRole('region', { name: 'Photos' })
          .then((element) => element[0].offsetTop - 72)
          .then((offset) => {
            cy.window().its('scrollY').should('equal', offset);
          });
      });
    });
  });

  context('mobile', () => {
    beforeEach(() => {
      cy.viewport('samsung-s10');
      cy.visit('/').waitForRouteChange();
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
