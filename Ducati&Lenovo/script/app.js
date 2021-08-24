document.addEventListener('DOMContentLoaded', function(){

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

  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(ScrollToPlugin);

  function headerAnimate() {
    if (window.innerWidth > 768) {
      
      document.body.classList.add('hidden');
      // dur 1s
      // delay 1s
      gsap.from('.header-right', 1, {
        x: 474,
        y: "-=100%",
        delay: 1.5
      });
      gsap.from('.header-left', 1, {
        x: -474,
        y: "+=100%",
        delay: 1.5
      });
      // dur 0.5s
      // delay 2s
      gsap.to('.header-left__overlay', 0.5, {
        // x: 115,
        height: '90%',
        width: '80%',
        delay: 2.5
      });
      // dur 1.5s
      // delay 2.5s
      gsap.from('.logo-ducati', 1, {
        opacity: 0,
        delay: 3
      });
      gsap.from('.logo-lenovo', 1, {
        opacity: 0,
        delay: 3
      });
      // dur 0.5s
      // delay 3s
      gsap.from('.logo-lenovo__fact', 0.5, {
        x: "-=100%",
        opacity: 0,
        delay: 3
      });
      // dur 2s
      // delay 5s
      gsap.to('.header-right', 1,{
        x: "+=100%",
        delay: 5.5
      });
      gsap.to('.header-left', 1,{
        x: "-=100%",
        delay: 5.5
      });
      setTimeout(() => {
        document.querySelector('.header__video').classList.add('hide');
        document.body.classList.remove('hidden');
        gsap.to(window, 0.5, {
          scrollTo:{
            y: document.querySelector('.main')
          }
        });
        acceleratorAnimate();
      }, 5.5*1000);
      setTimeout(() => {
        document.querySelector('.header').classList.add('hide');
      }, 6.5*1000);
    } else {
      // acceleratorAnimate();
    }
  }
  headerAnimate();



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
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
          // markers: true
        },
        x: '+=100%',
        duration: 1
      });
    gsap.timeline()
      .from('.accelerator__text span',{
        scrollTrigger: {
          trigger: '.accelerator__text span',
          start: 'top 65%',
          end: 'top 65%',
          toggleActions: 'play none reverse none',
          scrub: 1,
        },
        y: '+=100%',
        opacity: 0,
        stagger: 0.5,
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
  

// MOMENT








// VIDEO PARALLAX
if (window.innerWidth > 768) {
  gsap.utils.toArray('.section__video').forEach((section, i) => {
    section.bg = section.querySelector(".video");
    // Do the parallax effect on each section
    const video_tl = gsap.timeline()
      .from(section.bg, {
        y: `${-innerHeight/2}px`,
        ease: "none"
      })
      .to(section.bg, {
        y: `${innerHeight/2}px`,
      });
    ScrollTrigger.create({
      animation: video_tl,
      trigger: section,
      start: "top bottom", 
      end: "bottom top",
      scrub: true
    })

    section.content = section.querySelector(".section__video-content");
    const videoContent_tl = gsap.timeline()
      .from(section.content, {
        y: `${-innerHeight}px`,
        ease: "none"
      })
      .to(section.content, {
        y: `${innerHeight}px`,
      });
    ScrollTrigger.create({
      animation: videoContent_tl,
      trigger: section,
      start: "top bottom", 
      end: "bottom top",
      scrub: true
    })
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

// TECHNOLOGY
if (window.innerWidth > 768) {
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

  gsap.from('.balance__moto',{
    scrollTrigger: {
      trigger: '.balance',
      start: '10% center',
      end: '10% center',
      toggleActions: 'play none reverse none'
    },
    y: '+=100%',
    duration: 1
  })

  const balanceItems_tl = gsap.timeline()
    .from('.balance__item-1 .circ',{
      scale: 0,
      duration: 0.25
    })
    .from('.balance__item-1 .line',{
      width: 0,
      duration: 0.25
    })
    .from('.balance__item-1 span',{
      opacity: 0,
      duration: 0.5,
      stagger: 0.1
    })
    .from('.balance__item-2 .circ',{
      scale: 0,
      duration: 0.25
    })
    .from('.balance__item-2 .line',{
      width: 0,
      duration: 0.25
    })
    .from('.balance__item-2 span',{
      opacity: 0,
      duration: 0.5,
      stagger: 0.1
    })
    .from('.balance__item-3 .circ',{
      scale: 0,
      duration: 0.25
    })
    .from('.balance__item-3 .line',{
      width: 0,
      duration: 0.25
    })
    .from('.balance__item-3 span',{
      opacity: 0,
      duration: 0.5,
      stagger: 0.1
    })
    .from('.balance__item-4 .circ',{
      scale: 0,
      duration: 0.25
    })
    .from('.balance__item-4 .line',{
      width: 0,
      duration: 0.25
    })
    .from('.balance__item-4 span',{
      opacity: 0,
      duration: 0.5,
      stagger: 0.1
    });

  ScrollTrigger.create({
    trigger: '.balance',
    animation: balanceItems_tl,
    start: '10% center',
    end: '10% center',
    toggleActions: 'play none reverse none',
  });
} else if (window.innerWidth > 768 && window.innerWidth <= 1024) {
  gsap.from('.balance__moto',{
    scrollTrigger: {
      trigger: '.balance',
      start: '10% center',
      end: '10% center',
      toggleActions: 'play none reverse none'
    },
    y: '+=100%',
    duration: 1
  })

  const balanceItems_tl = gsap.timeline()
    .from('.balance__item-1 .circ',{
      scale: 0,
      duration: 0.25
    })
    .from('.balance__item-1 .line',{
      height: 0,
      duration: 0.25
    })
    .from('.balance__item-1 span',{
      opacity: 0,
      duration: 0.5,
      stagger: 0.1
    })
    .from('.balance__item-2 .circ',{
      scale: 0,
      duration: 0.25
    })
    .from('.balance__item-2 .line',{
      height: 0,
      duration: 0.25
    })
    .from('.balance__item-2 span',{
      opacity: 0,
      duration: 0.5,
      stagger: 0.1
    })
    .from('.balance__item-3 .circ',{
      scale: 0,
      duration: 0.25
    })
    .from('.balance__item-3 .line',{
      height: 0,
      duration: 0.25
    })
    .from('.balance__item-3 span',{
      opacity: 0,
      duration: 0.5,
      stagger: 0.1
    })
    .from('.balance__item-4 .circ',{
      scale: 0,
      duration: 0.25
    })
    .from('.balance__item-4 .line',{
      height: 0,
      duration: 0.25
    })
    .from('.balance__item-4 span',{
      opacity: 0,
      duration: 0.5,
      stagger: 0.1
    });

  ScrollTrigger.create({
    trigger: '.balance',
    animation: balanceItems_tl,
    start: '10% center',
    end: '10% center',
    toggleActions: 'play none reverse none',
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

  const quoteAvatar = gsap.utils.toArray('.quote__avatar');
  quoteAvatar.forEach(el => {
    gsap.from(el,{
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        end: 'top 80%',
        toggleActions: 'play none reverse none'
      },
      opacity: 0,
      scale: 0,
      duration: 0.5
    });
  });
}

// INFO
if (window.innerWidth > 768) {

  const info_tl = gsap.timeline()
    .fromTo('.info__img-1', 1, {
      y: '+=100%',
      opacity: 0,
    },{
      y: '+50%',
      opacity: 0.5
    })
    .from('.info__title',{
      y: '+=100%',
      opacity: 0,
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
    .from('.accessible__title',{
      y: 50,
      opacity: 0,
      duration: 0.5
    })
    .from('.accessible__text',{
      y: 50,
      opacity: 0,
      duration: 0.5
    })
    .from('.accessible .btn',{
      y: 50,
      opacity: 0,
      duration: 0.5
    })
  

  ScrollTrigger.create({
    animation: accessible_tl,
    trigger: '.accessible',
    start: 'center bottom',
    end: 'center bottom',
    toggleActions: 'play none reverse none',
  });

  gsap.from('.accessible__moto', {
    scrollTrigger: {
      trigger: '.accessible',
      start: 'center bottom',
      end: 'center bottom',
      toggleActions: 'play none reverse none'
    },
    x: '+=50%',
    scale: 0.2,
    opacity: 0,
    duration: 2
  });
}
  

// // GENERAL
// if (window.innerWidth > 768) {
//   const titleLine = gsap.utils.toArray('.title .title__line');
//   titleLine.forEach(element => {
//     gsap.from(element,{
//       scrollTrigger: {
//         trigger: element,
//         start: 'top 80%',
//         end: 'bottom 80%',
//         scrub: 2,
//       },
//       y: -25,
//       opacity: 0,
//       duration: 1,
//       stagger: 0.25
//     });
//   });
//   const text = gsap.utils.toArray('.text span');
//   text.forEach(element => {
//     gsap.from(element,{
//       scrollTrigger: {
//         trigger: element,
//         start: 'top 90%',
//         end: 'top 90%',
//         scrub: 1
//       },
//       x: '-=100%',
//       opacity: 0,
//       duration: 1,
//       stagger: 1
//     });
//   });
// }
  

// HISTORY
  // const helperInput = document.querySelector('#helper-input');
  // const bgItems = document.querySelectorAll('.slide-bg__inner-bg');
  // const imageSlides = document.querySelectorAll('.slide-bg__inner');
  // const slideBg = document.querySelector('.slide-bg');
  // const historySection = document.querySelector('.history');

  // const slideBgImages = document.querySelectorAll('.slidesbg-container__slide');

  // const slidesCount = 4;
  // let slideCounter = 1;
  // const easing = BezierEasing(0.770, 0.125, 0.265, 1.040);

  // const startComplete = () => {
  //   imageSlides.forEach(el => { el.style.opacity = 1 });
  // };
  
  // const startingTl = gsap.timeline({ defaults: { ease: easing }, onComplete: startComplete });

  
  // bgItems.forEach(el => { el.style.backgroundImage = `url('${el.dataset.bg}')` });

  // let sliderFlag = false;

  // ScrollTrigger.create({
  //   trigger: '.history__container',
  //   start: '95% 95%',
  //   end: '+=300%',
  //   pin: true,
  //   markers: true,
  //   onEnter: () => {sliderFlag = true},
  //   onLeave: () => {sliderFlag = false},
  //   onEnterBack: () => {sliderFlag = true},
  //   onLeaveBack: () => {sliderFlag = false}
  // });

  // Bg Slides
  // const bgSlides = (direction) => {
  //   let itemClass = `slide-${slideCounter}`;
  //   if (direction == 'down') {
  //     if (slideCounter < slidesCount) {
  //       mainSection.classList.remove(itemClass);
  //       slideCounter++;

  //       itemClass = `slide-${slideCounter}`;
  //       mainSection.classList.add(itemClass);
  //     }
  //   } else if (direction == 'up') {
  //     if (slideCounter > 1) {
  //       mainSection.classList.remove(itemClass);
  //       slideCounter--;

  //       itemClass = `slide-${slideCounter}`;
  //       mainSection.classList.add(itemClass);
  //     }
  //   }
  // };



  // Bg Slides
  // const bgSlides = (direction) => {
  //   if (sliderFlag) {
  //     let currentSlide = document.querySelector('.slidesbg-container__slide--current');
  //     let nextSlide;
  //     direction == 'down' ? nextSlide = currentSlide.nextElementSibling : nextSlide = currentSlide.previousElementSibling;
      
  //     if (nextSlide) {

  //       currentSlide.classList.remove('slidesbg-container__slide--current');
  //       nextSlide.classList.add('slidesbg-container__slide--current');
        
  //       gsap.to(window, 2, {
  //         scrollTo:{
  //           y: nextSlide
  //         }
  //       });
  //     }
  //   }
  // };

  // Images Slides
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

  // Text Slides
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

  
  // let history = document.querySelector('.history');
  // let historyTop = history.getBoundingClientRect().top;
  // let historyBottom = history.getBoundingClientRect().bottom;

  // let historyHeight = history.offsetHeight;
  // let historyContainerHeight = document.querySelector('.history__container').offsetHeight;


  // let historyTop = history.offsetTop;
  // let historyStartHeight = historyHeight/(slidesCount*2);
  // let historyStartPoint = historyTop+historyStartHeight;
  // let historyEndPoint = (historyTop+historyHeight)-historyStartHeight;

  // let historyStartPoint = historyTop + historyContainerHeight/2;
  


  // window.addEventListener('scroll', function() {
  // console.log(historyStartPoint);
    

    // console.log(window.innerHeight);
    // let history = document.querySelector('.history__container');



    
    // console.log(historyBottom);
    // let wrapper = document.querySelector('.wrapper');
    // let slides = document.querySelectorAll('.slide-bg__inner');

    // if (sliderOffset < 0) {
    //   wrapper.style.paddingRight = window.innerWidth - wrapper.offsetWidth + 'px';
    //   document.body.classList.add('hidden');
    // } 

  // });

  



  // Init
  // function initSlider() {

  //   // window.onload = function() {
  //   //   headerAnimate();
  //   // };

  //   const showNextSlide = () => {
  //     bgSlides('down');
  //     imagesSlides('down');
  //     textSlides('down');
  //   };

  //   const showPrevSlide = () => {
  //     bgSlides('up');
  //     imagesSlides('up');
  //     textSlides('up');
  //   };

    


  //   if (window.innerWidth >= 768) {
  //     window.addEventListener('wheel', (e) => {

  //       let delta = -e.deltaY;

  //       if (delta > 0) {
  //         if (helperInput.value == '1') {
  //           helperInput.value = 0;
  //           showPrevSlide();
  //           setTimeout(() => {
  //             helperInput.value = 1;
  //           }, 1500);
  //         }
  //       } else {
  //         if (helperInput.value == '1') {
  //           helperInput.value = 0;
  //           showNextSlide();
  //           setTimeout(() => {
  //             helperInput.value = 1;
  //           }, 1500);
  //         }
  //       }
  //     });
  //   }
  //   // else {
  //   //   document.addEventListener('swiped-down', () => {
  //   //     showNextSlide();
  //   //   });

  //   //   document.addEventListener('swiped-up', () => {
  //   //     showPrevSlide();
  //   //   });
  //   // }
  // };
  // initSlider();

})