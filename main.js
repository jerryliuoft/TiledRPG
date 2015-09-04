var game;

var game = new Phaser.Game(1000, 1000, Phaser.AUTO, '');

game.state.add('Menu', Menu);

game.state.add('Game', Game);

game.state.start('Menu');
