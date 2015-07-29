'use strict';

angular
	.module('service.uservoice', [])
	.provider('$userVoice', function () {
		var defaults = this.defaults = {
			src: null
		};
		
		this.$get = function () {
			return {defaults: defaults};
		};
	})
	.factory('UserVoice', function ($userVoice, $window) {
		var options = $userVoice.defaults;
		$window.UserVoice = $window.UserVoice || [];
		
		// Must set a uservoice src
		if (!options.src) {
			throw new Error('Missing required UserVoice src setting. Set using $userVoiceProvider.defaults.src');
		}
		
		// Inject UserVoice script into DOM
		// jscs:disable
		/* jshint ignore:start */
		(function(){var uv=document.createElement('script');uv.type='text/javascript';uv.async=true;uv.src=options.src;var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(uv,s)})();
		/* jshint ignore:end */
		// jscs:enable
		
		// To avoid calling the incorrect instance of UserVoice, we use apply
		// to explicitly pass the correct UserVoice instance and the given
		// arguments on method call
		return {
			push: function () {
				$window.UserVoice.push.apply($window.UserVoice, arguments);
			}
		};
	})
;
