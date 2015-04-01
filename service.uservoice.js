'use strict';

angular
	.module('service.uservoice', [])
	.factory('UserVoice', function ($window) {
		$window.UserVoice = $window.UserVoice || [];
		
		// Inject UserVoice script into DOM
		// jscs:disable
		/* jshint ignore:start */
		(function(){var uv=document.createElement('script');uv.type='text/javascript';uv.async=true;uv.src='//widget.uservoice.com/rnrmZDmdueiXkRibsCROg.js';var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(uv,s)})();
		/* jshint ignore:end */
		// jscs:enable
		
		return $window.UserVoice;
	})
;
