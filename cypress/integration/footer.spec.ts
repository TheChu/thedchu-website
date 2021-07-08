describe('Footer', () => {
  it(`should display social links`, () => {
    const socialLinks = [
      { name: 'Instagram', url: 'https://instagram.com/thedchu' },
      { name: 'LinkedIn', url: 'https://linkedin.com/in/thedchu' },
      { name: 'Github', url: 'https://github.com/thechu' },
      { name: 'Email', url: 'mailto:chu.david.a@gmail.com' },
    ];

    cy.visit('/');
    cy.get('footer').findAllByRole('link').should('have.length', 4);

    socialLinks.forEach(({ name, url }) => {
      cy.get('footer')
        .findByRole('link', { name })
        .should('be.visible')
        .then((link) => link.prop('href'))
        .then((href) => {
          expect(href).to.eq(url);
        });
    });
  });
});
