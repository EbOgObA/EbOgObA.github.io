$(document).ready(function () {
    // WEBP FUNCTION
    function testWebP(callback) {
        var webP = new Image();
        webP.onload = webP.onerror = function () {
            callback(webP.height == 2);
        };
        webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }

    // =======================================================================================================================

    // TEST WEBP
    testWebP(function (support) {
        if (support == true) {
            document.querySelector('body').classList.add('webp');
        } else {
            document.querySelector('body').classList.add('no-webp');
        }
    });

    // =======================================================================================================================

    // ANCHORS
    $(".anchors").on("click", function (event) {
        event.preventDefault();
        var id = $(this).attr('href'), h, top;
            // top = $(id).offset().top - h;
        if (window.innerWidth > 768) {
            h = 80;
        } else {
            h = 52;
        }
        top = $(id).offset().top - h;
        $('body,html').animate({ scrollTop: top }, 1500);
    });

    // =======================================================================================================================

    $('.payment-item__methods-item').on('click', function(){
        $(this).addClass('active').siblings().removeClass('active');
    });

    // =======================================================================================================================
    
    // DELETE AFTER HANDLING COUPON BOX
    $('.payment__coupon-sbmt').on('click', function() {
        let couponValue = $('.payment__coupon-input').val();
        if (couponValue !== "" && !$('.payment__coupon-info').hasClass('active')) {
            $('.payment__coupon-info').addClass('active');
            $('.payment__coupon-info-btn').removeClass('disabled');
            $('.payment__coupon-input').addClass('disabled');
            $(this).addClass('disabled');
        }
    });
    $('.payment__coupon-info-close').on('click', function() {
        $('.payment__coupon-info').removeClass('active');
    });
    $('.payment__coupon-input-clear').on('click', function() {
        $('.payment__coupon-input').val("");
        $('.payment__coupon-input').removeClass('disabled');
        $('.payment__coupon-sbmt').removeClass('disabled');
        $('.payment__coupon-info-btn').addClass('disabled');
        $('.payment__coupon-info').removeClass('active');
    });
    $('.payment__coupon-info-btn').on('click', function() {
        let couponValue = $('.payment__coupon-input').val();
        if (couponValue !== "" && !$('.payment__coupon-info').hasClass('active')) {
            $('.payment__coupon-info').addClass('active');
        }
    });

    // =======================================================================================================================

    //SLIDERS
    if ($('.pay-item__slider').length > 0) {
        $('.pay-item__slider').slick({
            dots: true,
            arrows: true,
            accessibility: false,
            slidesToShow: 1,
            nextArrow: '<button type="button" class="slick-next"></button>',
            prevArrow: '<button type="button" class="slick-prev"></button>',
        });
    }

    // =======================================================================================================================

    // CLIPBOARD
    var clipboard = new ClipboardJS('.btn-clipboard');
    clipboard.on('success', function(e) {
        $('.btn-clipboard.is-copy').removeClass('is-copy').text('Копировать');
        
        // $(e.trigger).text('Скопировано');
        $(e.trigger).addClass('is-copy');

        setTimeout(function() {
            $('.btn-clipboard').removeClass('is-copy');
        }, 1000);
    });

    // =======================================================================================================================

    // CHECK TERMS OF USE

    // простенький класс, для упрощения сохранения 
    // и чтения массивов объектов в localStorage
    class Stogage {
        constructor(name){
            // конструктор. создает в localStorage 
            // именованное хранилище
            // запоминаем название именованного хранилища
            this.name = name;
            // создаем ассоциативный массив в котором для
            // быстрого доступа будут кэшироваться объекты
            // сохраняемые в именованном хранилище
            this.hash = {};
            // если в localStorage уже есть данные 
            // сохраненые под ключем с именем this.name
            // то считываем их в this.hash
            let text = sessionStorage.getItem(this.name);
            if(text)
                this.hash = JSON.parse(text);
                // сохраняем ассоциативный массив this.hash в
                // localStorage под именем this.name 
                this.save();  
        }
        get(id){
            // получить значение по его id из именованного хранилища 
            // с именем this.name
            return this.item.find(item=>item.id===id)
        }
        add(id, data){
            // сохранить значение по его id в именованном хранилище
            // с именем this.name
            this.hash[id] = data;
            this.save();
        }
        del(id){
            // удалить значение по его id в именованном хранилище
            // с именем this.name
            delete this.hash[id];
            this.save();
        }
        save(){
            // преобразуем ассоциативный массив this.hash в массив list
            this.list = Object.values(this.hash);
            // преобразуем массив list в строку text
            const text = JSON.stringify(this.hash);
            // сохраняем строку text в localStorage под
            // именем this.name
            sessionStorage.setItem(this.name, text);      
        }
        
    }
    // создаем объект класса Stogage для хранения данных о состоянии checkbox-в в localStorage
    const checkbox_store = new Stogage('checkbox_store');
    // восстанавливает состояния checkbox-в сохраненные в localstorage checkbox_store
    checkbox_store.list.forEach(item=>{
    // если есть такой элемент, выставляем ему запомненное состояние
        if( item.state === "on" )
            return $('#' + item.id).prop('checked', item.state);
            checkbox_store.del(item.id);
    });
    // устанавливаем обработчик для фиксации изменения состояния checkbox-в с классом check
    $('body').on('change', '.check', function(event){
        let id = $(this).attr('id');
        let state = event.currentTarget.checked?"on":undefined;
        checkbox_store.add(id, {
            id: id,
            state: state
        });
    });

    let state;
    function sortCheckboxStore() {
        checkbox_store.list.forEach(function(value,key) {
            return state = value.state;
        }); 
    }
    
    $('.check-terms__label').on('click', function(e){
        sortCheckboxStore();
        $('.check-lic').hasClass('err')?$('.check-lic').removeClass('err'):true;
        if (state === undefined || checkbox_store.list.length == 0) {
            sessionStorage.setItem('btnContinue','active');
            $('#popup-details__btn-continue').addClass('active');
        } else {
            sessionStorage.removeItem('btnContinue','active');
            $('#popup-details__btn-continue').removeClass('active');
        }
    });
    if (sessionStorage.getItem('btnContinue')) {
        $('#popup-details__btn-continue').addClass('active');
    } else {
        sessionStorage.removeItem('btnContinue');
        $('#popup-details__btn-continue').removeClass('active');
    }
    $('.popup-details__btn-continue').on('click', function(e){
        sortCheckboxStore();
        if (state === undefined || checkbox_store.list.length == 0) {
            e.preventDefault();
            $('.check-lic').addClass('err');
        } else {
            return true;
        }
    });

    // =======================================================================================================================

    $(window).scroll(function () {
        var w = $(window).width();
        if ($(window).scrollTop() > 60) {
            $('.btn-back').addClass('active');
        } else {
            $('.btn-back').removeClass('active');
        }
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

    //POPUP
    $('.pl').click(function (event) {
        var pl = $(this).attr('href').replace('#', '');
        var v = $(this).data('ms');
        popupOpen(pl, v);
        return false;
    });
    function popupOpen(pl, v) {
        $('.popup').removeClass('active').hide();
        if (!$('.menu__body').hasClass('active')) {
            //$('body').data('scroll',$(window).scrollTop());
        }
        if (!isMobile.any()) {
            $('body').css({ paddingRight: $(window).outerWidth() - $('.wrapper').outerWidth() }).addClass('lock');
            $('.pdb').css({ paddingRight: $(window).outerWidth() - $('.wrapper').outerWidth() });
        } else {
            setTimeout(function () {
                $('body').addClass('lock');
            }, 300);
        }
        history.pushState('', '', '#' + pl);
        if (v != '' && v != null) {
            $('.popup-' + pl + ' .popup-video__value').html('<iframe src="https://www.youtube.com/embed/' + v + '?autoplay=1"  allow="autoplay; encrypted-media" allowfullscreen></iframe>');
        }
        $('.popup-' + pl).fadeIn(300).delay(300).addClass('active');

        if ($('.popup-' + pl).find('.slick-slider').length > 0) {
            $('.popup-' + pl).find('.slick-slider').slick('setPosition');
        }
    }
    function openPopupById(popup_id) {
        $('#' + popup_id).fadeIn(300).delay(300).addClass('active');
    }
    function popupClose() {
        $('.popup').removeClass('active').fadeOut(300);
        if (!$('.menu__body').hasClass('active')) {
            if (!isMobile.any()) {
                setTimeout(function () {
                    $('body').css({ paddingRight: 0 });
                    $('.pdb').css({ paddingRight: 0 });
                }, 200);
                setTimeout(function () {
                    $('body').removeClass('lock');
                    //$('body,html').scrollTop(parseInt($('body').data('scroll')));
                }, 200);
            } else {
                $('body').removeClass('lock');
                //$('body,html').scrollTop(parseInt($('body').data('scroll')));
            }
        }
        $('.popup-video__value').html('');

        history.pushState('', '', window.location.href.split('#')[0]);
    }
    $('.popup-close,.popup__close,.popup-details__btn-cancel,.popup-login__btn-cancel, .popup-thanks__button').click(function (event) {
        popupClose();
        return false;
    });
    $('.popup').click(function (e) {
        if (!$(e.target).is(".popup>.popup-table>.cell *") || $(e.target).is(".popup-close") || $(e.target).is(".popup__close")) {
            popupClose();
            return false;
        }
    });
    $(document).on('keydown', function (e) {
        if (e.which == 27) {
            popupClose();
        }
    });

    $('.goto').click(function () {
        var el = $(this).attr('href').replace('#', '');
        var offset = 0;
        $('body,html').animate({ scrollTop: $('.' + el).offset().top + offset }, 500, function () { });

        if ($('.menu__body').hasClass('active')) {
            $('.menu__body,.icon-menu').removeClass('active');
            $('body').removeClass('lock');
        }
        return false;
    });

    //Клик вне области
    $(document).on('click touchstart', function (e) {
        if (!$(e.target).is(".select *")) {
            $('.select').removeClass('active');
        };
    });

    if ($('.t,.tip').length > 0) {
        tip();
    }
    function tip() {
        $('.t,.tip').webuiPopover({
            placement: 'top',
            trigger: 'hover',
            backdrop: false,
            //selector:true,
            animation: 'fade',
            dismissible: true,
            padding: false,
            //hideEmpty: true
            onShow: function ($element) { },
            onHide: function ($element) { },
        }).on('show.webui.popover hide.webui.popover', function (e) {
            $(this).toggleClass('active');
        });
    }

    // =======================================================================================================================

    // IBG
    function ibg() {
        let ibg = document.querySelectorAll(".ibg");
        for (var i = 0; i < ibg.length; i++) {
            if (ibg[i].querySelector('img') && ibg[i].querySelector('img').getAttribute('src') != null) {
                ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
            }
        }
    }
    ibg();

    // =======================================================================================================================

    // BURGER
    let iconMenu = document.querySelector(".icon-menu");
    let body = document.querySelector("body");
    let menuBody = document.querySelector(".menu__body");
    if (iconMenu) {
        iconMenu.addEventListener("click", function () {
            iconMenu.classList.toggle("active");
            body.classList.toggle("lock");
            menuBody.classList.toggle("active");
        });
    }

    // =======================================================================================================================
    
    $('body').on('click','.franchise-var', function() {
        $(this).parent().addClass('active').siblings().removeClass('active');
        let valFranch = $(this).next().children('.item-choose__info-price').text();
        $('.franchise-value').text(valFranch)
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
        $('.form-input__viewpass').click(function (event) {
            if ($(this).hasClass('active')) {
                $(this).parent().find('input').attr('type', 'password');
            } else {
                $(this).parent().find('input').attr('type', 'text');
            }
            $(this).toggleClass('active');
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
        //CHECK
        $.each($('.check'), function (index, val) {
            if ($(this).find('input').prop('checked') == true) {
                $(this).addClass('active');
            }
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
        //OPTION
        $.each($('.option.active'), function (index, val) {
            $(this).find('input').prop('checked', true);
        });
        $('.option').click(function (event) {
            if (!$(this).hasClass('disable')) {
                var target = $(event.target);
                if (!target.is("a")) {
                    if ($(this).hasClass('active') && $(this).hasClass('order')) {
                        $(this).toggleClass('orderactive');
                    }
                    $(this).parents('.options').find('.option').removeClass('active');
                    $(this).toggleClass('active');
                    $(this).children('input').prop('checked', true);
                }
            }
        });
        //RANGE
        $("#range" ).slider({
            animate: "fast",
            range: "min",
            min: 1,
            max: 2000,
            value: 2000,
            slide: function( event, ui ){
                $('#rangeto').val(ui.value);
                $(this).parent().find('.max__value').html(ui.value);
            },
        });
        $("#rangeto").bind("change", function () {
            if ($(this).val() > $("#range").slider("option", "max")) {
                $(this).val($("#range").slider("option", "max"));
            }
            if ($(this).val() < $("#range").slider("option", "min")) {
                $(this).val($("#range").slider("option", "min"));
            }
            $("#range").slider("value", $(this).val());
            $(this).parent().parent().parent().find('.max__value').html($(this).val());
        });
        $("#range2" ).slider({
            animate: "fast",
            range: "min",
            min: 1,
            max: 2000,
            value: 2000,
            slide: function( event, ui ){
                $('#rangeto2').val(ui.value);
                $(this).parent().parent().find('.max__value').html(ui.value);
            },
        });
        $("#rangeto2").bind("change", function () {
            if ($(this).val() > $("#range2").slider("option", "max")) {
                $(this).val($("#range2").slider("option", "max"));
            }
            if ($(this).val() < $("#range2").slider("option", "min")) {
                $(this).val($("#range2").slider("option", "min"));
            }
            $("#range2").slider("value", $(this).val());
            $(this).parent().parent().find('.max__value').html($(this).val());
        });
        $("#range3" ).slider({
            animate: "fast",
            range: "min",
            min: 1,
            max: 2000,
            value: 2000,
            slide: function( event, ui ){
                $('#rangeto3').val(ui.value);
                $(this).parent().find('.max__value').html(ui.value);
                $('#amount').html(ui.value + ' EOS');
                $('#private-key__send-amount').html(ui.value + ' EOS');
            },
        });
        $("#rangeto3").bind("change", function () {
            if ($(this).val() > $("#range3").slider("option", "max")) {
                $(this).val($("#range3").slider("option", "max"));
            }
            if ($(this).val() < $("#range3").slider("option", "min")) {
                $(this).val($("#range3").slider("option", "min"));
            }
            $("#range3").slider("value", $(this).val());
            $(this).parent().parent().parent().find('.max__value').html($(this).val());
            $('#amount').html($(this).val() + ' EOS');
            $('#private-key__send-amount').html($(this).val() + ' EOS');
        });

        $('.rangeto-change_minus').click(function () {
            var $input = $(this).parent().find('input');
            var count = parseInt($input.val()) - 1;
            $input.val(count);
            $input.change();
            return false;
        });
        $('.rangeto-change_plus').click(function () {
            var $input = $(this).parent().find('input');
            var count = parseInt($input.val()) + 1;
            $input.val(count);
            $input.change();
            return false;
        });

        if ($('.payment__container-white').length > 0) {
            $("#range" ).slider({
                value: 1500,
            });
            $("#range2" ).slider({
                value: 1500,
            });
            $("#range3" ).slider({
                value: 1500,
            });
            $('.item-choose__label').on('click', function() {
                var valFranchise = $(this).parent().find('.item-choose__info-price').html().replace(" EOS","");
                $('#rangeto, #rangeto2, #rangeto3').val(valFranchise);
                $("#range" ).slider({
                    value: valFranchise,
                    change: function() {
                        $(this).parent().find('.max__value').html(valFranchise);
                        $('#private-key__send-amount').html(valFranchise + ' EOS');
                    }
                });
                $("#range2" ).slider({
                    value: valFranchise,
                    change: function() {
                        $(this).parent().parent().find('.max__value').html(valFranchise);
                    }
                });
                $("#range3" ).slider({
                    value: valFranchise,
                    change: function() {
                        $(this).parent().find('.max__value').html(valFranchise);
                        $('#amount').html(valFranchise + ' EOS');
                        $('#private-key__send-amount').html(valFranchise + ' EOS');
                    }
                });
            });
        }
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
    function formLoad() {
        $('.popup').hide();
        $('.popup-message-body').hide();
        $('.popup-message .popup-body').append('<div class="popup-loading"><div class="popup-loading__title">Идет загрузка...</div><div class="popup-loading__icon"></div></div>');
        $('.popup-message').addClass('active').fadeIn(300);
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
            //input.parents('.select-block').find('.select-options').hide();
        }
    }
    function removeFormErrors(form) {
        form.find('.err').removeClass('err');
        form.find('.form__error').remove();
    }
    function maskclear(n) {
        if (n.val() == "") {
            n.inputmask('remove');
            if (!n.hasClass('l')) {
                n.val(n.attr('data-value'));
            }
            n.removeClass('focus');
            n.parent().removeClass('focus');
        }
    }
    function searchselectreset() {
        $.each($('.select[data-type="search"]'), function (index, val) {
            var block = $(this).parent();
            var select = $(this).parent().find('select');
            if ($(this).find('.select-options__value:visible').length == 1) {
                $(this).addClass('focus');
                $(this).parents('.select-block').find('select').val($('.select-options__value:visible').data('value'));
                $(this).find('.select-title__value').val($('.select-options__value:visible').html());
                $(this).find('.select-title__value').attr('data-value', $('.select-options__value:visible').html());
            } else if (select.val() == '') {
                $(this).removeClass('focus');
                block.find('input.select-title__value').val(select.find('option[selected="selected"]').html());
                block.find('input.select-title__value').attr('data-value', select.find('option[selected="selected"]').html());
            }
        });
    }
})


// ================================================================================================




