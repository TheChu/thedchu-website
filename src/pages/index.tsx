import React, { ReactElement } from 'react';
import Footer from '../components/Footer';
import Gallery from '../components/Gallery';
import Header from '../components/Header';
import Layout from '../components/Layout';
import Masthead from '../components/Masthead';
import Scroll from '../components/Scroll';
import logo from '../assets/img/thedchu-logo.svg';

// This won't be user later anyways
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import fullsize1 from '../assets/images/portfolio/fullsize/1.jpg';
// @ts-ignore
import fullsize2 from '../assets/images/portfolio/fullsize/2.jpg';
// @ts-ignore
import fullsize3 from '../assets/images/portfolio/fullsize/3.jpg';
// @ts-ignore
import fullsize4 from '../assets/images/portfolio/fullsize/4.jpg';
// @ts-ignore
import fullsize5 from '../assets/images/portfolio/fullsize/5.jpg';
// @ts-ignore
import fullsize6 from '../assets/images/portfolio/fullsize/6.jpg';
// @ts-ignore
import thumbnail1 from '../assets/images/portfolio/thumbnails/1.jpg';
// @ts-ignore
import thumbnail2 from '../assets/images/portfolio/thumbnails/2.jpg';
// @ts-ignore
import thumbnail3 from '../assets/images/portfolio/thumbnails/3.jpg';
// @ts-ignore
import thumbnail4 from '../assets/images/portfolio/thumbnails/4.jpg';
// @ts-ignore
import thumbnail5 from '../assets/images/portfolio/thumbnails/5.jpg';
// @ts-ignore
import thumbnail6 from '../assets/images/portfolio/thumbnails/6.jpg';
/* eslint-enable @typescript-eslint/ban-ts-comment */

const imgSet = [
  {
    src: fullsize1,
    thumbnail: thumbnail1,
    title: 'Category',
    desc: 'Project Name',
  },
  {
    src: fullsize2,
    thumbnail: thumbnail2,
    title: 'Category',
    desc: 'Project Name',
  },
  {
    src: fullsize3,
    thumbnail: thumbnail3,
    title: 'Category',
    desc: 'Project Name',
  },
  {
    src: fullsize4,
    thumbnail: thumbnail4,
    title: 'Category',
    desc: 'Project Name',
  },
  {
    src: fullsize5,
    thumbnail: thumbnail5,
    title: 'Category',
    desc: 'Project Name',
  },
  {
    src: fullsize6,
    thumbnail: thumbnail6,
    title: 'Category',
    desc: 'Project Name',
  },
];

const IndexPage = (): ReactElement => (
  <Layout>
    <Header />

    <Masthead>
      <div className="container h-100">
        <div className="row h-100 align-items-center justify-content-center text-center">
          <div className="col-lg-10 align-self-end">
            <h1 className="text-uppercase text-white font-weight-bold">
              <svg
                className="masthead-title"
                viewBox="0 0 1000 512"
                aria-label="DChu"
              >
                <use href={`${logo}#thedchu-logo`} />
              </svg>
            </h1>
            <hr className="divider my-4" />
          </div>
          <div className="col-lg-8 align-self-baseline">
            <p className="text-light font-weight-light mb-5">
              hello my name dchu I like to take nice photos, here are some
            </p>
            <Scroll type="id" element="photos">
              <a
                className="btn btn-primary btn-xl js-scroll-trigger"
                href="#photos"
              >
                Find Out More
              </a>
            </Scroll>
          </div>
        </div>
      </div>
    </Masthead>

    <section id="photos" aria-label="photos">
      <Gallery images={imgSet} />
    </section>

    <Footer />
  </Layout>
);

export default IndexPage;
