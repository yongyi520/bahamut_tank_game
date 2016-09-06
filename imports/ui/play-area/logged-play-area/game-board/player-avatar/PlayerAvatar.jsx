import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';

require("./PlayerAvatar.scss");

export default class PlayerAvatar extends Component {

    getStyle(){
        var rotationDeg;
        if (this.props.player.orientation.x == 0) {
            if (this.props.player.orientation.y == 1) {
                rotationDeg = 0;
            } else if (this.props.player.orientation.y == -1){
                rotationDeg = 180;
            }
        } else if (this.props.player.orientation.y == 0) {
            if (this.props.player.orientation.x == 1) {
                rotationDeg = 90;
            } else if (this.props.player.orientation.x == -1) {
                rotationDeg = 270;
            }
        }

        var displayProperty = this.props.player.canDoAction? "block":"none";

        return {
            left: this.props.player.position.x * 20 + "px",
            bottom: this.props.player.position.y * 20 + "px",
            transform: "rotate(" + rotationDeg + "deg)",
            display: displayProperty
        }
    }

    getName() {
        return this.props.player.profile.name;
    }

    render() {
        return (
            <div className="cell" style={ this.getStyle() }> { this.getName() }</div>
        )
    }
}