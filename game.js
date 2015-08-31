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
		game.stage.backgroundColor = "#000000"
	    for(var i = 0; i < MapSizeY; i ++){
	     	MapArray[i] = [];
			for(var j = 0; j < MapSizeX; j ++){

				var MapTile = game.add.sprite(TileWidth*j, TileHeight * i, "grass_map");
				MapTile.inputEnabled = true;
				MapTile.hitArea= new Phaser.Rectangle(TileOffsetX, TileOffsetY, TileWidth, TileHeight);
				MapTile.events.onInputDown.add (Map_event,this);
				MapTile.data= {
					moveable: false,
					row: i,
					col: j
				}
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
		update_moveable(player.data.row, player.data.col, true);
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
		game.debug.spriteInfo(player,30,30);

	}

	function Map_event(MapTile){

		// check if map is adjacent
		if (MapTile.data.moveable ){

			//update moveable
			update_moveable(player.data.row, player.data.col, false);
			update_moveable(MapTile.data.row, MapTile.data.col, true);

			// add movement using tween
			move_tween = game.add.tween(player).to ({x: MapTile.x, y: MapTile.y},500 );
			move_tween.interpolation(Phaser.Math.catmullRomInterpolation);
			move_tween.start();

			//update player position
			player.data.row = MapTile.data.row;
			player.data.col = MapTile.data.col;

		}
			MapTile.tint = Math.random() * 0xffffff;
	}
	// update the maptile's data of moveable by checking 4 sides.
	function update_moveable (row, col, moving ){

			if (row -1 >= 0){
				MapArray[row-1][col].data.moveable=moving;
			}
			if(row+1 < MapSizeX){
				MapArray[row+1][col].data.moveable = moving;
			}
			if (col -1 >=0 ){
				MapArray[row][col-1].data.moveable= moving;
			}
			if (col+1 < MapSizeY){
				MapArray[row][col+1].data.moveable= moving;
			}
	}

}