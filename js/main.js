var game;

var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
game.world.setBounds(0, 0, 2048, 1024);
game.camera.follow(player);

game.state.add('MenuState', MenuState);

game.state.add('GameState', GameState);

game.state.start('MenuState');
