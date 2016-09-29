import React, {Component} from 'react';
// import TimelineLite from 'gsap';

export default class FireStorm extends Component {

    componentDidMount(){
        this.setAnimation();
    }

    componentDidUpdate(){
        this.setAnimation();
    }

    setAnimation(){
        serverMessageOnPause = true;

        startingEndingPositions = this.getStartingAndEndingPoint();
        t1 = new TimelineLite();
        xDif = startingEndingPositions.startingX - startingEndingPositions.endingX;
        yDif = startingEndingPositions.startingY - startingEndingPositions.endingY;

        cssAttribute = xDif==0?{
            x: 0,
            y: -yDif*20,
            z: 0.1
        }:{
            x: xDif*20,
            y: 0,
            z: 0.1
        };

        t1.to(this.refs.fireCenter, .05, {
            autoAlpha: 1
        }).from(this.refs.fireCenter, .4, {
            css: cssAttribute
        }).to(this.refs.fireCenter, .01, {
            css: {
                x: 0,
                y: 0,
                z: 0.1
            }
        }).to(this.refs.fireCenter, .05, {
            autoAlpha: 0
        }).to(this.refs.fireStorm, .5, {
            autoAlpha: 1,
            onComplete: () => { this.destroyPlayers(this.props.id, this.props.message) }
        }).to(this.refs.fireStorm, .5, {
            autoAlpha: 0
        });
    }

    destroyPlayers(id, message){
        if(message.user._id == Meteor.userId()) {
            Meteor.call('fire-storm', id, message);
        }
        serverMessageOnPause = false;
    }

    getStyle(startingEndingPositions, indexFireX, indexFireY){
        return {
            left: (startingEndingPositions.endingX + indexFireX) * 20 + "px",
            bottom: (startingEndingPositions.endingY + indexFireY) * 20 + "px"
        }
    }

    getStartingAndEndingPoint() {
        user = this.props.user;
        var fireCenterX, fireCenterY;
        if (user.orientation.x == 0) {
            fireCenterY = user.position.y + user.orientation.y * 5;
            fireCenterX = user.position.x;
        } else if (user.orientation.y == 0) {
            fireCenterX = user.position.x + user.orientation.x * 5;
            fireCenterY = user.position.y;
        }
        return {
            startingX: user.position.x,
            startingY: user.position.y,
            endingX: fireCenterX,
            endingY: fireCenterY
        }
    }

    render(){
        let startingEndingPositions = this.getStartingAndEndingPoint();
        return (
            <div className="fireStormContainer">
                <div className="fireStorm" ref="fireStorm">
                    <div className="red flame" style={this.getStyle(startingEndingPositions, -1, 1)}></div>
                    <div className="red flame" style={this.getStyle(startingEndingPositions, 0, 1)}></div>
                    <div className="red flame" style={this.getStyle(startingEndingPositions, 1, 1)}></div>
                    <div className="red flame" style={this.getStyle(startingEndingPositions, -1, 0)}></div>
                    <div className="red flame" style={this.getStyle(startingEndingPositions, 0, 0)}></div>
                    <div className="red flame" style={this.getStyle(startingEndingPositions, 1, 0)}></div>
                    <div className="red flame" style={this.getStyle(startingEndingPositions, -1, -1)}></div>
                    <div className="red flame" style={this.getStyle(startingEndingPositions, 0, -1)}></div>
                    <div className="red flame" style={this.getStyle(startingEndingPositions, 1, -1)}></div>
                </div>
                <div className="yellow flameTravel" ref="fireCenter" style={this.getStyle(startingEndingPositions, 0, 0)}></div>
            </div>
        )
    }
}