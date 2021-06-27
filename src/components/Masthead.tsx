import { graphql, useStaticQuery } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';
import React, { FC, ReactElement, ReactNode } from 'react';

interface MastheadProps {
  children: ReactNode;
}

const Masthead: FC<MastheadProps> = (props: MastheadProps): ReactElement => {
  const { children } = props;
  const {
    mastheadImage: {
      localMasthead: {
        childImageSharp: { fluid },
      },
    },
  } = useStaticQuery(graphql`
    query {
      mastheadImage {
        localMasthead {
          childImageSharp {
            fluid(quality: 90, maxWidth: 3072) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  `);

  return (
    <BackgroundImage
      Tag="header"
      className="masthead"
      fluid={fluid}
      backgroundColor="#040e18"
    >
      <>{children}</>
    </BackgroundImage>
  );
};

export default Masthead;
