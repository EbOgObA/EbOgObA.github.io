$(document).ready(function () {
    
    // DYNAMIC ADAPTIVE
    (function () {
        "use strict";
        let originalPositions = [];
        let daElements = document.querySelectorAll('[data-da]');
        let daElementsArray = [];
        let daMatchMedia = [];
        //Заполняем массивы
        if (daElements.length > 0) {
            let number = 0;
            for (let index = 0; index < daElements.length; index++) {
                const daElement = daElements[index];
                const daMove = daElement.getAttribute('data-da');
                if (daMove != '') {
                    const daArray = daMove.split(',');
                    const daPlace = daArray[1] ? daArray[1].trim() : 'last';
                    const daBreakpoint = daArray[2] ? daArray[2].trim() : '767';
                    const daType = daArray[3] === 'min' ? daArray[3].trim() : 'max';
                    const daDestination = document.querySelector('.' + daArray[0].trim())
                    if (daArray.length > 0 && daDestination) {
                        daElement.setAttribute('data-da-index', number);
                        //Заполняем массив первоначальных позиций
                        originalPositions[number] = {
                            "parent": daElement.parentNode,
                            "index": indexInParent(daElement)
                        };
                        //Заполняем массив элементов 
                        daElementsArray[number] = {
                            "element": daElement,
                            "destination": document.querySelector('.' + daArray[0].trim()),
                            "place": daPlace,
                            "breakpoint": daBreakpoint,
                            "type": daType
                        }
                        number++;
                    }
                }
            }
            dynamicAdaptSort(daElementsArray);

            //Создаем события в точке брейкпоинта
            for (let index = 0; index < daElementsArray.length; index++) {
                const el = daElementsArray[index];
                const daBreakpoint = el.breakpoint;
                const daType = el.type;

                daMatchMedia.push(window.matchMedia("(" + daType + "-width: " + daBreakpoint + "px)"));
                daMatchMedia[index].addListener(dynamicAdapt);
            }
        }
        //Основная функция
        function dynamicAdapt(e) {
            for (let index = 0; index < daElementsArray.length; index++) {
                const el = daElementsArray[index];
                const daElement = el.element;
                const daDestination = el.destination;
                const daPlace = el.place;
                const daBreakpoint = el.breakpoint;
                const daClassname = "_dynamic_adapt_" + daBreakpoint;

                if (daMatchMedia[index].matches) {
                    //Перебрасываем элементы
                    if (!daElement.classList.contains(daClassname)) {
                        let actualIndex = indexOfElements(daDestination)[daPlace];
                        if (daPlace === 'first') {
                            actualIndex = indexOfElements(daDestination)[0];
                        } else if (daPlace === 'last') {
                            actualIndex = indexOfElements(daDestination)[indexOfElements(daDestination).length];
                        }
                        daDestination.insertBefore(daElement, daDestination.children[actualIndex]);
                        daElement.classList.add(daClassname);
                    }
                } else {
                    //Возвращаем на место
                    if (daElement.classList.contains(daClassname)) {
                        dynamicAdaptBack(daElement);
                        daElement.classList.remove(daClassname);
                    }
                }
            }
            //customAdapt();
        }

        //Вызов основной функции
        dynamicAdapt();

        //Функция возврата на место
        function dynamicAdaptBack(el) {
            const daIndex = el.getAttribute('data-da-index');
            const originalPlace = originalPositions[daIndex];
            const parentPlace = originalPlace['parent'];
            const indexPlace = originalPlace['index'];
            const actualIndex = indexOfElements(parentPlace, true)[indexPlace];
            parentPlace.insertBefore(el, parentPlace.children[actualIndex]);
        }
        //Функция получения индекса внутри родителя
        function indexInParent(el) {
            var children = Array.prototype.slice.call(el.parentNode.children);
            return children.indexOf(el);
        }
        //Функция получения массива индексов элементов внутри родителя 
        function indexOfElements(parent, back) {
            const children = parent.children;
            const childrenArray = [];
            for (let i = 0; i < children.length; i++) {
                const childrenElement = children[i];
                if (back) {
                    childrenArray.push(i);
                } else {
                    //Исключая перенесенный элемент
                    if (childrenElement.getAttribute('data-da') == null) {
                        childrenArray.push(i);
                    }
                }
            }
            return childrenArray;
        }
        //Сортировка объекта
        function dynamicAdaptSort(arr) {
            arr.sort(function (a, b) {
                if (a.breakpoint > b.breakpoint) { return -1 } else { return 1 }
            });
            arr.sort(function (a, b) {
                if (a.place > b.place) { return 1 } else { return -1 }
            });
        }
        //Дополнительные сценарии адаптации
        function customAdapt() {
            //const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        }
    }());
    
    // =======================================================================================================================

    var isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };
    if (isMobile.any()) { }

    if (location.hash) {
        var hsh = location.hash.replace('#', '');
        if ($('.popup-' + hsh).length > 0) {
            popupOpen(hsh);
        } else if ($('div.' + hsh).length > 0) {
            $('body,html').animate({ scrollTop: $('div.' + hsh).offset().top, }, 500, function () { });
        }
    }
    // $('.wrapper').addClass('loaded');

    var act = "click";
    if (isMobile.iOS()) {
        var act = "touchstart";
    }

    // =======================================================================================================================

    // SPOLLERS
    $.each($('.spoller.active'), function (index, val) {
        $(this).next().show();
    });
    $('body').on('click', '.spoller', function (event) {
        if ($(this).hasClass('mob') && !isMobile.any()) {
            return false;
        }

        if ($(this).parents('.one').length > 0) {
            $(this).parents('.one').find('.spoller').not($(this)).removeClass('active').next().slideUp(300);
            $(this).parents('.one').find('.spoller').not($(this)).parent().removeClass('active');
        }

        if ($(this).hasClass('closeall') && !$(this).hasClass('active')) {
            $.each($(this).closest('.spollers').find('.spoller'), function (index, val) {
                $(this).removeClass('active');
                $(this).next().slideUp(300);
            });
        }
        $(this).toggleClass('active').next().slideToggle(300, function (index, val) {
            if ($(this).parent().find('.slick-slider').length > 0) {
                $(this).parent().find('.slick-slider').slick('setPosition');
            }
        });
        $(this).parent().toggleClass('active');
        $(this).find('.spoller-btn').toggleClass('active');
        return false;
    });

    // =======================================================================================================================

    //FORMS
    function forms() {
        $('input,textarea').focus(function () {
            if ($(this).val() == $(this).attr('data-value')) {
                $(this).addClass('focus');
                $(this).parent().addClass('focus');
                if ($(this).attr('data-type') == 'pass') {
                    $(this).attr('type', 'password');
                };
                $(this).val('');
            };
            removeError($(this));
        });
        $('input[data-value], textarea[data-value]').each(function () {
            if (this.value == '' || this.value == $(this).attr('data-value')) {
                if ($(this).hasClass('l') && $(this).parent().find('.form__label').length == 0) {
                    $(this).parent().append('<div class="form__label">' + $(this).attr('data-value') + '</div>');
                } else {
                    this.value = $(this).attr('data-value');
                }
            }
            if (this.value != $(this).attr('data-value') && this.value != '') {
                $(this).addClass('focus');
                $(this).parent().addClass('focus');
                if ($(this).hasClass('l') && $(this).parent().find('.form__label').length == 0) {
                    $(this).parent().append('<div class="form__label">' + $(this).attr('data-value') + '</div>');
                }
            }

            $(this).click(function () {
                if (this.value == $(this).attr('data-value')) {
                    if ($(this).attr('data-type') == 'pass') {
                        $(this).attr('type', 'password');
                    };
                    this.value = '';
                };
            });
            $(this).blur(function () {
                if (this.value == '') {
                    if (!$(this).hasClass('l')) {
                        this.value = $(this).attr('data-value');
                    }
                    $(this).removeClass('focus');
                    $(this).parent().removeClass('focus');
                    if ($(this).attr('data-type') == 'pass') {
                        $(this).attr('type', 'text');
                    };
                };
                if ($(this).hasClass('vn')) {
                    formValidate($(this));
                }
            });
        });
        $('.form-input__viewpass').click(function (event) {
            if ($(this).hasClass('active')) {
                $(this).parent().find('input').attr('type', 'password');
            } else {
                $(this).parent().find('input').attr('type', 'text');
            }
            $(this).toggleClass('active');
        });
    }
    forms();
    //VALIDATE FORMS
    $('form button[type=submit]').click(function () {
        var er = 0;
        var form = $(this).parents('form');
        var ms = form.data('ms');
        $.each(form.find('.req'), function (index, val) {
            er += formValidate($(this));
        });
        if (er == 0) {
            removeFormError(form);
            if (ms != null && ms != '') {
                showMessageByClass(ms);
                return false;
            }
        } else {
            return false;
        }
    });
    function formValidate(input) {
        var er = 0;
        var form = input.parents('form');
        if (input.attr('name') == 'email' || input.hasClass('email')) {
            if (input.val() != input.attr('data-value')) {
                var em = input.val().replace(" ", "");
                input.val(em);
            }
            if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.val())) || input.val() == input.attr('data-value')) {
                er++;
                addError(input);
            } else {
                removeError(input);
            }
        } else {
            if (input.val() == '' || input.val() == input.attr('data-value')) {
                er++;
                addError(input);
            } else {
                removeError(input);
            }
        }
        if (input.attr('type') == 'checkbox') {
            if (input.prop('checked') == true) {
                input.removeClass('err').parent().removeClass('err');
            } else {
                er++;
                input.addClass('err').parent().addClass('err');
            }
        }
        if (input.hasClass('name')) {
            if (!(/^[А-Яа-яa-zA-Z-]+( [А-Яа-яa-zA-Z-]+)$/.test(input.val()))) {
                er++;
                addError(input);
            }
        }
        if (input.hasClass('pass-2')) {
            if (form.find('.pass-1').val() != form.find('.pass-2').val()) {
                addError(input);
            } else {
                removeError(input);
            }
        }
        return er;
    }
    function addError(input) {
        input.addClass('err');
        input.parent().addClass('err');
        input.parent().find('.form__error').remove();
        if (input.hasClass('email')) {
            var error = '';
            if (input.val() == '' || input.val() == input.attr('data-value')) {
                error = input.data('error');
            } else {
                error = input.data('error');
            }
            if (error != null) {
                input.parent().append('<div class="form__error">' + error + '</div>');
            }
        } else {
            if (input.data('error') != null && input.parent().find('.form__error').length == 0) {
                input.parent().append('<div class="form__error">' + input.data('error') + '</div>');
            }
        }
        if (input.parents('.select-block').length > 0) {
            input.parents('.select-block').parent().addClass('err');
            input.parents('.select-block').find('.select').addClass('err');
        }
    }
    function removeError(input) {
        input.removeClass('err');
        input.parent().removeClass('err');
    }

    // =======================================================================================================================

    // BURGER
    let iconMenu = document.querySelector(".icon-menu");
    let iconMenu_close = document.querySelector(".menu-mobile-close");
    let body = document.querySelector("body");
    let menuMobile = document.querySelector(".menu-mobile");
    let menuMobileBody = document.querySelector(".menu-mobile__body");
    let toggleMenu = function() {
        menuMobileBody.classList.toggle('active');
    }

    if (iconMenu) {
        iconMenu.addEventListener("click", function (e) {
            e.preventDefault();
            // iconMenu.classList.toggle("active");
            menuMobile.classList.toggle("active");
            body.classList.toggle("lock");
            toggleMenu();
        });
    }
    document.addEventListener('click', function(e) {
        const target = e.target;
        const its_menu = target == menuMobileBody || menuMobileBody.contains(target);
        const its_btnMenu = target == iconMenu;
        const menu_is_active = menuMobileBody.classList.contains('active');
        
        if (!its_menu && !its_btnMenu && menu_is_active) {
            // iconMenu.classList.toggle("active");
            menuMobile.classList.toggle("active");
            body.classList.toggle("lock");
            toggleMenu();
        }
    });
    iconMenu_close.addEventListener("click", function (e) {
        menuMobile.classList.toggle("active");
            body.classList.toggle("lock");
            toggleMenu();
    });

    // =======================================================================================================================

    // SLIDERS (SWIPER)
    var swiperHeaderBanner = null;
    var mediaQuerySize = 1024;
    function bannerSliderInit () {
        if (!swiperHeaderBanner) {
            swiperHeaderBanner = new Swiper('.header__banner', {
                slidesPerView: 8,
                speed: 500,
                loop: true,
                allowTouchMove: true,
                autoplay: {
                    delay: 2000,
                },
                disableOnInteraction: false,
                breakpoints: {
                    0: {
                        slidesPerView: 1,
                    },
                    320: {
                        slidesPerView: 1,
                    },
                    580: {
                        slidesPerView: 3,
                        
                    },
                }
            });
        }
    }
    function bannerSliderDestroy () {
        if (swiperHeaderBanner) {
            swiperHeaderBanner.destroy();
            swiperHeaderBanner = null;
        }
    }
    $(window).on('load resize', function () {
        // Берём текущую ширину экрана
        var windowWidth = $(this).innerWidth();
        // Если ширина экрана меньше или равна mediaQuerySize(1024)
        if (windowWidth <= mediaQuerySize) {
            // Инициализировать слайдер если он ещё не был инициализирован
            bannerSliderInit()
            $('.nav-header__list-item-link').addClass('spoller')
        } else {
            // Уничтожить слайдер если он был инициализирован
            bannerSliderDestroy()
            $('.nav-header__list-item-link').removeClass('spoller')
        }
    });

    const sliderPartner = document.querySelector('.banner-partners__slider');
    let swiperPartner = new Swiper(sliderPartner,{
        slidesPerView: 8,
        centeredSlides: true,
        speed: 500,
        loop: true,
        allowTouchMove: true,
        speed: 8000,
        autoplay: {
            delay: 0,
        },
        disableOnInteraction: false,
        breakpoints: {
            0: {
                slidesPerView: 2,
            },
            320: {
                slidesPerView: 2,
            },
            580: {
                slidesPerView: 4,
            },
            768: {
                slidesPerView: 6,
            },
            1024: {
                slidesPerView: 8,
            }
        }
    });

    const sliderBestSellers = document.querySelector('.best-sellers__slider');
    let swiperBestSellers = new Swiper(sliderBestSellers,{
        slidesPerView: 5,
        centerSlides: true,
        loop: true,
        allowTouchMove: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            320: {
                slidesPerView: 1,
            },
            580: {
                slidesPerView: 2,
                centeredSlides: false,
                spaceBetween: 10,
            },
            768: {
                slidesPerView: 3,
                centeredSlides: true,
                spaceBetween: 25,
            },
            1280: {
                slidesPerView: 5,
                centeredSlides: true,
                spaceBetween: 0,
            }
        }
    });

    const sliderShop = document.querySelector('.shop__slider-container');
    let swiperShop = new Swiper(sliderShop,{
        slidesPerView: 4,
        spaceBetween: 42,
        loop: true,
        allowTouchMove: true,

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            320: {
                slidesPerView: 1,
            },
            425: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 3,
            },
            1024: {
                slidesPerView: 4
            },
        }
    });

    const sliderInspiration = document.querySelector('.inspiration__slider-container');
    let swiperInspiration = new Swiper(sliderInspiration,{
        slidesPerView: 4,
        spaceBetween: 42,
        loop: true,
        allowTouchMove: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            320: {
                slidesPerView: 1,
            },
            425: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 3,
            },
            1024: {
                slidesPerView: 4
            },
        }
    });

    // ================================================================================================

    // PULSE BUTTON
    var buttons = document.getElementsByClassName('btn-pulse'),
    forEach = Array.prototype.forEach;

    forEach.call(buttons, function (b) {
        b.addEventListener('click', addElement);
    });

    function addElement(e) {
        var addDiv  = document.createElement('div'),
            mValue  = Math.max(this.clientWidth, this.clientHeight),
            rect    = this.getBoundingClientRect();
            sDiv    = addDiv.style,
            px      = 'px';

        sDiv.width  = sDiv.height = mValue + px;
        sDiv.left  = e.clientX - rect.left - (mValue / 2) + px;
        sDiv.top   = e.clientY - rect.top - (mValue / 2) + px;

        addDiv.classList.add('pulse');
        this.appendChild(addDiv);
    }

    // ================================================================================================

    // LAZY LOAD
    var lazyImages = [].slice.call(document.querySelectorAll('img.load-image'));
    var lazyBackgrounds = [].slice.call(document.querySelectorAll('.lazy-background'));
    var lazyBackgroundsData = [].slice.call(document.querySelectorAll('[data-bg]'));

    if ('IntersectionObserver' in window) {
        var lazyImageObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var lazyImage = entry.target;
                lazyImage.src = lazyImage.dataset.src;
                //lazyImage.srcset = lazyImage.dataset.srcset;
                lazyImage.classList.remove('lazy');
                lazyImageObserver.unobserve(lazyImage);
            }
            });
        });
        lazyImages.forEach(function (lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
        var lazyBackgroundObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                lazyBackgroundObserver.unobserve(entry.target);
            }
            });
        });
        lazyBackgrounds.forEach(function (lazyBackground) {
            lazyBackgroundObserver.observe(lazyBackground);
        });
        var lazyBackgroundDataObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var lazyBackgroundData = entry.target;
                lazyBackgroundData.style.backgroundImage = 'url(' + lazyBackgroundData.dataset.bg + ')';
                lazyBackgroundDataObserver.unobserve(lazyBackgroundData);
            }
            });
        });
        lazyBackgroundsData.forEach(function (lazyBackgroundData) {
            lazyBackgroundDataObserver.observe(lazyBackgroundData);
        });
    } else {
        // Fallback
        lazyImages.forEach(function (lazyImage) {
            lazyImage.src = lazyImage.dataset.src;
            //lazyImage.srcset = lazyImage.dataset.srcset;
        });
        lazyBackgrounds.forEach(function (lazyBackground) {
            lazyBackground.classList.add('visible');
        });
        lazyBackgroundsData.forEach(function (lazyBackgroundData) {
            lazyBackgroundData.style.backgroundImage = 'url(' + lazyBackgroundData.dataset.bg + ')';
        });
    }

})