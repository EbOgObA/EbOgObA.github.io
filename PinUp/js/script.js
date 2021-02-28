document.addEventListener('DOMContentLoaded', function(){
	
	// BURGER
	let iconMenu = document.querySelector(".icon-menu");
	let menuBody = document.querySelector(".menu");
	let menuOverlay = document.querySelector(".menu-overlay");
	if (iconMenu) {
		iconMenu.addEventListener("click", function () {
			iconMenu.classList.toggle("active");
			menuBody.classList.toggle("active");
			menuOverlay.classList.toggle("active");
			body.classList.toggle("lock");
		})
	};
	menuOverlay.addEventListener("click", function () {
		iconMenu.classList.toggle("active");
		menuBody.classList.toggle("active");
		menuOverlay.classList.toggle("active");
		body.classList.toggle("lock");
	});

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


	// POPUPS
	const popupLinks = document.querySelectorAll('.popup-link');
	const body = document.querySelector('body');

	if (popupLinks.length > 0) {
		for (let index = 0; index < popupLinks.length; index++) {
			const popupLink = popupLinks[index];
			popupLink.addEventListener("click", function (e) {
				const popupName = popupLink.getAttribute('href').replace('#', '');
				const curentPopup = document.getElementById(popupName);
				popupOpen(curentPopup);
				e.preventDefault();
			});
		}
	}
	const popupCloseIcon = document.querySelectorAll('.close-popup');
	if (popupCloseIcon.length > 0) {
		for (let index = 0; index < popupCloseIcon.length; index++) {
			const el = popupCloseIcon[index];
			el.addEventListener('click', function (e) {
				popupClose(el.closest('.popup'));
				e.preventDefault();
			});
		}
	}

	function popupOpen(curentPopup) {
		if (curentPopup) {
			const popupActive = document.querySelector('.popup.open');
			if (popupActive) {
				popupClose(popupActive);
			}
			curentPopup.classList.add('open');
			curentPopup.addEventListener("click", function (e) {
				if (!e.target.closest('.popup__content')) {
					popupClose(e.target.closest('.popup'));
				}
			});
		}
	}

	function popupClose(popupActive) {
		popupActive.classList.remove('open');
	}

	document.addEventListener('keydown', function (e) {
		if (e.which === 27) {
			const popupActive = document.querySelector('.popup.open');
			popupClose(popupActive);
		}
	});

	(function () {
		// проверяем поддержку
		if (!Element.prototype.closest) {
			// реализуем
			Element.prototype.closest = function (css) {
				var node = this;
				while (node) {
					if (node.matches(css)) return node;
					else node = node.parentElement;
				}
				return null;
			};
		}
	})();
	(function () {
		// проверяем поддержку
		if (!Element.prototype.matches) {
			// определяем свойство
			Element.prototype.matches = Element.prototype.matchesSelector ||
				Element.prototype.webkitMatchesSelector ||
				Element.prototype.mozMatchesSelector ||
				Element.prototype.msMatchesSelector;
		}
	})();
});