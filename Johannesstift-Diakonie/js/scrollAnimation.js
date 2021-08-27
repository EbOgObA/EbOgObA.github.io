document.addEventListener('DOMContentLoaded', function() {

  gsap.registerPlugin(ScrollTrigger);

  let hero = document.querySelector(".b-main");
  let heroContainer = document.querySelector(".hero-scroll__container");
  let heroContainerHeight = heroContainer.offsetHeight;
  let heroPaddingTop = window.getComputedStyle(hero).getPropertyValue('padding-top');


  let heroContent = document.querySelector(".hero-scroll__content");
  let heroContentWidth = heroContent.offsetWidth;
  let heroMedia = document.querySelector(".hero-scroll__media");

  let maxWidth = 0;

  const getMaxWidth = () => {
    maxWidth = 0;
    // mainItems.forEach((item) => {
    //   maxWidth += item.offsetWidth;
    // });
    maxWidth = heroContent.offsetWidth + heroMedia.offsetWidth;
  };
  getMaxWidth();


  gsap.to(heroMedia, {
    x: () => `-${maxWidth - window.innerWidth}`,
    ease: "none",
    scrollTrigger: {
      trigger: hero,
      pin: heroContainer,
      start: '50px top',
      // start: () => `+=${startScrollHero} center`,
      scrub: true,
      // markers: true,
      end: () => `+=${maxWidth}`,
      // invalidateOnRefresh: true
    }
  });
  gsap.to(heroContent, {
    x: '-=35%',
    ease: "none",
    opacity: 0,
    filter: 'blur(5px)',
    scrollTrigger: {
      trigger: hero,
      start: '50px top',
      // start: () => `+=${startScrollHero} center`,
      scrub: true,
      // markers: true,
      end: () => `+=${heroContent.offsetHeight}`,
      // invalidateOnRefresh: true
    }
  });

  let heroMediaItem = gsap.utils.toArray('.hero-scroll__item');
  heroMediaItem.forEach((sct, i) => {
    gsap.from(sct,{
      scale: 0.85,
      stagger: true,
      scrollTrigger: {
        trigger: sct,
        start: () => 'top top-=' + (sct.offsetLeft - window.innerWidth/2) * (maxWidth / (maxWidth - window.innerWidth)),
        end: () => '+=' + sct.offsetWidth * (maxWidth / (maxWidth - window.innerWidth)),
        addClass: {targets: sct, className: "active"},
        scrub: true,
        markers: true
      }
    })
    // ScrollTrigger.create({
    //   trigger: sct,
    //   start: () => 'top top-=' + (sct.offsetLeft - window.innerWidth/2) * (maxWidth / (maxWidth - window.innerWidth)),
    //   end: () => '+=' + sct.offsetWidth * (maxWidth / (maxWidth - window.innerWidth)),
    //   toggleClass: {targets: sct, className: "active"},
    //   scrub: true
    //   markers: true,

    // });
  });
  



  // let mainSection = document.querySelector(".b-main");
  // let mainSectionContainer = document.querySelector(".b-main__container");
  // let mainContent = document.querySelector(".b-main__content");
  // let mainItems = document.querySelector(".items-main");
  // // let mainItems = document.querySelectorAll(".items-main__item");
  // let maxWidth = 0;

  // const getMaxWidth = () => {
  //   maxWidth = 0;
  //   // mainItems.forEach((item) => {
  //   //   maxWidth += item.offsetWidth;
  //   // });
  //   maxWidth = mainContent.offsetWidth + mainItems.offsetWidth;
  // };
  // getMaxWidth();
  // console.log(maxWidth);
  // gsap.to(mainSectionContainer, {
  //   x: () => `-${maxWidth - window.innerWidth}`,
  //   ease: "none",
  //   scrollTrigger: {
  //     trigger: mainSection,
  //     pin: true,
  //     scrub: true,
  //     markers: true,
  //     end: () => `+=${maxWidth}`,
  //     invalidateOnRefresh: true
  //   }
  // });

})