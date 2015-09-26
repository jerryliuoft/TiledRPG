// this is the camera function that follows the player

StalkerCamera = function (game, player){
        this.game = game;
        this.player = player;
	    this.stalker = this.game.add.sprite (0,0,null);
        game.physics.arcade.enable(this.stalker);
        game.camera.follow(this.stalker);




}

StalkerCamera.prototype.update = function (){

        this.game.physics.arcade.moveToObject (this.stalker, this.player);



}

