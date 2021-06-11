import { render } from '@testing-library/react';
import { useStaticQuery } from 'gatsby';
import React from 'react';
import uuid from 'short-uuid';
import IndexPage from '../../src/pages/index';

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

describe('IndexPage', () => {
  it('should match IndexPage snapshot', () => {
    const { asFragment } = render(<IndexPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
