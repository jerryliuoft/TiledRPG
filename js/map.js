// Some features,
// all the walls are in this.walls, all the floors are in this.floors
// player stats are in this.playerstates


Map = function(game, floor, wall, min_room_size, max_room_size, max_room_number) {
    
    //lets initiate some parameters
    //tile sizses in pixels
    this.wall_tile_size = 16;
    this.floor_tile_size = 16;
    //group that holds the walkable tiles
    this.floors = game.add.group();
    this.floor_image = floor;
    //group that holds the walls
    this.walls = game.add.group();
    this.walls.enableBody = true;
    this.wall_image = wall;
    this.game = game;  

    //set the map array to hold all the floors with coordinates, so the correct walls can be set
    this.maps = [];
    for (var x = 0; x <= this.game.world.width/this.floor_tile_size ; x++){
        this.maps [x] = [];
        for (var y = 0; y <= this.game.world.height/this.floor_tile_size ; y++){
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
    fl = this.floors.create(x, y, this.floor_image, this.game.rnd.integerInRange(2,3));
    this.game.physics.arcade.enable(fl);
    this.game.physics.arcade.overlap(fl, this.walls, function(floor, wall) {
        wall.destroy();
    });
    this.maps[x/this.floor_tile_size][y/this.floor_tile_size] = fl;    
}
//create wall, if there exists, a floor tile, do not put down a wall.
Map.prototype.createWall = function(x,y){
    //check all 8 directions for floor tiles and pick the correct image to put

    //check top, bottom, left and right
    var left_x = (x - this.floor_tile_size)/this.floor_tile_size;
    var right_x = (x + this.floor_tile_size)/this.floor_tile_size;
    var top_y = (y - this.floor_tile_size)/this.floor_tile_size;
    var bottom_y = (y + this.floor_tile_size)/this.floor_tile_size;
    var middle_y = y /this.floor_tile_size;
    var middle_x = x/this.floor_tile_size;
    var sprite_frame = 0;

    var counter = 0;
    //check top
    if( this.maps[middle_x][top_y] != 1){
        counter +=1;
    }
    //check bottom
    if( this.maps[middle_x][bottom_y] != 1){
        counter +=10;
    }

    //check left
    if( this.maps[left_x][middle_y] != 1){
        counter +=100;
    }
    //check right

    if( this.maps[right_x][middle_y] != 1){
        counter +=1000;
    }

    // get the sprite for all the directions
    switch(counter){
        case 1: // only top
            sprite_frame = 1;
            break;
        case 10:// only bottom
            sprite_frame =7;
            break;
        case 100: // only left
            sprite_frame=3;
            break;
        case 1000: // only right
            sprite_frame = 5;
            break;
        case 101://top left
            sprite_frame = 0;
            break;
        case 1001: // top right
            sprite_frame = 5;
            break;
        case 110: // bottom left
            sprite_frame=6;
            break;
        case 1010: // top right
            sprite_frame = 8;
            break;   
        default: // some lake
            console.log("got value"+ counter);
            sprite_frame = 4;
    }



    wl = this.game.add.sprite(x, y, this.wall_image, sprite_frame);
    this.game.physics.arcade.enable(wl);
    wl.body.immovable = true;
    this.game.physics.arcade.overlap(wl, this.floors, function() {
        wl.destroy();
    });
    this.game.physics.arcade.overlap(wl, this.walls, function(floor, wall) {
        wall.destroy();
    });  
    this.walls.add(wl);
}

Map.prototype.createRoom = function(x1, x2, y1, y2) {
    for (var x = x1; x<x2; x+=this.floor_tile_size) {
        for (var y = y1; y<y2; y+=this.floor_tile_size) {
            this.createFloor(x, y);
            if (x== x1){
                this.createWall(x1-this.wall_tile_size,y);
                this.createWall(x2, y);
            }
        this.createWall (x, y1 -this.wall_tile_size);
        this.createWall (x, y2);
        }
    }


}
Map.prototype.createHTunnel = function(x1, x2, y) {
    var min = Math.min(x1, x2);
    var max = Math.max(x1, x2);
    for (var x = min; x<=max; x+=this.floor_tile_size) {
        this.createFloor(x, y);
        this.createWall (x, y-this.wall_tile_size );
        this.createWall (x, y+this.wall_tile_size);
    }
    //close off the ends with walls
    this.createWall (min - this.wall_tile_size, y);
    this.createWall (max, y );
}
Map.prototype.createVTunnel = function(y1, y2, x) {
    var min = Math.min(y1, y2);
    var max = Math.max(y1, y2);
    for (var y = min; y<=max; y+=this.floor_tile_size) {      
        this.createFloor(x, y);
        this.createWall (x+this.wall_tile_size, y);
        this.createWall (x-this.wall_tile_size, y );
    }    

    this.createWall (x, min - this.wall_tile_size);
    this.createWall (x, max);
}
Map.prototype.makeMap = function() {
    for (var r=0; r<this.max_rooms; r++) {
        // create a random size room
        var w = this.game.rnd.integerInRange(this.room_min_size, this.room_max_size) * this.floor_tile_size;
        var h = this.game.rnd.integerInRange(this.room_min_size, this.room_max_size) * this.floor_tile_size;

        // find a position in the world to set the room
        x = this.game.rnd.integerInRange(1, ((this.game.world.width ) / this.floor_tile_size) - (w/this.floor_tile_size + 1)) * this.floor_tile_size;
        y = this.game.rnd.integerInRange(1, ((this.game.world.height) / this.floor_tile_size) - (h/this.floor_tile_size + 1)) * this.floor_tile_size;

        this.createRoom(x, x+w, y, y+h);

        if (this.num_rooms == 0) {
        // use these coordinates to assgin new player                
           this.player_x = x + (w/2);
           this.player_y = y + (h/2);
        } else {
            var new_x = this.game.math.snapToFloor(x + (w/2), this.wall_tile_size);
            var new_y = this.game.math.snapToFloor(y + (h/2), this.wall_tile_size);

            var prev_x = this.game.math.snapToFloor(this.lastRoomCoords.x, this.wall_tile_size);
            var prev_y = this.game.math.snapToFloor(this.lastRoomCoords.y, this.wall_tile_size);

            // make the Tunnel bigger
            this.createHTunnel(prev_x, new_x, prev_y+this.floor_tile_size);
            this.createHTunnel(prev_x, new_x, prev_y);
            this.createVTunnel(prev_y, new_y, new_x+ this.floor_tile_size);
            this.createVTunnel(prev_y, new_y, new_x);
        }

        this.lastRoomCoords = { x: x + (w/2), y: y + (h/2) };
        this.num_rooms++;

    }
}
