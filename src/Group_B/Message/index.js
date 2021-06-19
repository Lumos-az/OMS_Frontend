import React from 'react';
import moment from 'moment';
import ReactAudioPlayer from 'react-audio-player'
import './Message.css';

export default function Message(props) {
    const {
      data,
      isMine,
      startsSequence,
      endsSequence,
      showTimestamp
    } = props;

    const friendlyTimestamp = moment(data.timestamp).format('LLLL');
    var payload
    if (data.type==='image') {
        payload = <img src={data.payload.url} width={600} height={600/data.payload.width*data.payload.height} />;
    } else if (data.type==='audio') {
        payload = <ReactAudioPlayer src={data.payload.url} controls />
    } else {
        payload = data.payload.text;
    }
    
    return (
      <div className={[
        'message',
        `${isMine ? 'mine' : ''}`,
        `${startsSequence ? 'start' : ''}`,
        `${endsSequence ? 'end' : ''}`
      ].join(' ')}>
        {
          showTimestamp &&
            <div className="timestamp">
              { friendlyTimestamp }
            </div>
        }

        <div className="bubble-container">
          <div className="bubble" title={friendlyTimestamp}>
            { payload }
          </div>
        </div>
      </div>
    );
}