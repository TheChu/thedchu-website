import React, { FC, ReactElement } from 'react';
import config from '../../config';

// TODO: Improve footer accessibility

const Footer: FC = (): ReactElement => (
  <footer className="bg-dark py-5">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-8 text-center mt-5 mb-lg-0">
          {config.socialLinks.map((social) => {
            const { icon, name, style, url } = social;
            return (
              <a key={url} href={url} className="mx-2">
                <i
                  className={`fa${style} fa-3x mb-3 ${icon}`}
                  aria-label={name}
                />
              </a>
            );
          })}
        </div>
      </div>
      <div className="small text-center text-muted">
        Copyright &copy; 2021 - David Chu
      </div>
    </div>
  </footer>
);

export default Footer;
