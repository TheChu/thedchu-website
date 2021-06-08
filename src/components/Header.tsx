import React, { Component, ReactElement } from 'react';
import config from '../../config';
import Scroll from './Scroll';

interface HeaderState {
  openMenu: boolean;
  visibilityClass: string;
}

export default class Header extends Component<{}, HeaderState> {
  constructor(props = {}) {
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
          <a className="navbar-brand" href="#page-top">
            {config.siteTitle}
          </a>

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
                  element="services"
                >
                  <a className="nav-link" href="#services">
                    Services
                  </a>
                </Scroll>
              </li>
              <li className="nav-item">
                <Scroll
                  onClick={() => this.toggleMenu(!openMenu)}
                  type="id"
                  element="portfolio"
                >
                  <a className="nav-link" href="#portfolio">
                    Portfolio
                  </a>
                </Scroll>
              </li>
              <li className="nav-item">
                <Scroll
                  onClick={() => this.toggleMenu(!openMenu)}
                  type="id"
                  element="contact"
                >
                  <a className="nav-link" href="#contact">
                    Contact
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
