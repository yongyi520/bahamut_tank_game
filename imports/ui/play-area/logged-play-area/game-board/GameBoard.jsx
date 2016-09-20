import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { composeWithTracker } from 'react-komposer';
import { composeAll } from 'react-komposer';
import { composeWithObservable } from 'react-komposer';
import { Tracker } from 'meteor/tracker';

import PlayerAvatar from './player-avatar/PlayerAvatar.jsx'

require("./GameBoard.scss");

class GameBoard extends Component {
    //
    // componentDidMount(){
    //     console.log("mounting");
    //     setTimeout(this.startObserverHandler, 0);
    // }
    //
    // startObserverHandler() {
    //     this.tracker = Tracker.autorun(()=>{
    //         messageCollection.find().observeChanges({
    //             added: (id, fields) => {
    //                 serverHandler = {
    //                     "fire-storm": function (id, fields) {
    //                         Meteor.call('fire-storm', id, fields);
    //                     }, "wind-push": function(id, fields) {
    //                         Meteor.call('wind-push', id, fields);
    //                     }, "move-forward": function(id, fields) {
    //                         Meteor.call("move-forward", id, fields);
    //                     }, "move-backward": function(id, fields) {
    //                         Meteor.call("move-backward", id, fields);
    //                     }, "rotate-left": function(id, fields) {
    //                         Meteor.call("rotate-left", id, fields);
    //                     }, "rotate-right": function(id, fields) {
    //                         Meteor.call("rotate-right", id, fields);
    //                     }
    //                 };
    //                 serverHandler[fields.type](id, fields);
    //             }
    //
    //         });
    //     });
    // }
    //
    // componentWillUnmount(){
    //     console.log("unmounting");
    // }
    //
    //

    
    render() {
        return (
            <div id="game_screen">
                <div id="player_container">
                    { _.map(this.props.users, (user) => (
                        <PlayerAvatar key={ user._id } player={ user } user={ this.props.user }/>
                    )) }
                </div>
                <div id="animation_container">

                </div>
            </div>
        );
    }
};
export default composeAll(
    composeWithTracker((props, onData) => {
        var userSubscription = Meteor.subscribe("users");
        // var serverMessageSubscription = Meteor.subscribe("serverMessages");
        if (userSubscription.ready()){
            onData(null, {
                users: Meteor.users.find().fetch()
                // serverMessage: ServerMessages.findOne().sort({$natural: -1})
            });
        }
     })
    // composeWithObservable((props,onData) => {
    //     messageCollections = new Mongo.Collection("serverMessages");
    //     Meteor.subscribe("serverMessages");
    //     messageCollections.find().observeChanges({
    //         added: function (id, field) {
    //             handleServerMessage(field);
    //             console.log(field);
    //         }
    //     });
    //
    //     function handleServerMessage(message) {
    //         console.log("receiving server message to handle");
    //         serverHandler[message.type](message);
    //     }
    //
    //     serverHandler = {
    //         "fire-storm": function (message) {
    //             Meteor.call('fire-storm');
    //         }, "wind-push": function() {
    //             Meteor.call('wind-push');
    //         }, "move-forward": function() {
    //             Meteor.call("move-forward");
    //         }, "move-backward": function() {
    //             Meteor.call("move-backward");
    //         }, "rotate-left": function() {
    //             Meteor.call("rotate-left");
    //         }, "rotate-right": function() {
    //             Meteor.call("rotate-right");
    //         }
    //     };
    // })
)(GameBoard);