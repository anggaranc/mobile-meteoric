Posts = new Mongo.Collection("posts");

Images = new FS.Collection("images", {
  stores: [new FS.Store.FileSystem("images")]
});

if(Meteor.isClient) {
  Meteor.subscribe('Images');
  Meteor.subscribe('Posts');
}
