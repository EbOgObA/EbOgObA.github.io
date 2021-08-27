document.addEventListener('DOMContentLoaded', function() {

  gsap.registerPlugin(ScrollTrigger);

  let hero = document.querySelector(".b-main");
  let heroWrapper = document.querySelector(".hero-scroll__wrapper");
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

  function blurHeroContent() {
    let heroContent_tl = gsap.timeline();
    heroContent_tl
      .to('.hero-scroll__content', 2, {filter: 'blur(5px)', opacity: 0});
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
        stagger: true,
        scrollTrigger: {
          trigger: sct,
          start: () => 'top top-=' + (sct.offsetLeft - window.innerWidth/3) * (maxWidth / (maxWidth - window.innerWidth)),
          end: () => '+=' + sct.offsetWidth * (maxWidth / (maxWidth - window.innerWidth)),
          addClass: {targets: sct, className: "active"},
          scrub: true,
          // markers: true
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
    return scaleMediaItem_tl;
  }

  function blurMedia() {
    let blurMedia_tl = gsap.timeline({
      
    });
    blurMedia_tl
      .to('.hero-scroll__media', 5, {filter: 'blur(5px)', opacity: 0});
    return blurMedia_tl;
  }

  function heroScroll() {
    let heroScroll_tl = gsap.timeline()
      .to(heroWrapper, {
        x: () => `-${maxWidth - window.innerWidth/2}`,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          pin: heroContainer,
          start: '50px top',
          // start: () => `+=${startScrollHero} center`,
          scrub: true,
          // markers: true,
          end: () => `+=${maxWidth + window.innerWidth}`,
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
      scrub: 1,
    }
  }).add(heroScroll())
    .add(blurHeroContent())
    .add(scaleMediaItem())
    // .add(blurMedia())
  hero_tl;

  let blurMedia_tl = gsap.timeline({
    scrollTrigger: {
      trigger: hero,
      start: () => `+=${maxWidth + window.innerWidth/2}`,
      end: 'bottom top',
      // markers: true,
      scrub: true
    }
  }).to('.hero-scroll__media', {filter: 'blur(5px)', opacity: 0});

  
  

  // let hero_tl = gsap.timeline({
  //   // scrollTrigger: {
  //   //   trigger: hero,
  //   //   start: '50px top',
  //   //   end: () => `+=${maxWidth + window.innerWidth}`,
  //   //   // scrub: true
  //   // }
  // })
  //   .to('.hero-scroll__content', {filter: 'blur(5px)', opacity: 0})
  //   // .to('.hero-scroll__media', 6, {
  //   //   x: () => `-${maxWidth - window.innerWidth}`,
  //   //   ease: "none",
  //   // })
  //   .from('.hero-scroll__item', {scale: 0.85,stagger: 1,ease: 'none'})
  //   .to('.hero-scroll__media', {filter: 'blur(5px)', opacity: 0});





  // gsap.to(heroContent, {
  //   x: '-=100%',
  //   ease: "none",
  //   opacity: 0,
  //   filter: 'blur(5px)',
  //   scrollTrigger: {
  //     trigger: hero,
  //     start: '50px top',
  //     // start: () => `+=${startScrollHero} center`,
  //     scrub: true,
  //     // markers: true,
  //     end: () => `+=${heroContent.offsetHeight}`,
  //     // invalidateOnRefresh: true
  //   }
  // });
  


  



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