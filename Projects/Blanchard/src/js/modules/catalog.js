import { goto } from "../components/scroll.js";

export function catalog() {

  let authorsLink = document.querySelectorAll('.artlist__link');
  let authorsImg = document.querySelector('#showcase');

  for (let i = 0; i < authorsLink.length; i++) {
    const el = authorsLink[i];
    el.addEventListener('click', function(e) {
      e.preventDefault();
      catalog_parse(el);
      if (window.matchMedia('(max-width: 1024px)').matches) {
        goto(authorsImg, 350);
      }
    })
  }

}

function catalog_parse(item) {

  let loadshowcase = document.querySelector('.showcase-load');
  let showcase = document.querySelector('.showcase');
  let emptyshowcase = document.querySelector('.showcase-empty');

  let author = document.querySelector('.showcase__title');
  let date = document.querySelector('.showcase__date');
  let descr = document.querySelector('.showcase__descr');
  let source = document.querySelectorAll('.showcase__img source');
  let img = document.querySelector('.showcase__img img');

  let request = new XMLHttpRequest();

  request.addEventListener('loadstart', spinning);
  request.addEventListener('loadend', addAuthor);

  request.open('GET', '../files/data.json');
  request.responseType = 'json';
  request.send();

  function spinning(event) {
    showcase.classList.add('hide');
    emptyshowcase.classList.remove('show');
    loadshowcase.classList.add('active');
  }

  function addAuthor(event) {
    let DATA = request.response;
    let catalogData = DATA.catalog;
    let catalogList = Object.values(catalogData);
    let linkID = item.getAttribute('data-id');
    let authorInd = catalogList.findIndex(item => item.id === linkID);

    loadshowcase.classList.remove('active');
    
    if (authorInd !== -1) {
      showcase.classList.remove('hide');
      emptyshowcase.classList.remove('show');
      author.innerHTML = catalogList[authorInd].name;
      date.innerHTML = catalogList[authorInd].date;
      descr.innerHTML = catalogList[authorInd].description;
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
      img.setAttribute('alt', `${catalogList[authorInd].name}`)
    } else {
      showcase.classList.add('hide');
      emptyshowcase.classList.add('show');
    }
  }

}