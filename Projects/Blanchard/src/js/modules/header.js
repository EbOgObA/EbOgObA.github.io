import SimpleBar from 'simplebar';
import { slideUp, slideDown } from './slides.js';
import { bodyLockAdd, bodyLockRemove } from './bodyLock.js';

export function header(unlock, lockDelay) {
  const menuIcon = document.querySelector('.icon-menu');
  const menu = document.querySelector('.menu');
  const bottomNavSublists = document.querySelectorAll('.bottom-nav__sublist');
  const bottomNavSublistWrapper = document.querySelectorAll('.bottom-nav__sublist-wrapper');
  const search = document.querySelector('.search');
  const searchForm = document.querySelector('.search__form');
  const searchBtn = document.querySelector('.search__btn');
  const searchClose = document.querySelector('.search__close');

  let bottomNavDuration = 150; // ms

  // CUSTOM SCROLL
  if (bottomNavSublists) {
    bottomNavSublists.forEach((el) => {
      new SimpleBar(el, {
        scrollbarMaxSize: 28,
        forceVisible: false,
        autoHide: false,
      });
    });
  }

  window.addEventListener('resize', () => {
    if (window.matchMedia('(min-width: 1024.95px)').matches) {
      menu.classList.remove('active');
      menu.classList.add('hide-anim');
      menuIcon.classList.remove('active');
      search.classList.remove('active');
      search.classList.add('hide-anim');
    }
  });

  // CLICK EVENTS
  menuIcon.addEventListener('click', function () {
    this.classList.toggle('active');
    menu.classList.toggle('active');
    menu.classList.remove('hide-anim');
    if (menu.classList.contains('active')) {
      bodyLockAdd(unlock, lockDelay);
    } else {
      bodyLockRemove(unlock, lockDelay);
    }
  });

  document.addEventListener('click', function (e) {
    let target = e.target;
    if (target.classList.contains('bottom-nav__item-title')) {
      e.preventDefault();
      let sublist = target.parentElement.querySelector('.bottom-nav__sublist-wrapper');
      if (target.classList.contains('active')) {
        target.classList.remove('active');
        slideUp(sublist, bottomNavDuration);
      } else {
        closeBottomNav(bottomNavSublistWrapper);
        setTimeout(() => {
          target.classList.add('active');
          slideDown(sublist, bottomNavDuration);
        }, bottomNavDuration);
      }
    } else if (!target.closest('.bottom-nav__item')) {
      closeBottomNav(bottomNavSublistWrapper);
    }
  });

  searchBtn.addEventListener('click', function (e) {
    if (!search.classList.contains('active') && window.matchMedia('(max-width: 1024.95px)').matches) {
      e.preventDefault();
      search.classList.add('active');
      search.classList.remove('hide-anim');
      this.blur();
    }
  });

  searchClose.addEventListener('click', function () {
    search.classList.remove('active');
    search.classList.remove('hide-anim');
  });

  function closeBottomNav(elemList) {
    elemList.forEach((el) => {
      el.parentElement.querySelector('.bottom-nav__item-title').classList.remove('active');
      slideUp(el, bottomNavDuration);
    });
  }
}