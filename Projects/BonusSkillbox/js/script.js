document.addEventListener('DOMContentLoaded', function () {

  // SELECT
  const select = document.querySelector('#selectMaterial');
  const choices = new Choices(select, {
    searchEnabled: false,
    itemSelectText: "",
  })


  // YANDEX MAP
  ymaps.ready(init);
  function init() {

    var myMap = new ymaps.Map("map", {
      center: [48.872185073737896, 2.354223999999991],
      zoom: 15
    });

    var Placemark = new ymaps.Placemark([48.872185073737896, 2.354223999999991], {}, {
      iconLayout: 'default#image',
      iconImageHref: './../img/location.svg',
      iconImageSize: [28, 40],
      iconImageOffset: [-14, -40]
    });

    myMap.geoObjects.add(Placemark);

  }

  // CUSTOM SCROLL
  new SimpleBar(document.querySelector('.custom-scroll'), {
    scrollbarMaxSize: 70
  });

  // FORM
  var selector = document.querySelector('input[type="tel"]');
  var im = new Inputmask("+7 (999)-999-99-99")

  im.mask(selector);

  const validationForm = new JustValidate('.form', {
    errorLabelStyle: {
      color: '#ff5c00',
    },
  });

  validationForm
    .addField('#name', [
      {
        rule: 'minLength',
        value: 2,
        errorMessage: 'Минимальное количество символов: 2',
      },
      {
        rule: 'required',
        errorMessage: 'Вы не ввели имя',
      },
    ])
    .addField('#phone', [
      {
        rule: 'required',
        errorMessage: 'Вы не ввели телефон',
      },
      {
        validator: () => selector.inputmask.unmaskedvalue().length === 10,
        errorMessage: 'Вы ввели некорректный телефон',
      },
    ])
    .addField('#email', [
      {
        rule: 'required',
        errorMessage: 'Вы не ввели e-mail',
      },
      {
        rule: 'email',
        errorMessage: 'Вы ввели некорректный E-mail',
      },
    ]);

})