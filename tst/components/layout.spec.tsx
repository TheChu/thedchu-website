import { render } from '@testing-library/react';
import { useStaticQuery } from 'gatsby';
import React from 'react';
import Helmet from 'react-helmet';
import Layout from '../../src/components/Layout';

(useStaticQuery as jest.Mock).mockReturnValue({
  site: { siteMetadata: { title: 'thedchu' } },
});

describe('Layout', () => {
  it('should match Layout snapshot', () => {
    const { asFragment } = render(
      <Layout>
        <div className="test div" />
      </Layout>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render metadata', () => {
    render(
      <Layout>
        <div className="test div" />
      </Layout>
    );
    const { htmlAttributes, metaTags, title } = Helmet.peek();
    expect(title).toBe('thedchu');
    expect(metaTags.length).toBe(2);
    expect(metaTags).toEqual(
      expect.arrayContaining([
        { name: 'description', content: 'Creative' },
        { name: 'keywords', content: 'site, web' },
      ])
    );
    expect(htmlAttributes).toEqual({ lang: 'en' });
  });
});
