import { bodyLockAdd, bodyLockRemove } from '../modules/bodyLock.js';

export function popupsInit(unlock, lockDelay) {
  let popupLink = document.querySelectorAll('.popup-link');
  let popups = document.querySelectorAll('.popup');
  let popupCloseIcon = document.querySelectorAll('.popup__close,.popup-close');

  for (let index = 0; index < popupLink.length; index++) {
    const el = popupLink[index];
    el.addEventListener('click', function (e) {
      if (unlock) {
        popupParseData(el);
        let item = el.getAttribute('href').replace('#', '');
        popupOpen(item, lockDelay, unlock);
        el.blur();
      }
      e.preventDefault();
    })
  }

  for (let index = 0; index < popups.length; index++) {
    const popup = popups[index];
    popup.addEventListener('click', function (e) {
      if (!e.target.closest('.popup__body')) {
        popupClose(e.target.closest('.popup'), lockDelay);
      }
    });
  }

  if (popupCloseIcon) {
    for (let index = 0; index < popupCloseIcon.length; index++) {
      const el = popupCloseIcon[index];
      el.addEventListener('click', function () {
        popupClose(el.closest('.popup'), lockDelay);
      })
    }
  }

  document.addEventListener('keydown', function (e) {
    if (e.which == 27) {
      popupClose(popups, lockDelay);
    }
  });

}

function popupParseData(item) {
  let author = document.querySelector('.popup__author');
  let name = document.querySelector('.popup__name');
  let date = document.querySelector('.popup__date');
  let descr = document.querySelector('.popup__text');
  let source = document.querySelectorAll('.popup__picture source');
  let img = document.querySelector('.popup__img');

  let request = new XMLHttpRequest();
  request.open('GET', '../files/data.json');
  request.responseType = 'json';
  request.send();
  request.onloadend = function () {
    let DATA = request.response;
    let galleryList = DATA.gallery;
    let linkID = item.getAttribute('data-id');

    for (let i = 0; i < galleryList.length; i++) {
      if (linkID === galleryList[i].id) {
        author.innerHTML = galleryList[i].author;
        name.innerHTML = `&laquo;${galleryList[i].name}&raquo;`;
        date.innerHTML = galleryList[i].date;
        descr.innerHTML = galleryList[i].description;

        source.forEach(el => {
          let href = el.getAttribute('srcset').split('/');
          href[2] = linkID;
          let dest = href.join('/');
          el.setAttribute('srcset', dest);
        })

        let srcimg = img.getAttribute('src').split('/');
        srcimg[2] = linkID;
        let destimg = srcimg.join('/')
        img.setAttribute('src', destimg);
        img.setAttribute('alt', `${galleryList[i].author} - ${galleryList[i].name}`)
        break;
      }
    }
  }
}

// POPUP ANIMATION FUNCTIONS
export function popupOpen(item, lockDelay, unlock = true) {
  let activePopup = document.querySelectorAll('.popup.active');
  if (activePopup.length > 0) {
    popupClose(item, lockDelay, unlock);
  }
  let curentPopup = document.querySelector('.popup-' + item);
  if (curentPopup && unlock) {
    if (!document.querySelector('.menu__body.active')) {
      bodyLockAdd(unlock, lockDelay);
    }
    curentPopup.classList.add('active');
    history.pushState('', '', '#' + item);
  }
}

export function popupClose(item, lockDelay, unlock = true) {
  if (unlock) {
    if (item.length > 0) {
      for (let index = 0; index < item.length; index++) {
        const popup = item[index];
        popup.classList.remove('active');
      }
    } else {
      item.classList.remove('active');
    }
    if (!document.querySelector('.menu__body.active') && unlock) {
      bodyLockRemove(unlock, lockDelay);
    }
    history.pushState('', '', window.location.href.split('#')[0]);
  }
}