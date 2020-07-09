import React, { useRef, useEffect } from 'react';
import { PropTypes } from 'prop-types';

import './ChatEntry.css';


const ChatEntry = (props) => {
  const { author, content, own, lastRef } = props;

  const name = (author) ? (<p className="author">{author}</p>) : null;
  const classes = `ChatEntry ${own ? 'own' : ''}`;
  const ref = useRef();

  useEffect(() => {
    if (typeof lastRef === 'function') lastRef(ref);
  });

  return (
    <div className={classes} ref={ref} >
        <p className="content">{content}</p>
        {name}
    </div>
  );
};

ChatEntry.propTypes = {
  author: PropTypes.string, 
  content: PropTypes.string, 
  own: PropTypes.bool, 
  lastRef: PropTypes.func
};

export default ChatEntry;