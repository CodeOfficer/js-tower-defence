// defined(app, 'route');
// ok(true);
// equal(Sammy.apps['body'], app);
// matches(/^(\d+)-(\d{1,3})$/, this.app.namespace);
// isType(this.app.routes, 'Object');
// deepEqual(route.param_names, ['boosh1', 'boosh2']);
// soon(function() {
// 	equal(context.triggered, false);
// });

(function($) {
	with(QUnit) {
		
		context('TowerDefence', 'game', {
			before: function() {
				var game = new Game();
			}
		})
		.should('return a new initialized game', function() {
			notEqual(game.canvas, null, 'game.canvas isnt');
			notEqual(game.ctx, null, 'game.ctx isnt');
			ok(game.width > 0, 'game.width > 0');
			ok(game.height > 0, 'game.height > 0');
			equal(game.running, false);
		})
		.should('have a map', function() {
			isType(game.map, 'Object');
		})
		.should('have actors', function() {
			isType(game.actors, 'Array');
			ok(game.actors.length > 0, 'game.sprites.length > 0');
		})
		.should('have a player', function() {
			isType(game.player, 'Object');
		});
			
	};
})(jQuery);
