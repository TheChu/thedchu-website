import { Link } from 'gatsby';
import { AnchorLink } from 'gatsby-plugin-anchor-links';
import React, { ReactElement } from 'react';
import SVG from 'react-inlinesvg';
import Footer from '../components/Footer';
import Gallery from '../components/Gallery';
import Header from '../components/Header';
import Layout from '../components/Layout';
import Masthead from '../components/Masthead';
import arrow from '../assets/img/arrow.svg';
import logo from '../assets/img/thedchu-logo.svg';

const IndexPage = (): ReactElement => (
  <Layout>
    <Header hideLogoAtTop />
    <Masthead>
      <div className="container h-100">
        <div className="row h-100 align-items-center justify-content-center text-center">
          <div className="col-lg-6 align-self-end">
            <h1>
              <SVG
                src={logo}
                className="masthead-title"
                viewBox="0 0 1000 512"
                width="auto"
                height="auto"
                aria-label="DChu"
              />
            </h1>
            <p className="text-light font-weight-light mb-0">
              Hi, I&apos;m David Chu. Welcome to my website!
            </p>
            <p className="text-light font-weight-light mb-5">
              It&apos;s a work in progress, but for now check out a few of my
              photos <AnchorLink to="/#photos">below</AnchorLink> or read more{' '}
              <Link to="/about">about me</Link>.
            </p>
          </div>
          <div className="col-lg-8 align-self-end">
            <AnchorLink to="/#photos">
              <SVG
                src={arrow}
                className="masthead-arrow"
                viewBox="0 0 24 24"
                width="auto"
                height="auto"
                aria-label="Scroll down"
              />
            </AnchorLink>
          </div>
        </div>
      </div>
    </Masthead>
    <Gallery />
    <Footer />
  </Layout>
);

export default IndexPage;
