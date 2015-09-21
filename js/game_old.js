

// map Variables
	var TileWidth = 100;
	var TileHeight = 80;
	var TileOffsetX =0;
	var TileOffsetY =50 

	var MapSizeX = 6;
	var MapSizeY = 7;
	var MapOffsetX = 30;
	var MapOffsetY = 30;

	var InventorySizeX=2;
	var InventoryX= MapSizeX * TileWidth + MapOffsetX + 20;
	var InventoryY = 10;

    var MapGroup;
    var MapArray = [];

    var ChanceCardX = 600;
    var ChanceCardY = 300;

    var hasEvent = false;
    var hasGirl = false;
    

/////////////////////////////
// player variables;
    var player;
    var player_moveable = true;
    var player_hp_display;

    var EnemyGroup;
    var EnemyArray = [];

    var ChanceCardGroup;
    var ChanceCardArray = [];


var GameState ={
		               

     
	preload: function () {

	},

	create: function() {

		// Create Map
		MapGroup = game.add.group();
		EnemyGroup = game.add.group();
		ChanceCardGroup = game.add.group();

		game.stage.backgroundColor = "#000000";
	    for(var i = 0; i < MapSizeY; i ++){
	     	MapArray[i] = [];
			for(var j = 0; j < MapSizeX; j ++){

				var MapTile = game.add.sprite(TileWidth*j, TileHeight * i, "grass_map");
				MapTile.inputEnabled = true;
				MapTile.hitArea= new Phaser.Rectangle(TileOffsetX, TileOffsetY, TileWidth, TileHeight);
				MapTile.events.onInputDown.add (Map_event,this);
				MapTile.data= {
					moveable: false,
					hasEnemy: false,
					row: i,
					col: j
				}
				MapGroup.add(MapTile);
				MapArray[i][j] = MapTile;
			}
		}


		create_town(); // has to go before the offset to stay in order
		create_enemy(2,2);
		create_chance_cards();

		MapGroup.x = MapOffsetX;
		MapGroup.y = MapOffsetY;

		//Create Player	
		player = game.add.sprite (MapArray[MapSizeY-1][0].x+ TileWidth/2,MapArray[MapSizeY-1][0].y+TileHeight/2, "player");
		player.data= {
			HP: 10,
			DEF: 1,
			ATK: 4,
			row: MapSizeY-1,
			col: 0
		}
		update_moveable(player.data.row, player.data.col, true);
		//player.anchor.set(0.5,0.5);
		//player.offsetX = MapOffsetX;
		//player.offsetY = MapOffsetY;
		//game.physics.enable(player, Phaser.Physics.ARCADE);

		//add player HP and other stats on TOP
		create_stats_overlay();
		create_inventory();
		game.camera.follow(player);

	},
	update: function () {

		player_hp_display.text = player.data.HP.toString();
		if (player.data.HP <1){
			//game over
			game.state.start('Menu');

		}

	},

	render: function(){
		//game.debug.text ("Player Row"+ player.data.row+ " Player Col:" + player.data.col, 30 , 30);
		//game.debug.text ("Player Row"+ MapArray[][j].data.row+ " Player Col:" + MapArray[i][j].data.col, 30 , 30);
		//game.debug.spriteInfo(player,30,30);


	}


}

function create_chance_cards (){
	//create the card outside of camera
	var ChanceTile = game.add.sprite(0, 0, "sword");
	ChanceTile.data={
		HP: 1
	}
	create_chance_cards_helper(ChanceTile);
	ChanceTile = game.add.sprite(0,0,"stone");
	ChanceTile.data={
		HP:-1
	}
	create_chance_cards_helper(ChanceTile);



}
function create_chance_cards_helper (ChanceTile) {
	ChanceTile.inputEnabled = false;
	ChanceTile.events.onInputDown.add (chance_event,this);
	ChanceTile.kill();
	// fill the array
	ChanceCardArray.push(ChanceTile);
	ChanceCardGroup.add(ChanceTile);

}


function Map_event(MapTile){
	// check if map is adjacent
	if (hasEvent){
		return;
	}


	if (MapTile.data.moveable ){


		if (MapTile.data.hasEnemy){
			battle_event(EnemyArray[0]);
			return;
		}
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

		//start event;

		hasEvent = true;

		move_tween.onComplete.add(get_chance_card, this);

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
//create chance card to boost player stats: start with add HP;
function get_chance_card (){


	MapGroup.alpha = 0.5;
	MapGroup.inputEnabled = false;
	var rng = game.rnd.integerInRange(0,3);
	
	
	switch (rng){
		case 1:
		//noevent
			ChanceCardArray[1].reset(ChanceCardX, ChanceCardY);
			ChanceCardArray[1].inputEnabled= true;
			var show_card_tween = game.add.tween(ChanceCardArray[1]).to({x: ChanceCardX/2, y:ChanceCardY}, 500);
			show_card_tween.start();	
			break;

		case 2:
			ChanceCardArray[0].reset(ChanceCardX, ChanceCardY);
			ChanceCardArray[0].inputEnabled= true;
			var show_card_tween = game.add.tween(ChanceCardArray[0]).to({x: ChanceCardX/2, y:ChanceCardY}, 500);
			show_card_tween.start();		
			break;

		default :
			MapGroup.alpha = 1;
			hasEvent = false;
			break;


	}
	
}

//events for what happens when the card is clicked
function chance_event(ChanceTile){

	MapGroup.alpha = 1;
	ChanceTile.inputEnabled = false;

	player.data.HP += ChanceTile.data.HP;
	hasEvent = false;
	ChanceTile.kill();

}
// create a town  in Map (end point)
function create_town (){
	var col = game.rnd.integerInRange(0,MapSizeX-1);
	var row = game.rnd.integerInRange(0,1);

	var MapTile = game.add.sprite(MapArray[row][col].x, MapArray[row][col].y, "town");
	MapTile.inputEnabled = true;
	MapTile.hitArea= new Phaser.Rectangle(TileOffsetX, TileOffsetY, TileWidth, TileHeight);
	MapTile.events.onInputDown.add (town_event,this);
	MapTile.data= {
		moveable: false,
	}
	MapGroup.add(MapTile);
	MapArray[row][col].destroy();
	MapArray[row][col] = MapTile;

}

function create_enemy(row, col){

	//NTOE: can change hit area to minimal so that it'll not be clicked
	var EnemyTile = game.add.sprite(MapArray[row][col].x, MapArray[row][col].y,"enemy");
	EnemyTile.data ={
		HP: 10,
		DEF: 1,
		ATK: 2,
		row: row,
		col: col
	}
	//EnemyTile.inputEnabled=true;
	//EnemyTile.events.onInputDown.add(battle_event,this);

	EnemyTile.hitArea= new Phaser.Rectangle(0, 0, 0, 0);
	MapArray[row][col].data.hasEnemy = true;
	EnemyArray[0]=EnemyTile;
	EnemyGroup.add(EnemyTile);

}

function battle_event(enemy){

	if (MapArray[enemy.data.row][enemy.data.col].data.moveable){
		player.data.HP -= enemy.data.ATK - player.data.DEF;
		enemy.data.HP -= player.data.ATK - enemy.data.DEF;
		if (enemy.data.HP <= 0){
			enemy.destroy();
			MapArray[enemy.data.row][enemy.data.col].data.hasEnemy = false;
		}

	}

}

function town_event(Maptile){

	if (Maptile.data.moveable)
		game.state.start('Menu');

}

function create_stats_overlay (){

    // Add Text to top of game.
    var textStyle_Key = { font: "bold 14px sans-serif", fill: "#46c0f9", align: "center" };
    var textStyle_Value = { font: "bold 18px sans-serif", fill: "#fff", align: "center" };
    // HP.
    game.add.text(30, 20, "HP: ", textStyle_Key);
    player_hp_display = game.add.text (60, 20, player.data.HP.toString(), textStyle_Key);
 

}
function create_inventory(){
	// empty need to implement
}