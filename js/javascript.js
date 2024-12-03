document.addEventListener('DOMContentLoaded', () => {
	const pickr = Pickr.create({
		el: '#custom-overlay',
		theme: 'classic',
		default: '#ff6769',
		components: {
			preview: true,
			opacity: true,
			hue: true,
			interaction: {
				hex: true,
				rgba: true,
				input: true,
				save: true
			}
		}
	});

	pickr.on('save', (color) => {
		const rgbaColor = color.toRGBA().toString();
		document.querySelector('.background').style.backgroundColor = rgbaColor;
		pickr.hide();
	});

	document.getElementById('more').removeAttribute('style');
	document.getElementById('choose').addEventListener('click', () => {
		pickr.show();
	});

	$(document).ready(() => {
		const decreaseBtn = $('#decrease-brightness');
		const increaseBtn = $('#increase-brightness');

		$('#choose1').click(() => {
			decreaseBtn.toggle();
			increaseBtn.toggle();
		});

		let brightness = 1;

		decreaseBtn.click(() => {
			brightness = Math.max(0, brightness - 0.1);
			$('.background').css('filter', `brightness(${brightness})`);
		});

		increaseBtn.click(() => {
			brightness = Math.min(10, brightness + 0.1);
			$('.background').css('filter', `brightness(${brightness})`);
		});
	});

	$(document).ready(() => {
		const sidebar = $('#sidebar');
		const overlay = $('#overlay');

		$('#more').click(() => {
			sidebar.toggle();
			overlay.toggle();
		});

		overlay.click(() => {
			sidebar.hide();
			overlay.hide();
		});

		$('.color-button').click(function() {
			const color = $(this).data('color');
			$('.background').css('background-color', color);
		});
	});

	let countdownInterval;

	$('.countdown').click(function() {
		const seconds = $(this).data('time');
		startCountdown(seconds);
	});

	function startCountdown(seconds) {
		clearInterval(countdownInterval);
		$('#timer-display').show().text(`倒计时剩余：${formatTime(seconds)}`);

		countdownInterval = setInterval(() => {
			seconds--;
			if (seconds <= 0) {
				clearInterval(countdownInterval);
				$('#timer-display').hide();
				alert('倒计时结束，网页即将关闭');
				window.close();
			} else {
				$('#timer-display').text(`倒计时剩余：${formatTime(seconds)}`);
			}
		}, 1000);
	}

	function formatTime(seconds) {
		const minutes = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${minutes}分钟${secs}秒`;
	}

	$('#timer-display').click(() => {
		clearInterval(countdownInterval);
		$('#timer-display').hide();
	});
});