/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calculator() {
	
	const result = document.querySelector(`.calculating__result span`);

	let sex = `female`,
		height,
		weight,
		age,
		ratio = 1.375;

	if (localStorage.getItem(`sex`)) {
		sex = localStorage.getItem(`sex`);
	}

	if (localStorage.getItem(`ratio`)) {
		ratio = localStorage.getItem(`ratio`);
	}

	function initLocalSettings(selector, activeClass) {
		const elements = document.querySelectorAll(selector);
	
		elements.forEach(item => {
			item.classList.remove(activeClass);

			if (item.getAttribute(`id`) == localStorage.getItem(`sex`)) {
				item.classList.add(activeClass);
			}
			if (item.getAttribute(`data-ratio`) == localStorage.getItem(`ratio`)) {
				item.classList.add(activeClass);
			}

		});
	}

	initLocalSettings(`.calculating__choose_big div`,`calculating__choose-item_active`);
	initLocalSettings(`#gender div`,`calculating__choose-item_active`);

	calcTotal();

	function calcTotal() {
		if (!sex || !height || !weight || !age || !ratio) {
			result.textContent = `____`;
			return;
		}

		if (sex == `female`) {
			result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
		} else if (sex == `male`) {
			result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
		}
	
	}

	function getStaticInfo(Selector, activeClass) {
		const elements = document.querySelectorAll(Selector);

		elements.forEach(item => {
			item.addEventListener(`click`, (e) => {
				if (e.target.getAttribute(`data-ratio`)) {
					ratio = +e.target.getAttribute(`data-ratio`);
					localStorage.setItem(`ratio`, +e.target.getAttribute(`data-ratio`));
				} else {
					sex = e.target.getAttribute(`id`);
					localStorage.setItem(`sex`, e.target.getAttribute(`id`));
				}
				
				elements.forEach(item => {
					item.classList.remove(activeClass);
				});
				e.target.classList.add(activeClass);
	
				calcTotal();
	
			});
		});
		
	}

	getStaticInfo(`.calculating__choose_big div`,`calculating__choose-item_active`);
	getStaticInfo(`#gender div`,`calculating__choose-item_active`);

	function getDinamicInfo(selector) {
		const input = document.querySelector(selector);

		input.addEventListener(`input`, () => {

			if (input.value.match(/\D/g)) {
				input.style.border = `2px double red`;
			} else {
				input.style.border = `none`;
			}

			switch(input.getAttribute(`id`)) {
				case `height`:
					height = +input.value;
					break;
				case `weight`:
					weight = +input.value;
					break;
				case `age`:
					age = +input.value;
					break;
			}

			calcTotal();

		});
	}

	getDinamicInfo(`#height`);
	getDinamicInfo(`#weight`);
	getDinamicInfo(`#age`);

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calculator);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
	class MenuCard {
		constructor(src, alr, title, descr, price, parentSelector, ...classes) {
			this.src = src;
			this.alt = alr;
			this.title = title;
			this.descr = descr;
			this.price = price;
			this.classes = classes;
			this.parent = document.querySelector(parentSelector);
			this.transfer = 27;
			this.changrToUAH();
		}

		changrToUAH() {
			this.price = this.price * this.transfer;
		}

		render() {
			const element = document.createElement(`div`);
			
			if (this.classes.length === 0) {
				this.classes = `menu__item`;
				element.classList.add(this.classes);
			} else {
				this.classes.forEach(className => element.classList.add(className));
			}

			element.innerHTML = `
				<img src=${this.src} alt=${this.alt}>
				<h3 class="menu__item-subtitle">${this.title}</h3>
				<div class="menu__item-descr">${this.descr}</div>
				<div class="menu__item-divider"></div>
				<div class="menu__item-price">
					<div class="menu__item-cost">Цена:</div>
					<div class="menu__item-total"><span>${this.price}</span> грн/день</div>
				</div>
			`;
			this.parent.append(element);
		}
	}





// getResources('http://localhost:3000/menu')
// 	.then(data => {
// 		data.forEach(({img, altimg, title, descr, price}) => {
// 			new MenuCard(img, altimg, title, descr, price, `.menu .container`).render();
// 		});
// 	});

	axios.get('http://localhost:3000/menu')
		.then(data => {
			data.data.forEach(({img, altimg, title, descr, price}) => {
				new MenuCard(img, altimg, title, descr, price, `.menu .container`).render();
			});
		});

// getResources('http://localhost:3000/menu')
// 	.then(data => createCard(data));
// function createCard(data) {
// 	data.forEach(({img, altimg, title, descr, price}) => {
// 		const element = document.createElement(`div`);

// 		element.classList.add(`menu__item`);

// 		element.innerHTML = `
// 		<img src=${img} alt=${altimg}>
// 		<h3 class="menu__item-subtitle">${title}</h3>
// 		<div class="menu__item-descr">${descr}</div>
// 		<div class="menu__item-divider"></div>
// 		<div class="menu__item-price">
// 			<div class="menu__item-cost">Цена:</div>
// 			<div class="menu__item-total"><span>${price}</span> грн/день</div>
// 		</div>
// 	`;
// 	document.querySelector(`.menu .container`).append(element);
// 	});
// }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/form.js":
/*!****************************!*\
  !*** ./js/modules/form.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function form(formSelector, modalTimerId) {
	const forms = document.querySelectorAll(formSelector);

	const message = {
		loading: `img/form/spinner.svg`,
		success: `Zhdi zvonka`,
		failure: `Oh shit`

	};

	forms.forEach(item => {
		bindPostData(item);
	});



	function bindPostData(form) {
		form.addEventListener(`submit`, (e) => {
			e.preventDefault();

			let statusMessage = document.createElement(`img`);
			statusMessage.src = message.loading;
			statusMessage.style.cssText = `
				display: block;
				margin: 0 auto;
			`;
			form.insertAdjacentElement(`afterend`, statusMessage);

			const formData = new FormData(form);

			const json = JSON.stringify(Object.fromEntries(formData.entries()));


			(0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
			.then(data => {
				console.log(data);
				showThanksModal(message.success);
				statusMessage.remove();
			})
			.catch(() => {
				showThanksModal(message.failure);
			})
			.finally(() => {
				form.reset();
			});
		});
	}


function showThanksModal(message) {
	const prevModalDialog = document.querySelector(`.modal__dialog`);

	prevModalDialog.classList.add(`hide`);
	(0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerId);

	const thanksModal = document.createElement(`div`);
	thanksModal.classList.add(`modal__dialog`);
	thanksModal.innerHTML = `
	<div class="modal__content">
		<div class="modal__close" data-close>&times;</div>
		<div class="modal__title">${message}</div>
	</div>
	`;

	document.querySelector('.modal').append(thanksModal);

	setTimeout(() => {
		thanksModal.remove();
		prevModalDialog.classList.add(`show`);
		prevModalDialog.classList.remove(`hide`);
		(0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)(`.modal`);
	}, 4000);
}

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (form);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
function openModal(modalSelector, modalTimerId) {
	const modal = document.querySelector(modalSelector);
	modal.classList.add(`show`);
	modal.classList.remove(`hide`);
	document.body.style.overflow = `hidden`;

	console.log(modalTimerId);
	if (modalTimerId) {
	clearInterval(modalTimerId);
	}
}

function closeModal(modalSelector) {
	const modal = document.querySelector(modalSelector);
	modal.classList.add(`hide`);
	modal.classList.remove(`show`);
	document.body.style.overflow = ``;
}

function modal(triggerSelector, modalSelector, modalTimerId) {

	const openModalBtn = document.querySelectorAll(triggerSelector),
		modal = document.querySelector(modalSelector);



	openModalBtn.forEach(btn => {
		btn.addEventListener(`click`, () => openModal(modalSelector, modalTimerId));
	});



// modalClose.addEventListener(`click`, () => {
// 	modal.classList.add(`hide`);
// 	modal.classList.remove(`show`);
// 	// modal.classList.toggle(`show`);

// 	document.body.style.overflow = ``;
// });


	modal.addEventListener(`click`, (e) => {
		if (e.target === modal || e.target.getAttribute(`data-close`) == ``) {
			closeModal(modalSelector);
		}
	});

	document.addEventListener(`keydown`, (e) => {
		if (e.code === `Escape` && modal.classList.contains(`show`)) {
			closeModal(modalSelector);
		}
	});

	

	function showModalByScroll() {
		if (window.pageYOffset + document.documentElement.clientHeight >=
			document.documentElement.scrollHeight) {
			openModal(modalSelector, modalTimerId);
			window.removeEventListener(`scroll`, showModalByScroll);
			}
	}

	window.addEventListener(`scroll`, showModalByScroll);

}



	/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);
	

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({container, slide, nextArrow, prevArrow,
	totalCounter, currentCounter, wrapper, field}) {


	const slides = document.querySelectorAll(slide),
		  slider = document.querySelector(container),
		  current = document.querySelector(currentCounter),
		  nextBtn = document.querySelector(nextArrow),
		  prevBtn = document.querySelector(prevArrow),
		  total = document.querySelector(totalCounter),
		  slidesWrapper = document.querySelector(wrapper),
		  slidesField = document.querySelector(field),
		  width = window.getComputedStyle(slidesWrapper).width;

	let	slideIndex = 1;
	let offset = 0;
	
	slidesField.style.width = 100 * slides.length + `%`;
	slidesField.style.display = `flex`;
	slidesField.style.transition = `0.5s all`;

	slidesWrapper.style.overflow = `hidden`;

	showTotalNumberOfSlides();

	slides.forEach(slide => {
		slide.style.width = width;
	});

	slider.style.position = `relative`;

	const dots = document.createElement(`ol`),
		  dotsArr = [];

	dots.classList.add(`carousel-dots`);
	slider.append(dots);

	for (let i = 0; i < slides.length; i++) {
		const dot = document.createElement(`li`);
		dot.setAttribute(`data-slide-to`, i + 1);
		dot.classList.add(`dot`);

		if (i == 0) {
			dot.style.opacity = 1;
		}
		dots.append(dot);
		dotsArr.push(dot);
	}

	function dotSwitch() {
		dotsArr.forEach(dot => dot.style.opacity = 0.5);
		dotsArr[slideIndex - 1].style.opacity = 1;
	}

	function pxToDigit(px) {
		return +px.slice(0, width.length - 2);
	}



	nextBtn.addEventListener(`click`, () => {
		if (offset == pxToDigit(width) * (slides.length - 1)) {
			offset = 0;
		} else {
			offset += pxToDigit(width);
		}

		if (slideIndex == slides.length) {
			slideIndex = 1;
		} else {
			slideIndex++;
		}
		
		changeCurrentSlideIndex(slideIndex);

		slidesField.style.transform = `translateX(-${offset}px)`;

		dotSwitch();
	});

	prevBtn.addEventListener(`click`, () => {
		if (offset == 0) {
			offset = pxToDigit(width) * (slides.length - 1);
		} else {
			offset -= pxToDigit(width);
		}

		if (slideIndex == 1) {
			slideIndex = slides.length;
		} else {
			slideIndex--;
		}

		changeCurrentSlideIndex(slideIndex);

		slidesField.style.transform = `translateX(-${offset}px)`;

		dotSwitch();
	});


	function showTotalNumberOfSlides() {
		let num = slides.length;
		if (num < 10) {
			total.textContent = `0${num}`;
			current.textContent = `0${slideIndex}`;
		} else {
			total.innerHTML = num;
			current.textContent = slideIndex;
		}
	}

	function changeCurrentSlideIndex(slideIndex) {
	
		if (slideIndex < 10) {
			current.textContent = `0${slideIndex}`;
		} else {
			current.textContent = `${slideIndex}`;
		}
	}

	dotsArr.forEach(dot => {
		dot.addEventListener(`click`, (e) => {
			const slideTo = e.target.getAttribute(`data-slide-to`);

			slideIndex = slideTo;
			offset = pxToDigit(width) * (slideIndex - 1);

			slidesField.style.transform = `translateX(-${offset}px)`;

			dotSwitch();

			changeCurrentSlideIndex(slideIndex);


		});
	});
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });


function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
	const tabs = document.querySelectorAll(tabsSelector),
		  tabsContent = document.querySelectorAll(tabsContentSelector),
		  tabsParent = document.querySelector(tabsParentSelector);


	function hideTabContent() {

		tabsContent.forEach(item => {
			item.classList.remove(`show`, `fade`);

			item.classList.add(`hide`);
		});

		tabs.forEach(item => {
			item.classList.remove(activeClass);
		});
	}

	function showTabContent(i = 0) {
		tabsContent[i].classList.add(`show`, `fade`);
		tabsContent[i].classList.remove(`hide`);

		tabs[i].classList.add(activeClass);
	}

	hideTabContent();
	showTabContent();

	tabsParent.addEventListener(`click`, (event) => {
		const target = event.target;

		if (target && target.classList.contains(tabsSelector.slice(1))) {
			tabs.forEach((item, i) => {
				if (target == item) {
					hideTabContent();
					showTabContent(i);
				}
			});
		}
	});
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadline) {

	function getTimeRemaining(endtime) {
		let days, hours, mins, seconds;
		const t = Date.parse(endtime) - Date.parse(new Date());

		if (t <= 0) {
			days = 0; hours = 3; mins = `00`; seconds = `00`;
		} else {
			days = Math.floor(t / (1000 * 60 * 60 * 24));
		hours = Math.floor(t / (1000 * 60 * 60) % 24);
		mins = Math.floor((t / 1000 / 60) % 60);
		seconds = Math.floor(t / 1000 % 60);
		}

		return {
			'total': t,
			days,
			'hours': hours - 3,
			mins,
			seconds
		};
	}

	function getZero(num) {
		if (num < 10) {
			num = `0` + num;
		}
		return num;
	}

	function setTimer(selector, endtime) {
		const timer = document.querySelector(selector),
			days = timer.querySelector(`#days`),
			hours = timer.querySelector(`#hours`),
			mins = timer.querySelector(`#minutes`),
			seconds = timer.querySelector(`#seconds`),
			timeInterval = setInterval(updateClock, 1000);

			updateClock();

		function updateClock() {
			const t = getTimeRemaining(endtime);

			days.innerHTML = getZero(t.days);
		
			hours.innerHTML = getZero(t.hours);
			
			mins.innerHTML = t.mins;
			seconds.innerHTML = t.seconds;

			if (t.total <= 0) {
				clearInterval(timeInterval);
			}
		}
	}

	setTimer(id, deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResources": () => (/* binding */ getResources),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => {
	const res = await fetch(url, {
			method: "POST",
			headers: {
				'Content-type': 'application/json'
			},
			body: data
	});

	return await res.json();
};

const getResources = async (url) => {
	const res = await fetch(url);
	if (!res.ok) {
		throw new Error(`Could not fetch ${url}, ${res.status}`);
	}
	return await res.json();
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_calculator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/calculator */ "./js/modules/calculator.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/form */ "./js/modules/form.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");









window.addEventListener(`DOMContentLoaded`, () => {

	const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_4__.openModal)('.modal', modalTimerId), 30000);

	(0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
	(0,_modules_modal__WEBPACK_IMPORTED_MODULE_4__["default"])(`[data-modal]`, `.modal`, modalTimerId);
	(0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])('.timer', 2022-12-23);
	(0,_modules_cards__WEBPACK_IMPORTED_MODULE_2__["default"])();
	(0,_modules_calculator__WEBPACK_IMPORTED_MODULE_1__["default"])();
	(0,_modules_form__WEBPACK_IMPORTED_MODULE_3__["default"])('form', modalTimerId);
	(0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])({
		container: `.offer__slider`,
		slide: `.offer__slide`,
		nextArrow: `.offer__slider-next`,
		prevArrow: `.offer__slider-prev`,
		totalCounter: `#total`,
		currentCounter: `#current`,
		wrapper: `.offer__slider-wrapper`,
		field: `.offer__slider-inner`
	});
	
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map