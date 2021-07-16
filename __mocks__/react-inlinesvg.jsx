import React from 'react';

export default function ReactInlineSVG({ src, ...rest }) {
  return <svg id={src} {...rest} />;
}
