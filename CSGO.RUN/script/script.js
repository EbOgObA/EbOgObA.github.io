$(function () {

  //  preloader
  function preloader() {
    $(()=>  {
      setInterval(()=>  {
        let p = $('.preloader');
        p.css('opacity', 0);

        setInterval(
          ()=> p.remove(),
          parseInt(p.css('--duration')) * 1000
        );

      }, 0);
    });
  }
  preloader();

  $('.header__lang-nav').on('click', function() {
    $('.lang-option__container').slideToggle();
  });

  $(".menu-burger").on('click',function(){
    $(this).find(".hambergerIcon").toggleClass("open");
    $('.header-nav').slideToggle();
  });

});
