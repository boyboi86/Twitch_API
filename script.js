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

  var dname = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas","brunofin","comster404"];

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
      method:'Get',
      success: function(data){
          /*Creating player object*/
 function player(display_name, logo, status, gameInfo){

   this.display_name = display_name;
   this.status = status;
   this.gameInfo = gameInfo;
   this.logo = logo;


   console.log(status);
 };
      },
      error:function(err){
    console.log(err);
  }
    });
  }
 
 


  /*Determine player's Acc status*/
  function status(data){
  if(data.status=='422'){
  return 'closed';
  } else if (data.stream== undefined && data.stream == null){
    return 'offline';
  } else {
    return 'online';
  };
  };
  

  /*display profile pic depending on player status*/

  function logo(data){
  if(data.status !=='422') {
  return data.stream.channel.logo
  } else {
  return 'http://image.spreadshirtmedia.com/image-server/v1/designs/1005491480,width=280,height=280?mediaType=png'
  };
  }
 /*retrieve game information*/
 function gameInfo(data){
   return data.stream.channel.game
 }

  /*display player name */
  function display_name(data) {
      return data.stream.channel.name
    }
  

  /*append details to body*/
var outString = '';
  
  $.each(player, function(i,obj){
  outString += "<a href=" + '"https://www.twitch.tv/' + obj.display_name + '">'
outString += "<div class='players'>" + "<div class='logo'>" + obj.logo + "</div>"
outString += "<div class='display_name'>" + obj.display_name + "</div>"
outString += "<div class='status'>" + obj.status + "</div>"
outString += "</div>" + '</a>';


$(outString).appendTo('#all');
if (player.status != 'closed' || status != 'offline') {
$(outString).appendTo('#online')
} else if (player.status != 'closed'){
$(outString).appendTo('#offline')
}


  });
  
  
  

  //body closing 
});