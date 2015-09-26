// Some features,
// all the walls are in this.walls, all the floors are in this.floors
// player stats are in this.playerstates


Map = function(game, min_room_size, max_room_size, max_room_number) {
    
    //lets initiate some parameters
    //tile sizses in pixels

    this.floor_tile_size_height = 80;
    this.floor_tile_size_width = 100;
    this.tile_offset_x =0;
    this.tile_offset_y =50;
    this.floor_image = ["grass", "wood", "plain", "dirt", "grass", "grass"] ;
    this.wall_image = null;
    this.tree_image= ["tree_short", "tree_tall", "tree_ugly", "rock"];
    this.tree_chance = 2;


    //group that holds the walkable tiles
    this.floors = game.add.group();  
    //group that holds the walls
    this.walls = game.add.group();
    this.walls.enableBody = true;
    
    this.game = game;  

    //set the map array to hold all the floors with coordinates, so the correct walls can be set
    this.maps = [];
    for (var x = 0; x <= this.game.world.width/this.floor_tile_size_width ; x++){
        this.maps [x] = [];
        for (var y = 0; y <= this.game.world.height/this.floor_tile_size_height ; y++){
            this.maps[x][y] = 1;
        }
    }

    // set the min room size interms of tiles
    this.room_min_size = min_room_size;
    this.room_max_size = max_room_size;
    this.max_rooms = max_room_number;

    
    //variables to track the room numbers
    this.lastRoomCenter = {x:0, y:0};
    this.num_rooms = 0;
    this.num_tiles = 0;

    // variables to initiate starting position
    this.player_x= 0;
    this.player_y= 0;

    // pass in the game variable so that it can find game
     

    this.makeMap();
}
//create a room,
Map.prototype.Room = function(x, y, w, h) {
    this.x1 = x;
    this.y1 = y;
    this.x2 = x + w;
    this.y2 = y + h;

    var center_x = (this.x1 + this.x2) / 2;
    var center_y = (this.y1 + this.y2) / 2;
    this.center_coords = {x: center_x, y: center_y};    
}

//create a floor, if a wall is present, destroy the wall
Map.prototype.createFloor = function(x, y) {

    if (this.maps[x/this.floor_tile_size_width][y/this.floor_tile_size_height] == 1){ // nothing exists
        fl = this.floors.create(x, y + this.game.rnd.integerInRange(-10,10), this.floor_image[this.game.rnd.integerInRange(0,this.floor_image.length-1)]);
        this.game.physics.arcade.enable(fl);
        fl.body.setSize(this.floor_tile_size_width, this.floor_tile_size_height, this.tile_offset_x, this.tile_offset_y);
        this.maps[x/this.floor_tile_size_width][y/this.floor_tile_size_height] = fl;  

    }else{
        if (this.maps[x/this.floor_tile_size_width][y/this.floor_tile_size_height].parent != this.floors){
            this.maps[x/this.floor_tile_size_width][y/this.floor_tile_size_height].destroy ();// destroy the wall
            fl = this.floors.create(x, y + this.game.rnd.integerInRange(-10,10), this.floor_image[this.game.rnd.integerInRange(0,this.floor_image.length-1)]);
            this.game.physics.arcade.enable(fl);
            fl.body.setSize(this.floor_tile_size_width, this.floor_tile_size_height, this.tile_offset_x, this.tile_offset_y);
            this.maps[x/this.floor_tile_size_width][y/this.floor_tile_size_height] = fl;
        }
    }


}
//create wall, if there exists, a floor tile, do not put down a wall.
Map.prototype.createWall = function(x,y){

    if (this.maps[x/this.floor_tile_size_width][y/this.floor_tile_size_height] == 1){
        //wl = this.game.add.sprite(x, y, this.wall_image);
        wl = this.walls.create(x, y, this.wall_image);
        //get rid of the transparencies in the sprite
        this.game.physics.arcade.enable(wl);
        wl.body.setSize(this.floor_tile_size_width, this.floor_tile_size_height, this.tile_offset_x, this.tile_offset_y);
        wl.body.immovable = true;
        //this.walls.add(wl);
        this.maps[x/this.floor_tile_size_width][y/this.floor_tile_size_height] = wl;

    }

}

Map.prototype.createRoom = function(x1, x2, y1, y2) {
    for (var x = x1; x<x2; x+=this.floor_tile_size_width) {
        for (var y = y1; y<y2; y+=this.floor_tile_size_height) {

            this.createFloor(x, y);
            //add some trees
            if (this.game.rnd.integerInRange(0, 10) < this.tree_chance){
                this.createTrees(x,y);
            }


            if (x== x1){
                //create the walls on left and right
                this.createWall(x1-this.floor_tile_size_width,y);
                this.createWall(x2, y);
            }
        //create the walls on top and bottom
        this.createWall (x, y1 -this.floor_tile_size_height);
        this.createWall (x, y2);
        }
    }
    // need to add 4 walls to cover the corners TODO could make this another function but it would be slower
    this.createWall (x1-this.floor_tile_size_width, y1 -this.floor_tile_size_height);
    this.createWall (x2, y2);
    this.createWall (x1-this.floor_tile_size_width, y2);
    this.createWall (x2, y1 -this.floor_tile_size_height);


}
Map.prototype.createHTunnel = function(x1, x2, y) {
    var min = Math.min(x1, x2);
    var max = Math.max(x1, x2);
    for (var x = min; x<=max; x+=this.floor_tile_size_width) {
        this.createFloor(x, y);
        this.createWall (x, y-this.floor_tile_size_height );
        this.createWall (x, y+this.floor_tile_size_height);
    }
    //close off the ends with walls
    this.createWall (min - this.floor_tile_size_width, y);
    this.createWall (max, y );
}
Map.prototype.createVTunnel = function(y1, y2, x) {
    var min = Math.min(y1, y2);
    var max = Math.max(y1, y2);
    for (var y = min; y<=max; y+=this.floor_tile_size_height) {      
        this.createFloor(x, y);
        this.createWall (x+this.floor_tile_size_width, y);
        this.createWall (x-this.floor_tile_size_width, y );
    }    

    this.createWall (x, min - this.floor_tile_size_height);
    this.createWall (x, max);
}
// add a tree at x ,y
Map.prototype.createTrees = function (x, y){
    tree = this.walls.create(x, y-20, this.tree_image[this.game.rnd.integerInRange(0, this.tree_image.length-1)]);
    this.game.physics.arcade.enable(tree);
    tree.body.immovable = true;
    tree.body.setSize(this.floor_tile_size_width, this.floor_tile_size_height, this.tile_offset_x, this.tile_offset_y);
    // animations here for tree
    /*
    var bounce = this.game.add.tween(tree);
    bounce.to({y:tree.y+10}, 1000,Phaser.Easing.Linear.None, true, this.game.rnd.integerInRange(0, 1000), -1,1);
    */

    this.maps[x/this.floor_tile_size_width][y/this.floor_tile_size_height] = tree;
}
// display all the sprites in the right layer
Map.prototype.renderMap = function (){

    this.floors.sort('y', Phaser.Group.SORT_ASCENDING);
    /*
    for (var x = 0; x <= this.game.world.width/this.floor_tile_size_width ; x++){
        for (var y = 0; y <= this.game.world.height/this.floor_tile_size_height ; y++){
            if (this.maps[x][y] != 1){
                this.maps[x][y].bringToTop();
                //this.game.world.bringToTop(this.maps[x][y]);
            }
        }
    }
    */

}
Map.prototype.makeMap = function() {
    for (var r=0; r<this.max_rooms; r++) {
        // create a random size room
        var w = this.game.rnd.integerInRange(this.room_min_size, this.room_max_size) * this.floor_tile_size_width;
        var h = this.game.rnd.integerInRange(this.room_min_size, this.room_max_size) * this.floor_tile_size_height;

        // find a position in the world to set the room
        x = this.game.rnd.integerInRange(1, ((this.game.world.width ) / this.floor_tile_size_width) - (w/this.floor_tile_size_width + 1)) * this.floor_tile_size_width;
        y = this.game.rnd.integerInRange(1, ((this.game.world.height) / this.floor_tile_size_height) - (h/this.floor_tile_size_height + 1)) * this.floor_tile_size_height;

        this.createRoom(x, x+w, y, y+h);

        if (this.num_rooms == 0) {
        // use these coordinates to assgin new player                
           this.player_x = x + (w/2);
           this.player_y = y + (h/2);
        } else {
            var new_x = this.game.math.snapToFloor(x + (w/2), this.floor_tile_size_width);
            var new_y = this.game.math.snapToFloor(y + (h/2), this.floor_tile_size_height);

            var prev_x = this.game.math.snapToFloor(this.lastRoomCoords.x, this.floor_tile_size_width);
            var prev_y = this.game.math.snapToFloor(this.lastRoomCoords.y, this.floor_tile_size_height);

            

            this.createHTunnel(prev_x, new_x, prev_y);
            this.createVTunnel(prev_y, new_y, new_x);
            // make the Tunnel bigger
            //this.createHTunnel(prev_x, new_x, prev_y+this.floor_tile_size_height);
            //this.createVTunnel(prev_y, new_y, new_x+ this.floor_tile_size_width);
        }

        this.lastRoomCoords = { x: x + (w/2), y: y + (h/2) };
        this.num_rooms++;

    }
    this.renderMap();
}
