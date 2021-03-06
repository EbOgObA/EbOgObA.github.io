

$(window).ready(function() {

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


  // Кнопка возврата в начало страницы
  function backToTop() {
    let button = $('.back-to-top');
    $(window).on('scroll', () => {
      if ($(this).scrollTop() >= 100)  {
        button.fadeIn();
      } else {
        button.fadeOut();
      }
    });

    button.on('click', (e) => {
      e.preventDefault();
      $('html').animate({scrollTop: 0}, 2000);
    });
  }
  backToTop();


  // Бургер
  $('.burger').on('click', function(){
    $(this).toggleClass('active');
    $('.navigation').slideToggle();
  });

  // Маска для телефона
    $('.phone').mask("+7(999) 999-99-99");
    function setCursorPosition(pos, e) {
      e.focus();
      if (e.setSelectionRange) e.setSelectionRange(pos, pos);
      else if (e.createTextRange) {
        var range = e.createTextRange();
        range.collapse(true);
        range.moveEnd("character", pos);
        range.moveStart("character", pos);
        range.select()
      }
    }
    function mask(e) {
      //console.log('mask',e);
      var matrix = this.placeholder,// .defaultValue
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, "");
        def.length >= val.length && (val = def);
        matrix = matrix.replace(/[_\d]/g, function(a) {
          return val.charAt(i++) || "_"
        });
        this.value = matrix;
        i = matrix.lastIndexOf(val.substr(-1));
        i < matrix.length && matrix != this.placeholder ? i++ : i = matrix.indexOf("_");
        setCursorPosition(i, this)
    }
      window.addEventListener("DOMContentLoaded", function() {
        var input = document.querySelector(".popup__input");
        input.addEventListener("input", mask, false);
        input.focus();
        setCursorPosition(3, input);
      });

  // Заказать звонок
    $(".request-call").on('click', function(e) {
      e.preventDefault();
      $(".popup-wrapper").fadeIn();
      $('body').css('overflow', 'hidden');
    });
    $(".footer__request-call").on('click', function(e) {
      e.preventDefault();
      $(".popup-wrapper").fadeIn();
      $('body').css('overflow', 'hidden');
    });
    $('.popup__btn-close').on('click', function() {
      $(".popup-wrapper").fadeOut();
      $('body').css('overflow', 'auto');
    });
    $('.overlay').on('click', function() {
      $(".popup-wrapper").fadeOut();
      $('body').css('overflow', 'auto');
    });

  $('.button__out').on('click', function (e) {
    e.preventDefault();
  });

  //E-mail Ajax Send
$("form").submit(function() { //Change
  let th = $(this);
  $.ajax({
    type: "POST",
    url: "mail.php", //Change
    data: th.serialize()
  }).done(function() {
    alert("Thank you!");
    setTimeout(function() {
      // Done Functions
      th.trigger("reset");
    }, 1000);
  });
  return false;
});

  // Якоря
  $(".anchors").on("click","a", function (event) {
      event.preventDefault();
      var id  = $(this).attr('href'),
          top = $(id).offset().top;
      $('body,html').animate({scrollTop: top}, 1500);
  });

  // Подключаем слайдера
    $('.slider').slick({
      arrows: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      speed: 1000,
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
            dots: true,
            slidesToShow: 2,
          }
        },{
          breakpoint: 769,
          settings: {
            arrows: false,
            dots: true,
            slidesToShow: 1,
          }
        }
      ]
    });



    // Кнопка "Поделиться"
    $('.share-button').on('click',function(){
      $(this).addClass('open');
    });
    $(".share-item").on('click',function(e){
      e.preventDefault();
      $('.share-button').addClass('shared');
      setTimeout(function(){
        $('.share-button').addClass('thankyou');
      }, 800);
      setTimeout(function(){
        $('.share-button').removeClass('open');
        $('.share-button').removeClass('shared');
        $('.share-button').removeClass('thankyou');
      }, 2500);
    });
});
