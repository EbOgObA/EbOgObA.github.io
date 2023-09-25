import SmoothScroll from 'smooth-scroll';
import { bodyLockRemove } from '../modules/bodyLock.js';

export function scroll(unlock, lockDelay) {

  const scrollSpeed = 350;
  const gotoLinks = document.querySelectorAll('.goto');
  const menu = document.querySelector('.menu');
  const menuIcon = document.querySelector('.icon-menu');

  if (gotoLinks) {
    for (let i = 0; i < gotoLinks.length; i++) {
      let gotoLink = gotoLinks[i];
      gotoLink.addEventListener('click', function(event) {
        let targetId = gotoLink.getAttribute('href').replace('#', '');
        let targetBlock = document.querySelector('.' + targetId);
        goto(targetBlock, scrollSpeed);
        event.preventDefault();

        if (menu.classList.contains('active')) {
          menu.classList.remove('active');
          menuIcon.classList.remove('active');
          bodyLockRemove(unlock, lockDelay);
        }
      })
    }
  }

}

export function goto(target, speed, offset = 50) {
  let header = '';
  let options = {
		speedAsDuration: true,
		speed: speed,
		header: header,
		offset: offset,
		easing: 'easeOutQuad',
	};

  let src = new SmoothScroll();
  src.animateScroll(target, '', options)
}