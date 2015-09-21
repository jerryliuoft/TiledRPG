'use strict';

var RPG = RPG || {};
/**
* preload state that loads all assets and shows load bar
*
*/

RPG.PreloadState = function (game){
    RPG.GAME_WIDTH = 640;
    RPG.GAME_HEIGHT = 960;

};
RPG.PreloadState.prototype= {

	preload: function() {

		//this.asset.cropEnabled = true;
		// load the sprite in the middle of the screen
		this.asset = this.add.sprite (RPG.GAME_WIDTH/2, RPG.GAME_HEIGHT/2, 'preloadBar');
		this.asset.anchor.setTo (0.5,0.5);
		//set this as preloader sprite
		this.load.setPreloadSprite(this.asset);

		// when this.ready turns true = game finished loading, load next state
		this.ready = false;
		// load a sprite for loader image
		this.preloadBar
		this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
		this.game.load.image("star", "PlanetCute/Star.png");
		this.game.load.image("map_grass", "PlanetCute/Grass Block.png");
		this.game.load.image("player", "PlanetCute/Character Boy.png");
		this.game.load.image("town", "PlanetCute/Wall Block.png");
		this.game.load.image("enemy","PlanetCute/Character Princess Girl.png");
		this.game.load.image("sword", "ChanceCards/Sword.png");
		this.game.load.image("stone", "ChanceCards/Runestone_Blue.png");


        this.game.load.image("wall", "./img/wall.png");
        this.game.load.image("floor", "./img/floor.png");
	
	},

	create:function (){

	},

	update:function (){
		if(this.ready){
			this.game.state.start('Menu');
		}
	},

	onLoadComplete: function(){
		this.ready = true;
	}
};