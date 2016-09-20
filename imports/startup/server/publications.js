import { Meteor } from 'meteor/meteor';

ServerMessages = new Mongo.Collection('serverMessages');

Meteor.publish('users', function(){
    return Meteor.users.find();
});

// clear all entries before the server starts the publication
ServerMessages.remove({});

Meteor.publish('serverMessages', function(){
    return ServerMessages.find();
});

