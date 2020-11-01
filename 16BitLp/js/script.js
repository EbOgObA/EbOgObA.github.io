$(document).ready(function () {
    // WEBP FUNCTION
    // function testWebP(callback) {
    //     var webP = new Image();
    //     webP.onload = webP.onerror = function () {
    //         callback(webP.height == 2);
    //     };
    //     webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    // }
    // testWebP(function (support) {
    //     if (support == true) {
    //         document.querySelector('body').classList.add('webp');
    //     } else {
    //         document.querySelector('body').classList.add('no-webp');
    //     }
    // });

    // =======================================================================================================================

    // function findVideos() {
    //     let videos = document.querySelectorAll('.video');
    
    //     for (let i = 0; i < videos.length; i++) {
    //         setupVideo(videos[i]);
    //     }
    // }
    // function setupVideo(video) {
    //     let link = video.querySelector('.video__link');
    //     let media = video.querySelector('.video__media');
    //     let button = video.querySelector('.video__button');
    //     let id = parseMediaURL(media);
    
    //     video.addEventListener('click', () => {
    //         let iframe = createIframe(id);
    
    //         link.remove();
    //         button.remove();
    //         video.appendChild(iframe);
    //     });
    
    //     link.removeAttribute('href');
    //     video.classList.add('video__enabled');
    // }
    // function parseMediaURL(media) {
    //     let regexp = /https:\/\/i\.ytimg\.com\/vi\/([a-zA-Z0-9_-]+)\/maxresdefault\.jpg/i;
    //     let url = media.src;
    //     let match = url.match(regexp);
    
    //     return match[1];
    // }
    // function createIframe(id) {
    //     let iframe = document.createElement('iframe');
    
    //     iframe.setAttribute('allowfullscreen', '');
    //     iframe.setAttribute('allow', 'autoplay');
    //     iframe.setAttribute('src', generateURL(id));
    //     iframe.classList.add('video__media');
    
    //     return iframe;
    // }
    // function generateURL(id) {
    //     let query = '?rel=0&showinfo=0&autoplay=1';
    
    //     return 'https://www.youtube.com/embed/' + id + query;
    // }
    // findVideos();

    // =======================================================================================================================

    $('select').niceSelect();

    // =======================================================================================================================

    $('.proofs__item-header').on('click', function(){
        $(this).find('.proofs__item-btn').toggleClass('active');
        $(this).find('.proofs__item-logo').toggleClass('active');
    });

    // =======================================================================================================================
    
    const urls = {
		'rus': '/16BitLp/ru.html',
		'eng': '/16BitLp/index.html',
		'ch': '/16BitLp/ch.html',
		'esp': '/16BitLp/esp.html',
	};

    // var langSelect = $('.nice-select');
    var langCurrent = $('.nice-select .current');
    var optionLang = $('.nice-select .list .option');
    var optionLangSelected = $('.nice-select .list .option.selected');

    var attr = $(optionLangSelected).attr('data-value');
    $(langCurrent).prepend('<img class="current__flag" src="img/lang/' + attr + '.png" />');

    $(optionLang).on('click', function() {
        var attr = $(this).attr('data-value');
        location.href = urls[attr];
    });

    // =======================================================================================================================

    // // Проверяем, можно ли использовать Webp формат
    // function canUseWebp() {
    //     // Создаем элемент canvas
    //     let elem = document.createElement('canvas');
    //     // Приводим элемент к булеву типу
    //     if (!!(elem.getContext && elem.getContext('2d'))) {
    //         // Создаем изображение в формате webp, возвращаем индекс искомого элемента и сразу же проверяем его
    //         return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
    //     }
    //     // Иначе Webp не используем
    //     return false;
    // }
    // // Получаем все элементы с дата-атрибутом data-bg
    // let images = document.querySelectorAll('[data-bg]');
    // // Проходимся по каждому
    // for (let i = 0; i < images.length; i++) {
    //     // Получаем значение каждого дата-атрибута
    //     let image = images[i].getAttribute('data-bg');
    //     // Каждому найденному элементу задаем свойство background-image с изображение формата jpg
    //     images[i].style.backgroundImage = 'url(' + image + ')';
    // }

    // // Проверяем, является ли браузер посетителя сайта Firefox и получаем его версию
    // let isitFirefox = window.navigator.userAgent.match(/Firefox\/([0-9]+)\./);
    // let firefoxVer = isitFirefox ? parseInt(isitFirefox[1]) : 0;

    // // Если есть поддержка Webp или браузер Firefox версии больше или равно 65
    // if (canUseWebp() || firefoxVer >= 65) {
    //     // Делаем все то же самое что и для jpg, но уже для изображений формата Webp
    //     let imagesWebp = document.querySelectorAll('[data-bg-webp]');
    //     for (let i = 0; i < imagesWebp.length; i++) {
    //         let imageWebp = imagesWebp[i].getAttribute('data-bg-webp');
    //         imagesWebp[i].style.backgroundImage = 'url(' + imageWebp + ')';
    //     }
    // }

    // =======================================================================================================================

    // const control = {
    //     next(carousel) {
    
    //         const elLength = carousel.find('.bit_carousel-item').length;
    //         const current = carousel.find('.bit_carousel-item.active').first();
    //         let prev = current.prev();
    //         let next = current.next();
    //         if (!prev.length) prev = carousel.find('.bit_carousel-item').last();
    
    //         if (!next.length) next = carousel.find('.bit_carousel-item').first();
    //         let double = next.next();
    //         if (!double.length) double = carousel.find('.bit_carousel-item').first();
    //         let triple = double.next();
    //         if (!triple.length) triple = carousel.find('.bit_carousel-item').first();
    
    //         if (current) {
    //             current.addClass('prev');
    //             current.removeClass('active');
    //             current.css('opacity', .4);
    //         }
    
    //         if (prev) {
    //             prev.css('opacity', 0);
    //         }
    
    //         if (next) {
    //             next.addClass('active');
    //             next.removeClass('next');
    //             next.css('opacity', 1);
    //         }
    
    //         if (double) {
    //             double.addClass('next');
    //             double.removeClass('prev');
    //             double.css('opacity', .4);
    //         }
    //         if (elLength > 3 && triple) {
    //             triple.addClass('next');
    //             triple.removeClass('prev');
    //             triple.css('opacity', 0);
    //         }
    
    //     },
    //     prev(carousel) {
    //         const elLength = carousel.find('.bit_carousel-item').length;
    //         const current = carousel.find('.bit_carousel-item.active').first();
    //         let prev = current.prev();
    //         let next = current.next();
    //         if (!next.length) next = carousel.find('.bit_carousel-item').first();
    
    //         if (!prev.length) prev = carousel.find('.bit_carousel-item').last();
    //         let double = prev.prev();
    //         if (!double.length) double = carousel.find('.bit_carousel-item').last();
    //         let triple = double.prev();
    //         if (!triple.length) triple = carousel.find('.bit_carousel-item').last();
    
    //         if (current) {
    //             current.addClass('next');
    //             current.removeClass('active');
    //             current.css('opacity', .4);
    //         }
    
    //         if (next) {
    //             next.css('opacity', 0);
    //         }
    
    //         if (prev) {
    //             prev.addClass('active');
    //             prev.removeClass('prev');
    //             prev.css('opacity', 1);
    //         }
    
    //         if (double) {
    //             double.addClass('prev');
    //             double.removeClass('next');
    //             double.css('opacity', .4);
    //         }
    //         if (elLength > 3 && triple) {
    //             triple.addClass('prev');
    //             triple.removeClass('next');
    //             triple.css('opacity', 0);
    //         }
    //     }
    // };
    
    // function carouselInit(el) {
    //     if (!el) return;
    //     const carousel = $(el);
    //     const dots = [];
    //     carousel.find('.bit_carousel-item').each((idx, item) => {
    //         const dot = document.createElement('div');
    //         dot.classList.add('bit_carousel-dots');
    //         if (idx === 0) dot.classList.add('bit_carousel-dots-active');
    //         carousel.find('.bit_carousel-dots-wrapper').append(dot);
    //         dots.push(dot);
    //     });
    //     carousel.find('.bit_carousel-item-arrow-prev').on('click', e => {
    //         control.prev(carousel);
    //         let stop = false;
    //         dots.forEach((item, index) => {
    //             if (stop) return;
    //             const isActive = item.classList.contains('bit_carousel-dots-active');
    //             if (isActive) {
    //                 const descr = carousel.next().get(0).querySelectorAll('.bit_carousel-description .text');
    //                 item.classList.remove('bit_carousel-dots-active');
    //                 descr[index].classList.remove('text-active');
    //                 if (index === 0) {
    //                     dots[dots.length - 1].classList.add('bit_carousel-dots-active');
    //                     descr[dots.length - 1].classList.add('text-active');
    //                 } else {
    //                     dots[index - 1].classList.add('bit_carousel-dots-active');
    //                     descr[index - 1].classList.add('text-active');
    //                 }
    //                 stop = true;
    //             }
    //         });
    //     });
    //     carousel.find('.bit_carousel-item-arrow-next').on('click', e => {
    //         control.next(carousel);
    //         let stop = false;
    //         dots.forEach((item, index) => {
    //             if (stop) return;
    //             const isActive = item.classList.contains('bit_carousel-dots-active');
    //             if (isActive) {
    //                 const descr = carousel.next().get(0).querySelectorAll('.bit_carousel-description .text');
    //                 item.classList.remove('bit_carousel-dots-active');
    //                 descr[index].classList.remove('text-active');
    //                 if (index === dots.length - 1) {
    //                     dots[0].classList.add('bit_carousel-dots-active');
    //                     descr[0].classList.add('text-active');
    //                 } else {
    //                     dots[index + 1].classList.add('bit_carousel-dots-active');
    //                     descr[index + 1].classList.add('text-active');
    //                 }
    //                 stop = true;
    //             }
    //         });
    //     });
    // }
    // const slidersCarousel = document.querySelectorAll('.carousel');
    // slidersCarousel.forEach((el) => {
    //     carouselInit(el);
    // });

    // SLIDER

    document.querySelectorAll('.slider').forEach(n => {
        const thumbs = new Swiper(n.querySelector('.gallery-thumbs'), {
            slidesPerView: 1,
            onlyExternal: true,
            allowTouchMove: false,
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            loop: true,
            speed: 750,
            navigation: {
                nextEl: n.querySelector('.swiper-button-next'),
                prevEl: n.querySelector('.swiper-button-prev'),
            },
        });

        const slider = new Swiper(n.querySelector('.gallery-top'), {
            slidesPerView: 3,
            speed: 750,
            loop: true,
            centeredSlides: true,
            navigation: {
                nextEl: n.querySelector('.swiper-button-next'),
                prevEl: n.querySelector('.swiper-button-prev'),
            },
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: true,
            },
            thumbs: {
                swiper: thumbs,
            },
        });

        
    });

    // =======================================================================================================================
    
    // Dynamic Adapt v.1
    // HTML data-move="where(uniq class name),position(digi),when(breakpoint)"
    // e.x. data-move="item,2,992"
    // Andrikanych Yevhen 2020
    var move_array = [];
    var move_objects = document.querySelectorAll("[data-move]");

    if (move_objects.length > 0) {
        for (var _index10 = 0; _index10 < move_objects.length; _index10++) {
            var _el6 = move_objects[_index10];

            var data_move = _el6.getAttribute("data-move");

            if (data_move != "" || data_move != null) {
                _el6.setAttribute("data-move-index", _index10);

                move_array[_index10] = {
                    parent: _el6.parentNode,
                    index: index_in_parent(_el6)
                };
            }
        }
    }

    function dynamic_adapt() {
        var w = document.querySelector("body").offsetWidth;

        if (move_objects.length > 0) {
            for (var _index11 = 0; _index11 < move_objects.length; _index11++) {
                var _el7 = move_objects[_index11];

                var _data_move = _el7.getAttribute("data-move");

                if (_data_move != "" || _data_move != null) {
                    var data_array = _data_move.split(",");

                    var data_parent = document.querySelector("." + data_array[0]);
                    var data_index = data_array[1];
                    var data_bp = data_array[2];

                    if (w < data_bp) {
                        if (!_el7.classList.contains("js-move_done_" + data_bp)) {
                            if (data_index > 0) {
                                //insertAfter
                                var actual_index = index_of_elements(data_parent)[data_index];
                                data_parent.insertBefore(_el7, data_parent.childNodes[actual_index]);
                            } else {
                                data_parent.insertBefore(_el7, data_parent.firstChild);
                            }

                            _el7.classList.add("js-move_done_" + data_bp);
                        }
                    } else {
                        if (_el7.classList.contains("js-move_done_" + data_bp)) {
                            dynamic_adaptive_back(_el7);

                            _el7.classList.remove("js-move_done_" + data_bp);
                        }
                    }
                }
            }
        }
        custom_adapt(w);
    }

    function dynamic_adaptive_back(el) {
        var index_original = el.getAttribute("data-move-index");
        var move_place = move_array[index_original];
        var parent_place = move_place["parent"];
        var index_place = move_place["index"];
        if (index_place > 0) {
            //insertAfter
            var actual_index = index_of_elements(parent_place)[index_place];
            parent_place.insertBefore(el, parent_place.childNodes[actual_index]);
        } else {
            parent_place.insertBefore(el, parent_place.firstChild);
        }
    }

    function index_in_parent(node) {
        var children = node.parentNode.childNodes;
        var num = 0;
        for (var _i2 = 0; _i2 < children.length; _i2++) {
            if (children[_i2] == node) return num;
            if (children[_i2].nodeType == 1) num++;
        }
        return -1;
    }

    function index_of_elements(parent) {
        var children = [];

        for (var _i3 = 0; _i3 < parent.childNodes.length; _i3++) {
            if (parent.childNodes[_i3].nodeType == 1 && parent.childNodes[_i3].getAttribute("data-move") == null) {
                children.push(_i3);
            }
        }

        return children;
    }

    window.addEventListener("resize", function (event) {
        dynamic_adapt();
    });
    dynamic_adapt();

    function custom_adapt(w) { }
    
    // =======================================================================================================================

    // SPLOLLERS
    $.each($('.spoller.active'), function (index, val) {
        $(this).next().show();
    });
    $('body').on('click', '.spoller', function (event) {
        $(this).find('.spoller__link').on('click', function(e) {
            e.stopPropagation();
        });
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
        $(this).parent().find('.spoller-close').toggleClass('active');
        return false;
    });
    $('body').on('click', '.spoller-close', function () {
        $(this).parent().removeClass('active').find('.proofs__item-btn').removeClass('active');
        $(this).prev().slideUp(300);
        $(this).removeClass('active');
    });

    // =======================================================================================================================

    // =======================================================================================================================

    // ANCHORS
    $(".anchors").on("click", function (event) {
        event.preventDefault();
        var id = $(this).attr('href'), h = 50, top;
            // top = $(id).offset().top - h;
        // if (window.innerWidth > 768) {
        //     h = 80;
        // } else {
        //     h = 52;
        // }
        top = $(id).offset().top - h;
        $('body,html').animate({ scrollTop: top }, 1500);
    });

    // =======================================================================================================================

    //FORMS
    function forms() {
        //FIELDS
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

        //$('textarea').autogrow({vertical: true, horizontal: false});


        //MASKS//
        //'+7(999) 999 9999'
        //'+38(999) 999 9999'
        //'+375(99)999-99-99'
        //'a{3,1000}' только буквы минимум 3
        //'9{3,1000}' только цифры минимум 3
        $.each($('input.phone'), function (index, val) {
            $(this).attr('type', 'tel');
            $(this).focus(function () {
                $(this).inputmask('+7(999) 999 9999', {
                    clearIncomplete: true, clearMaskOnLostFocus: true,
                    "onincomplete": function () { maskclear($(this)); }
                });
                $(this).addClass('focus');
                $(this).parent().addClass('focus');
                $(this).parent().removeClass('err');
                $(this).removeClass('err');
            });
        });
        $('input.phone').focusout(function (event) {
            maskclear($(this));
        });
        $.each($('input.num'), function (index, val) {
            $(this).focus(function () {
                $(this).inputmask('9{1,1000}', { clearIncomplete: true, placeholder: "", clearMaskOnLostFocus: true, "onincomplete": function () { maskclear($(this)); } });
                $(this).addClass('focus');
                $(this).parent().addClass('focus');
                $(this).parent().removeClass('err');
                $(this).removeClass('err');
            });
        });
        $('input.num').focusout(function (event) {
            maskclear($(this));
        });

        $('body').off('click', '.check', function (event) { });
        $('body').on('click', '.check', function (event) {
            if (!$(this).hasClass('disable')) {
                var target = $(event.target);
                if (!target.is("a")) {
                    $(this).toggleClass('active');
                    if ($(this).hasClass('active')) {
                        $(this).find('input').prop('checked', true);
                    } else {
                        $(this).find('input').prop('checked', false);
                    }
                }
            }
        });
    }
    forms();

    function digi(str) {
        var r = str.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
        return r;
    }

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
    function showMessageByClass(ms) {
        $('.popup').hide();
        popupOpen('message.' + ms, '');
    }
    function showMessage(html) {
        $('.popup-loading').remove();
        $('.popup-message-body').show().html(html);
    }
    function clearForm(form) {
        $.each(form.find('.input'), function (index, val) {
            $(this).removeClass('focus').val($(this).data('value'));
            $(this).parent().removeClass('focus');
            if ($(this).hasClass('phone')) {
                maskclear($(this));
            }
        });
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
    function addErrorByName(form, input__name, error_text) {
        var input = form.find('[name="' + input__name + '"]');
        input.attr('data-error', error_text);
        addError(input);
    }
    function addFormError(form, error_text) {
        form.find('.form__generalerror').show().html(error_text);
    }
    function removeFormError(form) {
        form.find('.form__generalerror').hide().html('');
    }
    function removeError(input) {
        input.removeClass('err');
        input.parent().removeClass('err');
        input.parent().find('.form__error').remove();

        if (input.parents('.select-block').length > 0) {
            input.parents('.select-block').parent().removeClass('err');
            input.parents('.select-block').find('.select').removeClass('err').removeClass('active');
        }
    }
})



const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubeIframeAPIReady() {
    const iframes = document.querySelectorAll('iframe');
    iframes && iframes.forEach(iframe => {
        iframe.id && new YT.Player(iframe.id, {
            events: {
                'onStateChange': function (event) {
                    event.data === 0 && event.target.stopVideo();
                }
            }
        });
    })
}