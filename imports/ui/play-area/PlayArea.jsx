import React, {Component} from 'react';
import { composeWithTracker } from 'react-komposer';

import LoggedPlayArea from './logged-play-area/LoggedPlayArea.jsx';
import UnloggedPlayArea from './unlogged-play-area/UnloggedPlayArea.jsx';

class PlayArea extends Component {

    render(){
        const displayPlayArea = Meteor.userId()? <LoggedPlayArea/>:<UnloggedPlayArea/>;
        return (
            <div id="main_body">
                <div className="content clearfix">
                    {displayPlayArea}
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
            </div>
        )
    }
};


export default composeWithTracker((props, onData) => {
    var userSubscription = Meteor.subscribe("users");
    // var animationSubscription = Meteor.subscribe("animations");
    if (userSubscription.ready()){
        onData(null, {
            users: Meteor.users.find().fetch()
        });
    }
    // if (animationSubscription.ready()){
    //     onData(null, {
    //         user: Meteor.animations.find().fetch()
    //     });
    // }
})(PlayArea);