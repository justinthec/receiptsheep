/* Card Animations For Queue */
$(document).ready(function(){

    $(".card").on("swiperight",function(){
      $(this).addClass('rotate-left').delay(10000).fadeOut(3);
      $('.card').find('.status').remove();
      $(this).append('<div class="status approve">Approved</div>');      
    });  

   $(".card").on("swipeleft",function(){
    $(this).addClass('rotate-right').delay(10000).fadeOut(3);
    $('.card').find('.status').remove();
    $(this).append('<div class="status decline">Declined</div>');
  });

});