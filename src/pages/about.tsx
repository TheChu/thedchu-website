import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';
import React, { FC, ReactElement, ReactNode } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Layout from '../components/Layout';
import Masthead from '../components/Masthead';
import Scroll from '../components/Scroll';

interface AboutRowProps {
  children: ReactNode;
  edge: {
    node: {
      description: string;
      localImage: {
        childImageSharp: {
          gatsbyImageData: IGatsbyImageData;
        };
      };
    };
  };
}

const AboutRow: FC<AboutRowProps> = ({
  edge: {
    node: {
      description,
      localImage: {
        childImageSharp: { gatsbyImageData },
      },
    },
  },
  children,
}) => (
  <section className="about-row">
    <div className="image col-lg-6 p-0">
      <GatsbyImage image={gatsbyImageData} alt={description} />
    </div>
    <div className="content col-lg-6 p-4">{children}</div>
  </section>
);

const IndexPage = (): ReactElement => {
  const {
    allAboutImage: { edges },
  } = useStaticQuery(graphql`
    query {
      allAboutImage(sort: { order: ASC, fields: url }) {
        edges {
          node {
            description
            localImage {
              childImageSharp {
                gatsbyImageData(placeholder: BLURRED, quality: 90)
              }
            }
          }
        }
      }
    }
  `);

  return (
    <Layout>
      <Header />
      <Masthead halfHeight>
        <div className="container h-100">
          <div className="row h-100 align-items-center justify-content-center text-center">
            <div className="col-lg-10 align-self-end">
              <h1 className="text-white font-weight-bold">About me</h1>
            </div>
            <div className="col-lg-8 align-self-baseline">
              <p className="text-light font-weight-light mb-5">Welcome!</p>
              <Scroll type="id" element="about">
                <a
                  className="btn btn-primary btn-xl js-scroll-trigger"
                  href="#about"
                >
                  Find Out More
                </a>
              </Scroll>
            </div>
          </div>
        </div>
      </Masthead>

      <section id="about" className="bg-light" aria-label="About">
        <div className="container-fluid p-0">
          <AboutRow edge={edges[0]}>
            <p>
              Thanks for checking out my website! I&apos;m David Chu, a software
              engineer based in Seattle. Born and raised in Panama, I attended
              college in Southern California before heading up to the Emerald
              City.
            </p>
          </AboutRow>
          <AboutRow edge={edges[1]}>
            <p>
              As you can probably tell, I&apos;m passionate about photography! I
              mostly do travel, street, and landscape photography these days.
              Last year, I switched from a Canon DSLR to a Fujifilm mirrorless
              camera in favor of portability, and I&apos;ve been loving it!
            </p>
            <div className="gear">
              <p>My current gear:</p>
              <ul>
                <li>Fujifilm X-T4</li>
                <li>Fujinon XF 23mm F/2 R WR</li>
                <li>Fujinon XF 50mm F/2 R WR</li>
                <li>Fujinon XC 50-230mm F/4.5-6.7 OIS II</li>
              </ul>
            </div>
          </AboutRow>
          <AboutRow edge={edges[2]}>
            <p>
              I built this website (currently a work in progress!) with: Gatsby,
              React, GraphQL, Typescript, SASS, AWS S3, hosted on AWS Amplify,
              and tested with Jest, Testing Library, and Cypress. For now,
              it&apos;ll just be a photography-focused travel/activity blog.
              Later on I may add in a tech blog or film analysis
              blog...we&apos;ll see!
            </p>
          </AboutRow>
          <AboutRow edge={edges[3]}>
            <p>
              Outside of photography and tech, I play classical guitar, go to
              the gym, and spend time outdoors. During summer I hike (though
              that goes hand-in-hand with landscape photography!), and during
              winter I ski. I&apos;m also a bit of a cinephile and a Real Madrid
              fan.
            </p>
          </AboutRow>
        </div>
      </section>
      <Footer />
    </Layout>
  );
};

export default IndexPage;
