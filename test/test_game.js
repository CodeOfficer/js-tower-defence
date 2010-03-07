(function($) {
	with(QUnit) {
		
		context('Tower Defence','game')
			.should('return a new game', function() {
				var app = new Game();
				// defined(app, 'route');
				ok(true);
			});
			
	};
})(jQuery);
