import React, { ReactElement } from 'react';
import config from '../../config';
import ContactUs from '../components/ContactUs';
import Footer from '../components/Footer';
import Gallery from '../components/Gallery';
import Header from '../components/Header';
import Layout from '../components/Layout';
import Scroll from '../components/Scroll';

/* eslint-disable global-require */ // This won't be user later anyways
const imgSet = [
  {
    src: require('../assets/images/portfolio/fullsize/1.jpg'),
    thumbnail: require('../assets/images/portfolio/thumbnails/1.jpg'),
    title: 'Category',
    desc: 'Project Name',
  },
  {
    src: require('../assets/images/portfolio/fullsize/2.jpg'),
    thumbnail: require('../assets/images/portfolio/thumbnails/2.jpg'),
    title: 'Category',
    desc: 'Project Name',
  },
  {
    src: require('../assets/images/portfolio/fullsize/3.jpg'),
    thumbnail: require('../assets/images/portfolio/thumbnails/3.jpg'),
    title: 'Category',
    desc: 'Project Name',
  },
  {
    src: require('../assets/images/portfolio/fullsize/4.jpg'),
    thumbnail: require('../assets/images/portfolio/thumbnails/4.jpg'),
    title: 'Category',
    desc: 'Project Name',
  },
  {
    src: require('../assets/images/portfolio/fullsize/5.jpg'),
    thumbnail: require('../assets/images/portfolio/thumbnails/5.jpg'),
    title: 'Category',
    desc: 'Project Name',
  },
  {
    src: require('../assets/images/portfolio/fullsize/6.jpg'),
    thumbnail: require('../assets/images/portfolio/thumbnails/6.jpg'),
    title: 'Category',
    desc: 'Project Name',
  },
];
/* eslint-enable global-require */

const IndexPage = (): ReactElement => (
  <Layout>
    <Header />

    <header className="masthead">
      <div className="container h-100">
        <div className="row h-100 align-items-center justify-content-center text-center">
          <div className="col-lg-10 align-self-end">
            <h1 className="text-uppercase text-white font-weight-bold">
              {config.heading}
            </h1>
            <hr className="divider my-4" />
          </div>
          <div className="col-lg-8 align-self-baseline">
            <p className="text-white-75 font-weight-light mb-5">
              {config.subHeading}
            </p>
            <Scroll type="id" element="portfolio">
              <a
                className="btn btn-primary btn-xl js-scroll-trigger"
                href="#portfolio"
              >
                Find Out More
              </a>
            </Scroll>
          </div>
        </div>
      </div>
    </header>

    <section id="portfolio">
      <Gallery images={imgSet} />
    </section>

    <ContactUs />

    <Footer />
  </Layout>
);

export default IndexPage;