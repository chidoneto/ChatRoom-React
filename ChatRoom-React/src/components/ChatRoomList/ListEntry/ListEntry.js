import React from 'react';
import { PropTypes } from 'prop-types';

import './ListEntry.css';


const ListEntry = (props) => {
  const { selected, id, onSelection, roomName } = props;
  const classes = `ListEntry ${selected === id ? 'selected' : ''}`;
  
  return (
    <div className={classes} onClick={() => onSelection(id)}>
      <p>{roomName}</p>
    </div>
  );
};

ListEntry.propTypes = {
  selected: PropTypes.string,
  id: PropTypes.string.isRequired,
  onSelection: PropTypes.func.isRequired,
  roomName: PropTypes.string
};

export default ListEntry;