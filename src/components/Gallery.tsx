import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import React, { FC, ReactElement } from 'react';

const Gallery: FC = (): ReactElement => {
  const {
    allMarkdownRemark: { edges },
  } = useStaticQuery(graphql`
    query {
      allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
        edges {
          node {
            frontmatter {
              title
              date(formatString: "MMMM YYYY")
            }
            thumbnail {
              childImageSharp {
                gatsbyImageData(placeholder: BLURRED, quality: 90)
                original {
                  src
                }
              }
            }
          }
        }
      }
    }
  `);

  return (
    <section id="photos" className="bg-dark" aria-label="Photos">
      <div className="container-fluid p-0">
        <div className="row no-gutters">
          {edges.map(
            ({
              node: {
                frontmatter: { title, date },
                thumbnail: {
                  childImageSharp: {
                    gatsbyImageData,
                    original: { src },
                  },
                },
              },
            }) => (
              <div key={title} className="col-lg-3 col-sm-6">
                <a className="photos-box" href={src} aria-label={title}>
                  <GatsbyImage image={gatsbyImageData} alt={title} />
                  <div className="photos-box-caption">
                    <div className="project-category text-white-50">{date}</div>
                    <div className="project-name">{title}</div>
                  </div>
                </a>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
