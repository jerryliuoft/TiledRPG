'use strict';
var RPG = RPG || {};

RPG.GameState = function (game){};
RPG.GameState.prototype = {

    preload : function() {
    // anything here should be in the preloader
    },

    create: function () {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        //game.world.setBounds(0, 0, 1920, 1920);
        // Add menu screen.
        // It will act as a button to start the game.
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


        this.game_map = new Map(this.game, 'floor','wall',2,4,4);
        this.player = new Player(this.game,'player', 10, 20);

        //this.game.add.sprite (5,5, "player");

    },
    update : function (){


    }

};






