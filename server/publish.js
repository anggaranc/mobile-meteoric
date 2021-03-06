// Meteor.publish('Posts', function(){
//   return Posts.find();
// });

Meteor.publish('Posts', function(limit) {
  return Posts.find({}, { limit: limit });
});

Posts.allow({
  insert: function() { return true; },
  update: function() { return true; },
  remove: function() { return true; },
});

Meteor.publish('Images', function(){
  return Images.find();
});

Images.allow({
  insert: function() { return true; },
  update: function() { return true; },
  remove: function() { return false; },
  download: function() {return true;},
});
