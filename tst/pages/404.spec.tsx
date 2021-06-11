import { render } from '@testing-library/react';
import { useStaticQuery } from 'gatsby';
import React from 'react';
import IndexPage from '../../src/pages/404';

(useStaticQuery as jest.Mock).mockReturnValue({
  site: { siteMetadata: { title: 'thedchu' } },
});

describe('404 IndexPage', () => {
  it('should match 404 IndexPage snapshot', () => {
    const { asFragment } = render(<IndexPage />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render navigation bar', () => {
    const { getByRole } = render(<IndexPage />);
    expect(getByRole('navigation')).toBeVisible();
  });

  it('should render a link to home page', () => {
    const { getByRole } = render(<IndexPage />);
    expect(getByRole('link', { name: 'Go Home' })).toBeVisible();
  });
});
