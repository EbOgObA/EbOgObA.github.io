document.addEventListener('DOMContentLoaded', function(){

  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// NAVIGATION
  if (window.innerWidth > 768) {
    document.querySelectorAll('.nav__link').forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        let src = btn.dataset.src;
        // console.log(src);
        gsap.to(window, {duration: 2, scrollTo:{y:src}});
        btn.blur();
      });
    });
  }

// HEADER
  // function headerAnimate() {
  //   if (window.innerWidth > 768) {
      
  //     document.body.classList.add('hidden');
  //     // dur 1s
  //     // delay 1s
  //     gsap.from('.header-right', 1, {
  //       x: 474,
  //       y: "-=100%",
  //       delay: 1.5
  //     });
  //     gsap.from('.header-left', 1, {
  //       x: -474,
  //       y: "+=100%",
  //       delay: 1.5
  //     });
  //     // dur 0.5s
  //     // delay 2s
  //     gsap.to('.header-left__overlay', 0.5, {
  //       // x: 115,
  //       height: '90%',
  //       width: '86%',
  //       delay: 2.5
  //     });
  //     // dur 1.5s
  //     // delay 2.5s
  //     gsap.from('.logo-ducati', 1, {
  //       opacity: 0,
  //       delay: 3
  //     });
  //     gsap.from('.logo-lenovo', 1, {
  //       opacity: 0,
  //       delay: 3
  //     });
  //     // dur 0.5s
  //     // delay 3s
  //     gsap.from('.logo-lenovo__fact', 0.5, {
  //       x: "-=100%",
  //       opacity: 0,
  //       delay: 3
  //     });
  //     gsap.from('.header__blind_left', 0.5, {
  //       x: "-=100%",
  //       opacity: 0,
  //       delay: 3.5
  //     });
  //     gsap.from('.header__blind_right', 0.5, {
  //       x: "+=100%",
  //       opacity: 0,
  //       delay: 3.5
  //     });
  //     // dur 2s
  //     // delay 5s


  //     // gsap.to('.header-right', 1,{
  //     //   x: "+=100%",
  //     //   delay: 6
  //     // });
  //     // gsap.to('.header-left', 1,{
  //     //   x: "-=100%",
  //     //   delay: 6
  //     // });
  //     // gsap.to('.header__blind_left', 0.5, {
  //     //   x: "-=100%",
  //     //   delay: 6
  //     // });
  //     // gsap.to('.header__blind_right', 0.5, {
  //     //   x: "+=100%",
  //     //   delay: 6
  //     // });
  //     setTimeout(() => {
  //       document.querySelector('.header__video').classList.add('hide');
  //       // document.querySelector('.header').classList.remove('active');
  //       document.body.classList.remove('hidden');
  //       gsap.to(window, 0.5, {
  //         scrollTo:{
  //           y: document.querySelector('.main')
  //         }
  //       });
  //       acceleratorAnimate();
  //     }, 6*1000);
  //     // setTimeout(() => {
  //     //   document.querySelector('.header').classList.add('hide');
  //     // }, 7*1000);
  //   }
  //   // else {
  //   //   acceleratorAnimate();
  //   // }
  // }
  // headerAnimate();

  if (window.innerWidth > 768) {
    headerAnimate();
  }

  function headerAnimate() {
    document.body.classList.add('hidden');
    let headerAnimate = gsap.timeline()
      .from('.header__bg_left', 1, {
        x: '-=474px',
        y: "+=100%",
        delay: 1.5
      })
      .from('.header__bg_right', 1, {
        x: 474,
        y: "-=100%",
        delay: 1.5
      }, '-=2.5')
      .from('.header-left__overlay', 0.5, {
        width: '200%',
        height: '200%'
      })
      .from('.logo-ducati', 1, {
        opacity: 0
      })
      .from('.logo-lenovo', 1, {
        opacity: 0
      }, '-=1')
      .from('.logo-lenovo__fact', 0.5, {
        x: '-=100%',
        opacity: 0
      })
      .from('.header__blind_left', 0.5, {
        x: '-=100%',
        opacity: 0
      })
      .from('.header__blind_right', 0.5, {
        x: '+=100%',
        opacity: 0
      }, '-=0.5')
      .to('.header__bg_left', 1, {
        x: '-=100%',
        delay: 2
      })
      .to('.header__bg_right', 1, {
        x: '+=100%',
        delay: 2
      }, '-=3')
      .to('.logo-ducati', 0.5, {
        x: '-=200%',
        opacity: 0
      }, '-=1')
      .to('.logo-lenovo', 0.5, {
        x: '+=200%',
        opacity: 0
      }, '-=1')
      .to('.logo-lenovo__fact', 0.5, {
        x: '+=200%',
        opacity: 0
      }, '-=1')
      .to('.header__blind_left', 0.5, {
        x: '-=100%',
        opacity: 0
      }, '-=1')
      .to('.header__blind_right', 0.5, {
        x: '+=100%',
        opacity: 0
      }, '-=1')

    setTimeout(() => {
      document.querySelector('.header__video').classList.add('hide');
      // document.querySelector('.header').classList.remove('active');
      document.body.classList.remove('hidden');
      gsap.to(window, 0.5, {
        scrollTo:{
          y: document.querySelector('.main')
        }
      });
      acceleratorAnimate();
    }, 7*1000);
    setTimeout(() => {
      document.querySelector('.header').classList.add('hide');
    }, 8*1000);
  } 


// ACCELERATOR
  if (window.innerWidth > 768) {
    // acceleratorAnimate();
    gsap.to('.accelerator-img-1', {
      scrollTrigger: {
        trigger: '.accelerator-img-1',
        start: 'top top',
        end: 'bottom top',
        scrub: 2
      },
      y: '+=35%',
      duration: 2
    });
    gsap.to('.accelerator-img-2', {
      scrollTrigger: {
        trigger: '.accelerator-img-2',
        start: 'top 734px',
        end: 'bottom top',
        scrub: 2
      },
      y: '+=30%',
      duration: 1
    });
    gsap.to('.accelerator-img-3', {
      scrollTrigger: {
        trigger: '.accelerator-img-3',
        start: 'top 790px',
        end: 'bottom top',
        scrub: 2
      },
      y: '+=20%',
      duration: 1.5
    });
    gsap.from('.accelerator-img__text', {
      scrollTrigger: {
        trigger: '.accelerator-img__text',
        start: 'top 70%',
        end: 'top 70%',
        toggleActions: 'play none reverse none',
      },
      y: '+=100%',
      opacity: 0,
      duration: 0.5
    });
  }

  function acceleratorAnimate() {
    gsap.from('.accelerator__title .title__line', {
      y: -25,
      opacity: 0,
      duration: 1,
      stagger: 0.25
    });
    gsap.timeline()
      .from('.accelerator-moto',{
        x: '-=100%',
        duration: 1
      })
      .fromTo('.accelerator-moto',{
        x: 0
      },{
        scrollTrigger: {
          trigger: '.accelerator-moto',
          start: 'bottom center',
          end: 'bottom top',
          scrub: 1,
          // markers: true
        },
        x: '+=100%',
        duration: 1
      });
    gsap.timeline()
      .from('.accelerator__text',{
        scrollTrigger: {
          trigger: '.accelerator__text',
          start: 'top 65%',
          end: 'top 65%',
          toggleActions: 'play none reverse none',
          scrub: 1,
        },
        y: '+=100%',
        opacity: 0,
        // stagger: 0.5,
        duration: 5
      })
      // .to('.accelerator__text',{
      //   scrollTrigger: {
      //       trigger: '.accelerator__text',
      //       start: 'top 65%',
      //       end: 'top top',
      //       scrub: 1
      //   },
      //   y: '+=250%',
      //   duration: 5
      //   });
  }

// TECHNOLOGY
if (window.innerWidth > 768) {
  gsap.from('.technology__title .title__line',{
    scrollTrigger: {
      trigger: '.technology__title .title__line',
      start: 'top 80%',
      end: 'bottom 80%',
      toggleActions: 'play none reverse'
    },
    y: 25,
    opacity: 0,
    stagger: 0.25,
    duration: 1
  });
  gsap.from('.technology-img-1',{
    scrollTrigger: {
      trigger: '.technology',
      start: 'top 30%',
      end: 'top 30%',
      toggleActions: 'play none reverse none',
      // scrub: 2
    },
    y: '+=100%',
    opacity: 0,
    duration: 0.75
  });
  gsap.from('.technology-img-2',{
    scrollTrigger: {
      trigger: '.technology',
      start: 'top 30%',
      end: 'top 30%',
      toggleActions: 'play none reverse none',
      // scrub: 2
    },
    y: '+=100%',
    opacity: 0,
    duration: 0.5
  });
  gsap.from('.technology__content',{
    scrollTrigger: {
      trigger: '.technology',
      start: 'top 30%',
      end: 'top 30%',
      toggleActions: 'play none reverse none',
      // scrub: 2
      // markers: true
    },
    y: '+=100%',
    opacity: 0,
    duration: 1.25
  });
}

// BALANCE
if (window.innerWidth > 1024) {

  gsap.from('.balance__title .title__line',{
    scrollTrigger: {
      trigger: '.balance__title .title__line',
      start: 'top 80%',
      end: 'bottom 80%',
      toggleActions: 'play none reverse none'
    },
    y: 25,
    opacity: 0,
    stagger: 0.25,
    duration: 1
  });

  const balanceItem1_tl = gsap.timeline()
    .from('.balance__moto',{
      y: '+=100%',
      opacity: 0,
      duration: 1
    })
    .from('.balance__item-1 .circ',{
      scale: 0,
      opacity: 0,
      duration: 0.5
    })
    .from('.balance__item-1 .line',{
      width: 0,
      duration: 0.5
    })
    .from('.balance__item-1 .balance__item-text',{
      opacity: 0,
      // stagger: 0.25,
      duration: 0.5
    })

  const balanceItem2_tl = gsap.timeline()
    .from('.balance__item-2 .circ',{
      scale: 0,
      opacity: 0,
      duration: 0.5
    })
    .from('.balance__item-2 .line',{
      width: 0,
      duration: 0.5
    })
    .from('.balance__item-2 .balance__item-text',{
      opacity: 0,
      // stagger: 0.25,
      duration: 0.5
    })

  const balanceItem3_tl = gsap.timeline()
    .from('.balance__item-3 .circ',{
      scale: 0,
      opacity: 0,
      duration: 0.5
    })
    .from('.balance__item-3 .line',{
      width: 0,
      duration: 0.5
    })
    .from('.balance__item-3 .balance__item-text',{
      opacity: 0,
      // stagger: 0.25,
      duration: 0.5
    })

  const balanceItem4_tl = gsap.timeline()
    .from('.balance__item-4 .circ',{
      scale: 0,
      opacity: 0,
      duration: 0.5
    })
    .from('.balance__item-4 .line',{
      width: 0,
      duration: 0.5
    })
    .from('.balance__item-4 .balance__item-text',{
      opacity: 0,
      // stagger: 0.25,
      duration: 0.5
    })

  ScrollTrigger.create({
    animation: balanceItem1_tl,
    trigger: '.balance',
    start: 'top top',
    end: 'top top',
    toggleActions: 'play none reverse none'
  })

  ScrollTrigger.create({
    animation: balanceItem2_tl,
    trigger: '.balance',
    start: '25% top',
    end: 'top top',
    toggleActions: 'play none reverse none'
  })

  ScrollTrigger.create({
    animation: balanceItem3_tl,
    trigger: '.balance',
    start: '50% top',
    end: 'top top',
    toggleActions: 'play none reverse none'
  })

  ScrollTrigger.create({
    animation: balanceItem4_tl,
    trigger: '.balance',
    start: '75% top',
    end: 'top top',
    toggleActions: 'play none reverse none'
  })

  ScrollTrigger.create({
    trigger: '.balance__content',
    start: 'bottom bottom',
    end: '+=300%',
    pin: true
  })

  // gsap.from('.balance__item-1 .circ',{
  //   scrollTrigger: {
  //     trigger: '.balance',
  //     start: 'top bottom',
  //     end: 'bottom bottom',
  //     pin: true
  //   },
  //   scale: 0,
  //   opacity: 0,
  //   duration: 0.5
  // })

  // const balanceItems_tl = gsap.timeline()
  //   .from('.balance__moto',{
  //     y: '+=100%',
  //     duration: 1
  //   })
  //   .from('.balance__item-1 .circ',{
  //     scale: 0,
  //     duration: 0.25
  //   })
  //   .from('.balance__item-1 .line',{
  //     width: 0,
  //     duration: 0.25
  //   })
  //   .from('.balance__item-1 span',{
  //     opacity: 0,
  //     duration: 0.5,
  //     stagger: 0.1
  //   })
  //   .from('.balance__item-2 .circ',{
  //     scale: 0,
  //     duration: 0.25
  //   })
  //   .from('.balance__item-2 .line',{
  //     width: 0,
  //     duration: 0.25
  //   })
  //   .from('.balance__item-2 span',{
  //     opacity: 0,
  //     duration: 0.5,
  //     stagger: 0.1
  //   })
  //   .from('.balance__item-3 .circ',{
  //     scale: 0,
  //     duration: 0.25
  //   })
  //   .from('.balance__item-3 .line',{
  //     width: 0,
  //     duration: 0.25
  //   })
  //   .from('.balance__item-3 span',{
  //     opacity: 0,
  //     duration: 0.5,
  //     stagger: 0.1
  //   })
  //   .from('.balance__item-4 .circ',{
  //     scale: 0,
  //     duration: 0.25
  //   })
  //   .from('.balance__item-4 .line',{
  //     width: 0,
  //     duration: 0.25
  //   })
  //   .from('.balance__item-4 span',{
  //     opacity: 0,
  //     duration: 0.5,
  //     stagger: 0.1
  //   });

  // ScrollTrigger.create({
  //   trigger: '.balance',
  //   animation: balanceItems_tl,
  //   start: '10% center',
  //   end: '10% center',
  //   toggleActions: 'play none reverse none',
  // });
}

// HISTORY
const slidesContainer = document.querySelector('.slides-container');
const slides = gsap.utils.toArray('.slide');
const slidesTimeline = document.querySelector('.slides-container__timeline');

// let slidesContainerWidth = slidesContainer.offsetWidth;
// let timelineLeftWidth = slidesTimeline.offsetLeft;

let slidesCount = slides.length;

// slidesContainer.style.width = slidesCount*100 + '%';

const bgItems = document.querySelectorAll('.slide-bg__inner-bg');
const imageSlides = document.querySelectorAll('.slide-bg__inner');

const easing = BezierEasing(0.770, 0.125, 0.265, 1.040);

const startComplete = () => {
  imageSlides.forEach(el => { el.style.opacity = 1 });
};

const startingTl = gsap.timeline({ defaults: { ease: easing }, onComplete: startComplete });

bgItems.forEach(el => { el.style.backgroundImage = `url('${el.dataset.bg}')` });

let sliderFlag = false;

// Text Slides
const textSlides = (direction) => {
  if (sliderFlag) {

    let currentSlide = document.querySelector('.slides-container__slide--active');
    let nextSlide;
    direction == 'down' ? nextSlide = currentSlide.nextElementSibling : nextSlide = currentSlide.previousElementSibling;

    if (nextSlide) {

      const tl = gsap.timeline({ defaults: { ease: easing } });

      tl.to(currentSlide.querySelector('.slides-container__slide-title'), 0.6, {
        opacity: 0,
        y: 50
      })
        .to(currentSlide.querySelector('.slides-container__text'), 0.6, {
          opacity: 0,
          y: 50
        }, '-=0.6')
        .to(nextSlide.querySelector('.slides-container__slide-title'), 0.6, {
          opacity: 1,
          y: 0
        }, '-=0.1')
        .to(nextSlide.querySelector('.slides-container__text'), 0.6, {
          opacity: 1,
          y: 0
        }, '-=0.5');

      currentSlide.classList.remove('slides-container__slide--active');
      nextSlide.classList.add('slides-container__slide--active');
    }

  }
};

// Images Slides
const imagesSlides = (direction) => {
  if (sliderFlag) {
    let currentSlide = document.querySelector('.slide-bg__inner--current');
    let nextSlide;
    direction == 'down' ? nextSlide = currentSlide.nextElementSibling : nextSlide = currentSlide.previousElementSibling;

    if (nextSlide) {
      imageSlides.forEach(el => { el.classList.remove('index'); });

      currentSlide.classList.add('index');

      const tl = gsap.timeline({
        defaults: { ease: easing },
        onComplete: function () {
          currentSlide.classList.remove('index');
        }
      });

      tl.from(nextSlide, 0.5, {
        xPercent: 100
      })
        .from(nextSlide.querySelector('.slide-bg__inner-bg'), 0.5, {
          xPercent: -100,
          delay: -0.5
        });

      currentSlide.classList.remove('slide-bg__inner--current');
      nextSlide.classList.add('slide-bg__inner--current');
    }
  }
};

if (window.innerWidth > 1024) {
  gsap.from('.history__title',{
    scrollTrigger: {
      trigger: '.history__title',
      start: 'top 80%',
      end: 'bottom 80%',
      toggleActions: 'play none reverse none'
    },
    y: 25,
    opacity: 0,
    stagger: 0.25,
    duration: 1
  });

  gsap.to(slides, {
    xPercent: -100 * ( slidesCount - 1 ),
    ease: 'none',
    scrollTrigger: {
      trigger: '.history',
      pin: '.history__container',
      start: 'top top',
      scrub: true,
      snap: {
        snapTo: 1 / ( slidesCount - 1 ),
        // duration: {min: 0.1, max: 0.1}
      },
      end: () => '+=' + (slidesContainer.offsetWidth - innerWidth)
    }
  });

  // Start Animation
  const slide1_tl = gsap.timeline()
    .from('#slide-1 .slide__content-dot', 0.2, {scale: 0})
    .from('#slide-1 .slides-container__timeline', 1.25, {width: 0})
    .from('#slide-2 .slides-container__timeline', 1.25, {width: 0}, '-=1.25')
    .from('#slide-3 .slides-container__timeline', 1.25, {width: 0}, '-=1.25')
    .from('#slide-4 .slides-container__timeline', 1.25, {width: 0}, '-=1.25')
    .from('#slide-1 .slide__content-line', 0.2, {opacity: 0}, '-=1.25')
    .from('#slide-1 .slide__content-img', 0.2, {y: '+=100%', opacity: 0}, '-=1.05')
    .from('#slide-1 .slide__content-descr', 0.2, {y: '+=100%', opacity: 0}, '-=0.85')

  const slide2_tl = gsap.timeline()
    .from('#slide-2 .slide__content-dot', 0.2, {scale: 0})
    // .from('#slide-2 .slides-container__timeline', 4, {width: 0})
    .from('#slide-2 .slide__content-line', 0.2, {opacity: 0})
    .from('#slide-2 .slide__content-img', 0.2, {y: '+=100%', opacity: 0})
    .from('#slide-2 .slide__content-descr', 0.2, {y: '+=100%', opacity: 0})

  const slide3_tl = gsap.timeline()
    .from('#slide-3 .slide__content-dot', 0.2, {scale: 0})
    // .from('#slide-3 .slides-container__timeline', 4, {width: 0})
    .from('#slide-3 .slide__content-line', 0.2, {opacity: 0})
    .from('#slide-3 .slide__content-img', 0.2, {y: '+=100%', opacity: 0})
    .from('#slide-3 .slide__content-descr', 0.2, {y: '+=100%', opacity: 0})

  const slide4_tl = gsap.timeline()
    .from('#slide-4 .slide__content-dot', 0.25, {scale: 0})
    // .from('#slide-4 .slides-container__timeline', 4, {width: 0})
    .from('#slide-4 .slide__content-line', 0.2, {opacity: 0})
    .from('#slide-4 .slide__content-img', 0.2, {y: '+=100%', opacity: 0})
    .from('#slide-4 .slide__content-descr', 0.2, {y: '+=100%', opacity: 0})

  // ScrollTrigger.create({
  //   trigger: '.history',
  //   start: '95% bottom',
  //   onEnter: () => {
  //     let scrollWidth = window.innerWidth - document.querySelector('.wrapper').offsetWidth;
  //     document.querySelector('body').classList.add('hidden');
  //     document.querySelector('body').style.paddingRight = scrollWidth;
      
  //     setTimeout(() => {
  //       document.querySelector('body').classList.remove('hidden');
  //       document.querySelector('body').style.paddingRight = 0;
  //     }, 1000)
  //   }
  // })

  ScrollTrigger.create({
    trigger: '.history',
    animation: slide1_tl,
    start: '-2.5% top',
    end: '-2.5% top',
    toggleActions: 'play none reverse none'
  })

  ScrollTrigger.create({
    trigger: '.history',
    animation: slide2_tl,
    start: '20% top',
    end: '20% top',
    toggleActions: 'play none reverse none'
  })

  ScrollTrigger.create({
    trigger: '.history',
    animation: slide3_tl,
    start: '40% top',
    end: '40% top',
    toggleActions: 'play none reverse none'
  })

  ScrollTrigger.create({
    trigger: '.history',
    animation: slide4_tl,
    start: '60% top',
    end: '60% top',
    toggleActions: 'play none reverse none'
  })

  gsap.from('.slide-bg__img-1', 1, {
    scrollTrigger: {
      trigger: '.history',
      start: '-5% top',
      end: '20% bottom',
      toggleActions: 'play none none none',
      scrub: 1
    },
    y: '+=100%',
    opacity: 0,
  })
  gsap.from('.slide-bg__img-2', 2, {
    scrollTrigger: {
      trigger: '.history',
      start: '-5% top',
      end: '20% bottom',
      toggleActions: 'play none none none',
      scrub: 1
    },
    y: '+=150%',
    opacity: 0,
  })
  gsap.from('.slide-bg__img-3', 3, {
    scrollTrigger: {
      trigger: '.history',
      start: '25% top',
      end: '50% bottom',
      toggleActions: 'play none none none',
      scrub: 1
    },
    y: '+=100%',
    opacity: 0,
  })
  gsap.from('.slide-bg__img-4', 2, {
    scrollTrigger: {
      trigger: '.history',
      start: '25% top',
      end: '50% bottom',
      toggleActions: 'play none none none',
      scrub: 1
    },
    y: '+=150%',
    opacity: 0,
  })
  gsap.from('.slide-bg__img-5', 3, {
    scrollTrigger: {
      trigger: '.history',
      start: '50% top',
      end: '75% bottom',
      toggleActions: 'play none none none',
      scrub: 1
    },
    y: '+=100%',
    opacity: 0,
  })
  gsap.from('.slide-bg__img-6', 2, {
    scrollTrigger: {
      trigger: '.history',
      start: '50% top',
      end: '75% bottom',
      toggleActions: 'play none none none',
      scrub: 1
    },
    y: '+=150%',
    opacity: 0,
  })
  gsap.from('.slide-bg__img-7', 3, {
    scrollTrigger: {
      trigger: '.history',
      start: '75% top',
      end: '100% bottom',
      toggleActions: 'play none none none',
      scrub: 1
    },
    y: '+=100%',
    opacity: 0,
  })
  gsap.from('.slide-bg__img-8', 2, {
    scrollTrigger: {
      trigger: '.history',
      start: '75% top',
      end: '100% bottom',
      toggleActions: 'play none none none',
      scrub: 1
    },
    y: '+=150%',
    opacity: 0,
  })
} else {
  function initSlider() {

    const showNextSlide = () => {
      // bgSlides('down');
      imagesSlides('down');
      textSlides('down');
    };

    const showPrevSlide = () => {
      // bgSlides('up');
      imagesSlides('up');
      textSlides('up');
    };

    ScrollTrigger.create({
      trigger: '.history__container',
      start: 'top bottom',
      onEnter: () => {sliderFlag = true},
      onLeave: () => {sliderFlag = false},
      onEnterBack: () => {sliderFlag = true},
      onLeaveBack: () => {sliderFlag = false}
    });

    document.querySelector('.slides-control__button-next').addEventListener('click', () => {
      showNextSlide()
    });

    document.querySelector('.slides-control__button-prev').addEventListener('click', () => {
      showPrevSlide()
    });

  };
  initSlider();
}

// VIDEO PARALLAX
if (window.innerWidth > 768) {

  let video1 = document.querySelector(".moment__video");
  const video1_tl = gsap.timeline()
      .from(video1, {
        y: `${-innerHeight/2}px`,
        ease: "none"
      })
      .to(video1, {
        y: `${innerHeight/2}px`,
      });
    ScrollTrigger.create({
      animation: video1_tl,
      trigger: '.moment',
      start: "top bottom", 
      end: "bottom top",
      scrub: true
    })
  gsap.from('.moment__content-title .title__line', {
    scrollTrigger: {
      trigger: '.moment',
      start: "30% center", 
      end: "30% center",
      scrub: 1
    },
    y: 25,
    opacity: 0,
    duration: 1,
    stagger: 0.25
  });
  gsap.from('.moment__content-text', {
    scrollTrigger: {
      trigger: '.moment',
      start: "30% center", 
      end: "30% center",
      scrub: 1
    },
    y: 25,
    opacity: 0,
    duration: 2,
    delay: 1
  });
  gsap.to('.moment__content',{
    scrollTrigger: {
      trigger: '.moment',
      start: "bottom bottom", 
      end: "bottom top",
      scrub: 1
    },
    y: `${innerHeight}px`,
    duration: 1
  });
  

  let video2 = document.querySelector(".connects__video");
  const video2_tl = gsap.timeline()
      .from(video2, {
        y: `${-innerHeight/2}px`,
        ease: "none"
      })
      .to(video2, {
        y: `${innerHeight/2}px`,
      });
    ScrollTrigger.create({
      animation: video2_tl,
      trigger: '.connects',
      start: "top bottom", 
      end: "bottom top",
      scrub: true
    })
  gsap.from('.connects__content-title .title__line', {
    scrollTrigger: {
      trigger: '.connects',
      start: "30% center", 
      end: "30% center",
      scrub: 1
    },
    y: 25,
    opacity: 0,
    duration: 1,
    stagger: 0.25
  });
  gsap.to('.connects__content',{
    scrollTrigger: {
      trigger: '.connects',
      start: "bottom bottom", 
      end: "bottom top",
      scrub: 1
    },
    y: `${innerHeight}px`,
    duration: 1
  });

} else {
  let allVideos = document.querySelectorAll('.video-container');
  allVideos.forEach((el) => {
    let video = el.querySelector('.video');
    video.removeAttribute('autoplay');
    video.removeAttribute('loop');

    const playVideo = () => {
      video.play()
    };

    const stopVideo = () => {
      video.pause()
    };

    el.onclick = () => {
      if (video.classList.contains('active')) {
        stopVideo();
        video.classList.remove('active');
      } else {
        playVideo();
        video.classList.add('active');
      }
    }

    video.ontimeupdate = () => {
      if (video.ended) {
        stopVideo();
        video.currentTime = 0;
        video.classList.remove('active');
      }
    }
  });
}

// QUOTE
if (window.innerWidth > 768) {
  const titleQuote = gsap.utils.toArray('.quote__content-title');
  titleQuote.forEach(el => {
    gsap.from(el,{
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        end: 'top 80%',
        toggleActions: 'play none reverse none'
        // scrub: 2/
      },
      y: 100,
      opacity: 0,
      duration: 1,
    });
  });

  const quoteName = gsap.utils.toArray('.quote__content-name');
  quoteName.forEach(el => {
    gsap.from(el,{
      scrollTrigger: {
        trigger: el,
        start: 'top 95%',
        end: 'top 95%',
        toggleActions: 'play none reverse none'
        // scrub: 2
      },
      y: 100,
      opacity: 0,
      duration: 1,
    });
  });

  // const quoteAvatar = gsap.utils.toArray('.quote__avatar');
  // quoteAvatar.forEach(el => {
  //   gsap.from(el,{
  //     scrollTrigger: {
  //       trigger: el,
  //       start: 'top 80%',
  //       end: 'top 80%',
  //       toggleActions: 'play none reverse none'
  //     },
  //     opacity: 0,
  //     scale: 0,
  //     duration: 0.5
  //   });
  // });
}

// INFO
if (window.innerWidth > 768) {

  const info_tl = gsap.timeline()
    .fromTo('.info__img-1', 0.5, {
      y: '+=100%',
      opacity: 0,
    },{
      y: '+50%',
      opacity: 0.5
    })
    .from('.info__title .title__line',{
      y: 25,
      opacity: 0,
      stagger: 0.25,
      duration: 0.5
    })
    
    .from('.info__text',{
      y: '+=100%',
      opacity: 0,
      duration: 0.5
    })

  ScrollTrigger.create({
    animation: info_tl,
    trigger: '.info',
    start: 'center bottom',
    end: 'center bottom',
    toggleActions: 'play none reverse none',
    // markers: true
  });
}

// ACCESSEBILE
if (window.innerWidth > 768) {

  const accessible_tl = gsap.timeline()
    .from('.accessible__title .title__line',{
      y: 50,
      opacity: 0,
      stagger: 0.25,
      duration: 0.5
    })
    .from('.accessible__text',{
      y: 50,
      opacity: 0,
      duration: 0.25
    })
    .from('.accessible .btn',{
      y: 50,
      opacity: 0,
      duration: 0.25
    })
  

  ScrollTrigger.create({
    animation: accessible_tl,
    trigger: '.accessible',
    start: 'top 66%',
    end: 'top 66%',
    toggleActions: 'play none reverse none',
  });

  gsap.from('.accessible__moto', {
    scrollTrigger: {
      trigger: '.accessible',
      start: 'top 66%',
      end: 'top 66%',
      toggleActions: 'play none reverse none'
    },
    x: '+=50%',
    scale: 0.2,
    opacity: 0,
    duration: 2
  });
}
















  // gsap.from('.history__title .title__line',{
  //   scrollTrigger: {
  //     trigger: '.history__title .title__line',
  //     start: 'top 80%',
  //     end: 'bottom 80%',
  //     toggleActions: 'play none reverse'
  //   },
  //   y: 25,
  //   opacity: 0,
  //   stagger: 0.25,
  //   duration: 1
  // });


  // const helperInput = document.querySelector('#helper-input');
  // const bgItems = document.querySelectorAll('.slide-bg__inner-bg');
  // const imageSlides = document.querySelectorAll('.slide-bg__inner');
  // const slideBg = document.querySelector('.slide-bg');
  // // const historySection = document.querySelector('.history');

  // // const slideBgImages = document.querySelectorAll('.slidesbg-container__slide');

  // // const slidesCount = 4;
  // // let slideCounter = 1;
  // const easing = BezierEasing(0.770, 0.125, 0.265, 1.040);

  // const startComplete = () => {
  //   imageSlides.forEach(el => { el.style.opacity = 1 });
  // };
  
  // const startingTl = gsap.timeline({ defaults: { ease: easing }, onComplete: startComplete });

  
  // bgItems.forEach(el => { el.style.backgroundImage = `url('${el.dataset.bg}')` });

  // let sliderFlag = false;

  // // Images Slides
  // const imagesSlides = (direction) => {
  //   if (sliderFlag) {
  //     let currentSlide = document.querySelector('.slide-bg__inner--current');
  //     let nextSlide;
  //     direction == 'down' ? nextSlide = currentSlide.nextElementSibling : nextSlide = currentSlide.previousElementSibling;
  
  //     if (nextSlide) {
  //       imageSlides.forEach(el => { el.classList.remove('index'); });
  
  //       currentSlide.classList.add('index');
  
  //       const tl = gsap.timeline({
  //         defaults: { ease: easing },
  //         onComplete: function () {
  //           currentSlide.classList.remove('index');
  //         }
  //       });
  
  //       tl.from(nextSlide, 0.5, {
  //         xPercent: 100
  //       })
  //         .from(nextSlide.querySelector('.slide-bg__inner-bg'), 0.5, {
  //           xPercent: -100,
  //           delay: -0.5
  //         });
  
  //       currentSlide.classList.remove('slide-bg__inner--current');
  //       nextSlide.classList.add('slide-bg__inner--current');
  //     }
  //   }
  // };

  // // Text Slides
  // const textSlides = (direction) => {
  //   if (sliderFlag) {

  //     let currentSlide = document.querySelector('.slides-container__slide--active');
  //     let nextSlide;
  //     direction == 'down' ? nextSlide = currentSlide.nextElementSibling : nextSlide = currentSlide.previousElementSibling;

  //     if (nextSlide) {

  //       const tl = gsap.timeline({ defaults: { ease: easing } });

  //       tl.to(currentSlide.querySelector('.slides-container__slide-title'), 0.6, {
  //         opacity: 0,
  //         y: 50
  //       })
  //         .to(currentSlide.querySelector('.slides-container__text'), 0.6, {
  //           opacity: 0,
  //           y: 50
  //         }, '-=0.6')
  //         .to(nextSlide.querySelector('.slides-container__slide-title'), 0.6, {
  //           opacity: 1,
  //           y: 0
  //         }, '-=0.1')
  //         .to(nextSlide.querySelector('.slides-container__text'), 0.6, {
  //           opacity: 1,
  //           y: 0
  //         }, '-=0.5');

  //       currentSlide.classList.remove('slides-container__slide--active');
  //       nextSlide.classList.add('slides-container__slide--active');
  //     }

  //   }
  // };

  // // Init
  // function initSlider() {

  //   const showNextSlide = () => {
  //     // bgSlides('down');
  //     imagesSlides('down');
  //     textSlides('down');
  //   };

  //   const showPrevSlide = () => {
  //     // bgSlides('up');
  //     imagesSlides('up');
  //     textSlides('up');
  //   };

  //   if (window.innerWidth > 1024) {
  //     ScrollTrigger.create({
  //       trigger: '.history__container',
  //       start: 'top top',
  //       end: '+=300%',
  //       pin: true,
  //       onEnter: () => {sliderFlag = true},
  //       onLeave: () => {sliderFlag = false},
  //       onEnterBack: () => {sliderFlag = true},
  //       onLeaveBack: () => {sliderFlag = false}
  //     });


  //     const slidesBg = gsap.utils.toArray('.slidesbg-container__slide');
  //     slidesBg.forEach(el => {
  //       ScrollTrigger.create({
  //         trigger: el,
  //         start: 'center bottom',
  //         end: 'center top',
  //         onEnter: () => showNextSlide(),
  //         onEnterBack: () => showPrevSlide(),
  //       })
  //     });

  //     const history_tl = gsap.timeline()
  //       .from('.slides-container__wrapper .circ',0.5,{
  //         scale: 0,
  //         opacity: 0
  //       })
  //       .from('.slides-container__wrapper .circ-line-right',0.5,{
  //         width: 0,
  //         opacity: 0
  //       })
  //       .from('.slides-container__wrapper .circ-line-left',0.5,{
  //         width: 0,
  //         opacity: 0
  //       }, '-=0.5')
  //       .from('.slides-container__wrapper-svg',0.5,{
  //         opacity: 0
  //       })

  //     ScrollTrigger.create({
  //       animation: history_tl,
  //       trigger: '.slidesbg-container__slide-1',
  //       start: 'center center',
  //       end: 'center center',
  //       toggleActions: 'play none reverse none'
  //     });

  //     gsap.from('.slidebg-container__slide-img-1',1.5,{
  //       scrollTrigger: {
  //         trigger: '.slidesbg-container__slide-1',
  //         start: 'top top',
  //         end: 'bottom bottom',
  //         toggleActions: 'play none reverse none'
  //       },
  //       opacity: 0,
  //       y: '+=100%'
  //     });
  //     gsap.from('.slidebg-container__slide-img-2',1,{
  //       scrollTrigger: {
  //         trigger: '.slidesbg-container__slide-1',
  //         start: 'top top',
  //         end: 'bottom bottom',
  //         toggleActions: 'play none reverse none'
  //       },
  //       opacity: 0,
  //       y: '+=100%'
  //     });
  //     gsap.from('.slidebg-container__slide-img-3',2,{
  //       scrollTrigger: {
  //         trigger: '.slidesbg-container__slide-2',
  //         start: 'top top',
  //         end: 'bottom bottom',
  //         toggleActions: 'play none reverse none'
  //       },
  //       opacity: 0,
  //       y: '+=100%'
  //     });
  //     gsap.from('.slidebg-container__slide-img-4',1.5,{
  //       scrollTrigger: {
  //         trigger: '.slidesbg-container__slide-2',
  //         start: 'top top',
  //         end: 'bottom bottom',
  //         toggleActions: 'play none reverse none'
  //       },
  //       opacity: 0,
  //       y: '+=100%'
  //     });
  //     gsap.from('.slidebg-container__slide-img-5',1,{
  //       scrollTrigger: {
  //         trigger: '.slidesbg-container__slide-3',
  //         start: 'top top',
  //         end: 'bottom bottom',
  //         toggleActions: 'play none reverse none'
  //       },
  //       opacity: 0,
  //       y: '+=100%'
  //     });
  //     gsap.from('.slidebg-container__slide-img-6',2,{
  //       scrollTrigger: {
  //         trigger: '.slidesbg-container__slide-3',
  //         start: 'top top',
  //         end: 'bottom bottom',
  //         toggleActions: 'play none reverse none'
  //       },
  //       opacity: 0,
  //       y: '+=100%'
  //     });
  //     gsap.from('.slidebg-container__slide-img-7',2,{
  //       scrollTrigger: {
  //         trigger: '.slidesbg-container__slide-4',
  //         start: 'top top',
  //         end: 'bottom bottom',
  //         toggleActions: 'play none reverse none'
  //       },
  //       opacity: 0,
  //       y: '+=100%'
  //     });
  //     gsap.from('.slidebg-container__slide-img-8',1,{
  //       scrollTrigger: {
  //         trigger: '.slidesbg-container__slide-4',
  //         start: 'top top',
  //         end: 'bottom bottom',
  //         toggleActions: 'play none reverse none'
  //       },
  //       opacity: 0,
  //       y: '+=100%'
  //     });
  //   } else {
  //     ScrollTrigger.create({
  //       trigger: '.history__container',
  //       start: 'top bottom',
  //       onEnter: () => {sliderFlag = true},
  //       onLeave: () => {sliderFlag = false},
  //       onEnterBack: () => {sliderFlag = true},
  //       onLeaveBack: () => {sliderFlag = false}
  //     });

  //     document.querySelector('.slides-control__button-next').addEventListener('click', () => {
  //       showNextSlide()
  //     });

  //     document.querySelector('.slides-control__button-prev').addEventListener('click', () => {
  //       showPrevSlide()
  //     });
  //   }

  // };
  // initSlider();
})