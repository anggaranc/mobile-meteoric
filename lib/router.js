Router.configure({
  layoutTemplate: 'layout',
  notFoundTemplate: 'notFound',
  progressSpinner : false,
});


Router.map(function () {
  this.route('trending', {
    path: '/',
  });
  this.route('profile', {
    path: '/profile',
  });
  this.route('fresh', {
    path: '/fresh',
  });
  this.route('view', {
    path: '/view',
  });
  // this.route('video', {
  //   path: '/video',
  // });
  // this.route('notFound', {
  //   path: '*'
  // });
  this.route('sideMenu');
});


//after click scroll top
Router._filters = {
  resetScroll: function () {
    var scrollTo = window.currentScroll || 0;
    $('body').scrollTop(scrollTo);
    $('body').css("min-height", 0);
  }
};

var filters = Router._filters;

if(Meteor.isClient) {
  Router.onAfterAction(filters.resetScroll);
}
