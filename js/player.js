//pipe class
// 0 for down, 1 for up : frame
 function Player(game, player_img, x, y){
	console.log('in Player!');
	Phaser.Sprite.call(this, game, x, y, player_img);
	console.log('created Player!');
	this.anchor.setTo(0.5,0.5);
	this.game.physics.arcade.enableBody(this);
	game.add.existing(this);
};
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;




Player.prototype.update= function (){                     
    console.log('in Player.update!');
  
    this.angle += 2;        
}