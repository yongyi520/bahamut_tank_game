import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
 
import App from '../imports/ui/App.jsx';
import FireStorm from '../imports/ui/play-area/logged-play-area/game-board/animations/FireStorm.jsx';
import WindPush from '../imports/ui/play-area/logged-play-area/game-board/animations/WindPush.jsx';

Meteor.startup(() => {
  Meteor.subscribe('users');
  
  render(<App />, document.getElementById('body_container'));
  
  listenToServer();
  
  $(document).keydown(function(event){

    if(!serverMessageOnPause) {
      var keyCode = event.keyCode;
      if (keyCode == 37) {
        $(".fa-arrow-left").addClass("active_button");
        Meteor.call("add-rotate-left-message");
      } else if (keyCode == 38) {
        $(".fa-arrow-up").addClass("active_button");
        Meteor.call("add-move-forward-message");
      } else if (keyCode == 39) {
        $(".fa-arrow-right").addClass("active_button");
        Meteor.call("add-rotate-right-message");
      } else if (keyCode == 40) {
        $(".fa-arrow-down").addClass("active_button");
        Meteor.call("add-move-backward-message");
      } else if (keyCode == 90) {
        $(".fa-fire").addClass("active_button");
        Meteor.call('add-firestorm-message');
      } else if (keyCode == 88) {
        $(".fa-bolt").addClass("active_button");
        Meteor.call("add-wind-push-message");
      }
    }
  });

  $(document).keyup(function(event){

      var keyCode = event.keyCode;
      if (keyCode == 37) {
        $(".fa-arrow-left").removeClass("active_button");
      } else if (keyCode == 38) {
        $(".fa-arrow-up").removeClass("active_button");
      } else if (keyCode == 39) {
        $(".fa-arrow-right").removeClass("active_button");
      } else if (keyCode == 40) {
        $(".fa-arrow-down").removeClass("active_button");
      } else if (keyCode == 90) {
        $(".fa-fire").removeClass("active_button");
      } else if (keyCode == 88) {
        $(".fa-bolt").removeClass("active_button");
      }
    
  });


  function listenToServer(){
    observeChanges();
  }

  function observeChanges(){
    messageCollectionHandler = messageCollection.find().observeChanges({
      added: function (id, field) {
        handleServerMessage(id, field);
      }
    })
  }

  function handleServerMessage(id, message) {
    serverHandler[message.type](id, message);
  }

  serverHandler = {
    "fire-storm": function (id, message) {
      render(
          <FireStorm id={id} message={message} user={message.user}/>, document.getElementById('animation_container')
      );
}, "wind-push": function(id, message) {
      render(
          <WindPush id={id} message={message} user={message.user}/>, document.getElementById('animation_container')
      );
    }, "move-forward": function(id, message) {
      // this is where you update the chagnes, and not use meteor.call
      if(message.user._id == Meteor.userId()) {
        Meteor.call("move-forward", id, message);
      }
    }, "move-backward": function(id, message) {
      if(message.user._id == Meteor.userId()) {
        Meteor.call("move-backward", id, message);
      }
    }, "rotate-left": function(id, message) {
      if(message.user._id == Meteor.userId()) {
        Meteor.call("rotate-left", id, message);
      }
    }, "rotate-right": function(id, message) {
      if(message.user._id == Meteor.userId()) {
        Meteor.call("rotate-right", id, message);
      }
    }
  };
});