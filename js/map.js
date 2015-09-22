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

    // set the min room size interms of tiles
    this.room_min_size = min_room_size;
    this.room_max_size = max_room_size;
    this.max_rooms = max_room_number;

    
    //variables to track the room numbers
    this.lastRoomCenter = {x:0, y:0};
    this.num_rooms = 0;
    this.num_tiles = 0;

    // variables to initiate starting position


    // pass in the game variable so that it can find game
    this.game = game;   
    
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
    fl = this.floors.create(x, y, this.floor_image);
    this.game.physics.arcade.enable(fl);
    this.game.physics.arcade.overlap(fl, this.walls, function(floor, wall) {
        wall.destroy();
    });    
}
Map.prototype.createRoom = function(x1, x2, y1, y2) {
    for (var x = x1; x<x2; x+=this.floor_tile_size) {
        for (var y = y1; y<y2; y+=this.floor_tile_size) {
            this.createFloor(x, y);
        }
    }    
}
Map.prototype.createHTunnel = function(x1, x2, y) {
    var min = Math.min(x1, x2);
    var max = Math.max(x1, x2);
    for (var x = min; x<max; x+=this.floor_tile_size) {
        this.createFloor(x, y);
    }    
}
Map.prototype.createVTunnel = function(y1, y2, x) {
    var min = Math.min(y1, y2);
    var max = Math.max(y1, y2);
    for (var y = min; y<max; y+=this.floor_tile_size) {
        this.createFloor(x, y);
    }    
}
Map.prototype.makeMap = function() {
    for (var y=0; y<this.game.world.height; y+= this.wall_tile_size) {
        for (var x=0; x<this.game.world.width; x+=this.wall_tile_size) {
            //add a wall sprite to this location
            var wall = this.walls.create(x, y, this.wall_image);
            wall.body.immovable = true;
        }
    }

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
           // this.playState.player_x = x + (w/2);
           // this.playState.player_y = y + (h/2);
        } else {
            var new_x = this.game.math.snapToFloor(x + (w/2), this.wall_tile_size);
            var new_y = this.game.math.snapToFloor(y + (h/2), this.wall_tile_size);

            var prev_x = this.game.math.snapToFloor(this.lastRoomCoords.x, this.wall_tile_size);
            var prev_y = this.game.math.snapToFloor(this.lastRoomCoords.y, this.wall_tile_size);

            this.createHTunnel(prev_x, new_x, prev_y, prev_y);
            this.createVTunnel(prev_y, new_y, new_x);
        }

        this.lastRoomCoords = { x: x + (w/2), y: y + (h/2) };
        this.num_rooms++;
    }
}