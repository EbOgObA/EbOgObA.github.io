$(document).ready(function () {

  //IsHidden
  function _is_hidden(el) {
    return (el.offsetParent === null)
  }

  let forms = document.querySelectorAll('form');
  if (forms.length > 0) {
    for (let index = 0; index < forms.length; index++) {
      const el = forms[index];
      el.addEventListener('submit', form_submit);
    }
  }

  async function form_submit(e) {
    let btn = e.target;
    let form = btn.closest('form');
    let error = form_validate(form);
    e.preventDefault();

    // if (error == 0) {
    // let formAction = form.getAttribute('action') ? form.getAttribute('action').trim() : '#';
    //   let formMethod = form.getAttribute('method') ? form.getAttribute('method').trim() : 'GET';
    //   const message = form.getAttribute('data-message');
    //   const ajax = form.getAttribute('data-ajax');

    //   //SendForm
    //   if (ajax) {
    //     e.preventDefault();
    //     let formData = new FormData(form);
    //     form.classList.add('_sending');
    //     let response = await fetch(formAction, {
    //       method: formMethod,
    //       body: formData
    //     });
    //     if (response.ok) {
    //       let result = await response.json();
    //       form.classList.remove('_sending');
    //       if (message) {
    //         popup_open('_' + message + '-message');
    //       }
    //       form_clean(form);
    //     } else {
    //       alert("Ошибка");
    //       form.classList.remove('_sending');
    //     }
    //   }
    // } else {
    //   let form_error = form.querySelectorAll('._error');
    //   if (form_error && form.classList.contains('_goto-error')) {
    //     _goto(form_error[0], 1000, 50);
    //   }
    // e.preventDefault();
    // }
  }
  function form_validate(form) {
    let error = 0;
    let form_req = form.querySelectorAll('._req');
    if (form_req.length > 0) {
      for (let index = 0; index < form_req.length; index++) {
        const el = form_req[index];
        if (!_is_hidden(el)) {
          error += form_validate_input(el);
        }
      }
    }
    return error;
  }
  function form_validate_input(input) {
    let error = 0;
    let input_g_value = input.getAttribute('data-value');

    if (input.value == '' || input.value == input_g_value) {
      form_add_error(input);
      error++;
    } else {
      form_remove_error(input);
    }
    return error;
  }
  function form_add_error(input) {
    input.classList.add('_error');
    input.parentElement.classList.add('_error');

    let input_error = input.parentElement.querySelector('.form__error');
    if (input_error) {
      input.parentElement.removeChild(input_error);
    }
    let input_error_text = input.getAttribute('data-error');
    if (input_error_text && input_error_text != '') {
      input.parentElement.insertAdjacentHTML('beforeend', '<div class="form__error">' + input_error_text + '</div>');
    }
  }
  function form_remove_error(input) {
    input.classList.remove('_error');
    input.parentElement.classList.remove('_error');

    let input_error = input.parentElement.querySelector('.form__error');
    if (input_error) {
      input.parentElement.removeChild(input_error);
    }
  }
  function form_clean(form) {
    let inputs = form.querySelectorAll('input,textarea');
    for (let index = 0; index < inputs.length; index++) {
      const el = inputs[index];
      el.parentElement.classList.remove('_focus');
      el.classList.remove('_focus');
      el.value = el.getAttribute('data-value');
    }
    let checkboxes = form.querySelectorAll('.checkbox__input');
    if (checkboxes.length > 0) {
      for (let index = 0; index < checkboxes.length; index++) {
        const checkbox = checkboxes[index];
        checkbox.checked = false;
      }
    }
    let selects = form.querySelectorAll('select');
    if (selects.length > 0) {
      for (let index = 0; index < selects.length; index++) {
        const select = selects[index];
        const select_default_value = select.getAttribute('data-default');
        select.value = select_default_value;
        select_item(select);
      }
    }
  }

  //Placeholers
  let inputs = document.querySelectorAll('input[data-value],textarea[data-value]');
  inputs_init(inputs);

  function inputs_init(inputs) {
    if (inputs.length > 0) {
      for (let index = 0; index < inputs.length; index++) {
        const input = inputs[index];
        const input_g_value = input.getAttribute('data-value');
        input_placeholder_add(input);
        if (input.value != '' && input.value != input_g_value) {
          input_focus_add(input);
        }
        input.addEventListener('focus', function (e) {
          if (input.value == input_g_value) {
            input_focus_add(input);
            input.value = '';
          }
          if (input.getAttribute('data-type') === "pass") {
            input.setAttribute('type', 'password');
          }
          if (input.classList.contains('_date')) {
            /*
            input.classList.add('_mask');
            Inputmask("99.99.9999", {
              //"placeholder": '',
              clearIncomplete: true,
              clearMaskOnLostFocus: true,
              onincomplete: function () {
                input_clear_mask(input, input_g_value);
              }
            }).mask(input);
            */
          }
          if (input.classList.contains('_phone')) {
            //'+7(999) 999 9999'
            //'+38(999) 999 9999'
            //'+375(99)999-99-99'
            input.classList.add('_mask');
            Inputmask("+375 (99) 9999999", {
              //"placeholder": '',
              clearIncomplete: true,
              clearMaskOnLostFocus: true,
              onincomplete: function () {
                input_clear_mask(input, input_g_value);
              }
            }).mask(input);
          }
          if (input.classList.contains('_digital')) {
            input.classList.add('_mask');
            Inputmask("9{1,}", {
              "placeholder": '',
              clearIncomplete: true,
              clearMaskOnLostFocus: true,
              onincomplete: function () {
                input_clear_mask(input, input_g_value);
              }
            }).mask(input);
          }
          if (input.classList.contains('_integer2d')) {
            input.classList.add('_mask');
            Inputmask("[9][9]", {
              "placeholder": '',
              clearIncomplete: true,
              clearMaskOnLostFocus: true,
              min: 1,
              max: 99,
              onincomplete: function () {
                input_clear_mask(input, input_g_value);
              }
            }).mask(input);
          }
          form_remove_error(input);
        });
        input.addEventListener('blur', function (e) {
          if (input.value == '') {
            input.value = input_g_value;
            input_focus_remove(input);
            if (input.classList.contains('_mask')) {
              input_clear_mask(input, input_g_value);
            }
            if (input.getAttribute('data-type') === "pass") {
              input.setAttribute('type', 'text');
            }
          }
        });
        if (input.classList.contains('_date')) {
          datepicker(input, {
            customDays: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
            customMonths: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
            formatter: (input, date, instance) => {
              const value = date.toLocaleDateString()
              input.value = value
            },
            onSelect: function (input, instance, date) {
              input_focus_add(input.el);
            }
          });
        }
      }
    }
  }
  function input_placeholder_add(input) {
    const input_g_value = input.getAttribute('data-value');
    if (input.value == '' && input_g_value != '') {
      input.value = input_g_value;
    }
  }
  function input_focus_add(input) {
    input.classList.add('_focus');
    input.parentElement.classList.add('_focus');
  }
  function input_focus_remove(input) {
    input.classList.remove('_focus');
    input.parentElement.classList.remove('_focus');
  }
  function input_clear_mask(input, input_g_value) {
    input.inputmask.remove();
    input.value = input_g_value;
    input_focus_remove(input);
  }

  // Low Income Family Calculator
  const poorfam = document.querySelector('.poorfam');
  poorfam.addEventListener('submit', poorfam_calculator);
  function poorfam_calculator(e) {

    let result_box = document.querySelector('.poorfam__result');
    let result_wait = document.querySelector('.poorfam__result_loading');
    let total_income = document.getElementById('total_income');
    let family_members = document.getElementById('num_family');
    let inputs = poorfam.querySelectorAll('input');

    let month = 3;
    let total_income_value = total_income.value;
    let total_income_g_value = total_income.getAttribute('data-value');
    let family_members_value = family_members.value;
    let family_members_g_value = family_members.getAttribute('data-value');
    const MROT = 13890;

    let form_poorfam = document.querySelector('.poorfam__calc');
    let btn = form_poorfam.querySelector('.btn');
    let error = form_validate(form_poorfam);

    if (error == 0) {
      if (result_box) {
        result_box.remove();
      }
      let result = 0;

      poorfam.insertAdjacentHTML('beforeend', '<div class="poorfam__result poorfam__result_loading loading">Производим расчет</div>');
      setTimeout(function () {

        document.querySelector('.poorfam__result_loading').remove();
        result += +total_income_value / month / +family_members_value;

        for (let index = 0; index < inputs.length; index++) {
          inputs[index].value = inputs[index].getAttribute('data-value');
          input_focus_remove(inputs[index]);
          if (inputs[index].classList.contains('_mask')) {
            input_clear_mask(inputs[index], inputs[index].getAttribute('data-value'));
          }
          input_placeholder_add(inputs[index])
        }

        if (result >= MROT) {
          poorfam.insertAdjacentHTML('beforeend', '<div class="poorfam__result poorfam__result_excess"><div class="poorfam__result-title">Ваш доход превышает прожиточный минимум на каждого члена семьи.</div><p class="poorfam__result-text"> В случае изменения дохода или увеличения прожиточного минимума Вы можете проверить право на <br> выплату повторно.</p></div>');
        } else {
          poorfam.insertAdjacentHTML('beforeend', '<div class="poorfam__result poorfam__result_confirm"><div class="poorfam__result-title">Ваш доход удовлетворяет условиям статуса малоимущей семьи.</div><p class="poorfam__result-text">С заявлением-декларацией и пакетом документов, Вы можете обратиться в МФЦ, на портал <br> Госуслуги, в территориальный отдел Центра социальных выплат и компенсаций по <br> месту жительства.</p></div>');
        }

      }, 5000);
    } else {
      e.preventDefault();
    }

  }
})