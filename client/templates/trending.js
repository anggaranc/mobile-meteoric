Template.trending.rendered = function(){
  $('.data-left').sticky({
    offset  : 50,
    context : '#data'
  });

  // $('.data-center').sticky({
  //   offset       : 38,
  //   // context: '#databaru'
  // });

  // $(".container .itema.use_manual").stick_in_parent({
  //   parent: ".container",
  //   spacer: ".manual_spacer",
  //   offset_top: 36,
  // });

  $(document).on( 'scroll', function(){
    if ($(window).scrollTop() > 100) {
      $('.scroll-top-wrapper').addClass('show');
    } else {
      $('.scroll-top-wrapper').removeClass('show');
    }
  });
  $('.scroll-top-wrapper').on('click', scrollToTop);

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
});

function scrollToTop() {
  verticalOffset = typeof(verticalOffset) != 'undefined' ? verticalOffset : 0;
  element = $('body');
  offset = element.offset();
  offsetTop = offset.top;
  $('html, body').animate({scrollTop: offsetTop}, 100, 'linear');
}
