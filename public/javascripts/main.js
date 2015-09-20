/* Card Animations For Queue */
$(document).ready(function(){

  $("#approve").click(function(){
    $('.card').fadeOut( "slow", function() {
      location.reload(true);
    });        
  });  

  $("#decline").click(function(){
    $('.card').fadeOut( "slow", function() {
      location.reload(true);
    });
  });
});

/* Inserting Cards */