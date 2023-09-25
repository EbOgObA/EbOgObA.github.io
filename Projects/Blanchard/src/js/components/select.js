import { slideUp, slideToggle } from '../modules/slides.js';

export function selects() {
  let selectAnimTime = 150; // ms
  let selects = document.getElementsByTagName('select');
  if (selects.length > 0) {
    selectsInit();
  }

  function selectsInit() {
    for (let index = 0; index < selects.length; index++) {
      const select = selects[index];
      selectInit(select);
    }

    document.addEventListener('click', function (e) {
      selectsClose(e);
    });

    document.addEventListener('keydown', function (e) {
      if (e.code === 'Escape') {
        selectsClose(e);
      }
    });
  }

  function selectsClose(e) {
    const selects = document.querySelectorAll('.select');
    if (!e.target.closest('.select')) {
      for (let index = 0; index < selects.length; index++) {
        const select = selects[index];
        const selectBodyOptions = select.querySelector('.select__options');
        select.classList.remove('active');
        slideUp(selectBodyOptions, selectAnimTime);
      }
    }
  }

  function selectInit(select) {
    const selectParent = select.parentElement;
    const selectModifikator = select.getAttribute('class');
    const selectSelectedOption = select.querySelector('option:checked');
    select.setAttribute('data-default', selectSelectedOption.value);
    select.style.display = 'none';

    selectParent.insertAdjacentHTML('afterbegin', '<div class="select select_' + selectModifikator + '"></div>');

    let newSelect = select.parentElement.querySelector('.select');
    newSelect.appendChild(select);
    selectItem(select);
  }

  function selectItem(select) {
    const selectParent = select.parentElement;
    const selectItems = selectParent.querySelector('.select__item');
    const selectOptions = select.querySelectorAll('option');
    const selectSelectedOption = select.querySelector('option:checked');
    const selectSelectedText = selectSelectedOption.text;
    const selectType = select.getAttribute('data-type');

    if (selectItems) {
      selectItems.remove();
    }

    let selectTypeContent = '';
    if (selectType == 'input') {
      selectTypeContent = '<div class="select__value icon-select-arrow"><input autocomplete="off" type="text" name="form[]" value="' + selectSelectedText + '" data-error="Ошибка" data-value="' + selectSelectedText + '" class="select__input"></div>';
    } else {
    selectTypeContent = '<button type="button" class="btn-reset select__value icon-select-arrow">' + selectSelectedText + '</button>';
    }

    selectParent.insertAdjacentHTML('afterbegin',
      '<div class="select__item">' +
      '<div class="select__title">' + selectTypeContent + '</div>' +
      '<div class="select__options">' + selectGetOptions(selectOptions) + '</div>' +
      '</div></div>');

    selectActions(select, selectParent);
  }

  function selectActions(original, select) {
    const selectItem = select.querySelector('.select__item');
    const selectBodyOptions = select.querySelector('.select__options');
    const selectOptions = select.querySelectorAll('.select__option');
    const selectType = original.getAttribute('data-type');
    const selectInput = select.querySelector('.select__input');

    selectItem.addEventListener('click', function () {
      let selects = document.querySelectorAll('.select');
      for (let index = 0; index < selects.length; index++) {
        const select = selects[index];
        const selectBodyOptions = select.querySelector('.select__options');
        if (select != selectItem.closest('.select')) {
          select.classList.remove('active');
          slideUp(selectBodyOptions, selectAnimTime);
        }
      }
      slideToggle(selectBodyOptions, selectAnimTime);
      select.classList.toggle('active');
    });

    for (let index = 0; index < selectOptions.length; index++) {
      const selectOption = selectOptions[index];
      const selectOptionValue = selectOption.getAttribute('data-value');
      const selectOptionText = selectOption.innerHTML;

      if (selectType == 'input') {
        selectInput.addEventListener('keyup', selectSearch);
      } else {
        if (selectOption.getAttribute('data-value') == original.value) {
          selectOption.style.display = 'none';
        }
      }
      selectOption.addEventListener('click', function () {
        for (let index = 0; index < selectOptions.length; index++) {
          const el = selectOptions[index];
          el.style.display = 'block';
        }
        if (selectType == 'input') {
          selectInput.value = selectOptionText;
          original.value = selectOptionValue;
        } else {
          select.querySelector('.select__value').textContent = selectOptionText;
          original.value = selectOptionValue;
          selectOption.style.display = 'none';
        }
      });
    }
  }

  function selectGetOptions(selectOptions) {
    if (selectOptions) {
      let selectOptionsContent = '';
      for (let index = 0; index < selectOptions.length; index++) {
        const selectOption = selectOptions[index];
        const selectOptionValue = selectOption.value;
        if (selectOptionValue != '') {
          const selectOptionText = selectOption.text;
          selectOptionsContent = selectOptionsContent + '<button type="button" data-value="' + selectOptionValue + '" class="btn-reset select__option">' + selectOptionText + '</button>';
        }
      }
      return selectOptionsContent;
    }
  }

  function selectSearch(e) {
    let selectBlock = e.target.closest('.select ').querySelector('.select__options');
    let selectOptions = e.target.closest('.select ').querySelectorAll('.select__option');
    let selectSearchText = e.target.value.toUpperCase();

    for (let i = 0; i < selectOptions.length; i++) {
      let selectOption = selectOptions[i];
      let select_txt_value = selectOption.textContent || selectOption.innerText;
      if (select_txt_value.toUpperCase().indexOf(selectSearchText) > -1) {
        selectOption.style.display = '';
      } else {
        selectOption.style.display = 'none';
      }
    }
  }

  // function selectsUpdateAll() {
  //   let selects = document.querySelectorAll('select');
  //   if (selects) {
  //     for (let index = 0; index < selects.length; index++) {
  //       const select = selects[index];
  //       selectItem(select);
  //     }
  //   }
  // }

}