import { render } from '@testing-library/react';
import { useStaticQuery } from 'gatsby';
import React from 'react';
import uuid from 'short-uuid';
import AboutPage from '../../src/pages/about';

jest.mock('short-uuid');
(uuid.generate as jest.Mock).mockReturnValue('test-uuid');

const mockEdge = (i: number) => ({
  node: {
    description: `image ${i}`,
    localImage: {
      childImageSharp: {
        gatsbyImageData: {
          layout: 'constrained',
          placeholder: {
            fallback: 'test-base64',
          },
          images: {
            fallback: {
              src: 'test-src',
              srcSet: 'test-srcSet',
              sizes: '100vw',
            },
            sources: [],
          },
          width: 1,
          height: 0.6666666666666666,
        },
        original: { src: 'test-src' },
      },
    },
  },
});
const edges = [mockEdge(1), mockEdge(2), mockEdge(3), mockEdge(4)];

(useStaticQuery as jest.Mock).mockReturnValue({
  allAboutImage: {
    edges,
  },
  mastheadImage: {
    localImage: {
      childImageSharp: {
        gatsbyImageData: {
          layout: 'fullWidth',
          placeholder: {
            fallback: 'test-base64',
          },
          images: {
            fallback: {
              src: 'test-src',
              srcSet: 'test-srcSet',
              sizes: '100vw',
            },
            sources: [],
          },
          width: 1,
          height: 0.6666666666666666,
        },
      },
    },
  },
  site: { siteMetadata: { title: 'thedchu' } },
});

describe('AboutPage', () => {
  it('should match AboutPage snapshot', () => {
    const { asFragment } = render(<AboutPage />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render navigation bar', () => {
    const { getByRole } = render(<AboutPage />);
    expect(getByRole('navigation')).toBeVisible();
  });

  it('should render `Scroll down` link', () => {
    const { getByRole } = render(<AboutPage />);
    expect(getByRole('link', { name: 'Scroll down' })).toHaveAttribute(
      'href',
      '/about#about'
    );
  });

  it('should render `About` section', () => {
    const { getByRole } = render(<AboutPage />);
    expect(getByRole('region', { name: 'About' })).toBeVisible();
  });

  it('should render footer', () => {
    const { getByRole } = render(<AboutPage />);
    expect(getByRole('contentinfo')).toBeVisible();
  });
});
