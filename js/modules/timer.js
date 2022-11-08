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

export default timer;