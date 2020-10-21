import React from 'react';

// import ChatRoomContext from '../ChatRoomContext/ChatRoomContext';
import { ReactComponent as Empty } from './../../../assets/addReaction.svg';
import { ReactComponent as Smiley } from './../../../assets/smiley.svg';
import { ReactComponent as Frowny } from './../../../assets/frowny.svg';
import { ReactComponent as Tada } from './../../../assets/tada.svg';

// import { getRoomList } from '../../utils/utils';
import { PropTypes } from 'prop-types';

import './ReactionSelector.scss';

const REACTION = { EMPTY: 'empty', SMILEY: 'smiley', FROWNY: 'frowny', TADA: 'tada' };

const getIcon = (reactionId) => {
  switch(reactionId) {
    case REACTION.SMILEY:
      return (<Smiley />);
    case REACTION.FROWNY:
      return (<Frowny />);
    case REACTION.TADA:
      return (<Tada />);
    default:
      return (<Empty />);
  }
};

const ReactionSelector = (props) => {
  const { className, onSelection, onSelecting } = props;

  let reactionList = [
    { key: REACTION.SMILEY, comp: Smiley }, 
    { key: REACTION.FROWNY, comp: Frowny }, 
    { key: REACTION.TADA, comp: Tada }
  ].map(r => {
    return (<div className="ReactionSelector__reaction" key={r.key} id={r.key} onClick={() => onSelection(r)} ><r.comp /></div>)
  });

  let hoverTimer = null;

  const onHover = () => {
    if (blurTimer) { clearTimeout(blurTimer); blurTimer = null; }
    onSelecting(true);
    // hoverTimer = setTimeout(() => onSelecting(true), 200);
  };

  let blurTimer = null;

  const onBlur = () => {
    if (hoverTimer) { clearTimeout(hoverTimer); hoverTimer = null; }
    blurTimer = setTimeout(() => onSelecting(false), 300);
  };

  return (
    <div className={`ReactionSelector ${className}`} onMouseOver={onHover} onMouseOut={onBlur} >
      {reactionList}
    </div>
  );
};

ReactionSelector.propTypes = {
  className: PropTypes.string,
  onSelection: PropTypes.func.isRequired
};

export { REACTION, getIcon };
export default ReactionSelector;