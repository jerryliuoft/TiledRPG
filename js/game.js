'use strict';
var RPG = RPG || {};

RPG.GameState = function (game){};
RPG.GameState.prototype = {

    preload : function() {
    // anything here should be in the preloader
    },

    create: function () {

        //game.world.setBounds(0, 0, 1920, 1920);
        // Add menu screen.
        // It will act as a button to start the game.
        this.game_map = new Map(this.game, 'floor','wall',2,5,10);

        //this.game.add.sprite (5,5, "player");

    },
    update : function (){

    }

};






