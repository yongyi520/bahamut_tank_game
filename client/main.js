import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';


$(document).keydown(function(event){

   var keyCode = event.keyCode;
    if (keyCode == 37){
        $(".fa-arrow-left").addClass("active_button");
        Meteor.call("rotate-left");
    }else if (keyCode == 38){
        $(".fa-arrow-up").addClass("active_button");
        Meteor.call("move-forward");
    }else if (keyCode == 39){
        $(".fa-arrow-right").addClass("active_button");
        Meteor.call("rotate-right");
    }else if (keyCode == 40){
        $(".fa-arrow-down").addClass("active_button");
        Meteor.call("move-backward");
    }else if (keyCode == 90){
        $(".fa-fire").addClass("active_button");
        Meteor.call("fire-bomb");
        
    }else if (keyCode == 88){
        $(".fa-bolt").addClass("active_button");
        Meteor.call("wind-push");
    }
});

$(document).keyup(function(event){
    var keyCode = event.keyCode;
    if (keyCode == 37){
        $(".fa-arrow-left").removeClass("active_button");
    }else if (keyCode == 38){
        $(".fa-arrow-up").removeClass("active_button");
    }else if (keyCode == 39){
        $(".fa-arrow-right").removeClass("active_button");
    }else if (keyCode == 40){
        $(".fa-arrow-down").removeClass("active_button");
    }else if (keyCode == 90){
        $(".fa-fire").removeClass("active_button");
    }else if (keyCode == 88){
        $(".fa-bolt").removeClass("active_button");
    }
});

Template.user.helpers({
   username: function(){
       return Meteor.user().username;
   }
});

Template.user.events({
    "click .logout" (event) {
      Meteor.logout();
    },
    "submit .register" (event) {
        var username = event.target.username.value;
        var password = "pass";
        Accounts.createUser({
            username: username, 
            password: password
        });
        return false;
    }
});
