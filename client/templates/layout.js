Template.layout.rendered = function(){
  $('.ui.dropdown').dropdown();
  $('.ui.checkbox').checkbox();

  $('.nav-bar').click(function(){
    openSlider('my-menu', false);
  });

  $('.button-upload').click(function(){
    $('.upload-modal')
    .modal('setting', 'closable', false)
    .modal('show')
    ;
  });

  $('.button-login').click(function(){
    $('.login-modal')
    .modal('setting', 'closable', false)
    .modal('show')
    ;
  });

  var fs = 'mm-light mm-slide';

  // $("#my-menu").mmenu({
  //   classes: "mm-white",
  //     header: true,
  //     counters: true,
  //     offCanvas: {
  //           position  : "left",
  //           zposition : "front"
  //        },
  //     onClick: {
  //         blockUI: false,
  //         close: true,
  //         preventDefault: false,
  //         setSelected: true
  //     }
  //   },{
  //       transitionDuration: 100  // does not seem to work
  //   });

  setTimeout(function(){
    $('.data-left').sticky('refresh');

  }, 750);
}

Template.layout.events({
  'click #logout' :function (){
    Meteor.logout(function(err){
        if (err) {
            throw new Meteor.Error("Logout failed");
        }
    })
  },

  'keyup #searchInput' :function (e){
    if(e.keyCode == 13)
    {
      var keyword = $('#searchInput').val();
      Router.go('fresh', {keyword: keyword});
    }
  }
});

Template.layout.helpers({
  picture: function() {
    var userProfile;
    userProfile = Meteor.user().profile;

    if(userProfile) { // logic to handle logged out state
      return userProfile.picture;
    }
  }
});

Template.login.rendered = function(){
  $('#facebook-login').on('click',function(e){
      Meteor.loginWithFacebook({}, function(err){
          if (err) {
              throw new Meteor.Error("Facebook login failed");
          }
          else{
            console.log('login facebook');
            $('.login-modal').modal('hide');
          }
      });
  });

  $('#twitter-login').on('click',function(e){
      Meteor.loginWithTwitter({}, function(err){
          if (err) {
              throw new Meteor.Error("Twitter login failed");
          }
          else{
            console.log('login twitter');
            $('.login-modal').modal('hide');
          }
      });
  });

  $('#google-login').on('click',function(e){
      Meteor.loginWithGoogle({}, function(err){
          if (err) {
              console.log(err);
              throw new Meteor.Error("Google login failed");
          }
          else{
            console.log('login google');
            $('.login-modal').modal('hide');
          }
      });
  });
}

Template.upload.rendered = function(){
  Session.set('imagePostId', '');
  Session.set('uploadPercent', 0);

  $('#radioLocal').on('click',function(e){
      $("#fromLocal").show();
      $("#fromUrl").hide();
  });

  $('#radioUrl').on('click',function(e){
      $("#fromUrl").show();
      $("#fromLocal").hide();
  });

  $('#fileLocal').on('change',function(e){
    if (this.files && this.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        $('#picture')
          .attr('src', e.target.result)
          .width(250).show();
      };

      reader.readAsDataURL(this.files[0]);

    }
  });

  $('#fileUrl').on('change',function(e){
    if(this.value){
      $('#picture').attr('src', this.value).width(250).show();
    }
    else{
      $('#picture').attr('src', "").width(250).hide();
    }
  });

  $('#postSubmit').on('click',function(e){
    var file = $('#fileLocal').get(0).files[0];
		var	metadataText = "this is some cool metadata text on the image";
		var	fsFile = new FS.File(file);
		fsFile.metadata = {textFile:metadataText};

		if(file === undefined){
			alert("SORRY YOU NEED TO UPLOAD AN IMAGE TO CONTINUE");
		} else{
			Images.insert(fsFile,function(err,succes){
				if(err){
				  console.log(err.reason);
				} else{
          console.log(succes); //this should return the fsFile, or the Id of fsFile
          var imageId = succes._id;
          // var imageUrl = succes.url;

          var post = {
            title: $('#post-title').val(),
            source: $('#post-source').val(),
            owner: Meteor.userId(),
            ownerName: Meteor.user().profile.name,
            createAt: new Date(),
            imageId: imageId,
            // imageUrl: imageUrl,
            fun: 0,
            view: 0
          };

          Session.set('imagePostId', imageId);
          $("#postSubmit").addClass("disabled");

          var checkUpload = window.setInterval(function(){
            console.log(succes.uploadProgress());
            Session.set('uploadPercent', succes.uploadProgress());

            if(succes.uploadProgress() == 100){
              clearInterval(checkUpload);
              Posts.insert(post);

              $("#postSubmit").removeClass("disabled");
              $('#radioLocal').click();
              $('#fileLocal').val('');
              $('#fileUrl').val('');
              $('#post-title').val('');
              $('#post-source').val('');
              $('#picture').hide();
              $('#agree').prop('checked', false);
              $('#checkboxSource').prop('checked', false);

              $('.upload-modal').modal('hide');
            }
          }, 1000);
				}
			});
		}
  });
}

Template.upload.helpers({
  imageUpload: function () {
    return Images.find(); // Where Images is an FS.Collection instance
  },
  imagePostId: function () {
    return Session.get('imagePostId');
  },
  uploadPercent: function () {
    return Session.get('uploadPercent');
  },
});


openSlider = function (id, fullscreen) {
    var slider = $('#' + id);
    var fs = 'mm-light mm-slide';

    slider.mmenu({
        'header': true,
        'classNames': {
          fixedElements: {
             fixedTop: "header",
          }
        },
        'onClick': {
            'blockUI': false,
            'close': true,
            'preventDefault': false,
            'setSelected': true
        },
        'offCanvas': {
            'position': 'left',
            // 'zposition': 'front'
        },
        'classes': fs.toString()
        },
      {
        'transitionDuration': 100
    });
    slider.trigger('open.mm');
};

// closeSlider = function (id, callback) {
//     var slider = $('#' + id);
//     slider.trigger('close.mm');
// };
