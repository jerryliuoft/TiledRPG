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
        this.game.load.image("grass", "PlanetCute/Grass Block.png");
        this.game.load.image("dirt", "PlanetCute/Dirt Block.png");
        this.game.load.image("plain", "PlanetCute/Plain Block.png");
        this.game.load.image("wall", "PlanetCute/Wall Block.png");
        this.game.load.image("water", "PlanetCute/Water Block.png");
        this.game.load.image("wood", "PlanetCute/Wood Block.png");

        this.game.load.image("tree_short", "PlanetCute/Tree Short.png");
        this.game.load.image("tree_tall", "PlanetCute/Tree Tall.png");
        this.game.load.image("tree_ugly", "PlanetCute/Tree Ugly.png");
        this.game.load.image("rock", "PlanetCute/Rock.png");

        this.game.load.image("background", "img/Cartoon Clouds And Blue Sky Wallpaper 2560X1600.jpg");

		this.game.load.image("player", "PlanetCute/Character Cat Girl.png");
		this.game.load.image("enemy", "PlanetCute/Enemy Bug.png");
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