export function bodyLock(unlock, delay = 0) {
  let body = document.querySelector('body');
  if (body.classList.contains('lock')) {
    bodyLockRemove(unlock, delay);
  } else {
    bodyLockAdd(unlock, delay);
  }
}

export function bodyLockRemove(unlock, delay = 0) {
  let body = document.querySelector('body');
  if (unlock) {
    let lock_padding = document.querySelectorAll('.lp');
    setTimeout(() => {
      for (let index = 0; index < lock_padding.length; index++) {
        const el = lock_padding[index];
        el.style.paddingRight = '0px';
      }
      body.style.paddingRight = '0px';
      body.classList.remove('lock');
    }, delay);

    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, delay);
  }
}

export function bodyLockAdd(unlock, delay = 0) {
  let body = document.querySelector('body');
  if (unlock) {
    let lock_padding = document.querySelectorAll('.lp');
    for (let index = 0; index < lock_padding.length; index++) {
      const el = lock_padding[index];
      el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
    }
    body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
    body.classList.add('lock');

    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, delay);
  }
}