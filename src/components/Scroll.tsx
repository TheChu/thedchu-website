import React, {
  cloneElement,
  Component,
  KeyboardEvent,
  MouseEvent,
  ReactElement,
} from 'react';
import smoothscroll from 'smoothscroll-polyfill';

const Element = (props) => props.children;

interface ScrollProps {
  children: ReactElement;
  element?: string;
  offset?: number;
  onClick?: (event: KeyboardEvent | MouseEvent) => void;
  timeout?: number;
  type?: string;
}

class Scroll extends Component<ScrollProps> {
  constructor(props: ScrollProps) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount(): void {
    smoothscroll.polyfill();
  }

  handleClick = (event: KeyboardEvent | MouseEvent): void => {
    event.preventDefault();
    const { onClick = () => {} } = this.props; // eslint-disable-line
    let elem: Element;
    let scroll = true;
    const { type, element, offset, timeout } = this.props;
    if (type && element) {
      switch (type) {
        case 'class':
          [elem] = document.getElementsByClassName(element);
          scroll = !!elem;
          break;
        case 'id':
          elem = document.getElementById(element);
          scroll = !!elem;
          break;
        default:
      }
    }

    if (scroll) {
      this.scrollTo(elem, offset, timeout);
    } else {
      console.log(`Element not found: ${element}`); // eslint-disable-line
    }

    onClick(event);
  };

  scrollTo = (element: Element, offSet = 0, timeout = null): void => {
    const elemPos = element
      ? element.getBoundingClientRect().top + window.pageYOffset
      : 0;
    if (timeout) {
      setTimeout(() => {
        window.scroll({ top: elemPos + offSet, left: 0, behavior: 'smooth' });
      }, timeout);
    } else {
      window.scroll({ top: elemPos + offSet, left: 0, behavior: 'smooth' });
    }
  };

  render(): ReactElement {
    const { children } = this.props;

    return (
      <Element>
        {cloneElement(children, {
          onClick: this.handleClick,
        })}
      </Element>
    );
  }
}

export default Scroll;
