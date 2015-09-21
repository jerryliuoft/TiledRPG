Map = function(game, floor, wall, min_room_size, max_room_size, max_room_number) {
    
    this.floors = game.add.group();
    this.floor_image = floor;
    
    this.walls = game.add.group();
    this.walls.enableBody = true;
    this.wall_image = wall;

    this.room_min_size = min_room_size;
    this.room_max_size = max_room_size;
    this.max_rooms = max_room_number;
    
    this.lastRoomCenter = {x:0, y:0};
    this.num_rooms = 0;
    this.num_tiles = 0;

    this.game = game;   
    
    this.makeMap();
}
Map.prototype.getRandom = function(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
Map.prototype.Room = function(x, y, w, h) {
    this.x1 = x;
    this.y1 = y;
    this.x2 = x + w;
    this.y2 = y + h;

    var center_x = (this.x1 + this.x2) / 2;
    var center_y = (this.y1 + this.y2) / 2;
    this.center_coords = {x: center_x, y: center_y};    
}
Map.prototype.createFloor = function(x, y) {
    fl = this.floors.create(x, y, this.floor_image);
    this.game.physics.arcade.enable(fl);
    this.game.physics.arcade.overlap(fl, this.walls, function(floor, wall) {
        wall.destroy();
    });    
}
Map.prototype.createRoom = function(x1, x2, y1, y2) {
    for (var x = x1; x<x2; x+=16) {
        for (var y = y1; y<y2; y+=16) {
            this.createFloor(x, y);
        }
    }    
}
Map.prototype.createHTunnel = function(x1, x2, y) {
    var min = Math.min(x1, x2);
    var max = Math.max(x1, x2);
    for (var x = min; x<max+8; x+=8) {
        this.createFloor(x, y);
    }    
}
Map.prototype.createVTunnel = function(y1, y2, x) {
    var min = Math.min(y1, y2);
    var max = Math.max(y1, y2);
    for (var y = min; y<max+8; y+=8) {
        this.createFloor(x, y);
    }    
}
Map.prototype.makeMap = function() {
    for (var y=0; y<this.game.world.height; y+= 16) {
        for (var x=0; x<this.game.world.width; x+=16) {
            var wall = this.walls.create(x, y, this.wall_image);
            wall.body.immovable = true;
        }
    }

    for (var r=0; r<this.max_rooms; r++) {
        var w = this.getRandom(this.room_min_size, this.room_max_size) * 16;
        var h = this.getRandom(this.room_min_size, this.room_max_size) * 16;

        x = this.getRandom(1, ((this.game.world.width) / 16) - (w/16 + 1)) * 16;
        y = this.getRandom(1, ((this.game.world.height) / 16) - (w/16 + 1)) * 16;

        this.createRoom(x, x+w, y, y+h);

        if (this.num_rooms == 0) {                
            //playState.player.x = x + (w/2);
            //playState.player.y = y + (h/2);
        } else {
            var new_x = this.game.math.snapToFloor(x + (w/2), 16);
            var new_y = this.game.math.snapToFloor(y + (h/2), 16);

            var prev_x = this.game.math.snapToFloor(this.lastRoomCoords.x, 16);
            var prev_y = this.game.math.snapToFloor(this.lastRoomCoords.y, 16);

            this.createHTunnel(prev_x, new_x, prev_y, prev_y);
            this.createVTunnel(prev_y, new_y, new_x);
        }

        this.lastRoomCoords = { x: x + (w/2), y: y + (h/2) };
        this.num_rooms++;
    }
}