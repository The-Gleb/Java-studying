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

export default calculator;