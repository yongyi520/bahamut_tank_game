import React, { Component } from 'react';

import PlayerControls from './play-area/logged-play-area/player-controls/PlayerControls.jsx'
import GameBoard from './play-area/logged-play-area/game-board/GameBoard.jsx'

export default class App extends Component { 
  render() {
    return (
      <div className="content clearfix">
        <div className="game_board">
          <div className="game_room_title">
            <span>Game Room 1</span>
          </div>
          <GameBoard/>
          <PlayerControls/>
        </div>
        <div className="chat_room">
          <div className="chat_room_title">
            <span>Chat Room 1</span>
          </div>
          <div className="messages">

          </div>
          <div className="message_input">
            <input type="textarea" placeholder="enter message here"/>
          </div>
        </div>
      </div>

    );
  }
}