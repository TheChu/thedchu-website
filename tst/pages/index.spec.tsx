import { render } from '@testing-library/react';
import { useStaticQuery } from 'gatsby';
import React from 'react';
import uuid from 'short-uuid';
import IndexPage from '../../src/pages/index';

jest.mock('short-uuid');
(uuid.generate as jest.Mock).mockReturnValue('test-uuid');

(useStaticQuery as jest.Mock).mockReturnValue({
  allMarkdownRemark: {
    edges: [
      {
        node: {
          frontmatter: {
            title: 'Test Title',
            date: 'June 200X',
          },
          thumbnail: {
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
      },
    ],
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

describe('IndexPage', () => {
  it('should match IndexPage snapshot', () => {
    const { asFragment } = render(<IndexPage />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render navigation bar', () => {
    const { getByRole } = render(<IndexPage />);
    expect(getByRole('navigation')).toBeVisible();
  });

  it('should render `Photos` section', () => {
    const { getByRole } = render(<IndexPage />);
    expect(getByRole('region', { name: 'Photos' })).toBeVisible();
  });

  it('should render footer', () => {
    const { getByRole } = render(<IndexPage />);
    expect(getByRole('contentinfo')).toBeVisible();
  });
});
