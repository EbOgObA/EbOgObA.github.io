document.addEventListener('DOMContentLoaded', function() {

  gsap.registerPlugin(ScrollTrigger);

  // let report = document.querySelector('.report'),
  //     reportContainer = document.querySelector('.report__container'),
  //     reportWrapper = document.querySelector('.report__wrapper'),
  //     reportContent = document.querySelector('.content-report'),
  //     reportMedia = document.querySelector('.media-report'),
  //     reportMediaWrapper = document.querySelector('.media-report__wrapper'),
  //     reportMediaItems = gsap.utils.toArray('.item-media'),
  //     reportMediaItemsCount = 6,
  //     maxReportMediaWidth = 0;

  // let header = document.querySelector('.b-header'),
  //     headerHeight = header.offsetHeight;

  // const getMaxWidth = () => {
  //   maxReportMediaWidth = 0;
  //   reportMediaItems.forEach((item) => {
  //     maxReportMediaWidth += item.offsetWidth;
  //   });
  // };
  // getMaxWidth();

  // function blurReportContent() {
  //   let reportContent_tl = gsap.timeline();
  //   reportContent_tl
  //     .to('.content-report', 1, {x: 85, filter: 'blur(5px)', opacity: 0});
  //   return reportContent_tl;
  // }

  // function scaleReportMediaItem() {
  //   // let heroMediaItem = gsap.utils.toArray('.hero-scroll__item');
  //   let scalReportMediaItem_tl = gsap.timeline();
  //   reportMediaItems.forEach((sct, i) => {
  //     scalReportMediaItem_tl.from(sct,{
  //       scale: 0.85,
  //       ease: 'none',
  //       scrollTrigger: {
  //         trigger: sct,
  //         start: () => 'top top-=' + (sct.offsetLeft - window.innerWidth/3) * (maxReportMediaWidth / (maxReportMediaWidth - window.innerWidth)),
  //         end: () => '+=' + sct.offsetWidth * (maxReportMediaWidth / (maxReportMediaWidth - window.innerWidth)),
  //         // addClass: {targets: sct, className: "active"},
  //         scrub: true,
  //         // markers: true
  //       }
  //     })
  //   });
  //   return scalReportMediaItem_tl;
  // }

  // function reportMediaScroll() {
  //   let reportMediaScroll_tl = gsap.timeline()
  //     .to(reportMediaWrapper, {
  //       x: () => `-${maxReportMediaWidth - maxReportMediaWidth/reportMediaItemsCount}`,
  //       ease: "none",
  //       scrollTrigger: {
  //         trigger: reportMedia,
  //         start: 'top top',
  //         // end: () => `+=${maxReportMediaWidth + window.innerWidth/6}`,
  //         // pin: reportContainer,
  //         // start: () => `+=${startScrollHero} center`,
  //         scrub: true,
  //         markers: true,
  //         // invalidateOnRefresh: true
  //       }
  //     });
  //   return reportMediaScroll_tl;
  // }

  // // reportMediaScroll();
  
  // // Весь таймлайн секции hero
  // let reportMedia_tl = gsap.timeline({
  //   scrollTrigger: {
  //     trigger: reportContainer,
  //     pin: report,
  //     start: `${header}px top`,
  //     // end: () => `+=${maxReportMediaWidth - maxReportMediaWidth/reportMediaItemsCount}`,
  //     scrub: true,
  //   }
  // })
  //   // .add(reportMediaScroll())
  //   // .add(blurHeroContent())
  //   // .add(scaleMediaItem());
  //   // .add(blurMedia())















  ScrollTrigger.matchMedia({
    "(min-width: 767px)": function() {
      let hero = document.querySelector(".b-main");
      let heroWrapper = document.querySelector(".b-main .hero-scroll__wrapper");
      // let heroWrapper = document.querySelector(".hero-scroll__media");
      let heroContainer = document.querySelector(".hero-scroll__container");
      let heroContainerHeight = heroContainer.offsetHeight;
      let heroPaddingTop = window.getComputedStyle(hero).getPropertyValue('padding-top');


      let heroContent = document.querySelector(".hero-scroll__content");
      let heroContentWidth = heroContent.offsetWidth;
      let heroMedia = document.querySelector(".hero-scroll__media");

      let maxWidthHero = 0;

      const getMaxWidthHero = () => {
        maxWidthHero = 0;
        // mainItems.forEach((item) => {
        //   maxWidth += item.offsetWidth;
        // });
        maxWidthHero = heroMedia.offsetWidth;
        // heroContent.offsetWidth + .\
      };
      getMaxWidthHero();

      function blurHeroContent() {
        let heroContent_tl = gsap.timeline();
        heroContent_tl
          .to('.hero-scroll__content', 1, {x: 85, filter: 'blur(5px)', opacity: 0});
        return heroContent_tl;
      }
      
      // function scaleMediaItem() {
      //   let mediaItemScale_tl = gsap.timeline();
      //   mediaItemScale_tl
      //     .from('.hero-scroll__item', {scale: 0.85,stagger: 50,ease: 'none'});
      //   return mediaItemScale_tl;
      // }

      function scaleMediaItem() {
        let heroMediaItem = gsap.utils.toArray('.hero-scroll__item');
        let scaleMediaItem_tl = gsap.timeline();
        heroMediaItem.forEach((sct, i) => {
          scaleMediaItem_tl.from(sct,{
            scale: 0.85,
            // stagger: true,
            ease: 'none',
            scrollTrigger: {
              trigger: sct,
              start: () => 'top top-=' + (sct.offsetLeft - window.innerWidth/2 - 205) * (maxWidthHero / (maxWidthHero - window.innerWidth/2)),
              end: () => '+=' + sct.offsetWidth * (maxWidthHero / (maxWidthHero - window.innerWidth/2)),
              addClass: {targets: sct, className: "active"},
              scrub: true,
              // markers: true
            }
          })
          // ScrollTrigger.create({
          //   trigger: sct,
          //   start: () => 'top top-=' + (sct.offsetLeft - window.innerWidth/2) * (maxWidthHero / (maxWidthHero - window.innerWidth)),
          //   end: () => '+=' + sct.offsetWidth * (maxWidthHero / (maxWidthHero - window.innerWidth)),
          //   toggleClass: {targets: sct, className: "active"},
          //   scrub: true
          //   markers: true,
      
          // });
        });
        return scaleMediaItem_tl;
      }

      let headerPaddingRight = Number(window.getComputedStyle(document.querySelector('.b-header > .container > .row > div')).getPropertyValue('padding-right').replace('px', ''));

      function heroScroll() {
        let heroScroll_tl = gsap.timeline()
          .to(heroMedia, {
            x: () => `-${maxWidthHero - window.innerWidth/2 + headerPaddingRight + 10}`,
            ease: "none",
            scrollTrigger: {
              trigger: hero,
              pin: heroContainer,
              start: '50px top',
              // start: () => `+=${startScrollHero} center`,
              scrub: true,
              // markers: true,
              end: () => `+=${maxWidthHero}`,
              // invalidateOnRefresh: true
            }
          })
          .to(heroMedia, {
            startAt: {x: () => `-${maxWidthHero - window.innerWidth/2 + headerPaddingRight + 10}`},
            x: () => `-=${heroWrapper.offsetWidth*2/3}`,
            // ease: "none",
            // immediateRender: true,
            scrollTrigger: {
              trigger: hero,
              start: () => `+=${maxWidthHero + 55}`,
              // start: () => `+=${startScrollHero} center`,
              scrub: true,
              // markers: true,
              // end: 'bottom top',
              // invalidateOnRefresh: true
            }
          })
          .to(heroMedia, {
            startAt: {x: () => `-${maxWidthHero - window.innerWidth/2 + headerPaddingRight + 10}`},
            // x: () => `-=${heroWrapper.offsetWidth}`,
            filter: 'blur(5px)',
            opacity: 0,
            // ease: "none",
            // immediateRender: true,
            scrollTrigger: {
              trigger: hero,
              start: () => `+=${maxWidthHero + 100}`,
              // start: () => `+=${startScrollHero} center`,
              scrub: true,
              // markers: true,
              // end: 'bottom top',
              // invalidateOnRefresh: true
            }
          });
        return heroScroll_tl;
      }
      
      // Весь таймлайн секции hero
      let hero_tl = gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: '50px top',
          end: 'bottom top',
          scrub: true,
        }
      }).add(heroScroll())
        .add(blurHeroContent())
        .add(scaleMediaItem());
    },

    "(max-width: 767px)": function() {

      let mediaItemCount = 6;

      // let heroWrapper = document.querySelector(".hero-scroll__media");
      let heroContainer = document.querySelector(".hero-scroll__grid");
      // let heroContainerHeight = heroContainer.offsetHeight;
      // let heroPaddingTop = window.getComputedStyle(hero).getPropertyValue('padding-top');

      let heroItems = gsap.utils.toArray(".b-main .hero-scroll__item");
      let heroContent = document.querySelector(".hero-scroll__content");
      let heroContentWidth = heroContent.offsetWidth;
      let heroMedia = document.querySelector(".hero-scroll__media");

      let maxWidthHero = 0;

      const getMaxWidthHero = () => {
        maxWidthHero = 0;
        heroItems.forEach((item) => {
          // let heroItemMarginRight = +window.getComputedStyle(item).getPropertyValue('margin-right'); 
          maxWidthHero += item.offsetWidth;
        });
        // maxWidthHero = heroMedia.offsetWidth;
        // heroContent.offsetWidth + .\
      };
      getMaxWidthHero();
      console.log(maxWidthHero);

      function scaleMediaItem() {
        let heroMediaItem = gsap.utils.toArray('.hero-scroll__item');
        let scaleMediaItem_tl = gsap.timeline();
        heroMediaItem.forEach((sct, i) => {
          scaleMediaItem_tl.from(sct,{
            scale: 0.85,
            // stagger: true,
            ease: 'none',
            scrollTrigger: {
              trigger: sct,
              start: () => 'top top-=' + (sct.offsetLeft - window.innerWidth) * (maxWidthHero / (maxWidthHero - window.innerWidth/2)),
              end: () => '+=' + sct.offsetWidth * (maxWidthHero / (maxWidthHero - window.innerWidth)),
              // addClass: {targets: sct, className: "active"},
              scrub: true,
              // markers: true
            }
          })
          // ScrollTrigger.create({
          //   trigger: sct,
          //   start: () => 'top top-=' + (sct.offsetLeft - window.innerWidth/2) * (maxWidthHero / (maxWidthHero - window.innerWidth)),
          //   end: () => '+=' + sct.offsetWidth * (maxWidthHero / (maxWidthHero - window.innerWidth)),
          //   toggleClass: {targets: sct, className: "active"},
          //   scrub: true
          //   markers: true,
      
          // });
        });
        return scaleMediaItem_tl;
      }

      function heroScroll() {
        let heroScroll_tl = gsap.timeline()
          .to('.b-main .hero-scroll__grid', {
            x: () => `-${maxWidthHero - window.innerWidth/2}`,
            ease: "none",
            scrollTrigger: {
              trigger: ".b-main .hero-scroll__media",
              start: '-65px top',
              // start: () => `+=${startScrollHero} center`,
              // end: () => 'bottom top',
              scrub: true,
              // markers: true,
              // invalidateOnRefresh: true
            }
          });
        return heroScroll_tl;
      }

      let hero_tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.b-main .hero-scroll__grid',
          pin: true,
          start: '-65px top',
          end:  () => `+=${maxWidthHero}`,
          markers: true,
          scrub: true,
        }
      })
        .add(heroScroll())
        .add(scaleMediaItem());
        // .add(blurMedia())


      let blurMedia_tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.b-main .hero-scroll__grid',
          start:'top top',
          end: 'bottom top',
          // markers: true,
          scrub: true
        }
      }).to('.hero-scroll__media', {filter: 'blur(5px)', opacity: 0});
    }
  });
  

  ScrollTrigger.matchMedia({
    "(min-width: 991px)": function() {
      // let hero = document.querySelector(".b-main");
      // let heroWrapper = document.querySelector(".hero-scroll__wrapper");
      // let heroContainer = document.querySelector(".hero-scroll__container");
      // let heroContainerHeight = heroContainer.offsetHeight;
      // let heroPaddingTop = window.getComputedStyle(hero).getPropertyValue('padding-top');


      // let heroContent = document.querySelector(".hero-scroll__content");
      // let heroContentWidth = heroContent.offsetWidth;
      // let heroMedia = document.querySelector(".hero-scroll__media");

      let hero2 = document.querySelector(".b-chronicles");
      let hero2Container = document.querySelector(".b-chronicles__container");
      let heroWrapper2 = document.querySelector('.second-hero-scroll .hero-scroll__wrapper');
      let hero2Items= gsap.utils.toArray('.b-chronicles__container-pane');

      let chroniclesContainerLeft = document.querySelector('.b-chronicles__container-left');
      let chroniclesContainerLeftWidth = chroniclesContainerLeft.offsetWidth;

      let chroniclesContainerRight = document.querySelector('.b-chronicles__container-right');
      let chroniclesContainerRightWidth = chroniclesContainerRight.offsetWidth;
      let chroniclesContainerRightHeight = chroniclesContainerRight.offsetHeight;

      let chroniclesContainer = document.querySelector('.b-chronicles .hero-scroll__container');
      let chroniclesContainerWidth = chroniclesContainer.offsetWidth;
      let chroniclesContainerHeight = chroniclesContainer.offsetHeight;

      let chroniclesContainerRightPaddingSide = (chroniclesContainerRightWidth - chroniclesContainerWidth);
      let chroniclesContainerRightPaddingTop = (chroniclesContainerRightHeight - chroniclesContainerHeight)/2;

      let headerPaddingRight = Number(window.getComputedStyle(document.querySelector('.b-header > .container > .row > div')).getPropertyValue('padding-right').replace('px', ''));

      let scrollWidth = window.innerWidth - document.querySelector('.b-container').offsetWidth;

      let maxWidthHero2 = 0;

      const getMaxWidthHero2 = () => {
        maxWidthHero2 = 0;
        hero2Items.forEach((item) => {
          maxWidthHero2 += item.offsetWidth;
        });
        // maxWidthHero2 = hero2Container.offsetWidth;
        // ( +window.getComputedStyle(document.querySelector('.b-chronicles__container-pane')).getPropertyValue('margin-right'))
      };
      getMaxWidthHero2();

      let heroScroll2_tl = gsap.timeline()
        .to(heroWrapper2, {
          x: () => `-${maxWidthHero2 - window.innerWidth + chroniclesContainerLeftWidth + headerPaddingRight + scrollWidth}`,
          ease: "none",
          scrollTrigger: {
            trigger: hero2Container,
            pin: hero2Container,
            // start: () => `-${headerHeight}px top`,
            // start: `-${chroniclesContainerRightPaddingTop + 98}`,
            start: '-98px top',
            markers: true,
            // start: () => `+=${startScrollHero} center`,
            scrub: true,
            // markers: true,
            end: () => `+=${maxWidthHero2}`,
            // invalidateOnRefresh: true
          }
        });


      




        // function navHero2() {
          // let hero2Items= gsap.utils.toArray('.b-chronicles__container-pane');



          // hero2Items.forEach((sct, i) => {
          //   // hero2NavItems.forEach((link, j) => {
          //   //   if (i = j) {
          //   //     console.log(i+j);
          //   //   }
              
          //   // })

          //   hero2NavItems.forEach((j) => {
          //     if (sct[i].classList.contains('active')) {
          //       j[i].classList.add('active');
          //     }
          //     // j[i].class('active');
          //   })
            
          //   navHero2_tl.from(sct,{
          //     // scale: 0.85,
          //     // stagger: true,
          //     // ease: 'none',
          //     scrollTrigger: {
          //       trigger: sct,
          //       start: () => 'top top-=' - (sct.offsetLeft - window.innerWidth/2) * (maxWidthHero2 / (maxWidthHero2 - window.innerWidth)),
          //       end: () => '+=' + sct.offsetWidth * (maxWidthHero2 / (maxWidthHero2 - window.innerWidth)),
          //       addClass: {targets: sct, className: "active"},
          //       // scrub: true,
          //       markers: true
          //     }
          //   })



          //   // ScrollTrigger.create({
          //   //   trigger: sct,
          //   //   start: () => 'top top-=' + (sct.offsetLeft - window.innerWidth/2) * (maxWidthHero / (maxWidthHero - window.innerWidth)),
          //   //   end: () => '+=' + sct.offsetWidth * (maxWidthHero / (maxWidthHero - window.innerWidth)),
          //   //   toggleClass: {targets: sct, className: "active"},
          //   //   scrub: true
          //   //   markers: true,
        
          //   // });
          // });
        // }
        // navHero2();
    }
  });

})