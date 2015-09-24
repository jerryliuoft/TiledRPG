//player class
// 0 for down, 1 for up : frame
 function Player(game, player_img, x, y){
	console.log('in Player!');
	this.move_speed = 150;

	Phaser.Sprite.call(this, game, x, y, player_img);
    
	console.log('created Player!');
	
	this.game.physics.arcade.enableBody(this);
    this.body.setSize(100, 80, 0, 50);
    this.anchor.setTo(0.5,0.5);
	game.add.existing(this);
	this.game = game;
	this.cursors = this.game.input.keyboard.createCursorKeys();
};
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;


Player.prototype.create = function (){

	

}

Player.prototype.update= function (){                     
  
    if (this.cursors.left.isDown) {
        this.body.velocity.x = -this.move_speed;
    } else if (this.cursors.right.isDown) {
        this.body.velocity.x = this.move_speed;
    } else {
        this.body.velocity.x = 0;
    }
    
    if (this.cursors.up.isDown) {
        this.body.velocity.y = -this.move_speed;
    } else if (this.cursors.down.isDown) {
        this.body.velocity.y = this.move_speed;
    } else {
        this.body.velocity.y = 0;
    }     
}