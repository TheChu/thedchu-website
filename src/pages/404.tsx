import { Link } from 'gatsby';
import React, { ReactElement } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Layout from '../components/Layout';
import Masthead from '../components/Masthead';

const IndexPage = (): ReactElement => (
  <Layout>
    <Header />
    <Masthead>
      <div className="container h-100">
        <div className="row h-100 align-items-center justify-content-center text-center">
          <div className="col-lg-10 align-self-end">
            <h1 className="text-white font-weight-bold">Page not found</h1>
          </div>
          <div className="col-lg-8 align-self-baseline">
            <p className="text-light font-weight-light mb-5">Not a valid URL</p>
            <Link to="/" className="btn btn-primary btn-xl js-scroll-trigger">
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </Masthead>
    <Footer />
  </Layout>
);

export default IndexPage;
