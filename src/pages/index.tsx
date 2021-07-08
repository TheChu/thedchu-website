import React, { ReactElement } from 'react';
import Footer from '../components/Footer';
import Gallery from '../components/Gallery';
import Header from '../components/Header';
import Layout from '../components/Layout';
import Masthead from '../components/Masthead';
import Scroll from '../components/Scroll';
import logo from '../assets/img/thedchu-logo.svg';

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
    <Gallery />
    <Footer />
  </Layout>
);

export default IndexPage;
