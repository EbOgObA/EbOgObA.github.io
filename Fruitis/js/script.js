


// Burger Button
$(".menu-burger").on('click',function(){
  $(this).find(".hambergerIcon").toggleClass("open");
  $('.header-nav').slideToggle();
});

// Anchors
$(".nav-item__anchors").on("click", function (event) {
    event.preventDefault();
    var id  = $(this).attr('href'),
        top = $(id).offset().top - 76;
    $('body,html').animate({scrollTop: top}, 1500);
});
