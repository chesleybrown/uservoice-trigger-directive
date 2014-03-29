'use strict';

angular.module('uservoice-trigger-directive', [])
	.directive('uservoiceTrigger', function() {
		var count = 0;
		
		return {
			restrict: 'A',
			scope: {
				mode: '@',
				position: '@',
				identify: '='
			},
			link: function (scope, elem, attrs) {
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
				
				var setIdentify = function() {
					if (scope.identify) {
						UserVoice.push(['identify', scope.identify]);
					}
				};
				
				scope.$watch('identify', setIdentify);
			}
		};
	})
;