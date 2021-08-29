$(document).ready(function () {

// === Begin button ripple style === \\\
$(".ripple").on("click", function(event) {
   var _this = $(this),
       offset = $(this).offset(),
       positionX = (event.pageX - offset.left),
       positionY = (event.pageY - offset.top);
   _this.append("<span class='ripple-effect'>");
   _this.find(".ripple-effect").css({
       left: positionX,
       top: positionY
   }).animate({
       opacity: 0,
   }, 1500, function() {
       $(this).remove();
   });
});
// === End button ripple style === \\\

 



 

jQuery(function(e){e.fn.hScroll=function(l){l=l||120,e(this).bind("DOMMouseScroll mousewheel",function(t){var i=t.originalEvent,n=i.detail?i.detail*-l:i.wheelDelta,o=e(this).scrollLeft();o+=n>0?-l:l,e(this).scrollLeft(o),t.preventDefault()})}});


$(document).ready(function() {
    $('.b-storys__modal-wrap').hScroll(60); // You can pass (optionally) scrolling amount
});

var scrolledpx = parseInt($(window).scrollTop());
$(window).scroll( function (){

    scrolledpx = parseInt($(window).scrollTop()); 

    if(scrolledpx > 1){
        $('.b-header').addClass('active');
     } else if(scrolledpx < 2){
      $('.b-header').removeClass('active');
     }

}); 

$('.menu-icon').click(function(){
  $('.b-nav , body').toggleClass('active');
  $('.menu-icon').toggleClass('active');

  $(document).on('click', function(event) {
    if (!$(event.target).closest(".menu-icon , .b-storys__item-btn , .b-storys__modal").length) {
      $('.b-nav , body').removeClass('active');
      $('.menu-icon').removeClass('active');
    }
    event.stopPropagation();
  });

}); 

$('.b-info__block-close').click(function(){
  $(this).parent().parent().removeClass('active');
}); 
 
$("#Berlin").mouseenter(function(e){
    var wrapper = $(this).parent();
    var parentOffset = wrapper.offset(); 
    var relX = e.pageX - parentOffset.left + wrapper.scrollLeft();
    var relY = e.pageY - parentOffset.top + wrapper.scrollTop();

    $('.b-info_berlin').addClass('active');
    $('.b-info_berlin').css({
        left: relX,
        top: relY
    });;
    $('.b-info__block_1').removeClass('active');
    $('.b-info__block_2').removeClass('active');
    $('.b-info__block_3').removeClass('active');
    $('.b-info__block_4').removeClass('active');
    $('.b-info__block_5').removeClass('active');       
});
$('.b-info_berlin').mouseleave(function(){
    $('.b-info_berlin').removeClass('active');

});


$("#map_pin_type_2-4").mouseenter(function(e){
    var wrapper = $(this).parent();
    var parentOffset = wrapper.offset(); 
    var relX = e.pageX - parentOffset.left + wrapper.scrollLeft();
    var relY = e.pageY - parentOffset.top + wrapper.scrollTop();

    $('.b-info__block_1').addClass('active');
    $('.b-info__block_1').css({
        left: relX,
        top: relY
    });;
    $('.b-info__block_2').removeClass('active');
    $('.b-info__block_3').removeClass('active');
    $('.b-info__block_4').removeClass('active');
    $('.b-info__block_5').removeClass('active');       
});
$('.b-info__block_1').mouseleave(function(){
    $('.b-info__block_1').removeClass('active');

});

$("#map_pin_type_2-5").mouseenter(function(e){
    var wrapper = $(this).parent();
    var parentOffset = wrapper.offset(); 
    var relX = e.pageX - parentOffset.left + wrapper.scrollLeft();
    var relY = e.pageY - parentOffset.top + wrapper.scrollTop();

    $('.b-info__block_2').addClass('active');
    $('.b-info__block_1').removeClass('active');
    $('.b-info__block_3').removeClass('active');
    $('.b-info__block_4').removeClass('active');
    $('.b-info__block_5').removeClass('active');     
    $('.b-info__block_2').css({
        left: relX,
        top: relY
    });;   
});
$('.b-info__block_2').mouseleave(function(){
    $('.b-info__block_2').removeClass('active');
});

$("#map_pin_type_2-3").mouseenter(function(e){
    var wrapper = $(this).parent();
    var parentOffset = wrapper.offset(); 
    var relX = e.pageX - parentOffset.left + wrapper.scrollLeft();
    var relY = e.pageY - parentOffset.top + wrapper.scrollTop();

    $('.b-info__block_3').addClass('active');
    $('.b-info__block_2').removeClass('active');
    $('.b-info__block_1').removeClass('active');
    $('.b-info__block_4').removeClass('active');
    $('.b-info__block_5').removeClass('active');     
    $('.b-info__block_3').css({
        left: relX,
        top: relY
    });;   
});
$('.b-info__block_3').mouseleave(function(){
    $('.b-info__block_3').removeClass('active');
});


$("#map_pin_type_2-2").mouseenter(function(e){
    var wrapper = $(this).parent();
    var parentOffset = wrapper.offset(); 
    var relX = e.pageX - parentOffset.left + wrapper.scrollLeft();
    var relY = e.pageY - parentOffset.top + wrapper.scrollTop();

    $('.b-info__block_4').addClass('active');
    $('.b-info__block_2').removeClass('active');
    $('.b-info__block_3').removeClass('active');
    $('.b-info__block_1').removeClass('active');
    $('.b-info__block_5').removeClass('active');     
    $('.b-info__block_4').css({
        left: relX,
        top: relY
    });;   
});
$('.b-info__block_4').mouseleave(function(){
    $('.b-info__block_4').removeClass('active');
});

$("#map_pin_type_2").mouseenter(function(e){
    var wrapper = $(this).parent();
    var parentOffset = wrapper.offset(); 
    var relX = e.pageX - parentOffset.left + wrapper.scrollLeft();
    var relY = e.pageY - parentOffset.top + wrapper.scrollTop();

    $('.b-info__block_5').addClass('active');
    $('.b-info__block_2').removeClass('active');
    $('.b-info__block_3').removeClass('active');
    $('.b-info__block_4').removeClass('active');
    $('.b-info__block_1').removeClass('active');     
    $('.b-info__block_5').css({
        left: relX,
        top: relY
    });;   
});
$('.b-info__block_5').mouseleave(function(){
    $('.b-info__block_5').removeClass('active');
});



$("#map_pin_type_2-65").mouseenter(function(e){
    var wrapper = $(this).parent();
    var parentOffset = wrapper.offset(); 
    var relX = e.pageX - parentOffset.left + wrapper.scrollLeft();
    var relY = e.pageY - parentOffset.top + wrapper.scrollTop();

    $('.b-info__block_01').addClass('active');
    $('.b-info__block_02').removeClass('active');
    $('.b-info__block_03').removeClass('active');
    $('.b-info__block_04').removeClass('active');
    $('.b-info__block_05').removeClass('active');
    $('.b-info__block_06').removeClass('active');
    $('.b-info__block_07').removeClass('active');
    $('.b-info__block_08').removeClass('active');
    $('.b-info__block_09').removeClass('active'); 
    $('.b-info__block_01').css({
        left: relX,
        top: relY
    });;   
});
$('.b-info__block_01').mouseleave(function(){
    $('.b-info__block_01').removeClass('active');
});


$("#map_pin_type_2-44").mouseenter(function(e){
    var wrapper = $(this).parent();
    var parentOffset = wrapper.offset(); 
    var relX = e.pageX - parentOffset.left + wrapper.scrollLeft();
    var relY = e.pageY - parentOffset.top + wrapper.scrollTop();

    $('.b-info__block_02').addClass('active');
    $('.b-info__block_01').removeClass('active');
    $('.b-info__block_03').removeClass('active');
    $('.b-info__block_04').removeClass('active');
    $('.b-info__block_05').removeClass('active');
    $('.b-info__block_06').removeClass('active');
    $('.b-info__block_07').removeClass('active');
    $('.b-info__block_08').removeClass('active');
    $('.b-info__block_09').removeClass('active'); 
    $('.b-info__block_02').css({
        left: relX,
        top: relY
    });;   
});
$('.b-info__block_02').mouseleave(function(){
    $('.b-info__block_02').removeClass('active');
});


$("#3d").mouseenter(function(e){
    var wrapper = $(this).parent();
    var parentOffset = wrapper.offset(); 
    var relX = e.pageX - parentOffset.left + wrapper.scrollLeft();
    var relY = e.pageY - parentOffset.top + wrapper.scrollTop();

    $('.b-info__block_03').addClass('active');
    $('.b-info__block_01').removeClass('active');
    $('.b-info__block_02').removeClass('active');
    $('.b-info__block_04').removeClass('active');
    $('.b-info__block_05').removeClass('active');
    $('.b-info__block_06').removeClass('active');
    $('.b-info__block_07').removeClass('active');
    $('.b-info__block_08').removeClass('active');
    $('.b-info__block_09').removeClass('active'); 
    $('.b-info__block_03').css({
        left: relX,
        top: relY
    });;   
});
$('.b-info__block_03').mouseleave(function(){
    $('.b-info__block_03').removeClass('active');
});



$("#d5").mouseenter(function(e){
    var wrapper = $(this).parent();
    var parentOffset = wrapper.offset(); 
    var relX = e.pageX - parentOffset.left + wrapper.scrollLeft();
    var relY = e.pageY - parentOffset.top + wrapper.scrollTop();

    $('.b-info__block_04').addClass('active');
    $('.b-info__block_01').removeClass('active');
    $('.b-info__block_02').removeClass('active');
    $('.b-info__block_03').removeClass('active');
    $('.b-info__block_05').removeClass('active');
    $('.b-info__block_06').removeClass('active');
    $('.b-info__block_07').removeClass('active');
    $('.b-info__block_08').removeClass('active');
    $('.b-info__block_09').removeClass('active'); 
    $('.b-info__block_04').css({
        left: relX,
        top: relY
    });;   
});
$('.b-info__block_04').mouseleave(function(){
    $('.b-info__block_04').removeClass('active');
});


$("#map_pin_type_2-555S").mouseenter(function(e){
    var wrapper = $(this).parent();
    var parentOffset = wrapper.offset(); 
    var relX = e.pageX - parentOffset.left + wrapper.scrollLeft();
    var relY = e.pageY - parentOffset.top + wrapper.scrollTop();

    $('.b-info__block_05').addClass('active');
    $('.b-info__block_01').removeClass('active');
    $('.b-info__block_02').removeClass('active');
    $('.b-info__block_03').removeClass('active');
    $('.b-info__block_04').removeClass('active');
    $('.b-info__block_06').removeClass('active');
    $('.b-info__block_07').removeClass('active');
    $('.b-info__block_08').removeClass('active');
    $('.b-info__block_09').removeClass('active'); 
    $('.b-info__block_05').css({
        left: relX,
        top: relY
    });;   
});
$('.b-info__block_05').mouseleave(function(){
    $('.b-info__block_05').removeClass('active');
});



$("#map_pin_type_22").mouseenter(function(e){
    var wrapper = $(this).parent();
    var parentOffset = wrapper.offset(); 
    var relX = e.pageX - parentOffset.left + wrapper.scrollLeft();
    var relY = e.pageY - parentOffset.top + wrapper.scrollTop();

    $('.b-info__block_06').addClass('active');
    $('.b-info__block_01').removeClass('active');
    $('.b-info__block_02').removeClass('active');
    $('.b-info__block_03').removeClass('active');
    $('.b-info__block_04').removeClass('active');
    $('.b-info__block_05').removeClass('active');
    $('.b-info__block_07').removeClass('active');
    $('.b-info__block_08').removeClass('active');
    $('.b-info__block_09').removeClass('active'); 
    $('.b-info__block_06').css({
        left: relX,
        top: relY
    });;   
});
$('.b-info__block_06').mouseleave(function(){
    $('.b-info__block_06').removeClass('active');
});



$("#map_pin_type_2-2q").mouseenter(function(e){
    var wrapper = $(this).parent();
    var parentOffset = wrapper.offset(); 
    var relX = e.pageX - parentOffset.left + wrapper.scrollLeft();
    var relY = e.pageY - parentOffset.top + wrapper.scrollTop();

    $('.b-info__block_07').addClass('active');
    $('.b-info__block_01').removeClass('active');
    $('.b-info__block_02').removeClass('active');
    $('.b-info__block_03').removeClass('active');
    $('.b-info__block_04').removeClass('active');
    $('.b-info__block_05').removeClass('active');
    $('.b-info__block_06').removeClass('active');
    $('.b-info__block_08').removeClass('active');
    $('.b-info__block_09').removeClass('active'); 
    $('.b-info__block_07').css({
        left: relX,
        top: relY
    });;   
});
$('.b-info__block_07').mouseleave(function(){
    $('.b-info__block_07').removeClass('active');
});

$("#map_pin_type_2-3q").mouseenter(function(e){
    var wrapper = $(this).parent();
    var parentOffset = wrapper.offset(); 
    var relX = e.pageX - parentOffset.left + wrapper.scrollLeft();
    var relY = e.pageY - parentOffset.top + wrapper.scrollTop();

    $('.b-info__block_08').addClass('active');
    $('.b-info__block_01').removeClass('active');
    $('.b-info__block_02').removeClass('active');
    $('.b-info__block_03').removeClass('active');
    $('.b-info__block_04').removeClass('active');
    $('.b-info__block_05').removeClass('active');
    $('.b-info__block_06').removeClass('active');
    $('.b-info__block_07').removeClass('active');
    $('.b-info__block_09').removeClass('active'); 
    $('.b-info__block_08').css({
        left: relX,
        top: relY
    });;   
});
$('.b-info__block_08').mouseleave(function(){
    $('.b-info__block_08').removeClass('active');
});


$("#map_pin_type_2-8q").mouseenter(function(e){
    var wrapper = $(this).parent();
    var parentOffset = wrapper.offset(); 
    var relX = e.pageX - parentOffset.left + wrapper.scrollLeft();
    var relY = e.pageY - parentOffset.top + wrapper.scrollTop();

    $('.b-info__block_09').addClass('active');
    $('.b-info__block_01').removeClass('active');
    $('.b-info__block_02').removeClass('active');
    $('.b-info__block_03').removeClass('active');
    $('.b-info__block_04').removeClass('active');
    $('.b-info__block_05').removeClass('active');
    $('.b-info__block_06').removeClass('active');
    $('.b-info__block_07').removeClass('active');
    $('.b-info__block_08').removeClass('active'); 
    $('.b-info__block_09').css({
        left: relX,
        top: relY
    });;   
});
$('.b-info__block_09').mouseleave(function(){
    $('.b-info__block_09').removeClass('active');
});



$('.b-storys__item-top').click(function(){
    $(this).parent().addClass('active');
    $('body').toggleClass('active');
}); 
$('.b-storys__modal-btn').click(function(){
    $(this).parent().parent().removeClass('active');
    $('body').removeClass('active');
}); 

$(".b-chronicles__anchor").on("click","a", function (event) {
    event.preventDefault();
    var id  = $(this).attr('href'),
        top = $(id).offset().top;
    $('body,html').animate({scrollTop: top}, 1500);
});

$('#Berlin').click(function (e) {
    $('a[href=#inf2]').tab('show')
    e.preventDefault()
});

$('.b-focus__item-btn').click(function(){
    $(this).parent().parent().parent().toggleClass('active');
}); 
$('.b-focus__item-close').click(function(){
    $(this).parent().parent().parent().removeClass('active');
});


$(".b-nav__content ul li a").on("click","a", function (event) {
    event.preventDefault();
    var id  = $(this).attr('href'),
        top = $(id).offset().top;
    $('body,html').animate({scrollTop: top}, 1500);
});

function getOffsetTop(self) {
    var y = 0;
    if(self.offsetParent) while (true) {
        y += self.offsetTop;
        if(!self.offsetParent) break;
        self = self.offsetParent;
    }
    else if(self.y) y += self.y;
    return y;
}

var elem = document.querySelector('.b-chronicles__col5'),
    elemPosTop = getOffsetTop(elem);

window.onscroll = function() {
    if((this.scrollTop || document.documentElement.scrollTop) == elemPosTop) {
        elem.classList.add('new-class');
        this.onscroll = null;
    }
}

// $(".b-chronicles__nav ul li a,a[href='#top'],a[rel='m_PageScroll2id']").mPageScroll2id({
//     layout:"vertical",
//   scrollSpeed: 5,
//   offset: 120,
//   forceSingleHighlight: true,
//   autoScrollSpeed: true,
//   pageEndSmoothScroll: true,
//   highlightSelector:".b-chronicles__nav ul li a"
// });


 




function moveMenu(){
  if ($(window).width() < 992) {
         $(function(){ 



        })            
    } else{
         $(function(){ 

 

/*window.onresize = function(event){
    document.location.reload(true);
}*/





    })        
  }
}
moveMenu();

$(window).resize(function(){
    moveMenu();
});


 

});



