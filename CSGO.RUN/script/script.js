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

      }, 100);
    });
  }
  preloader();



  // Установка таймера
  function animateBlock() {
    setTimeout(function () {
      $(".timer").hide();
    }, 12000);
    setTimeout(function () {
      $(".coefficient-box").show();
      $(".chart").show();
      $(".runUp").show();
      setTimeout(function () {
        $(".runUp").hide();
        $(".fall").show();
        $(".graph-fall").show();
        $(".top-line").css("background", "linear-gradient(-90deg, rgba(222, 0, 0, 1), rgba(222, 0, 0, 0))");
        $(".right-line").css("background", "linear-gradient(0deg, rgba(222, 0, 0, 1), rgba(222, 0, 0, 0))");
        $(".bottom-line").css("background", "linear-gradient(90deg, rgba(222, 0, 0, 1), rgba(222, 0, 0, 0))");
        $(".left-line").css("background", "linear-gradient(180deg, rgba(222, 0, 0, 1), rgba(222, 0, 0, 0))");
        $(".chart-box").css({'border-bottom':'2px dashed rgba(222, 0, 0, 1)', 'border-right':'2px dashed rgba(222, 0, 0, 1)'});
      }, 15000);
    }, 12000);
  }
  setInterval(animateBlock(), 33000);
  setInterval(function() {
    $(".timer").show();
    $(".runUp").show();
    $(".coefficient-box").hide();
    $(".chart").hide();
    $(".fall").hide();
    $(".graph-fall").hide();
    $(".top-line").css("background", "linear-gradient(-90deg, rgba(0, 165, 195, 1), rgba(0, 165, 195, 0)");
    $(".right-line").css("background", "linear-gradient(0deg, rgba(0, 165, 195, 1), rgba(0, 165, 195, 0)");
    $(".bottom-line").css("background", "linear-gradient(90deg, rgba(0, 165, 195, 1), rgba(0, 165, 195, 0)");
    $(".left-line").css("background", "linear-gradient(180deg, rgba(0, 165, 195, 1), rgba(0, 165, 195, 0)");
    $(".chart-box").css({'border-bottom':'2px dashed rgba(0, 165, 195, 1)', 'border-right':'2px dashed rgba(0, 165, 195, 1)'});
    animateBlock();
  }, 33000);







  // setInterval(function() {
  //   $(".timer").show();
  //   setTimeout(function () {
  //     $(".timer").hide();
  //     $(".coefficient-box").show();
  //     $(".chart").show();
  //       setTimeout(function() {
  //         $(".coefficient-box").hide();
  //         $(".chart").hide();
  //       }, 16000);
  //   }, 12000);
  //  },0, 10000);



  $('.header__lang-nav').on('click', function() {
    $('.lang-option__container').slideToggle();
  });

  $(".menu-burger").on('click',function(){
    $(this).find(".hambergerIcon").toggleClass("open");
    $('.header-nav').slideToggle();
  });

  $('.faq-list__item-button').on('click', function() {
    $(this).children('.faq-tab').toggleClass('active');
    $(this).next('.faq-list__desc').slideToggle();
  });







});
