$(document).ready(function() {
  //Етот блок кода для стрелки прокрутки вниз на главном верхнем блоке
  $("a.introducation-down-arrow").on("click", function(e) {
    e.preventDefault();
    var anchor = $(this).attr("href");
    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: $(anchor).offset().top - 0
        },
        800
      );
  });

  //Етот блок кода для силок в блоке "САМЫЕ ЧАСТЫЕ ВОПРОСЫ ПЕРЕД НАЧАЛОМ РАБОТЫ", при нажатии которых происходит плавное открытие ответа на вопрос
  $(".item-title").click(function(event) {
    $(this)
      .toggleClass("active")
      .next()
      .slideToggle(300);
  });

  // $(".footer__item--title").click(function(event) {
  //   $(this)
  //     .toggleClass("active-footer")
  //     .next()
  //     .slideToggle(300);
  // });

  // $(".footer__item--title").click(function(event) {
  //   $(this)
  //     .toggleClass("active-footer")
  //     .next()
  //     .next()
  //     .slideToggle(300);
  // });

  // $(".footer__item--title").click(function(event) {
  //   $(this)
  //     .toggleClass("active-footer")
  //     .next()
  //     .next()
  //     .next()
  //     .slideToggle(300);
  // });

  //Етот блок кода для кнопки "БУРГЕР" что в верху сайта на телефонах, которая вызывает випадающее меню
  $(".header-burger__btn").on("click", function() {
    $(".header-wrapper__items").toggleClass("active-menu");
  });

  //Етот блок кода для для силок которые показываються та моб.телефонах при клике на меню бургер. Код заставляет сворачиватся меню при клике на силку
  $(".js-remove").on("click", function() {
    $(".header-wrapper__items").removeClass("active-menu");
  });

  //Етот блок кода для футтера. Заставляет при клике на заголовки "Обо мне, Консультации, Услуги и отзыви" показывать и скрывать их елементи
  $(".js-title1").on("click", function() {
    $(".js-a1").toggleClass("active-footer");
  });

  $(".js-title2").on("click", function() {
    $(".js-a2").toggleClass("active-footer");
  });

  $(".js-title3").on("click", function() {
    $(".js-a3").toggleClass("active-footer");
  });

  $('.pulse-wrapper').on('click', function () {
    $(this).fadeOut();
    $('.chat-wrapper').fadeIn();
  });
  $('.chat__button-close').on('click', function () {
    $('.pulse-wrapper').fadeIn();
    $('.chat-wrapper').fadeOut();
  });
  $('.chat-footer__send').on('click', function () {
    let text = $('.inputFieald').val();
    if (text.length !== 0) {
      $('.chat-main').append(`<div class="chat-message__user">${text}</div>`);
      $('.inputFieald').val("");
    }
  });
});

//Блок кода который ниже отвечает за то что и самый верхний блок кода(за стрелку в верхнем центральном блоке для прокрутки страницы чучуть ниже). Он сейчас закоментирован потому что не нужно чтобы он работал. Он на екстренный случай если верхний по каким то причинам станет не рабочий. Тогда верхний можна будет удалить, а этот просто розкоментировать.

// const anchors = document.querySelectorAll(".introducation-down-arrow");

// for (let anchor of anchors) {
//   anchor.addEventListener("click", function(e) {
//     e.preventDefault();

//     const blockID = anchor.getAttribute("href");

//     document.querySelector(blockID).scrollIntoView({
//       behavior: "smooth",
//       block: "start"
//     });
//   });
// }

//Етот блок кода для бегущих цифр. При скроле страницы когда в окне браузера начинает бить видно блоки с цифрами, то они автоматически начинают наращиватся до определлённых значений.
var time = 2,
  cc = 1;
$(window).scroll(function() {
  $(".statistics-items").each(function() {
    var cPos = $(this).offset().top,
      topWindow = $(window).scrollTop();
    if (cPos < topWindow + 600) {
      if (cc < 2) {
        $(".statistics-items__item--title").addClass("viz");
        $("div").each(function() {
          var i = 1,
            num = $(this).data("num"),
            step = (1000 * time) / num,
            that = $(this),
            int = setInterval(function() {
              if (i <= num) {
                that.html(i);
              } else {
                cc = cc + 2;
                clearInterval(int);
              }
              i++;
            }, step);
        });
      }
    }
  });
});
