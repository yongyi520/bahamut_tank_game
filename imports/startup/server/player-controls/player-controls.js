import { Meteor } from 'meteor/meteor';

Meteor.methods({
	'move-forward': function(){
		var user = Meteor.user();
		// assuming that:
		// x = 1 means it's facing right
		// x = 0 means it's not facing in horizontal directino
		// x = -1 means it's facing left
		// y = 1 means it's facing up
		// y = 0 means it's not facing in the vertical direction
		// y = -1 means it's facing down
		if (user.orientation.x == 0) {
			var newY = user.position.y + user.orientation.y;
			Meteor.users.update(Meteor.userId(), {$set: {"position.y": newY}});
		} else if (user.orientation.y == 0) {
			var newX = user.position.x + user.orientation.x;
			Meteor.users.update(Meteor.userId(), {$set: {"position.x": newX}});
		}
		return user;
	},'move-backward': function(){
		var user = Meteor.user();
		// assuming that:
		// x = 1 means it's facing right
		// x = 0 means it's not facing in horizontal directino
		// x = -1 means it's facing left
		// y = 1 means it's facing up
		// y = 0 means it's not facing in the vertical direction
		// y = -1 means it's facing down
		if (user.orientation.x == 0) {
			var newY = user.position.y - user.orientation.y;
			Meteor.users.update(Meteor.userId(), {$set: {"position.y": newY}});
		} else if (user.orientation.y == 0) {
			var newX = user.position.x - user.orientation.x;
			Meteor.users.update(Meteor.userId(), {$set: {"position.x": newX}});
		}
		return user;
	},'rotate-left': function(){
		var user = Meteor.user();
		// assuming that:
		// x = 1 means it's facing right
		// x = 0 means it's not facing in horizontal directino
		// x = -1 means it's facing left
		// y = 1 means it's facing up
		// y = 0 means it's not facing in the vertical direction
		// y = -1 means it's facing down
		if (user.orientation.x == 0) {
			var newX = -1 * user.orientation.y;
			var newY = 0;
			Meteor.users.update(Meteor.userId(), {$set: {"orientation.x": newX, "orientation.y": newY}});
		} else if (user.orientation.y == 0) {
			var newX = 0;
			var newY = user.orientation.x;
			Meteor.users.update(Meteor.userId(), {$set: {"orientation.x": newX, "orientation.y": newY}});
		}
		return user;
	},'rotate-right': function(){
		var user = Meteor.user();
		// assuming that:
		// x = 1 means it's facing right
		// x = 0 means it's not facing in horizontal directino
		// x = -1 means it's facing left
		// y = 1 means it's facing up
		// y = 0 means it's not facing in the vertical direction
		// y = -1 means it's facing down
		if (user.orientation.x == 0) {
			var newX = user.orientation.y;
			var newY = 0;
			Meteor.users.update(Meteor.userId(), {$set: {"orientation.x": newX, "orientation.y": newY}});
		} else if (user.orientation.y == 0) {
			var newX = 0;
			var newY = -1 * user.orientation.x;
			Meteor.users.update(Meteor.userId(), {$set: {"orientation.x": newX, "orientation.y": newY}});
		}
		return user;
	}, 'fire-bomb' : function() {
		var user = Meteor.user();
		var otherPlayers = Meteor.users.find().fetch();
		var fireCenterX, fireCenterY, distanceFromFireX, distanceFromFireY;
		if (user.orientation.x == 0) {
			fireCenterY = user.position.y + user.orientation.y * 5;
			fireCenterX = user.position.x;
		} else if (user.orientation.y == 0) {
			fireCenterX = user.position.x + user.orientation.x * 5;
			fireCenterY = user.position.y;
		}
		otherPlayers.forEach(function(player){
			distanceFromFireX = player.position.x - fireCenterX;
			distanceFromFireY = player.position.y - fireCenterY;
			console.log("fire center (" + fireCenterX + ", " + fireCenterY + ")");
			console.log("player " + player.profile.name + " distance from fire center (" + distanceFromFireX + ", " + distanceFromFireY + ")");
			if (Math.abs(distanceFromFireX) <= 1 && Math.abs(distanceFromFireY) <= 1){
				Meteor.users.update(player._id, {$set: {"canDoAction": false}});
				console.log("player " + player.profile.name + " died");
			}
		});

		return false;
	}, 'wind-push' : function() {
		var user = Meteor.user();
		
		var otherPlayers = Meteor.users.find().fetch();
		var distanceFromUserX, distanceFromUserY, newPositionX, newPositionY, inFront, how;

		if (user.orientation.x == 0) {
			otherPlayers.forEach(function(player){
				distanceFromUserX = player.position.x - user.position.x;
				distanceFromUserY = player.position.y - user.position.y;
				inFront = distanceFromUserY*user.orientation.y>0;
				if (Math.abs(distanceFromUserX) <= 1 && inFront){
					newPositionY = player.position.y + user.orientation.y * 3;
					Meteor.users.update(player._id, {$set: {"position.y": newPositionY}});
				}
			});
			Meteor.users.update(Meteor.userId(), {$set: {"position.y": user.position.y - user.orientation.y}});
		} else if (user.orientation.y == 0) {
			otherPlayers.forEach(function(player){
				distanceFromUserX = player.position.x - user.position.x;
				distanceFromUserY = player.position.y - user.position.y;
				inFront = distanceFromUserX*user.orientation.x>0;
				if (Math.abs(distanceFromUserY) <= 1 && inFront){
					newPositionX = player.position.x + user.orientation.x * 3;
					Meteor.users.update(player._id, {$set: {"position.x": newPositionX}});
				}
			});
			Meteor.users.update(Meteor.userId(), {$set: {"position.x": user.position.x - user.orientation.x}});
		}
		return otherPlayers;
	}
});


