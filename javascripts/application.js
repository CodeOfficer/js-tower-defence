function Matrix(cols, rows){
	console.log('Matrix');
	this.cols = cols; 
	this.rows = rows; 
	this.data = [];
	for (var row=0; row < this.rows; row++) {
		this.data[row] = new Array(this.cols);
	};
	return this;
}

Matrix.prototype.placeSprite = function() {
	console.log('Matrix#placeSprite');
};

// ----------------------------------------------------------------------------

function Game(){
	console.log('Game');
	this.canvas = null; 
	this.ctx = null;
	this.width = null;
	this.height = null;
	this.sprites = [];
	this.running = false;
	this.setup();
	return this;
}

Game.prototype.setup = function() {
	console.log('Game#setup');
	this.canvas = document.getElementById('canvas'); 
	if (this.canvas.getContext){ 
		this.ctx = this.canvas.getContext('2d');
		this.width = this.canvas.width;
		this.height = this.canvas.height;
		this.bindKeys();
		this.addSprites();
		this.run();
	} else {
		alert('Canvas element not supported!');
	};
};

Game.prototype.bindKeys = function() {
	console.log('Game#bindKeys');
	var game = this;
	$(document).bind('keydown', 'a', function(){ game.addSprite(); });
	$(document).bind('keydown', 'up', function(){ game.keyCommand('up'); });
	$(document).bind('keydown', 'down', function(){ game.keyCommand('down'); });
	$(document).bind('keydown', 'left', function(){ game.keyCommand('left'); });
	$(document).bind('keydown', 'right', function(){ game.keyCommand('right'); });
	$(document).bind('keydown', 'p', function(){ game.pause(); });
	$(document).bind('keydown', 'q', function(){ game.teardown(); });
};

Game.prototype.addSprites = function() {
	console.log('Game#addSprites');
	for (var i=0; i < 10; i++) {
		this.addSprite();
	};
};

Game.prototype.addSprite = function() {
	console.log('Game#addSprite');
	this.sprites.push(new Tower(Math.floor(Math.random()*this.width), Math.floor(Math.random()*this.height), 10));
};

Game.prototype.run = function() {
	console.log('Game#run');
	var game = this;
	this.running = true;
	function gameLoop(){ 
		if (game.running) { 
			game.clear();
			game.update(); 
			game.draw(); 
		};
	}
	setInterval(gameLoop, 30);
};

Game.prototype.update = function() {
	console.log('Game#update');
	for (var i=0; i < this.sprites.length; i++) {
		this.sprites[i].update();
	};
};

Game.prototype.draw = function() {
	console.log('Game#draw');
	for (var i=0; i < this.sprites.length; i++) {
		this.sprites[i].draw(this.ctx);
	};
};

Game.prototype.clear = function() {
	console.log('Game#clear');
	this.ctx.clearRect(0, 0, this.width, this.height);

};

Game.prototype.keyCommand = function(command) {
	console.log('Game#keyCommand');
	console.log(command);
};

Game.prototype.pause = function() {
	console.log('Game#pause', this.running);
	this.running = (this.running ? false : true);
};

Game.prototype.teardown = function() {
	console.log('Game#teardown');
};

// ----------------------------------------------------------------------------

function Background(width, height){
	this.width = width;
	this.height = height;
	this.radius = radius;
	this.color = "rgb(200,0,0)";
}

// ----------------------------------------------------------------------------

function Tower(x, y, radius){
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.color = "rgb(200,0,0)";
}

Tower.prototype.update = function() {
	this.x++;
	this.y++;
};

Tower.prototype.draw = function(ctx) {
	ctx.fillStyle = this.color;  
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
	ctx.closePath();
	ctx.fill();
};

Tower.prototype.setPosition = function(x, y) {
	this.x = x;
	this.y = y;
};

Tower.prototype.getPosition = function() {
	return [this.x, this.y];
};

// ----------------------------------------------------------------------------

;(function($) {
	$(function() {
		game = new Game();
	});
})(jQuery);
