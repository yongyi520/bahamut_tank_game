import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { React } from 'react';

import FireStorm from '../imports/ui/play-area/logged-play-area/game-board/animations/FireStorm.jsx';

messageCollection = null;
messageCollectionHandler = null;

import './main.html';

messageCollection = new Mongo.Collection("serverMessages");
Meteor.subscribe("serverMessages");

serverMessageOnPause = false;