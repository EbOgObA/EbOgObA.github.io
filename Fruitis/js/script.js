


// Burger Button
$(".menu-burger").on('click',function(){
  $(this).find(".hambergerIcon").toggleClass("open");
  $('.header-nav').slideToggle();
});
