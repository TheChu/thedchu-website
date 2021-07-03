import { graphql, useStaticQuery } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';
import { getImage } from 'gatsby-plugin-image';
import { convertToBgImage } from 'gbimage-bridge';
import React, { FC, ReactElement, ReactNode } from 'react';

interface MastheadProps {
  children: ReactNode;
}

const Masthead: FC<MastheadProps> = (props: MastheadProps): ReactElement => {
  const { children } = props;
  const {
    mastheadImage: {
      localMasthead: {
        childImageSharp: { gatsbyImageData },
      },
    },
  } = useStaticQuery(graphql`
    query {
      mastheadImage {
        localMasthead {
          childImageSharp {
            gatsbyImageData(
              breakpoints: [750, 1080, 1366, 1920, 2560, 3072]
              formats: [AUTO]
              layout: FULL_WIDTH
              placeholder: BLURRED
              quality: 90
            )
          }
        }
      }
    }
  `);
  const bgImage = convertToBgImage(getImage(gatsbyImageData));

  return (
    <BackgroundImage
      Tag="header"
      className="masthead"
      backgroundColor="#040e18"
      {...bgImage} // eslint-disable-line react/jsx-props-no-spreading
    >
      <>{children}</>
    </BackgroundImage>
  );
};

export default Masthead;
