document.addEventListener('DOMContentLoaded', function(){
	// BURGER
	let iconMenu = document.querySelector(".icon-menu");
	let body = document.querySelector("body");
	let menuBody = document.querySelector(".menu");
	if (iconMenu) {
		iconMenu.addEventListener("click", function () {
			iconMenu.classList.toggle("active");
			menuBody.classList.toggle("active");
		});
	}

	// SLIDER
	let slider = document.querySelector('.swiper-container');
	let swiperPartner = new Swiper(slider,{
		slidesPerView: 1,
		loop: true,
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
			clickable: true,
		}
	});

	// FAVORITE
	let favorite = document.querySelector('.favorite');
	favorite.onclick = function() {
		this.classList.toggle('active');
	};

	document.querySelectorAll('.favorite').onclick = function() {
		this.classList.toggle('active');
	}
});