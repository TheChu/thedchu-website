import { render } from '@testing-library/react';
import { useStaticQuery } from 'gatsby';
import React from 'react';
import uuid from 'short-uuid';
import Masthead from '../../src/components/Masthead';

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
