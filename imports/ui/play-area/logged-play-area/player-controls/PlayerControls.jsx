import React, { Component } from 'react';

export default class PlayerControls extends Component {

    

    render() {
        return (
            <div className="game_controls">
                <div className="directional_buttons">
                    <div className="row">
                        <i className="fa fa-arrow-up fa-2x" ></i>
                    </div>
                    <div className="row">
                        <i className="fa fa-arrow-left fa-2x" aria-hidden="true" ></i>
                        <i className="fa fa-arrow-down fa-2x" aria-hidden="true" ></i>
                        <i className="fa fa-arrow-right fa-2x" aria-hidden="true" ></i>
                    </div>
                </div>
                <div className="action_buttons">
                    <div className="row">
                        <i className="fa fa-fire fa-2x" aria-hidden="true" ></i>
                        <i className="fa fa-bolt fa-2x" aria-hidden="true" ></i>
                    </div>
                </div>
            </div>

        );
    }
}