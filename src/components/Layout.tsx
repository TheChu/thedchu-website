import { graphql, useStaticQuery } from 'gatsby';
import React, { FC, ReactElement, ReactNode } from 'react';
import Helmet from 'react-helmet';
import '../assets/sass/creative.scss';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = (props: LayoutProps): ReactElement => {
  const { children } = props;
  const {
    site: {
      siteMetadata: { title },
    },
  } = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <>
      <Helmet
        title={title}
        meta={[
          { name: 'description', content: 'Creative' },
          { name: 'keywords', content: 'site, web' },
        ]}
      >
        <html lang="en" />
      </Helmet>
      <div className="page-top">{children}</div>
    </>
  );
};

export default Layout;
