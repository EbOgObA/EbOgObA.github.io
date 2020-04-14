$(document).ready(function() {
  $(".slider").slick({
    adaptiveHeight: true,
    dots: true,
    arrow: true,
    responsive: [
      {
        breakpoint: 740,
        settings: {
          arrows: false
        }
      }
    ]
  });
});
