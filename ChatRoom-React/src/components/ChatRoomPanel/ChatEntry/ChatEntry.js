import React, { useState, useRef, useEffect, useContext } from 'react';
import { PropTypes } from 'prop-types';
import ChatRoomContext from '../../ChatRoomContext/ChatRoomContext';
import ReactionSelector, { REACTION, getIcon } from '../ReactionSelector/ReactionSelector';
import { addMessageReaction } from '../../../utils/utils';

import './ChatEntry.scss';


const ChatEntry = (props) => {
  const { messageId, author, content, own, reaction, lastRef } = props;
  const { currentRoom } = useContext(ChatRoomContext);

  const [myReaction, setMyReaction] = useState(reaction);
  const [showSelector, setShowSelector] = useState(false);
  const [selecting, setSelecting] = useState(false);

  const name = (author) ? (<p className="author">{author}</p>) : null;
  const classes = `ChatEntry ${own ? 'own' : ''}`;
  const ref = useRef();

  const saveReaction = (r) => {
    addMessageReaction({reaction: r.key, roomId: currentRoom.id, messageId})
    .then(response => {
        if (response.status === 200) {
          setMyReaction(r.key);
        }
    }).catch(error => console.error(error));
  };

  const onClick = () => {
    if (own) return; // Can't add reaction to my own msgs
    const reaction = myReaction ? null : REACTION.SMILEY;
    setShowSelector(false)
    saveReaction({ key: reaction });
  }

  const onSelection = (r) => {
    setSelecting(false);
    setShowSelector(false);
    saveReaction(r);
  };

  let hoverTimer = null;

  const onHover = () => {
    hoverTimer = setTimeout(() => setShowSelector(true), 700);
  };

  let blurTimer = null;

  const onBlur = () => {
    if (selecting) return;
    if (hoverTimer) clearTimeout(hoverTimer); hoverTimer = null;
    blurTimer = setTimeout(() => { if (!selecting) setShowSelector(false)}, 300);
  };

  const onSelecting = (on) => {
    if (!on && hoverTimer) clearTimeout(hoverTimer); hoverTimer = null;
    if (blurTimer) clearTimeout(blurTimer); blurTimer = null;
    if (on) {
      if (!showSelector) setShowSelector(true);
    } else {
      if (showSelector) setShowSelector(false);
    }
    setSelecting(on);
  };

  useEffect(() => {
    if (typeof lastRef === 'function') lastRef(ref);
  });

  return (
    <div className={classes} ref={ref} >
        <p className="content">{content}</p>
        {name}
        {!own && <ReactionSelector className={showSelector ? '' : 'hidden'} onSelection={onSelection} onSelecting={onSelecting} />}
        <div className="ChatEntry__reaction" onMouseOver={onHover} onMouseOut={onBlur} onClick={onClick}>{getIcon(myReaction)}</div>
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