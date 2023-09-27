import * as inputmask from 'inputmask';
import { popupOpen } from './../components/popup.js';

export function forms() {
  let forms = document.querySelectorAll('form');
  let inputs = document.querySelectorAll(
    'input[data-value],textarea[data-value]'
  );

  inputsInit(inputs);

  if (forms.length > 0) {
    for (let index = 0; index < forms.length; index++) {
      const el = forms[index];
      el.addEventListener('submit', formSubmit);
    }
  }
}

async function formSubmit(e) {
  let btn = e.target;
  let form = btn.closest('form');
  let error = formValidate(form);
  if (error == 0) {
    let formAction = form.getAttribute('action')
      ? form.getAttribute('action').trim()
      : '#';
    let formMethod = form.getAttribute('method')
      ? form.getAttribute('method').trim()
      : 'GET';
    const message = form.getAttribute('data-message');
    const ajax = form.getAttribute('data-ajax');

    //SendForm
    if (ajax) {
      e.preventDefault();
      let formData = new FormData(form); // If POST method
      form.classList.add('sending');
      let response = await fetch(formAction, {
        method: formMethod,
        body: formData, // If POST method
      });
      if (response.ok) {
        // let result = await response.json();
        form.classList.remove('sending');
        if (message) {
          popupOpen(message + '-message', 300);
        }
        formClean(form);
      } else {
        alert('Ошибка');
        form.classList.remove('sending');
      }
    }
  } else {
    e.preventDefault();
  }
}

function formValidate(form) {
  let error = 0;
  let formReq = form.querySelectorAll('.req');
  if (formReq.length > 0) {
    for (let index = 0; index < formReq.length; index++) {
      const el = formReq[index];
      if (!isHidden(el)) {
        error += formValidateInput(el);
      }
    }
  }
  return error;
}

function formValidateInput(input) {
  let error = 0;
  let inputGValue = input.getAttribute('data-value');

  if (input.value == '' || input.value == inputGValue) {
    formAddError(input);
    error++;
  } else {
    formRemoveError(input);
  }

  return error;
}

function formAddError(input) {
  input.classList.add('error');
  input.parentElement.classList.add('error');

  let inputError = input.parentElement.querySelector('.form__error');
  if (inputError) {
    input.parentElement.removeChild(inputError);
  }
  let inputErrorText = input.getAttribute('data-error');
  if (inputErrorText && inputErrorText != '') {
    input.parentElement.insertAdjacentHTML(
      'beforeend',
      '<div class="form__error">' + inputErrorText + '</div>'
    );
  }
}

function formRemoveError(input) {
  input.classList.remove('error');
  input.parentElement.classList.remove('error');

  let inputError = input.parentElement.querySelector('.form__error');
  if (inputError) {
    input.parentElement.removeChild(inputError);
  }
}

function formClean(form) {
  let inputs = form.querySelectorAll('input,textarea');
  for (let index = 0; index < inputs.length; index++) {
    const el = inputs[index];
    const inputGValue = el.getAttribute('data-value');
    // el.parentElement.classList.remove('focus');
    // el.classList.remove('focus');

    inputFocusRemove(el);

    if (el.classList.contains('mask')) {
      inputClearMask(el, inputGValue);
    } else {
      el.value = inputGValue;
    }
  }
}

function inputsInit(inputs) {
  if (inputs.length > 0) {
    for (let index = 0; index < inputs.length; index++) {
      const input = inputs[index];
      const inputGValue = input.getAttribute('data-value');

      inputPlaceholderAdd(input);

      if (input.value != '' && input.value != inputGValue) {
        inputFocusAdd(input);
      }

      input.addEventListener('focus', function (e) {
        if (input.value == inputGValue) {
          inputFocusAdd(input);
          input.value = '';
        }
        if (input.classList.contains('phone')) {
          input.classList.add('mask');

          Inputmask('+7(999) 999 9999', {
            //'placeholder': '',
            clearIncomplete: true,
            clearMaskOnLostFocus: true,
            onincomplete: function () {
              inputClearMask(input, inputGValue);
            },
          }).mask(input);
        }
        formRemoveError(input);
      });

      input.addEventListener('blur', function (e) {
        if (input.value == '') {
          input.value = inputGValue;
          inputFocusRemove(input);
          if (input.classList.contains('mask')) {
            inputClearMask(input, inputGValue);
          }
        }
      });
    }
  }
}

function inputPlaceholderAdd(input) {
  const inputGValue = input.getAttribute('data-value');
  if (input.value == '' && inputGValue != '') {
    input.value = inputGValue;
  }
}

function inputClearMask(input, inputGValue) {
  input.inputmask.remove();
  input.value = inputGValue;
  inputFocusRemove(input);
}

function inputFocusAdd(input) {
  input.classList.add('focus');
  input.parentElement.classList.add('focus');
}

function inputFocusRemove(input) {
  input.classList.remove('focus');
  input.parentElement.classList.remove('focus');
}

function isHidden(el) {
  return el.offsetParent === null;
}
