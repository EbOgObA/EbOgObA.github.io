
// DYNAMIC ADAPTIVE
(function () {
  let originalPositions = [];
  let daElements = document.querySelectorAll('[data-da]');
  let daElementsArray = [];
  let daMatchMedia = [];
  if (daElements.length > 0) {
    let number = 0;
    for (let index = 0; index < daElements.length; index++) {
      const daElement = daElements[index];
      const daMove = daElement.getAttribute('data-da');
      if (daMove != '') {
        const daArray = daMove.split(',');
        const daPlace = daArray[1] ? daArray[1].trim() : 'last';
        const daBreakpoint = daArray[2] ? daArray[2].trim() : '767';
        const daType = daArray[3] === 'min' ? daArray[3].trim() : 'max';
        const daDestination = document.querySelector('.' + daArray[0].trim())
        if (daArray.length > 0 && daDestination) {
          daElement.setAttribute('data-da-index', number);
          originalPositions[number] = {
            "parent": daElement.parentNode,
            "index": indexInParent(daElement)
          };
          daElementsArray[number] = {
            "element": daElement,
            "destination": document.querySelector('.' + daArray[0].trim()),
            "place": daPlace,
            "breakpoint": daBreakpoint,
            "type": daType
          }
          number++;
        }
      }
    }
    dynamicAdaptSort(daElementsArray);

    for (let index = 0; index < daElementsArray.length; index++) {
      const el = daElementsArray[index];
      const daBreakpoint = el.breakpoint;
      const daType = el.type;

      daMatchMedia.push(window.matchMedia("(" + daType + "-width: " + daBreakpoint + "px)"));
      daMatchMedia[index].addListener(dynamicAdapt);
    }
  }
  function dynamicAdapt(e) {
    for (let index = 0; index < daElementsArray.length; index++) {
      const el = daElementsArray[index];
      const daElement = el.element;
      const daDestination = el.destination;
      const daPlace = el.place;
      const daBreakpoint = el.breakpoint;
      const daClassname = "_dynamic_adapt_" + daBreakpoint;

      if (daMatchMedia[index].matches) {
        if (!daElement.classList.contains(daClassname)) {
          let actualIndex = indexOfElements(daDestination)[daPlace];
          if (daPlace === 'first') {
            actualIndex = indexOfElements(daDestination)[0];
          } else if (daPlace === 'last') {
            actualIndex = indexOfElements(daDestination)[indexOfElements(daDestination).length];
          }
          daDestination.insertBefore(daElement, daDestination.children[actualIndex]);
          daElement.classList.add(daClassname);
        }
      } else {
        if (daElement.classList.contains(daClassname)) {
          dynamicAdaptBack(daElement);
          daElement.classList.remove(daClassname);
        }
      }
    }
  }

  dynamicAdapt();

  function dynamicAdaptBack(el) {
    const daIndex = el.getAttribute('data-da-index');
    const originalPlace = originalPositions[daIndex];
    const parentPlace = originalPlace['parent'];
    const indexPlace = originalPlace['index'];
    const actualIndex = indexOfElements(parentPlace, true)[indexPlace];
    parentPlace.insertBefore(el, parentPlace.children[actualIndex]);
  }
  function indexInParent(el) {
    var children = Array.prototype.slice.call(el.parentNode.children);
    return children.indexOf(el);
  }
  function indexOfElements(parent, back) {
    const children = parent.children;
    const childrenArray = [];
    for (let i = 0; i < children.length; i++) {
      const childrenElement = children[i];
      if (back) {
        childrenArray.push(i);
      } else {
        if (childrenElement.getAttribute('data-da') == null) {
          childrenArray.push(i);
        }
      }
    }
    return childrenArray;
  }
  function dynamicAdaptSort(arr) {
    arr.sort(function (a, b) {
      if (a.breakpoint > b.breakpoint) { return -1 } else { return 1 }
    });
    arr.sort(function (a, b) {
      if (a.place > b.place) { return 1 } else { return -1 }
    });
  }
}());

window.onload = function () {
  gsap.registerPlugin(ScrollTrigger);


  let body = document.querySelector('body');
  let burger = document.querySelector('.ham');
  let menu = document.querySelector('.menu');


  // ===================  MENU  ===================
  burger.addEventListener('click', function () {
    if (burger.classList.contains('active') && !burger.classList.contains('back')) {
      burger.classList.add('back');
    } else if (burger.classList.contains('back')) {
      burger.classList.remove('back')
    } else {
      burger.classList.add('active')
    }
    body.classList.toggle('lock');
    menu.classList.toggle('active');
  })


  // ===================  ANIMATION  ===================
  let facial = document.querySelector('.facial');
  let facialGraterStroke = document.querySelector('.facial__grater-stroke');
  let facialGraterShape = document.querySelector('.facial__grater-shape');
  let facialGrater = document.querySelector('.facial__grater');
  let partOfLime = document.querySelector('.facial__lime-part');
  let wholeLime = document.querySelector('.facial__lime');
  let lemon = document.querySelector('.facial__lemon');
  let parallaxFruits = document.querySelectorAll('.parallax-fruits');
  let facial_tl = gsap.timeline();

  let recipe = document.querySelector('.recipe');
  let recipeName = document.querySelector('.recipe__name');
  let recipeClouds = gsap.utils.toArray('.recipe__cloud');
  let recipe_tl = gsap.timeline();

  let bestsellers = gsap.utils.toArray('.bestsellers-tl');
  let bestsellersReverse = gsap.utils.toArray('.bestsellers-tl-reverse');

  
  

  // ===================  RECIPE TIMELINE SCROLL  ===================
  recipe_tl
    .from(recipeClouds, 0.5, {
      opacity: 0,
      filter: 'blur(5px)',
    })
    .from(recipeName, 0.5, {
      xPercent: -150
    }, '-=.25')

  if (recipe) {
    ScrollTrigger.create({
      animation: recipe_tl,
      trigger: recipe,
      start: '33% center',
      toggleActions: 'play none none reverse'
    })
  }


  // ===================  BESTSELLERS TIMELINE  ===================
  if (bestsellers) {
    bestsellers.forEach(item => {
    let bestsellers_tl = gsap.timeline();

      bestsellers_tl
        .from(item.querySelector('.bestsellers-content'), 0.5, {
          xPercent: -150
        })
        .from(item.querySelector('.bestsellers-content__images'), 0.5, {
          xPercent: -110
        }, '-=.25')
        .from(item.querySelector('.bestsellers-images__main'), 0.25, {
          x: `${-item.clientWidth / 2}`
        }, '-=0.25')
        .from(item.querySelector('.bestsellers-images__side-image'), 0.25, {
          x: `${-item.clientWidth / 3}`
        }, '-=0.1')

      ScrollTrigger.create({
        animation: bestsellers_tl,
        trigger: item,
        start: '25% center',
        toggleActions: 'play none none reverse',
        // markers: true
      })
    })
  }
  // ===================  BESTSELLERS REVERSE TIMELINE  ===================
  if (bestsellersReverse) {
    bestsellersReverse.forEach(item => {
    let bestsellersReverse_tl = gsap.timeline();

    bestsellersReverse_tl
        .from(item.querySelector('.bestsellers-content'), 0.5, {
          xPercent: 150
        })
        .from(item.querySelector('.bestsellers-content__images'), 0.5, {
          xPercent: 110
        }, '-=.25')
        .from(item.querySelector('.bestsellers-images__main'), 0.25, {
          x: `${item.clientWidth / 2}`
        }, '-=0.25')
        .from(item.querySelector('.bestsellers-images__side-image'), 0.25, {
          x: `${item.clientWidth / 3}`
        }, '-=0.1')

      ScrollTrigger.create({
        animation: bestsellersReverse_tl,
        trigger: item,
        start: '25% center',
        toggleActions: 'play none none reverse',
        // markers: true
      })
    })
  }


  // ===================  FACIAL TIMELINE  ===================
  ScrollTrigger.matchMedia({
    "(min-width: 769px)": function () {
      // ===================  FACIAL DESKTOP TIMELINE  ===================
      if (facial) {
        facial_tl
          .from(facialGraterStroke, 0.75, {
            x: `${Math.cos(0.8412487) * facialGraterStroke.clientHeight * 2}`,
            y: `${-Math.sin(0.8412487) * facialGraterStroke.clientHeight * 2}`
          })
          .from(facialGraterShape, 0.75, {
            x: `${Math.cos(0.8412487) * facialGraterShape.clientHeight * 2}`,
            y: `${-Math.sin(0.8412487) * facialGraterShape.clientHeight * 2}`
          }, '-=.25')
          .from(facialGrater, 0.5, {
            x: `${Math.cos(0.715585) * facialGrater.clientHeight * 4}`,
            y: `${-Math.sin(0.715585) * facialGrater.clientHeight * 5}`
          }, '-=.25')
          .from(partOfLime, 0.25, {
            xPercent: 200,
            yPercent: -200,
            onComplete: () => {
              partOfLime.classList.add('active')
            }
          })
          .from(wholeLime, 0.25, {
            xPercent: 200,
            yPercent: -200,
            onComplete: () => {
              wholeLime.classList.add('active')
            }
          }, '-=.1')
          .from(lemon, 0.5, {
            xPercent: 400,
            yPercent: -400,
            onComplete: () => {
              lemon.classList.add('active')
            }
          }, '-=.2')
      }
    },
    "(max-width: 768px)": function () {
      // ===================  FACIAL MOBILE TIMELINE  ===================
      if (facial) {
        facial_tl
          .from(facialGraterStroke, 0.75, {
            x: `${Math.cos(-0.837758) * facialGraterStroke.clientHeight * 6}`,
            y: `${-Math.sin(-0.837758) * facialGraterStroke.clientHeight * 4}`
          })
          .from(facialGraterShape, 0.75, {
            x: `${Math.cos(-0.837758) * facialGraterShape.clientHeight * 4}`,
            y: `${-Math.sin(-0.837758) * facialGraterShape.clientHeight * 3}`
          }, '-=.25')
          .from(facialGrater, 0.75, {
            x: `${Math.cos(0.715585) * facialGrater.clientHeight * 4}`,
            y: `${Math.sin(0.715585) * facialGrater.clientHeight * 8}`
          }, '-=.25')
          .from(partOfLime, 0.25, {
            xPercent: 500,
            opacity: 0,
            onComplete: () => {
              partOfLime.classList.add('active')
            }
          })
          .from(wholeLime, 0.25, {
            xPercent: -500,
            opacity: 0,
            onComplete: () => {
              wholeLime.classList.add('active')
            }
          }, '-=.1')
          .from(lemon, 0.5, {
            xPercent: 300,
            opacity: 0,
            onComplete: () => {
              lemon.classList.add('active')
            }
          }, '-=.2')
      }
    }
  })


  // ===================  FACIAL ROTATE FRUITS  ===================
  parallaxFruits.forEach(function (item) {
    gsap.to(item, 30, {
      rotate: ((Math.random() - .5) * 2) * 360,
      repeat: -1,
      ease: "none"
    })
  })

  
  if (window.matchMedia('(min-width: 768px)').matches && facial) {

    // ===================  HEADER SCROLL  ===================
    let lastScroll = 0;
    const defaultOffset = 200;
    const header = document.querySelector('header');

    const scrollPosition = () => window.pageYOffset || document.documentElement.scrollTop;
    const containHide = () => header.classList.contains('hide');

    window.addEventListener('scroll', () => {
      if (scrollPosition() > lastScroll && !containHide() && scrollPosition() > defaultOffset) {
        header.classList.add('hide');
      } else if (scrollPosition() < lastScroll && containHide()) {
        header.classList.remove('hide');
      }

      lastScroll = scrollPosition();
    })


    // ===================  FACIAL PARALLAX FRUITS  ===================
    const forFruits = 10;
    const speed = 0.05;

    let positionX = 0, positionY = 0;
    let xPercentCoord = 0, yPercentCoord = 0;

    function setMouseParallaxStyle() {
      const distX = xPercentCoord - positionX;
      const distY = yPercentCoord - positionY;

      positionX = positionX + (distX * speed);
      positionY = positionY + (distY * speed);

      parallaxFruits.forEach(item => {
        if (item.classList.contains('active')) {
          gsap.timeline()
            .from(item, {
              xPercent: `${positionX / forFruits}`,
              yPercent: `${positionY / forFruits}`
            })
        }
      })
      requestAnimationFrame(setMouseParallaxStyle)
    }
    setMouseParallaxStyle();

    facial.addEventListener('mousemove', (e) => {
      const parallaxWidth = facial.offsetWidth;
      const parallaxHeight = facial.offsetHeight;

      const coordX = e.pageX - parallaxWidth / 2;
      const coordY = e.pageY - parallaxHeight / 2;

      xPercentCoord = coordX / parallaxWidth * 100;
      yPercentCoord = coordY / parallaxHeight * 100;
    })

  }


  // ===================  FORM  ===================
  let subForm = document.querySelector('.subscription__form');
  let subBtn = document.querySelector('.subscription__button');
  let subInput = document.querySelector('.subscription__input');

  if (subForm) {
    subBtn.addEventListener('click', () => {
      if (subInput.value != '') {
        subForm.classList.add('active');
        subBtn.blur();
        
        setTimeout(() => {
          subForm.classList.remove('active');
          subInput.value = '';
        }, 3000)
      }
    })
  }


  // ===================  POPUP  ===================
  let popup_link = document.querySelectorAll('.popup-link');
  let popups = document.querySelectorAll('.popup');
  for (let index = 0; index < popup_link.length; index++) {
    const el = popup_link[index];
    el.addEventListener('click', function (e) {
      // if (unlock) {
        let item = el.getAttribute('href').replace('#', '');
        let video = el.getAttribute('data-video');
        popup_open(item, video);
      // }
      e.preventDefault();
    })
  }
  for (let index = 0; index < popups.length; index++) {
    const popup = popups[index];
    popup.addEventListener("click", function (e) {
      if (!e.target.closest('.popup__body')) {
        popup_close(e.target.closest('.popup'));
      }
    });
  }
  function popup_open(item, video = '') {
    let activePopup = document.querySelectorAll('.popup.active');
    if (activePopup.length > 0) {
      popup_close('', false);
    }
    let curent_popup = document.querySelector('.popup_' + item);
    if (curent_popup) {
      // if (video != '' && video != null) {
      //   let popup_video = document.querySelector('.popup_video');
      //   popup_video.querySelector('.popup__video').innerHTML = '<iframe src="https://www.youtube.com/embed/' + video + '?autoplay=1"  allow="autoplay; encrypted-media" allowfullscreen></iframe>';
      // }
      // if (!document.querySelector('.menu__body.active')) {
        body_lock_add(500);
      // }
      curent_popup.classList.add('active');
      history.pushState('', '', '#' + item);
    }
  }
  function popup_close(item, bodyUnlock = true) {
    // if (unlock) {
      if (!item) {
        for (let index = 0; index < popups.length; index++) {
          const popup = popups[index];
          // let video = popup.querySelector('.popup__video');
          // if (video) {
          //   video.innerHTML = '';
          // }
          popup.classList.remove('active');
        }
      } else {
        // let video = item.querySelector('.popup__video');
        // if (video) {
        //   video.innerHTML = '';
        // }
        item.classList.remove('active');
      }
      // if (!document.querySelector('.menu__body.active')) {
        body_lock_remove(500);
      // }
      history.pushState('', '', window.location.href.split('#')[0]);
    // }
  }
  let popup_close_icon = document.querySelectorAll('.popup__close,.popup-close');
  if (popup_close_icon) {
    for (let index = 0; index < popup_close_icon.length; index++) {
      const el = popup_close_icon[index];
      el.addEventListener('click', function () {
        popup_close(el.closest('.popup'));
      })
    }
  }
  document.addEventListener('keydown', function (e) {
    if (e.which == 27) {
      popup_close();
    }
  });


  // ===================  BODY LOCK  ===================
  function body_lock(delay) {
    let body = document.querySelector("body");
    if (body.classList.contains('lock')) {
      body_lock_remove(delay);
    } else {
      body_lock_add(delay);
    }
  }
  function body_lock_remove(delay) {
    let body = document.querySelector("body");
    // if (unlock) {
      let lock_padding = document.querySelectorAll(".lp");
      setTimeout(() => {
        for (let index = 0; index < lock_padding.length; index++) {
          const el = lock_padding[index];
          el.style.paddingRight = '0px';
        }
        body.style.paddingRight = '0px';
        body.classList.remove("lock");
      }, delay);

      // unlock = false;
      // setTimeout(function () {
      //   unlock = true;
      // }, delay);
    // }
  }
  function body_lock_add(delay) {
    let body = document.querySelector("body");
    // if (unlock) {
      let lock_padding = document.querySelectorAll(".lp");
      for (let index = 0; index < lock_padding.length; index++) {
        const el = lock_padding[index];
        el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
      }
      body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
      body.classList.add("lock");

      // unlock = false;
      // setTimeout(function () {
      //   unlock = true;
      // }, delay);
    // }
  }


  // ===================  LIKES  ===================
  let likes = document.querySelectorAll('.like');

  likes.forEach(item => {
    item.addEventListener('click', () => {
      item.classList.toggle('active');
    })
  })

  // ===================  SLIDERS  ===================

    // ===================  SLIDER RECOM  ===================
    let recomSliders = document.querySelectorAll('.recom-slider');
    if (recomSliders) {
      recomSliders.forEach(slider => {
        let sliderRecom = new Swiper(slider, {
          // loop: true,
          navigation: {
            nextEl: '.recom-slider__nav_next',
            prevEl: '.recom-slider__nav_prev',
          },
          pagination: {
            el: '.recom-slider__pagination',
            type: 'bullets',
            // clickable: true
          },
          breakpoints: {
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
              // autoHeight: true,
            },
            570: {
              slidesPerView: 2,
              // spaceBetween: 10,
            },
            769: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 35,
            },
          },
        })
      });
    }
    
    // ===================  SLIDER POPUP  ===================
    let popupSliders = document.querySelectorAll('.popup-slider');
    if (popupSliders) {
      popupSliders.forEach(slider => {
        let popupSlider = new Swiper(slider, {
          // loop: true,
          slidesPerView: 1,
          navigation: {
            nextEl: '.popup-slider__nav_next',
            prevEl: '.popup-slider__nav_prev',
          },
          pagination: {
            el: '.popup-slider__pagination',
            type: 'bullets',
            // clickable: true
          },
        })
      })
    }

    // ===================  SLIDER STOCK  ===================
    let stockSliders = document.querySelectorAll('.stock-slider');
    if (stockSliders) {
      stockSliders.forEach(slider => {
        let stockSlider = new Swiper(slider, {
          // loop: true,
          autoHeight: true,
          slidesPerView: 1,
          pagination: {
            el: '.stock-slider__pagination',
            type: 'bullets',
            // clickable: true
          },
        })
      })
    }
    
  // ===================  SLIDERS  ===================

};

function randomInteger(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}