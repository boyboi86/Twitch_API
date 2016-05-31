$(document).ready(function() {

  //For trigger on cross  
  $('#nav-icon').click(function() {
    $(this).toggleClass('open');
  });

  //event handler for menu 
  $('#nav-icon').on('click', function() {
    if ($('#nav-icon').hasClass('open')) {
      $('.menu').animate({
        left: "0px"
      }, 300);

      $('body').animate({
        left: "285px"
      }, 300);
    } else {
      $('.menu').animate({
        left: "-285px"
      }, 300);

      $('body').animate({
        left: "0px"
      }, 300);
    }
  });

  // Ajax for Twitch

  var dname = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404"];

  /*Creating player object*/
  //MUST include ?callback=? cause in other APIs I played with there is no other way you can otherwise define a callback in your data, so you can omit everything within a querystring except callback

  // you can also use for (var i in dname)
  /* get relevant users provided in zipline*/
  for (var i = 0; i < dname.length; i++) {
    url = 'https://api.twitch.tv/kraken/streams/' + dname[i] + '?callback=?';
    // you can use getJSON which is a better choice in this situation
    $.ajax({
      url: url,
      dataType: 'jsonp',
      data: {},
      method: 'GET',
      success: function(data) {
        console.log(data);
        /*Determine player's Acc status*/
        /*try not to do the below code, I'm just lazy, I'll remake another version using angularjs hint: you need 2 calls to get logo/details/name even for offline mode*/
        if (data.status == 422) {
          $('#all').append("<div class='player closed'>" + "<div class='img'>" + "<img src='https://cdn1.iconfinder.com/data/icons/simple-icons/2048/twitch-2048-black.png'>" + "</div>" + "<div class='name'>" + data.message.slice(9, 17) + "</div>" + "<div class='status'>" + 'Account Closed' + "</div>" + "</div>")
        } else if (data.stream == undefined || data.stream == null) {
          $('#all, #offline').append("<div class='player offline'>" + "<div class='img'>" + "<img src='https://d1qb2nb5cznatu.cloudfront.net/startups/i/114142-19c0993bf69c468f1350fd422bfad6b2-medium_jpg.jpg?buster=1410211530'>" + "</div>" + "<div class='name'>" + data._links.channel.substring(38) + "</div>" + "<div class='status' style='color:red;'>" + 'offline' + "</div>" + "</div>")
        } else {
          $('#all, #online').append('<a href="' + data.stream.channel.url + '" target="_blank">' + "<div class='player online'>" + "<div class='img'>" + "<img src='" + data.stream.channel.logo + "'>" + "</div>" + "<div class='name'>" + data.stream.channel.name + "</div>" + "<div class='status' style='color:green;'>" + 'online' + "</div>" + "<div class=game>" + data.stream.channel.game + "</div>" + "</div>" + "</a>")
        };
      },
      /*closing for ajax*/
      error: function(err) {
        console.log(err);
      }
    });
  };
  //search functionality
$('#search').keyup(function() {
  // Get the value of the search box
  var search = $(this).val().toLowerCase();
  // Check each user for a match
  $('.player').each(function() {
    var result = $(this).text().toLowerCase();
    // If the search text is found show, otherwise hide.
    if (result.indexOf(search) !== -1) {
      $(this).show()
    } else {
      $(this).hide();
    }
  });
});


  //body closing 
});