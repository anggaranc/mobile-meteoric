Template.fresh.helpers({
  postImage: function () {
    return Images.findOne(this.imageId);; // Where Images is an FS.Collection instance
  }
});
