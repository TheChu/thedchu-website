import { StaticQuery, graphql } from 'gatsby';
import React, { FC, ReactElement, ReactNode } from 'react';
import Helmet from 'react-helmet';

import '../assets/sass/creative.scss';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = (props: LayoutProps): ReactElement => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={(data) => (
      <>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: 'Creative' },
            { name: 'keywords', content: 'site, web' },
          ]}
        >
          <html lang="en" />
        </Helmet>
        <div className="page-top">{props.children}</div>
      </>
    )}
  />
);

export default Layout;
