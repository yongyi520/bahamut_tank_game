import { Meteor } from 'meteor/meteor';

Accounts.onCreateUser(function(options, user) {
    var position = {
        x: 0,
        y: 0
    };
    var orientation = {
        x: 0,
        y: 1
    };
    var profile = {
        name: options.username
    };
    var actionAnimation = {
      fireStorm: false,
        windPush: false
    };
    user.canDoAction = true;
    user.position= position;
    user.orientation = orientation;
    user.profile = profile;
    user.actionAnimation = actionAnimation;
    return user;
});

Accounts.onLogout(function(info){
    console.log(Meteor.userId);
    Meteor.users.remove({_id:Meteor.userId()});
});