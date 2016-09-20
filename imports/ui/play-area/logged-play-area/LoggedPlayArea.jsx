import React, {Component} from 'react';


import GameBoard from './game-board/GameBoard.jsx';
import PlayerControls from './player-controls/PlayerControls.jsx';

export default class LoggedPlayArea extends Component{

    render(){
        return (
            <div className="game_board">
                <div className="game_room_title">
                    <span>Game Room 1</span>
                </div>

                <GameBoard/>
                <PlayerControls/>
            </div>
        )
    }
}