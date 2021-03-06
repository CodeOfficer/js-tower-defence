
function Player(){
	return this;
}

// ----------------------------------------------------------------------------
// http://dev.opera.com/articles/view/creating-pseudo-3d-games-with-html-5-can-1/
// http://dev.opera.com/articles/view/3d-games-with-canvas-and-raycasting-part/

var map_terrain = [
	['.','X','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.'],
	['.','X','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.'],
	['.','X','.','.','.','.','.','.','.','.','.','.','.','X','X','X','.'],
	['.','X','.','.','.','.','.','.','.','.','.','.','.','X','.','X','.'],
	['.','X','.','.','.','.','.','.','.','.','.','.','.','X','.','X','.'],
	['.','X','.','.','.','.','.','.','.','.','.','.','.','X','.','X','.'],
	['.','X','.','.','.','.','.','.','.','.','.','.','.','X','.','X','.'],
	['.','X','.','.','.','.','.','.','.','.','.','.','.','X','.','X','.'],
	['.','X','.','.','.','.','.','.','.','.','.','.','.','X','.','X','.'],
	['.','X','.','.','X','X','X','X','X','X','X','X','X','X','.','X','.'],
	['.','X','.','.','X','.','.','.','.','.','.','.','.','.','.','X','.'],
	['.','X','.','.','X','.','.','.','.','.','.','.','.','.','.','X','.'],
	['.','X','.','.','X','.','.','.','.','.','.','.','.','.','.','X','.'],
	['.','X','.','.','X','.','.','.','.','.','.','.','.','.','.','X','.'],
	['.','X','.','.','X','.','.','.','.','.','.','.','.','.','.','X','.'],
	['.','X','X','X','X','.','.','.','.','.','.','.','.','.','.','X','.'],
	['.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','X','.'],
	['.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','X','.']
];

var map_path = [
	[1,0],[1,15],[4,15],[4,15],[4,9],[13,9],[13,2],[15,2],[15,17]
];

function Map(offset, data, path){
	this.scale	 = 20;
	this.offset	 = offset;
	this.cols		 = data[0].length; 
	this.rows		 = data.length; 
	this.path		 = path;
	this.terrain = [];
	this.units	 = [];
	for (var row=0; row < this.rows; row++) {
		this.terrain[row] = new Array(this.cols);
		this.units[row]		= new Array(this.cols);
		for (var col=0; col < this.cols; col++) {
			this.terrain[row][col] = data[row][col];
			this.units[row][col]	 = null;
		};
	};
	return this;
}

Map.prototype.placeActor = function(x, y, actor) {
	this.units[x][y] = actor;
};

Map.prototype.entrance = function() {
	// return something
};

Map.prototype.exit = function() {
	// return something
};

Map.prototype.draw = function(ctx) {
	for (var row=0; row < this.rows; row++) {
		for (var col=0; col < this.cols; col++) {
			var tile = this.terrain[row][col];
			if (tile == '.') {
				ctx.fillStyle = "rgb(0,0,0)";
				ctx.fillRect(	 
					(col * this.scale) + this.offset,
					row * this.scale,
					this.scale,
					this.scale
				);
			} else {
				ctx.strokeStyle = "rgb(255,255,255)";
				ctx.strokeRect(	 
					(col * this.scale) + this.offset,
					row * this.scale,
					this.scale,
					this.scale
				);				
			};
		};
	};
	for (var pos=0; pos < this.path.length; pos++) {
		ctx.strokeStyle = "rgb(255,0,0)";
		ctx.strokeRect(	 
			(this.path[pos][0] * this.scale) + this.offset,
			this.path[pos][1] * this.scale,
			this.scale,
			this.scale
		);				
	};
};

// ----------------------------------------------------------------------------

function BottomBar(game){
	this.game		 = game;
	this.width	 = 800; 
	this.height	 = 100; 
	return this;
}

BottomBar.prototype.draw = function(ctx) {
	ctx.fillStyle = "rgb(255,255,255)";
	ctx.fillRect(	 
		0,
		360,
		this.width,
		this.height
	);				
};

// ----------------------------------------------------------------------------

function SideBar(game){
	this.game		 = game;
	this.width	 = 120; 
	this.height	 = 450; 
	return this;
}

SideBar.prototype.draw = function(ctx) {
	ctx.fillStyle = "rgb(255,255,255)";
	ctx.fillRect(	 
		340,
		0,
		this.width,
		this.height
	);
};

// ----------------------------------------------------------------------------

function Game(){
	this.canvas	 = null; 
	this.ctx		 = null;
	this.width	 = null;
	this.height	 = null;
	this.actors	 = [];
	this.player	 = null;
	this.p1_map	 = null;
	this.p2_map	 = null;
	this.bottom	 = null;
	this.running = false;
	this.setup();
	return this;
}

Game.prototype.setup = function() {
	this.canvas = document.getElementById('canvas'); 
	if (this.canvas.getContext){ 
		this.ctx			 = this.canvas.getContext('2d');
		this.width		 = this.canvas.width;
		this.height		 = this.canvas.height;
		this.p1_map		 = new Map(0, map_terrain, map_path);
		this.p2_map		 = new Map(this.canvas.width/2+60, map_terrain, map_path);
		this.bottombar = new BottomBar(this);
		this.sidebar	 = new SideBar(this);
		this.player		 = new Player();
		this.bindKeys();
		this.addActors();
	} else {
		alert('Canvas element not supported!');
	};
};

Game.prototype.bindKeys = function() {
	var game = this;
	$(document).bind('keydown', 'up', function(){ game.keyCommand('up'); });
	$(document).bind('keydown', 'down', function(){ game.keyCommand('down'); });
	$(document).bind('keydown', 'left', function(){ game.keyCommand('left'); });
	$(document).bind('keydown', 'right', function(){ game.keyCommand('right'); });
	$(document).bind('keydown', 'a', function(){ game.addActor(); });
	$(document).bind('keydown', 'q', function(){ game.teardown(); });
	$(document).bind('keydown', 'p', function(){ game.pause(); });
	$(document).bind('keydown', 'r', function(){ game.run(); });
	$('#add-tower').bind('click', function(){ game.addActor(); return false; });
	$('#pause-game').bind('click', function(){ game.pause(); return false; });
	$('#run-game').bind('click', function(){ game.run(); return false; });
};

Game.prototype.addActors = function() {
	for (var i=0; i < 10; i++) {
		this.addActor(i+10);
	};
};

Game.prototype.addActor = function(i) {
	this.actors.push(new Tower(Math.floor(Math.random()*this.width), Math.floor(Math.random()*this.height), i));
};

Game.prototype.run = function() {
	// var game = this;
	// this.running = true;
	// function gameLoop(){ 
	//	if (game.running) { 
			game.clear();
				game.p1_map.draw(this.ctx); 
				game.p2_map.draw(this.ctx); 
				game.bottombar.draw(this.ctx); 
				game.sidebar.draw(this.ctx); 
			game.update(); 
			game.draw(); 
	//	};
	// }
	// setInterval(gameLoop, 30);
};

Game.prototype.update = function() {
	for (var i=0; i < this.actors.length; i++) {
		this.actors[i].update();
	};
};

Game.prototype.draw = function() {
	for (var i=0; i < this.actors.length; i++) {
		this.actors[i].draw(this.ctx);
	};
};

Game.prototype.clear = function() {
	this.ctx.clearRect(0, 0, this.width, this.height);
};

Game.prototype.keyCommand = function(command) {
	console.log(command);
};

Game.prototype.pause = function() {
	console.log('Game#pause', this.running);
	this.running = (this.running ? false : true);
};

Game.prototype.teardown = function() {
};

// ----------------------------------------------------------------------------

function Background(width, height){
	this.width	= width;
	this.height = height;
	this.radius = radius;
	this.color	= "rgb(200,0,0)";
}

// ----------------------------------------------------------------------------

function Tower(x, y, radius){
	this.x			= x;
	this.y			= y;
	this.radius = radius;
	this.color	= "rgb(200,0,0)";
	this.oob		= false;
}

Tower.prototype.update = function() {
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

function Enemy(x, y, radius){
	this.x			= x;
	this.dx			= dx;
	this.y			= y;
	this.dy			= dy;
	this.radius = radius;
	this.color	= "rgb(200,0,0)";
	this.oob		= false;
}

Enemy.prototype.update = function() {
	if (this.x > WIDTH || this.x < 0 || this.y > HEIGHT || this.y < 0)
		this.oob = true;
	else {
		this.x += this.dx;
		this.y += this.dy;
	}
	this.x++;
	this.y++;
};

Enemy.prototype.draw = function(ctx) {
	ctx.fillStyle = this.color;	 
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
	ctx.closePath();
	ctx.fill();
};

Enemy.prototype.setPosition = function(x, y) {
	this.x = x;
	this.y = y;
};

Enemy.prototype.getPosition = function() {
	return [this.x, this.y];
};

// ----------------------------------------------------------------------------

;(function($) {
	$(function() {
		game = new Game();
	});
})(jQuery);
