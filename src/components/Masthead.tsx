import { graphql, useStaticQuery } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';
import { getImage } from 'gatsby-plugin-image';
import { convertToBgImage } from 'gbimage-bridge';
import React, { FC, ReactElement, ReactNode } from 'react';

interface MastheadProps {
  children: ReactNode;
  halfHeight?: boolean;
}

const Masthead: FC<MastheadProps> = ({
  children,
  halfHeight = false,
}: MastheadProps): ReactElement => {
  const {
    mastheadImage: {
      localImage: {
        childImageSharp: { gatsbyImageData },
      },
    },
  } = useStaticQuery(graphql`
    query {
      mastheadImage {
        localImage {
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
      id="top"
      Tag="header"
      className={halfHeight ? 'masthead halfHeight' : 'masthead'}
      backgroundColor="#040e18"
      {...bgImage} // eslint-disable-line react/jsx-props-no-spreading
    >
      <>{children}</>
    </BackgroundImage>
  );
};

export default Masthead;
