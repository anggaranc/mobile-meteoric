Template.layout.rendered = function(){
  $('.ui.dropdown').dropdown();
  $('.ui.checkbox').checkbox();

  $('.nav-bar').click(function(){
    $('.side-menu')
    // .sidebar('toggle')
    .sidebar('show');
  });

  $('.bar-close').click(function(e){
    $('.side-menu')
    .sidebar('hide');
  });

  // $("body").on("swiperight",function(){
  //   console.log("ok");
  // });
  //
  // $("body").on("swipeleft",function(){
  //   console.log("ok");
  // });

  // $('body').click(function(e){
  //   if($(e.target).prop('class') == 'nav-bar' || $(e.target).hasClass('side-menu')) return false;
  //     $('.side-menu').sidebar('toggle');
  // });

  setTimeout(function(){
    // $('.data-center').sticky('refresh');
    $('.data-left').sticky('refresh');
  }, 500);
}

Template.layout.events({
  'click .button-upload' :function (){
    $('.upload-modal')
    .modal('setting', 'closable', false)
    .modal('show')
    ;
  },

  'click .button-login' :function (){
    $('.login-modal')
    .modal('setting', 'closable', false)
    .modal('show')
    ;
  },

  'click #logout' :function (){
    Meteor.logout(function(err){
        if (err) {
            throw new Meteor.Error("Logout failed");
        }
    })
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
    var file = $('#fileLocal').get(0).files[0],
			metadataText = "this is some cool metadata text on the image";
			fsFile = new FS.File(file);
			fsFile.metadata = {textFile:metadataText}

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

          Posts.insert(post);
				}
			});
		}
  });
}
