Template.search.helpers({
  postImage: function () {
    return Images.findOne(this.imageId);; // Where Images is an FS.Collection instance
  }
});

Template.search.rendered = function(){
  $('#searchInput').val('');

  $('.ui.sticky.data-left').sticky({
    offset  : 50,
    context : '#data'
  });
};
