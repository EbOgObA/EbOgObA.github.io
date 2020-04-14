$(document).ready(function() {
  //МОДАЛЬНОЕ ОКНО - 1
  $(".js-modal-btn1").on("click", function() {
    $(".overlay").addClass("active");
  });

  $(".modal__close-btn").on("click", function() {
    $(".overlay").removeClass("active");
  });

  $(".js-modal-btn1").on("click", function() {
    event.preventDefault();
  });

  $(".close-btn").on("click", function() {
    $(".overlay").removeClass("active");
  });

  $(".js-close_modal").on("click", function() {
    $(".overlay").removeClass("active");
  });

  //МОДАЛЬНОЕ ОКНО - 2
  $(".js-modal-btn2").on("click", function() {
    $(".overlay2").addClass("active");
  });

  $(".modal__close-btn").on("click", function() {
    $(".overlay2").removeClass("active");
  });

  $(".js-modal-btn2").on("click", function() {
    event.preventDefault();
  });

  $(".close-btn").on("click", function() {
    $(".overlay2").removeClass("active");
  });

  $(".js-close_modal").on("click", function() {
    $(".overlay2").removeClass("active");
  });

  //МОДАЛЬНОЕ ОКНО - 3
  $(".js-modal-btn3").on("click", function() {
    $(".overlay3").addClass("active");
  });

  $(".modal__close-btn").on("click", function() {
    $(".overlay3").removeClass("active");
  });

  $(".js-modal-btn3").on("click", function() {
    event.preventDefault();
  });

  $(".close-btn").on("click", function() {
    $(".overlay3").removeClass("active");
  });

  $(".js-close_modal").on("click", function() {
    $(".overlay3").removeClass("active");
  });

  // Етот блок кода для инпутов тех которые в модалках и для изображения с модалки
  $(".js-click").focus(function() {ym(61534132,'reachGoal','otpravka')
    $(".modal-logo").addClass("active-input");
  });

  $(".js-click").blur(function() {yaCounter61534132.reachGoal('Konsult')
    $(".modal-logo").removeClass("active-input");
  });
  // Етот блок кода для инпутов тех которые в модалках и для кнопки закрытия модалки (крестика) с модалки
  $(".js-click").focus(function() {
    $(".close-btn").addClass("active-close_btn");
  });

  $(".js-click").blur(function() {
    $(".close-btn").removeClass("active-close_btn");
  });
});
