'use strict';
var RPG = RPG || {};

RPG.MenuState = function (game) {};

RPG.MenuState.prototype = {

    preload : function() {
    
    },

    create: function () {

        //game.world.setBounds(0, 0, 1920, 1920);
        // Add menu screen.
        // It will act as a button to start the game.
        this.add.button(5, 30, 'player', this.startGame, this);

    },

    startGame: function () {
        // Change the state to the actual game.
        this.state.start('Game');

    }

};