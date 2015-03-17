Template.trending.rendered = function(){
  $('#searchInput').val('');

  $('.ui.sticky.data-left').sticky({
    offset  : 50,
    context : '#data'
  });

  $(document).on( 'scroll', function(){
    if ($(window).scrollTop() > 100) {
      $('.scroll-top-wrapper').addClass('show');
    } else {
      $('.scroll-top-wrapper').removeClass('show');
    }
  });
  $('.scroll-top-wrapper').on('click', scrollToTop);

};

var libhtml = function() {
};

var libsticky = function() {
    // $('.datarun').Stickyfill();
    setInterval(function () { autoloadpage(); }, 3000);
    function autoloadpage() {
      if($("body").width() > 979){
        $('.datarun').Stickyfill();
      }
      $('html body').css("height", "auto");
    }

};

Template.testpost.rendered = function(){
  Meteor.Loader.loadJs("/sticky/html5shiv.js", libhtml);
  Meteor.Loader.loadJs("/sticky/stickyfill.js", libsticky);
};

Template.testpost.helpers({
  images: function () {
    return Images.find(); // Where Images is an FS.Collection instance
  },
  posts: function () {
    return Posts.find(); // Where Images is an FS.Collection instance
  },
  postImage: function () {
    return Images.findOne(this.imageId);; // Where Images is an FS.Collection instance
  },
  testImage: function () {
    return Images.find();; // Where Images is an FS.Collection instance
  },
});

function scrollToTop() {
  verticalOffset = typeof(verticalOffset) != 'undefined' ? verticalOffset : 0;
  element = $('body');
  offset = element.offset();
  offsetTop = offset.top;
  $('html, body').animate({scrollTop: offsetTop}, 100, 'linear');
}
