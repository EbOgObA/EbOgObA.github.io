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

    // FORMS
    function forms() {
        //RATING
        $('.rating.edit .star').hover(function() {
            var block=$(this).parents('.rating');
            block.find('.rating__activeline').css({width:'0%'});
                var ind=$(this).index()+1;
                var linew=ind/block.find('.star').length*100;
            setrating(block,linew);
        },function() {
                var block=$(this).parents('.rating');
            block.find('.star').removeClass('active');
                var ind=block.find('input').val();
                var linew=ind/block.find('.star').length*100;
            setrating(block,linew);
        });
        $('.rating.edit .star').click(function(event) {
                var block=$(this).parents('.rating');
                var re=$(this).index()+1;
                block.find('input').val(re);
                var linew=re/block.find('.star').length*100;
            setrating(block,linew);
        });
        $.each($('.rating'), function(index, val) {
                var ind=$(this).find('input').val();
                var linew=ind/$(this).parent().find('.star').length*100;
            setrating($(this),linew);
        });
        function setrating(th,val) {
            th.find('.rating__activeline').css({width:val+'%'});
        }
    }
    forms();

    // =======================================================================================================================

    // BURGER
    let toggleMenu = function() {
        $(".menu-mobile__body").toggleClass('active');
    }

    if ($(".icon-menu")) {
        $(".icon-menu").on("click", function (e) {
            e.preventDefault();
            $(".menu-mobile").toggleClass("active");
            $("body").toggleClass("lock");
            toggleMenu();
        });
    }
    
    $(document).on('click', function(e) {
        const target = e.target;
        const its_menu = $(".menu-mobile__body").has(target).length === 0 && !$(".menu-mobile__body").is(target);
        const its_btnMenu = $(".icon-menu").is(target);
        const menu_is_active = $(".menu-mobile__body").hasClass('active');
        if (its_menu && !its_btnMenu && menu_is_active) {
            $(".menu-mobile").toggleClass("active");
            $("body").toggleClass("lock");
            toggleMenu();
        }
    });

    // =======================================================================================================================

    // FILTER MENU
    $(".filter-mobile__buttons-item").on("click", function (e) {
        if (!$(this).hasClass('active')) {
            $(this).addClass('active').siblings().removeClass('active');
            if (!$(".filter-menu").hasClass('active')) {
                $(".filter-menu").addClass('active');
            }
            // $("body").addClass("lock");
        }
        if ($(this).hasClass('filter-mobile__buttons-item_style')) {
            if ($(".filter-menu").hasClass('active')) {
                $(".filter-menu").removeClass('active');
            }
            setTimeout(function() {
                $(".filter-menu__item_style").addClass('active').siblings().removeClass('active');
                $(".filter-menu").addClass('active');
            }, 200)
        } else if ($(this).hasClass('filter-mobile__buttons-item_metal')) {
            if ($(".filter-menu").hasClass('active')) {
                $(".filter-menu").removeClass('active');
            }
            setTimeout(function() {
                $(".filter-menu__item_metal").addClass('active').siblings().removeClass('active');
                $(".filter-menu").addClass('active');
            }, 200)
        } else if ($(this).hasClass('filter-mobile__buttons-item_price')) {
            if ($(".filter-menu").hasClass('active')) {
                $(".filter-menu").removeClass('active');
            }
            setTimeout(function() {
                $(".filter-menu__item_price").addClass('active').siblings().removeClass('active');
                $(".filter-menu").addClass('active');
            }, 200)
        }
    });

    $(document).on('click', function(e) {
        const target = e.target;
        const its_filter_menu = $(".filter-menu").has(target).length === 0 && !$(".filter-menu").is(target);
        const its_filter_menu_close = $(".filter-menu__head-close").is(target);
        const its_filter_menu_active = $(".filter-menu").hasClass('active');
        if ((its_filter_menu && its_filter_menu_active) || its_filter_menu_close) {
            $(".filter-mobile__buttons-item").removeClass("active");
            $(".filter-menu").removeClass("active");
            // $("body").removeClass("lock");
        }
    });
    
    // =======================================================================================================================

    // NICE SELECT
    $('.sort__select').niceSelect();

    // =======================================================================================================================

    // BUTTON LIKE
    $('.item-catalog__like').on('click', function(){
        $(this).toggleClass('active');
    });

    // =======================================================================================================================

    // GOOD SLIDER
    if ($(window).innerWidth() >= 580) {
        $(".item-catalog__thumbs-item").mouseenter(function(ev) {
            let el = ev.currentTarget;
            let el_index = $(this).index() + 1;
            // console.log(el_index);
            let elSlide  = $(this).parent().prev().find('.item-catalog__image');
            let elSlide_index;
            $.each($(elSlide),function(i){
                if ($(elSlide[i]).index()+1 == el_index) {
                    // console.log($(elSlide[i]))
                    $(elSlide[i]).addClass('active').siblings().removeClass('active');
                }
            });
        });
    }
    
    // =======================================================================================================================

    // SLIDERS (SWIPER)
    var swiperHeaderstright = null;
    var mediaQuerySize = 1024;
    function strightSliderInit () {
        if (!swiperHeaderstright) {
            swiperHeaderstright = new Swiper('.header__stright', {
                slidesPerView: 1,
                speed: 500,
                loop: true,
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
                    768: {
                        slidesPerView: 4,
                    },
                }
            });
        }
    }
    function strightSliderDestroy () {
        if (swiperHeaderstright) {
            swiperHeaderstright.destroy();
            swiperHeaderstright = null;
        }
    }
    $(window).on('load resize', function () {
        // Берём текущую ширину экрана
        var windowWidth = $(this).innerWidth();
        // Если ширина экрана меньше или равна mediaQuerySize(1024)
        if (windowWidth <= mediaQuerySize) {
            // Инициализировать слайдер если он ещё не был инициализирован
            strightSliderInit()
            $('.nav-header__list-item-link').addClass('spoller')
        } else {
            // Уничтожить слайдер если он был инициализирован
            strightSliderDestroy()
            $('.nav-header__list-item-link').removeClass('spoller')
        }
    });

    const sliderPartner = document.querySelector('.stright-partners__slider');
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

    const sliderShop = document.querySelectorAll('.shop__slider-container');
    sliderShop.forEach((el) => {
        let swiperShop = new Swiper(el, {
            slidesPerView: 4,
            spaceBetween: 42,
            loop: true,
            allowTouchMove: true,
            navigation: {
                nextEl: el.parentNode.querySelector('.swiper-button-next'),
                prevEl: el.parentNode.querySelector('.swiper-button-prev'),
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