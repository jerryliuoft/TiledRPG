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
        *The image for the floor tiles (ex. 'floor')
        *The image for the wall tiles (ex. 'wall')
        *Minimum room size (in tiles) (ex.  2)
        *Maximum room size (in tiles) (ex. 5)
        *Maximum number of rooms possible (ex. 10)
        *
        */
        this.game.world.setBounds(0, 0, 640, 480);
        //this.game.world.setBounds(0, 0, 1920, 1920);
        this.game_map = new Map(this.game, 'grass','shore',3,8,2);
        this.player = new Player(this.game,'player', this.game_map.player_x, this.game_map.player_y);
        this.camera.follow(this.player);


    },
    update : function (){
        this.game.physics.arcade.collide(this.player, this.game_map.walls);


    }

};






