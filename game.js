window.onload = function() {
	var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render:render });
	               
// map Variables
	var TileWidth = 100;
	var TileHeight = 80;
	var TileOffsetX =0;
	var TileOffsetY =50 

	var MapSizeX = 6;
	var MapSizeY = 6;
	var MapOffsetX = 30;
	var MapOffsetY = 30;

    var MapGroup;
    var MapArray = [];

/////////////////////////////
// player variables;
    var player;
    var player_moveable = true;
     
	function preload() {
		game.load.image("grass_map", "PlanetCute/Grass Block.png");
		game.load.image("player", "PlanetCute/Character Boy.png");
		game.load.image("selector", "PlanetCute/Selector.png");
	}

	function create() {

		// Create Map
		MapGroup = game.add.group();
		game.stage.backgroundColor = "#ffffff"
	    for(var i = 0; i < MapSizeY; i ++){
	     	MapArray[i] = [];
			for(var j = 0; j < MapSizeX; j ++){

				var MapTile = game.add.sprite(TileWidth*j, TileHeight * i, "grass_map");
				MapTile.inputEnabled = true;
				MapTile.hitArea= new Phaser.Rectangle(TileOffsetX, TileOffsetY, TileWidth, TileHeight);
				MapTile.events.onInputDown.add (Map_event,this);
				MapGroup.add(MapTile);
				MapArray[i][j] = MapTile;
			}
		}
		MapGroup.x = MapOffsetX;
		MapGroup.y = MapOffsetY;

		//Create Player	
		player = game.add.sprite (MapArray[1][1].x+ TileWidth/2,MapArray[1][1].y+TileHeight/2, "player");
		player.data= {
			row: 1,
			col: 1
		}
		//player.anchor.set(0.5,0.5);
		//player.offsetX = MapOffsetX;
		//player.offsetY = MapOffsetY;
		game.physics.enable(player, Phaser.Physics.ARCADE);

		//create movement overlay


	}
	function update() {



		


	}

	function render(){
		game.debug.text ("Player Row"+ player.data.row+ " Player Col:" + player.data.col, 30 , 30);
		game.debug.bodyInfo(MapArray[2][2]);
	}

	function Map_event(MapTile){
		if (player.x != MapTile.x || player.y != MapTile.y){
			if (player.x < MapTile.x){
				player.x +=1;
			}else{
				player.x -=1;
			}
			if (player.y < MapTile.y){
				player.y +=1;
			}else{
				player.y -=1;
			}


		}


		MapTile.tint = Math.random() * 0xffffff;
	}

}