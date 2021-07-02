import { Link } from 'gatsby';
import React, { Component, ReactElement } from 'react';
import config from '../../config';
import Scroll from './Scroll';
import logo from '../assets/img/thedchu-logo.svg';

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
          <Link to="/" className="navbar-brand navbar-item">
            <svg
              className="navbar-brand-logo"
              viewBox="0 0 1000 512"
              aria-label="DChu"
            >
              <use href={`${logo}#thedchu-logo`} />
            </svg>
          </Link>

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
                <Scroll
                  onClick={() => this.toggleMenu(!openMenu)}
                  type="id"
                  element="about"
                >
                  <a className="nav-link" href="#about">
                    About
                  </a>
                </Scroll>
              </li>
              <li className="nav-item">
                <Scroll
                  onClick={() => this.toggleMenu(!openMenu)}
                  type="id"
                  element="photos"
                >
                  <a className="nav-link" href="#photos">
                    Photos
                  </a>
                </Scroll>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
