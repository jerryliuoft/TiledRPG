window.onload = function() {
	var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
	               

	var TileWidth = 32;
	var TileHeight = 32;
	var MapSizeX = 3;
	var MapSizeY = 3;
    var MapGroup;
    var MapArray = [];
     
	function preload() {
		game.load.image("map", "hexagon.png");
		game.load.image("marker", "marker.png");
	}

	function create() {
		MapGroup = game.add.group();
		game.stage.backgroundColor = "#ffffff"
	    for(var i = 0; i < MapSizeY; i ++){
	     	MapArray[i] = [];
			for(var j = 0; j < MapSizeX; j ++){

				var MapTile = game.add.sprite(TileWidth*j, TileHeight * i, "map")
				MapGroup.add(MapTile);
				MapArray[i][j] = MapTile;
			}
		}	
	}
	function update() {

	}
}