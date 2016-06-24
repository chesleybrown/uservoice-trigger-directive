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
				if (!scope.position) {
					scope.position = 'automatic';
				}
				if (!scope.mode) {
					scope.mode = 'contact';
				}
				
				if (UserVoice) {
					UserVoice.push(['addTrigger', elem[0], {
						mode: scope.mode,
						position: scope.position
					}]);
				}
				
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
