import { AnchorLink } from 'gatsby-plugin-anchor-links';
import React, { Component, ReactElement } from 'react';
import config from '../../config';
import logo from '../assets/img/thedchu-logo.svg';

// TODO: Improve header accessibility

interface HeaderState {
  openMenu: boolean;
  visibilityClass: string;
}

export default class Header extends Component<{}, HeaderState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      openMenu: false,
      visibilityClass: '',
    };
  }

  componentDidMount(): void {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount(): void {
    window.removeEventListener('scroll', this.handleScroll);
  }

  toggleMenu = (value: boolean): void => {
    this.setState({ openMenu: value });
  };

  handleScroll = (): void => {
    const { visibilityClass } = this.state;
    if (window.pageYOffset > 300) {
      if (visibilityClass !== 'navbar-scrolled') {
        this.setState({ visibilityClass: 'navbar-scrolled' });
      }
    } else if (visibilityClass === 'navbar-scrolled') {
      this.setState({ visibilityClass: '' });
    }
  };

  render(): ReactElement {
    const { openMenu, visibilityClass } = this.state;
    return (
      <nav
        className={`navbar navbar-expand-lg navbar-light fixed-top py-3 ${visibilityClass}`}
        id="mainNav"
      >
        <div className="container">
          <div className="navbar-item">
            <ul className="navbar-nav mr-auto my-2 my-lg-0">
              {config.socialLinks.map((social) => {
                const { icon, name, style, url } = social;
                return (
                  <li key={url} className="nav-item">
                    <a href={url} className="nav-link nav-link-icon mx-2">
                      <i className={`fa${style} ${icon}`} aria-label={name} />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          <AnchorLink to="/#top" className="navbar-brand navbar-item" stripHash>
            <svg
              className="navbar-brand-logo"
              viewBox="0 0 1000 512"
              aria-label="DChu"
            >
              <use href={`${logo}#thedchu-logo`} />
            </svg>
          </AnchorLink>

          <div className="navbar-toggler-container">
            <button
              onClick={() => this.toggleMenu(!openMenu)}
              className={`navbar-toggler navbar-toggler-right ${
                openMenu ? '' : 'collapsed'
              }`}
              type="button"
              aria-controls="navbarResponsive"
              aria-expanded={openMenu}
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
          </div>

          <div
            className={`collapse navbar-collapse ${openMenu ? 'show' : ''}`}
            id="navbarResponsive"
          >
            <ul className="navbar-nav ml-auto my-2 my-lg-0">
              <li className="nav-item">
                <AnchorLink
                  to="/about#top"
                  className="nav-link"
                  onAnchorLinkClick={() => this.toggleMenu(!openMenu)}
                  stripHash
                >
                  About
                </AnchorLink>
              </li>
              <li className="nav-item">
                <AnchorLink
                  to="/#photos"
                  className="nav-link"
                  onAnchorLinkClick={() => this.toggleMenu(!openMenu)}
                  stripHash
                >
                  Photos
                </AnchorLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
