import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import Header from '../../src/components/Header';

describe('Header', () => {
  it('should match Header snapshot', () => {
    const { asFragment } = render(<Header />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render the correct number of links', () => {
    const { getAllByRole } = render(<Header />);
    expect(getAllByRole('link').length).toBe(7);
  });

  const navigationLinks = [
    { text: 'About', location: '/about' },
    { text: 'Photos', location: '/' },
  ];

  it.each(navigationLinks)('should render %s link', (link) => {
    const { getByRole } = render(<Header />);
    expect(getByRole('link', { name: link.text })).toHaveAttribute(
      'href',
      link.location
    );
  });

  const socialLinks = [
    { name: 'Instagram', url: 'https://instagram.com/thedchu' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/thedchu' },
    { name: 'Github', url: 'https://github.com/thechu' },
    { name: 'Email', url: 'mailto:chu.david.a@gmail.com' },
  ];

  it.each(socialLinks)('should render %s link', (link) => {
    const { getByRole } = render(<Header />);
    expect(getByRole('link', { name: link.name })).toHaveAttribute(
      'href',
      link.url
    );
  });

  it('should render logo', () => {
    const { getByRole } = render(<Header />);
    expect(getByRole('link', { name: 'DChu' })).toHaveAttribute('href', '/');
  });

  it('should not have class `navbar-hide-logo-at-top` by default', () => {
    const { getByRole } = render(<Header />);
    expect(getByRole('link', { name: 'DChu' })).not.toHaveClass(
      'navbar-hide-logo-at-top'
    );
  });

  it('should have class `navbar-hide-logo-at-top` when `hideLogoAtTop` option provided', () => {
    const { getByRole } = render(<Header hideLogoAtTop />);
    expect(getByRole('link', { name: 'DChu' })).toHaveClass(
      'navbar-hide-logo-at-top'
    );
  });

  it('should change navigation bar when scrolling past threshold', () => {
    const { getByRole } = render(<Header />);
    expect(getByRole('navigation')).not.toHaveClass('navbar-scrolled');

    // Past threshold of 300
    fireEvent.scroll(window, { target: { pageYOffset: 500 } });
    expect(getByRole('navigation')).toHaveClass('navbar-scrolled');

    fireEvent.scroll(window, { target: { pageYOffset: 600 } });
    expect(getByRole('navigation')).toHaveClass('navbar-scrolled');

    // Within threshold of 300
    fireEvent.scroll(window, { target: { pageYOffset: 0 } });
    expect(getByRole('navigation')).not.toHaveClass('navbar-scrolled');

    fireEvent.scroll(window, { target: { pageYOffset: 100 } });
    expect(getByRole('navigation')).not.toHaveClass('navbar-scrolled');
  });

  // The navigation bar expands and closes only on mobile (or a small desktop
  // window) while on desktop it is always shown and cannot be closed. Although
  // the following tests technically only apply for mobile, the button does
  // exist in the test environment DOM and has a `aria-expanded=false` at
  // startup. So, we can test funcionality without needing to inject styles.
  // This is now tested more "correctly" with Cypress.
  describe('mobile navigation bar menu', () => {
    const assertNavMenuClosed = (getByRole, queryByRole) => {
      expect(
        getByRole('button', { name: 'Toggle navigation', expanded: false })
      ).toBeInTheDocument();
      expect(
        queryByRole('button', { name: 'Toggle navigation', expanded: true })
      ).not.toBeInTheDocument();
    };

    const assertNavMenuOpen = (getByRole, queryByRole) => {
      expect(
        queryByRole('button', { name: 'Toggle navigation', expanded: false })
      ).not.toBeInTheDocument();
      expect(
        getByRole('button', { name: 'Toggle navigation', expanded: true })
      ).toBeInTheDocument();
    };

    it('should display and hide navigation menu when clicking `Toggle navigation` button', () => {
      const { getByRole, queryByRole } = render(<Header />);
      assertNavMenuClosed(getByRole, queryByRole);

      fireEvent.click(getByRole('button', { name: 'Toggle navigation' }));
      assertNavMenuOpen(getByRole, queryByRole);

      fireEvent.click(getByRole('button', { name: 'Toggle navigation' }));
      assertNavMenuClosed(getByRole, queryByRole);
    });

    it.each(navigationLinks)(
      'should hide navigation menu when clicking %s link',
      (link) => {
        const { getByRole, queryByRole } = render(<Header />);
        assertNavMenuClosed(getByRole, queryByRole);

        fireEvent.click(getByRole('button', { name: 'Toggle navigation' }));
        assertNavMenuOpen(getByRole, queryByRole);

        fireEvent.click(getByRole('link', { name: link.text }));
        assertNavMenuClosed(getByRole, queryByRole);
      }
    );
  });
});
