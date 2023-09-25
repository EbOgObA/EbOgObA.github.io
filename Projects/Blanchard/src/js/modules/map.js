export function maps() {
  ymaps.ready(init);
  function init() {

    var myMap = new ymaps.Map('map', {
      center: [55.76002676538796,37.59641838661145],
      zoom: 13
    });

    var Placemark = new ymaps.Placemark([55.76002676538796,37.59641838661145], {}, {
      iconLayout: 'default#image',
      iconImageHref: './img/icons/location.svg',
      iconImageSize: [20, 20],
      iconImageOffset: [-14, -40]
    });

    myMap.geoObjects.add(Placemark);

  }
}