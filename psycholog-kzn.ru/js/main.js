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


  //E-mail Ajax Send
  $(".main-form").submit(function() { //Change
    let th = $(this);
    $.ajax({
      type: "POST",
      url: "mail.php", //Change
      data: th.serialize()
    }).done(function() {
      setTimeout(function() {
        // Done Functions
        th.trigger("reset");
      }, 1000);
    });
    return false;
  });






  // Функция добавления формы
  function addForm() {
    $('.chat-main__track').append(`<p class="introduce-yourself">Представьтесь в чате</p>
                            <div class="main-form__container">
                              <form class="main-form" action="mail.php" method="post">
                                <!-- Hidden Required Fields -->
                                <input type="hidden" name="project_name" value="psycholog-kzn.ru">
                                <input type="hidden" name="admin_email" value="info@psycholog-kzn.ru">
                                <input type="hidden" name="form_subject" value="Вопрос в чате">
                                <div class="main-form__item">
                                  <input type="text" name="name" autocomplete="name" placeholder="Ваше имя" title="Ваше имя" value="">
                                </div>
                                <div class="main-form__item">
                                  <input type="tel" name="phone" autocomplete="phone" placeholder="Ваше имя" title="Ваш телефон" value="">
                                </div>
                                <div class="main-form__item">
                                  <input type="mail" name="mail" autocomplete="mail" placeholder="Ваш e-mail*" required="required" title="В e-mail" value="">
                                </div>
                                <div class="main-form__item">
                                  <input type="submit" name="submit" value="Отправить">
                                </div>
                              </form>
                            </div>`);
  }

  setTimeout(function () {
    $('.chat-prompt').fadeIn(500);
  }, 5000);
  // Закрытие всплывающей подсказки
  $('.chat-prompt__close').on('click', function () {
    $('.chat-prompt').fadeOut();
  });
  // Нажатие на пульсирующую кнопку
  $('.pulse-wrapper').on('click', function () {
    $('.chat-prompt').hide();
    $(this).fadeOut();
    $('.chat-wrapper').fadeIn();
  });
  // Закрытие чата
  $('.chat__button-close').on('click', function () {
    $('.pulse-wrapper').fadeIn();
    $('.chat-wrapper').fadeOut();
  });


  $('.questions__item1').on('click', function() {
    let message = $('.questions__item1').val();
    $('.prompt-questions__container').hide();
    $('.chat-main__track').append(`<div class="chat-message__user">${message}</div>`);
    setTimeout(addForm, 2000);
  });
  $('.questions__item2').on('click', function() {
    let message = $('.questions__item2').val();
    $('.prompt-questions__container').hide();
    $('.chat-main__track').append(`<div class="chat-message__user">${message}</div>`);
    setTimeout(addForm, 2000);
  });
  $('.questions__item3').on('click', function() {
    let message = $('.questions__item3').val();
    $('.prompt-questions__container').hide();
    $('.chat-main__track').append(`<div class="chat-message__user">${message}</div>`);
    setTimeout(addForm, 2000);
  });
  $('.chat-footer__send').on('click', function () {
    let text = $('.inputFieald').val();

    if (text.length !== 0) {
      $('.chat-main__track').append(`<div class="chat-message__user">${text}</div>`);
      $('.inputFieald').val("");
      setTimeout(addForm, 1000);
    }
  });

  if ( $('.main-form__item input[type="mail"]').val().length !== 0) {
    $('.main-form__item input[type="submit"]').on('click', function functionName() {
      $('.chat-main__track').append(`<div class="chat-main__bot-user">
                                       <div class="bot-user__img">
                                         <img src="images/DSC_4719.png" alt="#">
                                       </div>
                                       <div class="bot-user__text">
                                         <span>Спасибо! Ближайший освободившийся оператор свяжется с вами в&nbsp;течение 10 минут.</span>
                                       </div>
                                     </div>`);
      $('.prompt-questions__item').val("");
    });
  }
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
