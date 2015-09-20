var MenuState = {

    preload : function() {
        // Load all the needed resources for the menu.
        game.load.image('menu', 'PlanetCute/Star.png');

        
    },

    create: function () {
        game.world.setBounds(0, 0, 1920, 1920);

        // Add menu screen.
        // It will act as a button to start the game.
        this.add.button(5, 30, 'menu', this.startGame, this);
        game.camera.follow(player);

    },

    startGame: function () {

        // Change the state to the actual game.
        this.state.start('GameState');

    }

};