import React, { Component } from 'react';

export default class PlayerControls extends Component {

    moveUp(){
        Meteor.call("move-forward");
    }

    moveLeft(){
        Meteor.call("rotate-left");
    }

    moveDown(){
        Meteor.call("move-backward");
    }

    moveRight(){
        Meteor.call("rotate-right");
    }

    fireStorm(){
        Meteor.call("fire-bomb");
    }

    windPush(){
        Meteor.call("wind-push");
    }

    render() {
        return (
            <div className="game_controls">
                <div className="directional_buttons">
                    <div className="row">
                        <i className="fa fa-arrow-up fa-2x" onClick={() => this.moveUp()} ></i>
                    </div>
                    <div className="row">
                        <i className="fa fa-arrow-left fa-2x" onClick={()=> this.moveLeft()} aria-hidden="true" ></i>
                        <i className="fa fa-arrow-down fa-2x" onClick={()=> this.moveDown()} aria-hidden="true" ></i>
                        <i className="fa fa-arrow-right fa-2x" onClick={()=> this.moveRight()} aria-hidden="true" ></i>
                    </div>
                </div>
                <div className="action_buttons">
                    <div className="row">
                        <i className="fa fa-fire fa-2x" onClick={()=> this.fireStorm()} aria-hidden="true" ></i>
                        <i className="fa fa-bolt fa-2x" onClick={()=> this.windPush()} aria-hidden="true" ></i>
                    </div>
                </div>
            </div>

        );
    }
}