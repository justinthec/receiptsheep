/* Card Animations For Queue */
$(document).ready(function(){

  $("#approve").click(function(){
    $('.card').fadeOut( "slow", function() {
    });        
  });  

  $("#decline").click(function(){
    $('.card').fadeOut( "slow", function() {
    });
  });
});