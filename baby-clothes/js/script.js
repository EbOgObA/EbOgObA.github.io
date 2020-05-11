// Burger Button
$('.menu-burger').on('click',function(){
    $(this).find(".hambergerIcon").toggleClass("open");
    $('.nav-menu').slideToggle();
  });

  // Anchors
$('.nav__item, arrow-down').on('click', function (event) {
    event.preventDefault();
    var id  = $(this).attr('href'),
        top = $(id).offset().top - 75;
    $('body,html').animate({scrollTop: top}, 1500);
});
$('.arrow-down').on('click', function (event) {
    event.preventDefault();
    var id  = $(this).attr('href'),
        top = $(id).offset().top - 75;
    $('body,html').animate({scrollTop: top}, 1500);
});

// Animate scroll
$('.greeting-text').animated('bounceInLeft');
$('.get-catalog').animated('bounceInRight');
$('.about__text > p').animated('bounceInUp');
$('.bestsellers__item').animated('flipInY');
$('.problems__img-box').animated('bounceInUp');
$('.problems__item > p').animated('zoomIn');
$('.services__item').animated('flipInY');
$('.how-works__item').animated('bounceInLeft');
$('.supplier-img').animated('flipInY');
$('.contacts__content').animated('flipInY');
$('.contacts-pointer').animated('bounceInUp');



$('.services__content').slick({
    slidesToShow: 4,
    responsive: [
        {
          breakpoint: 971,
          settings: {
            slidesToShow: 3,
          }
        },{
          breakpoint: 769,
          settings: {
            slidesToShow: 2,
          }
        },{
            breakpoint: 500,
            settings: {
              slidesToShow: 1,
            }
          }
      ]
});

$('.suppliers__content').slick({
    slidesToShow: 4,
    arrows: false,
    responsive: [
        {
          breakpoint: 1150,
          settings: {
            slidesToShow: 3,
          }
        },{
          breakpoint: 950,
          settings: {
            slidesToShow: 2,
          }
        },{
            breakpoint: 580,
            settings: {
              slidesToShow: 1,
            }
          }
      ]
});