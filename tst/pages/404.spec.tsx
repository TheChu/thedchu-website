import { render } from '@testing-library/react';
import { useStaticQuery } from 'gatsby';
import React from 'react';
import uuid from 'short-uuid';
import IndexPage from '../../src/pages/404';

jest.mock('short-uuid');
(uuid.generate as jest.Mock).mockReturnValue('test-uuid');

(useStaticQuery as jest.Mock).mockReturnValue({
  mastheadImage: {
    localMasthead: {
      childImageSharp: {
        fluid: {
          base64: 'test-base64',
          aspectRatio: 1.5,
          src: 'test-src',
          srcSet: 'test-srcSet',
          srcWebp: 'test-srcWebp',
          srcSetWebp: 'test-srcSetWebp',
          sizes: 'test-sizes',
        },
      },
    },
  },
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
