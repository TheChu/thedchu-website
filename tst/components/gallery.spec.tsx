import { render } from '@testing-library/react';
import { useStaticQuery } from 'gatsby';
import React from 'react';
import Gallery from '../../src/components/Gallery';

const mockEdge = (x: number) => ({
  node: {
    frontmatter: {
      title: `Test Title ${x}`,
      date: `June 200${x}`,
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
});
const edges = [mockEdge(1), mockEdge(2)];

(useStaticQuery as jest.Mock).mockReturnValue({
  allMarkdownRemark: {
    edges,
  },
});

describe('Gallery', () => {
  it('should match Gallery snapshot', () => {
    const { asFragment } = render(<Gallery />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render the correct number of image links', () => {
    const { getAllByRole } = render(<Gallery />);
    expect(getAllByRole('link').length).toBe(2);
  });

  it('should render titles and dates', () => {
    const { getByRole } = render(<Gallery />);
    edges.forEach(
      ({
        node: {
          frontmatter: { title, date },
        },
      }) => {
        const link = getByRole('link', { name: title });
        expect(link).toBeVisible();
        expect(link).toHaveTextContent(date);
      }
    );
  });
});
