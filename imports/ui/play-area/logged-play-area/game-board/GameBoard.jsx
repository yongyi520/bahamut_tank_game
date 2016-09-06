import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { composeWithTracker } from 'react-komposer';


import PlayerAvatar from './player-avatar/PlayerAvatar.jsx'


require("./GameBoard.scss");

class GameBoard extends Component {
    render() {
        return (
            <div className="game_screen">
                { _.map(this.props.users, (user) => (
                    <PlayerAvatar key={ user._id } player={ user } user={ this.props.user }/>
                )) }
            </div>
        );
    }
};
export default composeWithTracker((props, onData) => {
    var userSubscription = Meteor.subscribe("users");

    if (userSubscription.ready()){
        onData(null, {
            users: Meteor.users.find().fetch()
        });
    }
})(GameBoard);