Template.trending.events({
  'click [data-action=shareApp]': function (event, template) {
    IonActionSheet.show({
      titleText: 'Share on :',
      buttons: [
        { text: 'Facebook <i class="icon ion-share"></i>' },
        { text: 'Twitter <i class="icon ion-arrow-move"></i>' },
        { text: 'Google + <i class="icon ion-arrow-move"></i>' },
      ],
      buttonClicked: function(index) {
        if (index === 0) {
          console.log('Facebook!');
        }
        if (index === 1) {
          console.log('Twitter!');
        }
        if (index === 2) {
          console.log('Google!');
        }
        return true;
      },
      destructiveButtonClicked: function() {
        console.log('Destructive Action!');
        return true;
      }
    });
  }
});
