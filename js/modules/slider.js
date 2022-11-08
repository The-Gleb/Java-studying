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

export default slider;