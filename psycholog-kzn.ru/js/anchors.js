$(document).ready(function() {
  //Етот блок кода для силки "С чем я работаю"
  $("a.m8").on("click", function(e) {
    e.preventDefault();
    var anchor = $(this).attr("href");
    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: $(anchor).offset().top - 90
        },
        800
      );
  });

  //Етот блок кода для силки "Методики"
  $("a.mtds").on("click", function(e) {
    e.preventDefault();
    var anchor = $(this).attr("href");
    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: $(anchor).offset().top - 90
        },
        800
      );
  });

  //Етот блок кода для силки "Принципы работы"
  $("a.prncpls").on("click", function(e) {
    e.preventDefault();
    var anchor = $(this).attr("href");
    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: $(anchor).offset().top - 90
        },
        800
      );
  });

  //Етот блок кода для силки "Виды консультацый и цены"
  $("a.prc").on("click", function(e) {
    e.preventDefault();
    var anchor = $(this).attr("href");
    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: $(anchor).offset().top - 90
        },
        800
      );
  });

  //Етот блок кода для силки "Кейсы и отзывы"
  $("a.rvws").on("click", function(e) {
    e.preventDefault();
    var anchor = $(this).attr("href");
    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: $(anchor).offset().top - 90
        },
        800
      );
  });

  //Етот блок кода для силки "Контакы"
  $("a.cntcs").on("click", function(e) {
    e.preventDefault();
    var anchor = $(this).attr("href");
    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: $(anchor).offset().top - 90
        },
        800
      );
  });

  //Етот блок кода для силки "Подготовка к роботе" что в footer
  $("a.rslt").on("click", function(e) {
    e.preventDefault();
    var anchor = $(this).attr("href");
    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: $(anchor).offset().top - 90
        },
        800
      );
  });

  //Етот блок кода для силки "Результати" что в footer
  $("a.advntgs").on("click", function(e) {
    e.preventDefault();
    var anchor = $(this).attr("href");
    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: $(anchor).offset().top - 90
        },
        800
      );
  });

  //Етот блок кода для силки "Кейсы и отзывы" что в footer
  $("a.rvws").on("click", function(e) {
    e.preventDefault();
    var anchor = $(this).attr("href");
    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: $(anchor).offset().top - 90
        },
        800
      );
  });

  //Етот блок кода для силки "FAQ" что в footer
  $("a.qstns").on("click", function(e) {
    e.preventDefault();
    var anchor = $(this).attr("href");
    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: $(anchor).offset().top - 90
        },
        800
      );
  });

  //Етот блок кода для силки "Логотип" что в footer
  $("a.intrdctn").on("click", function(e) {
    e.preventDefault();
    var anchor = $(this).attr("href");
    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: $(anchor).offset().top - 90
        },
        800
      );
  });

  //Етот блок кода для силки "Мое образование" на странице Обо мне
  $("a.edctn").on("click", function(e) {
    e.preventDefault();
    var anchor = $(this).attr("href");
    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: $(anchor).offset().top - 90
        },
        800
      );
  });

  //Етот блок кода для силки "Дипломы и сертификаты" на странице Обо мне
  $("a.dplm").on("click", function(e) {
    e.preventDefault();
    var anchor = $(this).attr("href");
    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: $(anchor).offset().top - 90
        },
        800
      );
  });
});
