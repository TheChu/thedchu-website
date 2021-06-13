import { render } from '@testing-library/react';
import React from 'react';
import Footer from '../../src/components/Footer';

describe('Footer', () => {
  it('should match Footer snapshot', () => {
    const { asFragment } = render(<Footer />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render the correct number of social links', () => {
    const { getAllByRole } = render(<Footer />);
    expect(getAllByRole('link').length).toBe(4);
  });

  const socialLinks = [
    { name: 'Instagram', url: 'https://instagram.com/thedchu' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/thedchu' },
    { name: 'Github', url: 'https://github.com/thechu' },
    { name: 'Email', url: 'mailto:chu.david.a@gmail.com' },
  ];

  it.each(socialLinks)('should render %s link', (link) => {
    const { getByRole } = render(<Footer />);
    expect(getByRole('link', { name: link.name })).toHaveAttribute(
      'href',
      link.url
    );
  });

  it('should render copyright text', () => {
    const { getByText } = render(<Footer />);
    expect(
      getByText('Copyright © 2019 - Gatsby Starter Creative')
    ).toBeVisible();
  });
});
