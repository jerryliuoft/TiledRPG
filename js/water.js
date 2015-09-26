//water class
// 0 for down, 1 for up : frame
 function Water(game, x, y){
	console.log('in Water!');
	this.sprite = "water"

	Phaser.Sprite.call(this, game, x, y, this.sprite);
	console.log('created Water!');
	this.game.physics.arcade.enableBody(this);
	game.add.existing(this);
	this.game = game;

};
Water.prototype = Object.create(Phaser.Sprite.prototype);
Water.prototype.constructor = Water;


Water.prototype.create = function (){

	

}

Water.prototype.update= function (){                     
     
}