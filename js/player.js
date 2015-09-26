//player class

'use strict'

 function Player(game, x, y, map, floors){
	console.log('in Player!');

    this.floor_tile_size_height = 80;
    this.floor_tile_size_width = 100;

    //set up the sprite to the correct location
    var new_x = game.math.snapToFloor(x, this.floor_tile_size_width);
    var new_y = game.math.snapToFloor(y, this.floor_tile_size_height);


	Phaser.Sprite.call(this, game, new_x, new_y, "player");
    
	
	console.log('the tile at player is '+ map[0][0]);
	this.game.physics.arcade.enableBody(this);
    this.body.setSize(this.floor_tile_size_width, this.floor_tile_size_height, 0, 50);

    //this.anchor.setTo(0.5,0.5);
	game.add.existing(this);
	this.game = game;
    this.floors = floors;
    this.maps = map;
    this.initKeyboard(game);
	
};
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.initKeyboard = function (game){

    // add the up down left right keys for movement
    this.key1 = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    this.key1.onDown.add(this.moveUp, this);
    this.key2 = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    this.key2.onDown.add(this.moveDown, this);
    this.key3 = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    this.key3.onDown.add(this.moveRight, this);
    this.key4 = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.key4.onDown.add(this.moveLeft, this);

}

Player.prototype.moveUp = function(){
    if (this.canMove('up')){
        this.y -= this.floor_tile_size_height;
    }   
}
Player.prototype.moveDown = function(){
    if (this.canMove('down'))
    {
        this.y += this.floor_tile_size_height;
    }
}
Player.prototype.moveLeft = function(){
    if (this.canMove('left')){
    this.x -= this.floor_tile_size_width;
    }
}
Player.prototype.moveRight = function(){
    if (this.canMove('right')){
    this.x += this.floor_tile_size_width;
    }
}

Player.prototype.canMove = function (direction){

    var x_index = this.x/this.floor_tile_size_width;
    var y_index = this.y/this.floor_tile_size_height;

    switch (direction){
        case 'up' :
            if (this.maps[x_index][y_index-1].parent == this.floors){
                return true;
            }
            break;
        case 'down':
                if (this.maps[x_index][y_index+1].parent == this.floors){
                return true;
            }
            break;
        case 'left':
            if (this.maps[x_index-1][y_index].parent == this.floors){
                return true;
            }
            break;
        case 'right':
            if (this.maps[x_index+1][y_index].parent == this.floors){
                return true;
            }
            break;
        default:
            return false;

    }
    return false;
}

Player.prototype.update= function (){

  /*
  
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;                     
  
    if (this.cursors.left.onDown) {
        console.log ("hi");
    } 

    else if (this.cursors.right.onDown) {
        this.game.physics.arcade.moveToXY(
        this, 
        this.body.x + this.width, // target x position
        this.body.y, // keep y position the same as we are moving along x axis
        250 // velocity to move at
        );

    } 
    
    if (this.cursors.up.onDown) {
        this.game.physics.arcade.moveToXY(
        this, 
        this.body.x, // target x position
        this.body.y-this.height, // keep y position the same as we are moving along x axis
        250 // velocity to move at
        );
    } else if (this.cursors.down.onDown) {
        this.game.physics.arcade.moveToXY(
        this, 
        this.body.x, // target x position
        this.body.y+this.height, // keep y position the same as we are moving along x axis
        250 // velocity to move at
        );
    }  
    */   
}
