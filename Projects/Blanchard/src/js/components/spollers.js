import { slideUp, slideDown, slideToggle } from '../modules/slides.js';

export function spollers() {
  let spollerDuration = 300; //ms
  let spollers = document.querySelectorAll('.spoller');
  if (spollers.length > 0) {
    for (let index = 0; index < spollers.length; index++) {
      const spoller = spollers[index];
      spoller.addEventListener('click', function () {
        if (spoller.closest('.spollers').classList.contains('one')) {
          let curent_spollers = spoller.closest('.spollers').querySelectorAll('.spoller');
          for (let i = 0; i < curent_spollers.length; i++) {
            let el = curent_spollers[i];
            if (el != spoller) {
              el.classList.remove('active');
              slideUp(el.nextElementSibling, spollerDuration);
            }
          }
        }
        // if (spoller.nextElementSibling.style.display === 'none') {
        //   slideDown(spoller.nextElementSibling, spollerDuration);
        //   spoller.classList.add('active');
        // } else {
        //   slideUp(spoller.nextElementSibling, spollerDuration);
        //   spoller.classList.remove('active');
        // }
        spoller.classList.toggle('active');
        slideToggle(spoller.nextElementSibling, spollerDuration);
      });
    }
  }
}