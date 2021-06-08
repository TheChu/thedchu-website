import React, { FC, ReactElement } from 'react';
import config from '../../config';

const Footer: FC = (): ReactElement => (
  <footer className="bg-light py-5">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-8 text-center mt-5 mb-lg-0">
          {config.socialLinks.map((social) => {
            const { style, icon, url } = social;
            return (
              <a key={url} href={url} className="mx-2">
                <i className={`fa${style} fa-3x mb-3 ${icon}`} />
              </a>
            );
          })}
        </div>
      </div>
      <div className="small text-center text-muted">
        Copyright &copy; 2019 - Gatsby Starter Creative
      </div>
    </div>
  </footer>
);

export default Footer;
