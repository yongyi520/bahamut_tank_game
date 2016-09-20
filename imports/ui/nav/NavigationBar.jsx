import React, {Component} from 'react';
import { composeWithTracker } from 'react-komposer';

class NavigationBar extends Component {

    userLogOut(){
        Meteor.logout();
    }

    userLogIn(event){
        event.preventDefault();
        var username = this.refs.username.value.trim();
        var password = "pass";
        Accounts.createUser({
            username: username,
            password: password
        });
        return false;
    }

    userLoginDisplay(){
        if(Meteor.userId()){
            return (
                <div className="loggedInUser">
                    <p>Welcome {Meteor.user().username}</p>
                    <input type="button" className="logout" value="Log Out" onClick={()=>this.userLogOut()}/>
                </div>
            )
        } else {
            return (
                <div className="registerUser">
                    <form className="register" onSubmit={this.userLogIn.bind(this)}>
                        <label>Username</label>
                        <input type="text" ref="username" name="username"/>
                        <br/>
                        <input type="submit" value="Start"/>
                    </form>
                </div>
            )
        }
    }

    render () {
        return (
            <nav className="nav_bar">
                <div className="logo">
                    <h3>Bahamut Attack Game</h3>
                </div>
                <div className="welcome">
                    {this.userLoginDisplay()}
                </div>
                <div className="game_room">
                    <p className="title">Game Rooms</p>
                    <ul className="room_list">
                        <a href="#"><li>Room 1</li></a>
                    </ul>
                </div>
                <div className="user">
                    <a href="#">Log Out</a>
                </div>
            </nav>
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
})(NavigationBar);