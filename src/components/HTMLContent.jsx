import React from 'react';
import parse from 'html-react-parser';

function HTMLContent({ content }) {
  return <div className="browser-css">{parse(content)}</div>;
}

export default HTMLContent;
