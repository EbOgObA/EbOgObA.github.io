import Swiper from 'swiper/bundle';

export function sliders() {

  let heroSlider = document.querySelector('.hero__slider');
  let gallerySlider = document.querySelector('.gallery__slider');
  let eventsSlider = document.querySelector('.events-slider');
  let projectsSlider = document.querySelector('.projects__slider');

  const accessMessageCong = {
    prevSlideMessage: 'Предыдущий слайд',
    nextSlideMessage: 'Следующий слайд',
    firstSlideMessage: 'Первый слайд',
    lastSlideMessage: 'Последний слайд',
  }

  // HERO SLIDER
  if (heroSlider) {
    const heroSwiper = new Swiper(heroSlider, {
      slidesPerView: 1,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      speed: 500,
      loop: true,
      allowTouchMove: false,
    });
  }

  // GALLERY SLIDER
  if (gallerySlider) {
    const gallerySwiper = new Swiper(gallerySlider, {
      speed: 500,
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 12,
      a11y: accessMessageCong,
      navigation: {
        prevEl: '.gallery__nav .swiper-button-prev',
        nextEl: '.gallery__nav .swiper-button-next',
      },
      pagination: {
        el: '.gallery__pagination',
        type: 'fraction',
      },
      breakpoints: {
        480.95: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 38
        },
        1200.95: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 50,
        }
      },
      loop: true,
    });
  }

  // EVENTS SLIDER
  if (eventsSlider) {
    const eventsSwiper = new Swiper(eventsSlider, {
      slidesPerView: 3,
      speed: 500,
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 12,
      allowTouchMove: true,
      a11y: accessMessageCong,
      navigation: {
        prevEl: '.events__button-prev',
        nextEl: '.events__button-next',
      },
      pagination: {
        el: '.events__pagination',
        type: 'bullets',
        clickable: true,
      },
      breakpoints: {
        480.95: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 34
        },
        1024.95: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 27,
          allowTouchMove: false,
        },
        1200.95: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 50
        }
      },
    });
  }

  // PROJECTS SLIDER
  if (projectsSlider) {
    const projectsSwiper = new Swiper(projectsSlider, {
      slidesPerView: 3,
      speed: 500,
      loop: true,
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 25,
      allowTouchMove: true,
      a11y: accessMessageCong,
      navigation: {
        prevEl: '.projects__nav .swiper-button-prev',
        nextEl: '.projects__nav .swiper-button-next',
      },
      breakpoints: {
        480.95: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 34,
        },
        1024.95: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 50,
          allowTouchMove: false,
        },
        1200.95: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 50,
        }
      },
    })
  }
}