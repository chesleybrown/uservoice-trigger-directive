'use strict';

angular
	.module('directive.uservoice-trigger', [
		'service.uservoice'
	])
	.directive('uservoiceTrigger', ['UserVoice', function (UserVoice) {
		var count = 0;
		
		return {
			restrict: 'A',
			scope: {
				mode: '@',
				position: '@',
				identify: '='
			},
			link: function (scope, elem) {
				elem.attr('id', 'feedback-uservoice-' + count.toString());
				count = count + 1;
				
				if (!scope.position) {
					scope.position = 'automatic';
				}
				if (!scope.mode) {
					scope.mode = 'contact';
				}
				
				if (UserVoice) {
					UserVoice.push(['addTrigger', '#' + elem.attr('id'), {mode: scope.mode, position: scope.position}]);
				}
				
				var setIdentify = function () {
					if (scope.identify) {
						UserVoice.push(['identify', scope.identify]);
					}
				};
				
				scope.$watch('identify', setIdentify);
			}
		};
	}])
;
