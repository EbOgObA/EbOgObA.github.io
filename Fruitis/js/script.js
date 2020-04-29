


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

// Animate scroll
$(".about-us__content p").animated("fadeInUp");
$('.manufactures-overlay').animated("flipInY");
$('.contacts-item').animated("flipInX");
$('.services-item').animated("flipInY");

// Suppliers SLIDER
$('.suppliers-box').slick({
  arrows: true,
  slidesToShow: 5,
  slidesToScroll: 2,
  speed: 1000,
  infinite: true,
  draggable: true,
  lazyLoad: 'ondemand',
  swipe: true,
  touchThreshold: 5,
  responsive: [
    {
      breakpoint: 769,
      settings: {
        arrows: false,
        slidesToShow: 3,
      }
    },{
      breakpoint: 425,
      settings: {
        arrows: false,
        slidesToShow: 2,
      }
    }
  ]
});

$('.manufactures-box').slick({
  arrows: false,
  slidesToShow: 5,
  slidesToScroll: 2,
  speed: 1000,
  infinite: true,
  draggable: true,
  lazyLoad: 'ondemand',
  swipe: true,
  touchThreshold: 5,
  responsive: [
    {
      breakpoint: 769,
      settings: {
        arrows: false,
        slidesToShow: 3,
      }
    },{
      breakpoint: 425,
      settings: {
        arrows: false,
        slidesToShow: 2,
      }
    }
  ]
});
