

// map Variables
	var TileWidth = 100;
	var TileHeight = 80;
	var TileOffsetX =0;
	var TileOffsetY =50 

	var MapSizeX = 6;
	var MapSizeY = 7;
	var MapOffsetX = 30;
	var MapOffsetY = 30;

    var MapGroup;
    var MapArray = [];

/////////////////////////////
// player variables;
    var player;
    var player_moveable = true;


var Game ={
		               

     
	preload: function () {
		game.load.image("grass_map", "PlanetCute/Grass Block.png");
		game.load.image("player", "PlanetCute/Character Boy.png");
		game.load.image("selector", "PlanetCute/Selector.png");
	},

	create: function() {

		// Create Map
		MapGroup = game.add.group();
		game.stage.backgroundColor = "#FFFFFF"
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
		create_town(); // has to go before the offset to stay in order
		MapGroup.x = MapOffsetX;
		MapGroup.y = MapOffsetY;

		//Create Player	
		player = game.add.sprite (MapArray[MapSizeY-1][0].x+ TileWidth/2,MapArray[MapSizeY-1][0].y+TileHeight/2, "player");
		player.data= {
			row: MapSizeY-1,
			col: 0
		}
		update_moveable(player.data.row, player.data.col, true);
		//player.anchor.set(0.5,0.5);
		//player.offsetX = MapOffsetX;
		//player.offsetY = MapOffsetY;
		game.physics.enable(player, Phaser.Physics.ARCADE);




	},
	update: function () {



		


	},

	render: function(){
		//game.debug.text ("Player Row"+ player.data.row+ " Player Col:" + player.data.col, 30 , 30);
		//game.debug.text ("Player Row"+ MapArray[][j].data.row+ " Player Col:" + MapArray[i][j].data.col, 30 , 30);
		//game.debug.spriteInfo(player,30,30);

	}

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
		if(row+1 < MapSizeY){
			MapArray[row+1][col].data.moveable = moving;
		}
		if (col -1 >=0 ){
			MapArray[row][col-1].data.moveable= moving;
		}
		if (col+1 < MapSizeX){
			MapArray[row][col+1].data.moveable= moving;
		}
}
// create a town  in Map (end point)
function create_town (){
	var col = game.rnd.integerInRange(0,MapSizeX-1);
	var row = game.rnd.integerInRange(0,1);

	var MapTile = game.add.sprite(MapArray[row][col].x, MapArray[row][col].y, "selector");
	MapTile.inputEnabled = true;
	MapTile.hitArea= new Phaser.Rectangle(TileOffsetX, TileOffsetY, TileWidth, TileHeight);
	MapTile.events.onInputDown.add (Map_event,this);
	MapTile.data= {
		moveable: false,
	}
	MapGroup.add(MapTile);
	MapArray[row][col].destroy();
	MapArray[row][col] = MapTile;

}