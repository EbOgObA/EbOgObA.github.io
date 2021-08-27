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

  let maxWidthHero = 0;

  const getMaxWidthHero = () => {
    maxWidthHero = 0;
    // mainItems.forEach((item) => {
    //   maxWidth += item.offsetWidth;
    // });
    maxWidthHero = heroContent.offsetWidth + heroMedia.offsetWidth;
  };
  getMaxWidthHero();

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
        // stagger: true,
        ease: 'none',
        scrollTrigger: {
          trigger: sct,
          start: () => 'top top-=' + (sct.offsetLeft - window.innerWidth/3) * (maxWidthHero / (maxWidthHero - window.innerWidth)),
          end: () => '+=' + sct.offsetWidth * (maxWidthHero / (maxWidthHero - window.innerWidth)),
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

  // function blurMedia() {
  //   let blurMedia_tl = gsap.timeline({
      
  //   });
  //   blurMedia_tl
  //     .to('.hero-scroll__media', 5, {filter: 'blur(5px)', opacity: 0});
  //   return blurMedia_tl;
  // }

  function heroScroll() {
    let heroScroll_tl = gsap.timeline()
      .to(heroWrapper, {
        x: () => `-${maxWidthHero - window.innerWidth/2}`,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          pin: heroContainer,
          start: '50px top',
          // start: () => `+=${startScrollHero} center`,
          scrub: true,
          // markers: true,
          end: () => `+=${maxWidthHero + window.innerWidth}`,
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

  let blurMedia_tl = gsap.timeline({
    scrollTrigger: {
      trigger: hero,
      start: () => `+=${maxWidthHero + window.innerWidth/2}`,
      end: 'bottom top',
      // markers: true,
      scrub: true
    }
  }).to('.hero-scroll__media', {filter: 'blur(5px)', opacity: 0});


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
      let heroWrapper2 = document.querySelector('.second-hero-scroll .hero-scroll__container');
      let hero2Items= gsap.utils.toArray('.b-chronicles__container-pane');

      let headerHeight = document.querySelector('.b-header').offsetHeight;

      // let heroItemMerginright = window.getComputedStyle(hero).getPropertyValue('padding-top');

      let maxWidthHero2 = 0;
      // ( +window.getComputedStyle(item).getPropertyValue('margin-right'))

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
          x: () => `-${maxWidthHero2 - window.innerWidth/2}`,
          ease: "none",
          scrollTrigger: {
            trigger: hero2Container,
            pin: hero2Container,
            start: () => `-${headerHeight}px top`,
            markers: true,
            // start: () => `+=${startScrollHero} center`,
            scrub: true,
            // markers: true,
            end: () => `+=${maxWidthHero2 + window.innerWidth}`,
            // invalidateOnRefresh: true
          }
        });
        
    }
  })

})