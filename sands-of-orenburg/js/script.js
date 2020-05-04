
// BURGER BUTTON
$('.burger').on('click', function(){
    $(this).toggleClass('active');
    $('.menu').slideToggle();
});

// ANCHORS
$(".anchors").on("click", function (event) {
    event.preventDefault();
    var id  = $(this).attr('href'),
        top = $(id).offset().top;
    $('body,html').animate({scrollTop: top}, 1500);
});

// ANIMATED SCROLL
$('.advantages__item img').animated('bounceInLeft');
$('.advantages__item-text h3').animated('bounceInLeft');
$('.advantages__item-text p').animated('bounceInLeft');
$('.content__item').animated('flipInY');
$('.section-title').animated('bounceInRight');
$('.service__title').animated('flipInY');
$('.service__img').animated('bounceInDown');

// REVIEWS SLIDER
$('.reviews__content').slick({
    arrows: false,
    slidesToShow: 3,
    speed: 500,
    infinite: true,
    draggable: true,
    lazyLoad: 'ondemand',
    swipe: true,
    touchThreshold: 5,
    responsive: [
        {
          breakpoint: 1025,
          settings: {
            arrows: false,
            slidesToShow: 2,
          }
        },{
          breakpoint: 661,
          settings: {
            arrows: true,
            slidesToShow: 1,
          }
        }
      ]
});