import { createPopper, eventListeners } from '@popperjs/core';

export function tooltips() {
  let tooltips = document.querySelectorAll('.tooltip');

  tooltips.forEach(el => {
    const showEvents = ['mouseenter', 'focus'];
    const hideEvents = ['mouseleave', 'blur'];

    let tooltipBtn = el.querySelector('.tooltip__btn');
    let tooltipCloud = el.querySelector('.tooltip__cloud');

    const popperInstance = createPopper(tooltipBtn, tooltipCloud, {
      placement: 'top',
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 7]
          }
        }
      ]
    })

    showEvents.forEach((event) => {
      tooltipBtn.addEventListener(event, show);
    });

    hideEvents.forEach((event) => {
      tooltipBtn.addEventListener(event, hide);
    });

    tooltipBtn.addEventListener('click', () => {
      let data = tooltipCloud.getAttribute('data-show');
      console.log(data);
    })

    function show() {
      tooltipCloud.setAttribute('data-show', '');
      popperInstance.setOptions((options) => ({
        ...options,
        modifiers: [
          ...options.modifiers,
          { name: 'eventListeners', enabled: true },
        ],
      }));
      popperInstance.update();
    }

    function hide() {
      tooltipCloud.removeAttribute('data-show');

      popperInstance.setOptions((options) => ({
        ...options,
        modifiers: [
          ...options.modifiers,
          { name: 'eventListeners', enabled: false },
        ],
      }));
    }
  })
}

