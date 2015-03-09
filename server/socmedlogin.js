isProdEnv = function () {
      if (process.env.ROOT_URL == "http://skala.meteor.com") {
          return false;
      } else {
          return true;
      }
  }

  ServiceConfiguration.configurations.remove({
      service: 'twitter'
  });

  ServiceConfiguration.configurations.remove({
      service: 'google'
  });

  ServiceConfiguration.configurations.remove({
      service: 'facebook'
  });

  if (isProdEnv()) {
      ServiceConfiguration.configurations.insert({
          service: 'twitter',
          consumerKey: 'uGNbVa2P8ieHN2p3Ke9mYWV8M',
          secret: 'QvAuPshqxBQiWN616L8Y2iBpExnqdnkDJc72AcZpqtzKOh3V4k'
      });
      ServiceConfiguration.configurations.insert({
          service: 'google',
          clientId: '159945627396-m2kujt615td1so38v5odh7o65emaoe23.apps.googleusercontent.com',
          secret: 'gLH5GN_eX7yO5nMe6HA2JZtp'
      });
      ServiceConfiguration.configurations.insert({
          service: 'facebook',
          appId: '1417054351922112',
          secret: 'e66dd07f5f8eea16d14fad3de0174ded'
      });
  } else {
      ServiceConfiguration.configurations.insert({
          service: 'twitter',
          consumerKey: 'uGNbVa2P8ieHN2p3Ke9mYWV8M',
          secret: 'QvAuPshqxBQiWN616L8Y2iBpExnqdnkDJc72AcZpqtzKOh3V4k'
      });
      ServiceConfiguration.configurations.insert({
          service: 'google',
          clientId: '159945627396-m2kujt615td1so38v5odh7o65emaoe23.apps.googleusercontent.com',
          secret: 'gLH5GN_eX7yO5nMe6HA2JZtp'
      });
      ServiceConfiguration.configurations.insert({
          service: 'facebook',
          appId: '1417054351922112',
          secret: 'e66dd07f5f8eea16d14fad3de0174ded'
      });
  }

  var getFbPicture = function(accessToken) { // make async call to grab the picture from facebook
    var result;
    result = Meteor.http.get("https://graph.facebook.com/me", {
      params: {
        access_token: accessToken,
        fields: 'picture'
      }
    });
    if(result.error) {
      throw result.error;
    }
    return result.data.picture.data.url; // return the picture's url
  };

  Accounts.onCreateUser(function(options, user) {
    var service = "";
    console.log(_.keys(user.services)[0]);

    if(options.profile) {
      service = _.keys(user.services)[0];

      if(service == "google"){
        options.profile.picture = user.services.google.picture;
      }
      else if(service == "twitter"){
        options.profile.picture = user.services.twitter.profile_image_url;
      }
      else if(service == "facebook"){
        options.profile.picture = getFbPicture(user.services.facebook.accessToken);
      }

      user.profile = options.profile;
    }

    return user;
  });
