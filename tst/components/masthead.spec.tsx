import { render } from '@testing-library/react';
import { useStaticQuery } from 'gatsby';
import React from 'react';
import uuid from 'short-uuid';
import Masthead from '../../src/components/Masthead';

jest.mock('short-uuid');
(uuid.generate as jest.Mock).mockReturnValue('test-uuid');

(useStaticQuery as jest.Mock).mockReturnValue({
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
});

describe('Masthead', () => {
  it('should match Masthead snapshot', () => {
    const { asFragment } = render(
      <Masthead>
        <div className="test div" />
      </Masthead>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
