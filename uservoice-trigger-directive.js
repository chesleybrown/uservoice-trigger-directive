'use strict';

angular.module('uservoice-trigger-directive', [])
	.directive('uservoiceTrigger', function() {
		var count = 0;
		
		return {
			restrict: 'A',
			scope: {
				mode: '@'
			},
			link: function (scope, elem, attrs) {
				elem.attr('id', 'feedback-uservoice-' + count.toString());
				count = count + 1;
				
				if (UserVoice) {
					UserVoice.push(['addTrigger', '#' + elem.attr('id'), {mode: scope.mode}]);
				}
			}
		};
	})
;