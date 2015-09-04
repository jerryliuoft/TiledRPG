var Menu = {

    preload : function() {
        // Load all the needed resources for the menu.
        game.load.image('menu', 'PlanetCute/Star.png');
    },

    create: function () {

        // Add menu screen.
        // It will act as a button to start the game.
        this.add.button(300, 300, 'menu', this.startGame, this);

    },

    startGame: function () {

        // Change the state to the actual game.
        this.state.start('Game');

    }

};