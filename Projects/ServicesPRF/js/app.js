document.addEventListener('DOMContentLoaded', function () {

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
        result += Number(total_income_value.replace(/\s/g, '')) / month / Number(family_members_value);

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

  // Event Click
  document.addEventListener('click', function (event) {
    let target = event.target;
    let clear_btn = target.closest('.clear__btn');
    let current_date_btn = target.closest('.current__date');
    let add_stage_btn = target.closest('.btn__add');

    if (clear_btn || document.contains(clear_btn)) {
      clearBtn(clear_btn);
    };

    if (current_date_btn || document.contains(current_date_btn)) {
      set_curr_date(current_date_btn);
    }

    if (add_stage_btn || document.contains(add_stage_btn)) {
      add_stage_date(add_stage_btn, event);
    }
  })

  // Seniority Calculator
  const seniority = document.getElementById('seniority_calculator');
  seniority.addEventListener('submit', seniority_calculator);

  function seniority_calculator(e) {
    let norm = true;

    let errors = document.querySelectorAll('.error');
    errors.forEach(el => {
      el.remove()
    })

    let seniority_exp = document.querySelector('.seniority__exp');
    let begin_stage_date = document.querySelector('input[name="begin_stag_date"]');
    let begin_stage_years = document.querySelector('input[name="seniority_exp_years"]');
    let begin_stage_month = document.querySelector('input[name="seniority_exp_month"]');
    let begin_stage_days = document.querySelector('input[name="seniority_exp_days"]');

    let seniority_blocks = document.querySelectorAll('.seniority__calculator-block');

    let seniority_result_window = document.querySelector('.seniority__result');
    let details = document.querySelector('.details');
    let details_rows = details.querySelectorAll('.details__row');

    seniority_result_window.style.display = 'none';
    details_rows.forEach(row => {
      row.remove();
    })

    if (begin_stage_date.value.length > 0 && begin_stage_date.value !== 'Выбрать дату' && begin_stage_years.value.length == 0 && begin_stage_month.value.length == 0 && begin_stage_days.value.length == 0) {
      seniority_exp.insertAdjacentHTML('beforeend', '<div class="error">Вы указали дату, но не указали сколько составляет стаж на эту дату в поля справа. Поле "Стаж на дату" предназначено для упрощения расчета, когда вы уже знаете, что на такую-то дату был такой-то стаж.</div>')
      norm = false;
    }

    if (begin_stage_date.value === 'Выбрать дату' && (begin_stage_years.value.length > 0 || begin_stage_month.value.length > 0 || begin_stage_days.value.length > 0)) {
      seniority_exp.insertAdjacentHTML('beforeend', '<div class="error">Не указана дата стажа</div>')
      norm = false;
    }

    let text_1, text_2, text_3;

    for (let i = 0; i < seniority_blocks.length; i++) {
      let block = seniority_blocks[i];
      let dates_rows = block.querySelectorAll('.form__row');

      if (block.classList.contains('seniority__dates')) {
        text_1 = 'Не указана дата увольнения';
        text_2 = 'Не указана дата приёма на работу';
        text_3 = 'Дата приёма на работу не может быть позже даты увольнения';
      } else if (block.classList.contains('seniority__additional-dates')) {
        text_1 = 'Не указана дата окончания периода';
        text_2 = 'Не указана дата начала периода';
        text_3 = 'Дата начала периода не может быть позже даты окончания периода';
      }

      dates_rows.forEach((el) => {
        let date_begin_input = el.querySelector('.date_begin input');
        let date_end_input = el.querySelector('.date_end input');

        if (date_begin_input !== null && date_end_input !== null) {

          if (date_begin_input.value !== 'Выбрать дату' && date_end_input.value == 'Выбрать дату') {
            el.insertAdjacentHTML('afterend', `<div class="error">${text_1}</div>`)
            norm = false;
          }

          if (date_begin_input.value == 'Выбрать дату' && date_end_input.value !== 'Выбрать дату') {
            el.insertAdjacentHTML('afterend', `<div class="error">${text_2}</div>`)
            norm = false;
          }

          if (date_begin_input.value !== 'Выбрать дату' && date_end_input.value !== 'Выбрать дату') {
            d_begin = parseDate(date_begin_input.value);
            d_end = parseDate(date_end_input.value);
            if (d_begin > d_end) {
              el.insertAdjacentHTML('afterend', `<div class="error">${text_3}</div>`)
              norm = false;
            }
          }
        }

      })
    }

    if (!norm) return false;

    if (norm) {
      getResultSeniority();
    }
  }

  function getResultSeniority() {

    let total_years = 0;
    let total_month = 0;
    let total_days = 0;

    let seniority_selectors = document.querySelectorAll('.select__options');
    let seniority_blocks = document.querySelectorAll('.seniority__calculator-block');
    let seniority_result_window = document.querySelector('.seniority__result');
    let seniority_result = document.querySelector('.seniority__result .result');
    let details = document.querySelector('.details');
    let details_rows = details.querySelectorAll('.details__row');

    details.style.display = 'none';
    // details_rows.forEach(row => {
    //   row.remove();
    // })

    let years_on_date = document.getElementById('seniority_on_date_years').value;
    let month_on_date = document.getElementById('seniority_on_date_month').value;
    let days_on_date = document.getElementById('seniority_on_date_days').value;

    total_years += Number(years_on_date);
    total_month += Number(month_on_date);
    total_days += Number(days_on_date);

    for (let i = 0; i < seniority_blocks.length; i++) {
      let block = seniority_blocks[i];
      let dates_rows = block.querySelectorAll('.form__row');

      dates_rows.forEach((el) => {
        let date_begin_input = el.querySelector('.date_begin input');
        let date_end_input = el.querySelector('.date_end input');

        if (date_begin_input !== null && date_begin_input.value !== 'Выбрать дату' && date_end_input !== null && date_end_input.value !== 'Выбрать дату') {
          let d_begin = parseDate(date_begin_input.value);
          let d_end = parseDate(date_end_input.value);

          // let dayBegin = d_begin.getDate();
          // let dayEnd = d_end.getDate();

          // let monthBegin = d_begin.getMonth() + 1;
          // let monthEnd = d_end.getMonth() + 1;

          // let yearsBegin = d_begin.getFullYear();
          // let yearsEnd = d_end.getFullYear();

          // console.log(getNumberOfDays(d_begin, d_end));

          // total_years += Number(yearsEnd) - Number(yearsBegin);
          // total_month += Number(monthEnd) - Number(monthBegin);
          total_days += getNumberOfDays(d_begin, d_end) + 1;

          let stage = `<div class="details__row">
                        <div class="details__col">
                          <div class="details__name">Дата приёма на работу</div>
                          <div class="details__value acceptance">${date_begin_input.value}</div>
                        </div>
                        <div class="details__col">
                          <div class="details__name">Дата увольнения</div>
                          <div class="details__value dismissal">${date_end_input.value}</div>
                        </div>
                        <div class="details__col">
                          <div class="details__name">Продолжительность периода</div>
                          <div class="details__value duration">${seniority_string(0, 0, getNumberOfDays(d_begin, d_end) + 1)}</div>
                        </div>
                      </div>`;

          details.insertAdjacentHTML('beforeend', stage);

          details.style.display = 'block';
        }
      })
    }

    // console.log(total_days);
    // console.log(total_month);
    // console.log(`${total_years}\n`);

    seniority_selectors.forEach(select => {
      let options = select.querySelectorAll('.select__option');
      options.forEach(option => {
        if (option.style.display == 'none') {
          let value = option.dataset.value;
          if (value.length > 1) {
            let arr = value.split('.');
            total_years += Number(arr[0]);
            total_month += Number(arr[1]);
          } else if (value.length == 1) {
            total_years += Number(value);
          }
        }
      });
    })

    // if (total_days >= 365) {
    //   total_years += div(total_days, 365);
    //   // total_month += div(total_days, 365);
    //   total_days = total_days % 365;
    // }

    // if (total_month >= 12) {
    //   total_years += div(total_month, 12);
    //   total_month = total_month % 12;
    // }

    seniority_result.innerHTML = seniority_string(total_years, total_month, total_days);

    if (total_days > 0 || total_month > 0 || total_years > 0) { seniority_result_window.style.display = 'block'; }

  }

  // Get Difference Of Days Between Two Days
  function getNumberOfDays(start, end) {
    const date1 = new Date(start);
    const date2 = new Date(end);

    // One day in milliseconds 
    const oneDay = 1000 * 60 * 60 * 24;

    // Calculating the time difference between two dates 
    const diffInTime = date2.getTime() - date1.getTime();

    // Calculating the no. of days between two dates 
    const diffInDays = Math.round(diffInTime / oneDay);

    return diffInDays;
  }

  // Seniority Result String
  function seniority_string(yyyy = 0, mm = 0, dd = 0) {
    let years = '',
      month = '',
      days = '';

    if (dd >= 365) {
      yyyy += div(dd, 365);
      // total_month += div(total_days, 365);
      dd = dd % 365;
    }

    if (mm >= 12) {
      yyyy += div(mm, 12);
      mm = mm % 12;
    }

    if (yyyy > 0) { years += `${yyyy} ${getDeclOfYears(yyyy)}` } else { years = ''; }
    if (mm > 0) { month += `${mm} ${getDeclOfMonth(mm)}` } else { month = ''; }
    if (dd > 0) { days += `${dd} ${getDeclOfDays(dd)}` } else { days = ''; }

    return `${years} ${month} ${days}`
  }

  // Seniority Reset
  let seniority_btn_reset = document.querySelector('.seniority .btn__reset');
  seniority_btn_reset.addEventListener('click', function () {
    let seniority = document.querySelector('.seniority');
    let inputs = seniority.querySelectorAll('.input');
    for (let index = 0; index < inputs.length; index++) {
      inputs[index].value = inputs[index].getAttribute('data-value');
      input_focus_remove(inputs[index]);
      input_placeholder_add(inputs[index])
    }
  })

  // Expirience Block
  let exp_block = document.querySelector('.seniority__exp');
  let exp_inputs = exp_block.querySelectorAll('.input');
  let exp_reset = exp_block.querySelector('.clear__btn');

  exp_reset.addEventListener('click', function () {
    for (let index = 0; index < exp_inputs.length; index++) {
      exp_inputs[index].value = exp_inputs[index].getAttribute('data-value');
      input_focus_remove(exp_inputs[index]);
      input_placeholder_add(exp_inputs[index])
    }
  })

  // Clear Button
  function clearBtn(el) {
    let item_row = el.closest('.form__row');
    let nextEl = el.closest('.form__row').nextElementSibling;
    if (nextEl && nextEl.className == 'error') {
      el.closest('.form__row').nextElementSibling.remove();
    }
    if (item_row.classList.contains('form__row-indelible')) {
      let inputs = item_row.querySelectorAll('.input');
      for (let index = 0; index < inputs.length; index++) {
        inputs[index].value = inputs[index].getAttribute('data-value');
        input_focus_remove(inputs[index]);
        input_placeholder_add(inputs[index])
      }
    } else {
      item_row.remove();
    }
  }

  // Set Curren Date
  function set_curr_date(el) {
    let el_col = el.closest('.form__column').previousElementSibling;
    let el_inputs = el_col.querySelector('.input');
    input_focus_add(el_inputs);
    el_inputs.value = get_curr_date();
  }

  // Get Curren Date
  function get_curr_date() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd
    }
    if (mm < 10) {
      mm = '0' + mm
    }
    today = dd + '.' + mm + '.' + yyyy;
    return today;
  }

  // Add New Stage Of Date Input
  function add_stage_date(el, event) {
    event.preventDefault();

    let text_start, text_end;

    if (el.closest('.seniority__dates')) {
      text_start = 'Дата приёма на работу';
      text_end = 'Дата увольнения';
    } else if (el.closest('.seniority__additional-dates')) {
      text_start = 'Дата начала периода';
      text_end = 'Дата окончания периода';
    }
    let stage = `<div class="form__row">
                  <div class="form__column">
                    <div class="text">${text_start}</div>
                    <div class="form__line form__date date_begin">
                      <input class="input _date" type="text" data-value="Выбрать дату" inputmode="numeric">
                    </div>
                  </div>
                  <div class="form__column">
                    <div class="text">${text_end}</div>
                    <div class="form__line form__date date_end">
                      <input class="input _date" type="text" data-value="Выбрать дату" inputmode="numeric">
                    </div>
                  </div>
                  <div class="form__column form__column-btns">
                    <button class="current__date" type="button">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <rect x="0.5" y="0.5" width="17" height="17" rx="8.5" fill="white" stroke="#D3DBEC" />
                        <rect class="check" x="4" y="4" width="10" height="10" rx="5" fill="#D2E558" />
                      </svg>
                    </button>
                    <button class="clear__btn" type="button">
                      <svg width="19" height="19" viewBox="0 0 19 19" fill="none">
                        <path
                          d="M9.23389 17.2563C13.376 17.2563 16.7339 13.8985 16.7339 9.75635C16.7339 5.61421 13.376 2.25635 9.23389 2.25635C5.09175 2.25635 1.73389 5.61421 1.73389 9.75635C1.73389 13.8985 5.09175 17.2563 9.23389 17.2563Z"
                          stroke="#C4CFEA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M11.4839 7.50635L6.98389 12.0063" stroke="#C4CFEA" stroke-width="2" stroke-linecap="round"
                          stroke-linejoin="round" />
                        <path d="M6.98389 7.50635L11.4839 12.0063" stroke="#C4CFEA" stroke-width="2" stroke-linecap="round"
                          stroke-linejoin="round" />
                      </svg>
                    </button>
                  </div>
                </div>`;
    el.insertAdjacentHTML('beforebegin', stage);

    init_date_stage(el.previousElementSibling);
  }

  // Initialization Of New Stage Of Date Inputs
  function init_date_stage(el) {
    let inputs = el.querySelectorAll('.input');
    if (inputs.length > 0) {
      for (let index = 0; index < inputs.length; index++) {
        const input = inputs[index];
        const input_g_value = input.getAttribute('data-value');
        input_placeholder_add(input);
        input.addEventListener('focus', function (e) {
          if (input.classList.contains('_date')) {
            input.classList.add('_mask');
            Inputmask("99.99.9999", {
              placeholder: "__.__.____",
              alias: "date",
              // insertMode: false,
              clearIncomplete: true,
              clearMaskOnLostFocus: false,
              onincomplete: function () {
                input_clear_mask(input, input_g_value);
              }
            }).mask(input);
          }
        });
        input.addEventListener('blur', function (e) {
          if (input.value == '') {
            input.value = input_g_value;
            input_focus_remove(input);
            if (input.classList.contains('_mask')) {
              input_clear_mask(input, input_g_value);
            }
          }
        });
        datepicker(input, {
          altFormat: '__.__.____',
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

  // ParseDate
  function parseDate(input) {
    var parts = input.match(/(\d+)/g);
    // note parts[1]-1
    return new Date(parts[2], parts[1] - 1, parts[0]);
  }

  // Word Declension
  function declOfNum(number, words) {
    if (number == 0) {
      return '';
    } else {
      return words[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? Math.abs(number) % 10 : 5]];
    }
  }
  let getDeclOfYears = (item) => declOfNum(item, ['год', 'года', 'лет']);
  let getDeclOfMonth = (item) => declOfNum(item, ['месяц', 'месяца', 'месяцев']);
  let getDeclOfDays = (item) => declOfNum(item, ['день', 'дня', 'дней']);

  // Integer From Division
  function div(val, by) {
    return (val - val % by) / by;
  }

  //IsHidden
  function _is_hidden(el) {
    return (el.offsetParent === null)
  }

  // Forms
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
              onincomplete: function () {
                input_clear_mask(input, input_g_value);
              }
            }).mask(input);
          }
          if (input.classList.contains('_integer1000')) {

            // let parse = (s) => [...s.replace(/[^0-9]/g, "")].reduce((a, c, i, l) => a += c + ((l.length - i) % 3 == 1 ? " " : "") || a, "");

            function prettify(num) {
              var n = num.toString();
              n = n.replace(/\s/g, '');
              return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ');
            }

            input.addEventListener("input", function (e) {
              let input = e.target.value;
              input = input.replace (/\D/g, '');
              e.target.value = prettify(input);

              // if (input.length > 3) {
              //   let output = parse(input);
              //   input += output;
              //   console.log(output);
              // }

              // e.target.value = output;

              // return e.target.value = parse('11 005 0501098 04890');
              // console.log(parse(e.target.value));
              // console.log(parse(e.target.value));
              // let parse = (s) => String(s).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')

            });
          }
          if (input.classList.contains('_month')) {
            input.classList.add('_mask');
            Inputmask("[9][9]", {
              "placeholder": '',
              // regex: '^([1-9]|1[0-2])$',
              clearIncomplete: true,
              clearMaskOnLostFocus: true,
              onincomplete: function () {
                input_clear_mask(input, input_g_value);
              },
              isComplete: function () {
                if (input.value > 12) { input.value = 12 }
              }
            }).mask(input);
          }
          if (input.classList.contains('_days')) {
            input.classList.add('_mask');
            Inputmask("[9][9][9]", {
              "placeholder": '',
              clearIncomplete: true,
              clearMaskOnLostFocus: true,
              min: 1,
              max: 365,
              onincomplete: function () {
                input_clear_mask(input, input_g_value);
              },
              isComplete: function () {
                if (input.value > 365) { input.value = 365 }
              }
            }).mask(input);
          }
          if (input.classList.contains('_date')) {
            input.classList.add('_mask');
            Inputmask("99.99.9999", {
              placeholder: "__.__.____",
              alias: "date",
              // insertMode: false,
              clearIncomplete: true,
              clearMaskOnLostFocus: false,
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
            altFormat: '__.__.____',
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

  // Select
  let selects = document.getElementsByTagName('select');
  if (selects.length > 0) {
    selects_init();
  }
  function selects_init() {
    for (let index = 0; index < selects.length; index++) {
      const select = selects[index];
      select_init(select);
    }
    //select_callback();
    document.addEventListener('click', function (e) {
      selects_close(e);
    });
    document.addEventListener('keydown', function (e) {
      if (e.code === 'Escape') {
        selects_close(e);
      }
    });
  }
  function selects_close(e) {
    const selects = document.querySelectorAll('.select');
    if (!e.target.closest('.select')) {
      for (let index = 0; index < selects.length; index++) {
        const select = selects[index];
        const select_body_options = select.querySelector('.select__options');
        select.classList.remove('_active');
        _slideUp(select_body_options, 100);
      }
    }
  }
  function select_init(select) {
    const select_parent = select.parentElement;
    const select_modifikator = select.getAttribute('class');
    const select_selected_option = select.querySelector('option:checked');
    select.setAttribute('data-default', select_selected_option.value);
    select.style.display = 'none';

    select_parent.insertAdjacentHTML('beforeend', '<div class="select select_' + select_modifikator + '"></div>');

    let new_select = select.parentElement.querySelector('.select');
    new_select.appendChild(select);
    select_item(select);
  }
  function select_item(select) {
    const select_parent = select.parentElement;
    const select_items = select_parent.querySelector('.select__item');
    const select_options = select.querySelectorAll('option');
    const select_selected_option = select.querySelector('option:checked');
    const select_selected_text = select_selected_option.text;
    const select_type = select.getAttribute('data-type');

    if (select_items) {
      select_items.remove();
    }

    let select_type_content = '';
    if (select_type == 'input') {
      select_type_content = '<div class="select__value icon-select-arrow"><input autocomplete="off" type="text" name="form[]" value="' + select_selected_text + '" data-error="Ошибка" data-value="' + select_selected_text + '" class="select__input"></div>';
    } else {
      select_type_content = '<div class="select__value icon-select-arrow"><span>' + select_selected_text + '</span></div>';
    }

    select_parent.insertAdjacentHTML('beforeend',
      '<div class="select__item">' +
      '<div class="select__title">' + select_type_content + '</div>' +
      '<div class="select__options">' + select_get_options(select_options) + '</div>' +
      '</div></div>');

    select_actions(select, select_parent);
  }
  function select_actions(original, select) {
    const select_item = select.querySelector('.select__item');
    const select_body_options = select.querySelector('.select__options');
    const select_options = select.querySelectorAll('.select__option');
    const select_type = original.getAttribute('data-type');
    const select_input = select.querySelector('.select__input');

    select_item.addEventListener('click', function () {
      let selects = document.querySelectorAll('.select');
      for (let index = 0; index < selects.length; index++) {
        const select = selects[index];
        const select_body_options = select.querySelector('.select__options');
        if (select != select_item.closest('.select')) {
          select.classList.remove('_active');
          _slideUp(select_body_options, 100);
        }
      }
      _slideToggle(select_body_options, 100);
      select.classList.toggle('_active');
    });

    for (let index = 0; index < select_options.length; index++) {
      const select_option = select_options[index];
      const select_option_value = select_option.getAttribute('data-value');
      const select_option_text = select_option.innerHTML;

      if (select_type == 'input') {
        select_input.addEventListener('keyup', select_search);
      } else {
        if (select_option.getAttribute('data-value') == original.value) {
          select_option.style.display = 'none';
        }
      }
      select_option.addEventListener('click', function () {
        for (let index = 0; index < select_options.length; index++) {
          const el = select_options[index];
          el.style.display = 'block';
        }
        if (select_type == 'input') {
          select_input.value = select_option_text;
          original.value = select_option_value;
        } else {
          select.querySelector('.select__value').innerHTML = '<span>' + select_option_text + '</span>';
          original.value = select_option_value;
          select_option.style.display = 'none';
        }
      });
    }
  }
  function select_get_options(select_options) {
    if (select_options) {
      let select_options_content = '';
      for (let index = 0; index < select_options.length; index++) {
        const select_option = select_options[index];
        const select_option_value = select_option.value;
        if (select_option_value != '') {
          const select_option_text = select_option.text;
          select_options_content = select_options_content + '<div data-value="' + select_option_value + '" class="select__option">' + select_option_text + '</div>';
        }
      }
      return select_options_content;
    }
  }
  function select_search(e) {
    let select_block = e.target.closest('.select ').querySelector('.select__options');
    let select_options = e.target.closest('.select ').querySelectorAll('.select__option');
    let select_search_text = e.target.value.toUpperCase();

    for (let i = 0; i < select_options.length; i++) {
      let select_option = select_options[i];
      let select_txt_value = select_option.textContent || select_option.innerText;
      if (select_txt_value.toUpperCase().indexOf(select_search_text) > -1) {
        select_option.style.display = "";
      } else {
        select_option.style.display = "none";
      }
    }
  }
  function selects_update_all() {
    let selects = document.querySelectorAll('select');
    if (selects) {
      for (let index = 0; index < selects.length; index++) {
        const select = selects[index];
        select_item(select);
      }
    }
  }

  //SlideToggle
  let _slideUp = (target, duration = 500) => {
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.height = target.offsetHeight + 'px';
    target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout(() => {
      target.style.display = 'none';
      target.style.removeProperty('height');
      target.style.removeProperty('padding-top');
      target.style.removeProperty('padding-bottom');
      target.style.removeProperty('margin-top');
      target.style.removeProperty('margin-bottom');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
      target.classList.remove('_slide');
    }, duration);
  }
  let _slideDown = (target, duration = 500) => {
    target.style.removeProperty('display');
    let display = window.getComputedStyle(target).display;
    if (display === 'none')
      display = 'block';

    target.style.display = display;
    let height = target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + 'ms';
    target.style.height = height + 'px';
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    window.setTimeout(() => {
      target.style.removeProperty('height');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
      target.classList.remove('_slide');
    }, duration);
  }
  let _slideToggle = (target, duration = 500) => {
    if (!target.classList.contains('_slide')) {
      target.classList.add('_slide');
      if (window.getComputedStyle(target).display === 'none') {
        return _slideDown(target, duration);
      } else {
        return _slideUp(target, duration);
      }
    }
  }

  // Polyfill for IE9+ and Safari
  (function (arr) {
    arr.forEach(function (item) {
      if (item.hasOwnProperty('nextElementSibling')) {
        return;
      }
      Object.defineProperty(item, 'nextElementSibling', {
        configurable: true,
        enumerable: true,
        get: function () {
          var el = this;
          while (el = el.nextSibling) {
            if (el.nodeType === 1) {
              return el;
            }
          }
          return null;
        },
        set: undefined
      });
    });
  })([Element.prototype, CharacterData.prototype]);

})