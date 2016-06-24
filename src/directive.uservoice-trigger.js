'use strict';

angular
	.module('directive.uservoice-trigger', [
		'service.uservoice'
	])
	.directive('uservoiceTrigger', function (UserVoice) {
		return {
			restrict: 'A',
			scope: {
				mode: '@',
				position: '@',
				identify: '='
			},
			link: function (scope, elem) {
				// if we failed to initialize UserVoice for some reason, e.g.
				// due to forgetting to configure its API key
				if (!UserVoice) {
					return;
				}
				
				if (!scope.position) {
					scope.position = 'automatic';
				}
				if (!scope.mode) {
					scope.mode = 'contact';
				}
				
				UserVoice.push(['addTrigger', elem[0], {
					mode: scope.mode,
					position: scope.position
				}]);
				scope.$on('$destroy', function () {
					UserVoice.push(['hide']);
					UserVoice.push(['removeTrigger', elem[0]]);
				});
				
				var setIdentify = function () {
					if (scope.identify) {
						UserVoice.push(['identify', scope.identify]);
					}
				};
				
				scope.$watch('identify', setIdentify);
			}
		};
	})
;
