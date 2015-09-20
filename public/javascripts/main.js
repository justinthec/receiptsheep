/* Card Animations For Queue */
$(document).ready(function(){

  $("a.approve").click(function(){
    $(this).parent().parent().parent().parent().parent().parent().hide(1000);
    var id=this.children[0].innerHTML;
    $.ajax({
      type: "GET",
      url: '/approve/'+id,
      data: {},
      success: function(){},
      dataType: "text"
    });    
  });  

  $("a.decline").click(function(){
    $(this).parent().parent().parent().parent().parent().parent().hide(1000); 
    var id=this.children[0].innerHTML;
    $.ajax({
      type: "DELETE",
      url: '/data/'+id,
      data: {},
      success: function(){},
      dataType: "text"
    });
  });
});