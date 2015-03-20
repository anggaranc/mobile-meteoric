Template.trending.rendered = function(){
  $('#searchInput').val('');

  // if(($("#data").height() >= $("div.ui.sticky.data-left").height()) && ($("body").width() > 979)){
    $('.ui.sticky.data-left').sticky({
      offset  : 50,
      context : '#data'
    });
  // }

  $(document).on( 'scroll', function(){
    if ($(window).scrollTop() > 100) {
      $('.scroll-top-wrapper').addClass('show');
    } else {
      $('.scroll-top-wrapper').removeClass('show');
    }
  });
  $('.scroll-top-wrapper').on('click', scrollToTop);

};

Template.trending.helpers({
  moreResults: function () {
    return !(Posts.find().count() < Session.get("itemsLimit"));
  }
});

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

  // $('.download-button').on( 'click', function(){
  //   console.log($(this).attr('id'));
  // });
};

Template.testpost.events({
  'click .download-button' :function (e){
    SaveToDisk(e.currentTarget.id, 'OpoKuwi');
  }
});

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

function SaveToDisk(fileURL, fileName) {
    // for non-IE
    if (!window.ActiveXObject) {
        var save = document.createElement('a');
        save.href = fileURL;
        save.target = '_blank';
        save.download = fileName || 'unknown';

        var event = document.createEvent('Event');
        event.initEvent('click', true, true);
        save.dispatchEvent(event);
        (window.URL || window.webkitURL).revokeObjectURL(save.href);
    }

    // for IE
    else if ( !! window.ActiveXObject && document.execCommand)     {
        var _window = window.open(fileURL, '_blank');
        _window.document.close();
        _window.document.execCommand('SaveAs', true, fileName || fileURL)
        _window.close();
    }
}
