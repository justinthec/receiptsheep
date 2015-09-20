/* Card Animations For Queue */
$(document).ready(function(){

  $("#approve").click(function(){
    $(this).hide('slide',{direction:'right'},1000);     
  });  

  $("#decline").click(function(){
    $(this).hide('slide',{direction:'left'},1000);
  });
});