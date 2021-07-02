describe('Footer', () => {
  const socialLinks = [
    { name: 'Instagram', url: 'https://instagram.com/thedchu' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/thedchu' },
    { name: 'Github', url: 'https://github.com/thechu' },
    { name: 'Email', url: 'mailto:chu.david.a@gmail.com' },
  ];

  socialLinks.forEach(({ name, url }) => {
    it(`should display ${name} link`, () => {
      cy.visit('/');
      cy.get('footer')
        .findByRole('link', { name })
        .should('be.visible')
        .then((link) => (<HTMLAnchorElement>link[0]).href)
        .then((href) => {
          expect(href).to.eq(url);
        });
    });
  });
});
