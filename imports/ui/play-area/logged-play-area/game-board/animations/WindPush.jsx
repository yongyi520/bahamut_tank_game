import React, {Component} from 'react';
// import TimelineLite from 'gsap';


export default class WindPush extends Component {
    componentDidMount(){
        this.setAnimation();
    }

    componentDidUpdate(){
        this.setAnimation();
    }
    
    setAnimation(){

        serverMessageOnPause = true;
        
        rotation = this.getRotationDegAndMultiplier(this.props.user);
        greenSockAnimation = new TimelineLite();

        // xMultiplier = 0 means it's pointing in horizontal position
        cssAttribute = {
            x: 200*rotation.yMultiplier,
            y: -200*rotation.xMultiplier
        };

        greenSockAnimation.to(this.refs.wind, .05, {
            rotation: rotation.rotationDeg
        }).to(this.refs.wind, 0.5, {
            autoAlpha: 1,
            scale: 8,
            onComplete: this.pushPlayers,
            onCompleteParams: [this.props.id, this.props.message]
        }).to(this.refs.wind, 1, {
            ease: Power4.easeOut,
            css: cssAttribute
        }).to(this.refs.wind, 0.01, {
            scale: 1,
            autoAlpha: 0
        }).to(this.refs.wind, 0.01, {
            css: {
                x: 0,
                y: 0
            }
        });
    }

    pushPlayers(id, message){
        if(message.user._id == Meteor.userId()) {
            Meteor.call('wind-push', id, message);
        }
        serverMessageOnPause = false;
    }
    
    getRotationDegAndMultiplier(user){
        var rotationDeg, xMultiplier, yMultiplier;
        if (user.orientation.x == 0) {
            if (user.orientation.y == 1) {
                xMultiplier = 1;
                yMultiplier = 0;
                rotationDeg = 0;
            } else if (user.orientation.y == -1){
                xMultiplier = -1;
                yMultiplier = 0;
                rotationDeg = 180;
            }
        } else if (user.orientation.y == 0) {
            if (user.orientation.x == 1) {
                xMultiplier = 0;
                yMultiplier = 1;
                rotationDeg = 90;
            } else if (user.orientation.x == -1) {
                xMultiplier = 0;
                yMultiplier = -1;
                rotationDeg = 270;
            }
        }
        return {
            xMultiplier: xMultiplier,
            yMultiplier: yMultiplier,
            rotationDeg: rotationDeg
        };
    }

    getStyle(windIndex) {
        user = this.props.user;
        rotationData = this.getRotationDegAndMultiplier(user);
        return {
            left: (user.position.x + rotationData.xMultiplier * windIndex) * 20 + "px",
            bottom: (user.position.y + rotationData.yMultiplier * windIndex) * 20 + "px"
        }
    }

    render(){
        return (
            <div className="wind_push_container" ref="wind_push_container">
                <img className="wind" ref="wind" src="wind-white.png" style={this.getStyle(0)}/>
            </div>
        )
    }
}
