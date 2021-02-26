document.addEventListener('DOMContentLoaded', function(){
	// BURGER
	let iconMenu = document.querySelector(".icon-menu");
	let body = document.querySelector("body");
	let menuBody = document.querySelector(".menu");
	let menuOverlay = document.querySelector(".menu-overlay");
	if (iconMenu) {
		iconMenu.addEventListener("click", function () {
			iconMenu.classList.toggle("active");
			menuBody.classList.toggle("active");
			menuOverlay.classList.toggle("active");
			body.classList.toggle("lock");
		});
	}

	// SLIDER
	let slider = document.querySelector('.swiper-container');
	let swiperPartner = new Swiper(slider,{
		slidesPerView: 1,
		loop: true,
		autoHeight: true,
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
			clickable: true,
		}
	});

	// FAVORITE
	let favorite = document.querySelectorAll('.favorite');
	favorite.forEach(element => {
		element.addEventListener('click', () => {
			element.classList.toggle('active');
		});
	});


});