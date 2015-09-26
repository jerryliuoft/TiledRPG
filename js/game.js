'use strict';
var RPG = RPG || {};


RPG.GameState = function (game){};
RPG.GameState.prototype = {

    preload : function() {
    // anything here should be in the preloader
    },

    create: function () {
        //this.game.physics.startSystem(Phaser.Physics.ARCADE);

        /**
        *Map = function(game, floor, wall, min_room_size, max_room_size, max_room_number)
        *These parameters are here for example. The required parameters are:
        *The image for the floor tiles (ex. 'floor') Change in the class
        *The image for the wall tiles (ex. 'wall') Change in the class incase more image is needed
        *Minimum room size (in tiles) (ex.  2)
        *Maximum room size (in tiles) (ex. 5)
        *Maximum number of rooms possible (ex. 10)
        *
        */
        //this.game.world.setBounds(0, 0, 640, 480);
        this.game.world.setBounds(0, 0, 1920, 1920);
        this.background = this.game.add.tileSprite (0,0,1920,1920,'background');
        this.background.autoScroll(-20,0); // make sky move
        this.game_map = new Map(this.game,3,8,5);



        this.player = new Player(this.game, this.game_map.player_x, this.game_map.player_y, this.game_map.maps, this.game_map.walls);

        // TODO make tree apear infront of player if player is behind
        this.game_map.walls.add(this.player);

        // add a camera
        this.stalker = this.game.add.sprite (this.game_map.player_x,this.game_map.player_y,null);
        this.game.physics.arcade.enable(this.stalker);
        this.camera.follow(this.stalker);

        //water animation
        this.water = this.game.add.sprite (this.game_map.player_x,this.game_map.player_y,'water');
        var bounce = this.game.add.tween(this.water);
        bounce.to({y:this.water.y+10}, 500,Phaser.Easing.Linear.None, true, 0, -1,1);


    },
    update : function (){
        //this.game.physics.arcade.collide(this.player, this.game_map.walls);
        this.game_map.walls.sort('y', Phaser.Group.SORT_ASCENDING);
        //camera follows the player
        this.game.physics.arcade.moveToObject(this.stalker, this.player,20, 500);


    }


};






