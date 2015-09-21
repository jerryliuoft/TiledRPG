'use strict';

var RPG = RPG || {};
//Map class
"use strict";

RPG.MAP={

    // group to add all the maptiles
    // loop through the size of the map, add a tile to each spot
    // height : number of tiles vertically , width: number of tiles horizontally
    GenerateMap : function(game, height, width){
        var MapSizeX = 6;
        var MapSizeY = 7;
        var MapOffsetX = 30;
        var MapOffsetY = 30;
        var TileWidth = 100;
        var TileHeight = 80;
        var TileOffsetX =0;
        var TileOffsetY =50;

        console.log('Creating Map Group!');

        for(var i = 0; i < height; i ++){
            for(var j = 0; j < width; j ++){
                var _maptile = game.add.sprite(TileWidth*j, TileHeight * i, "map_grass");
            }
        }
        //console.log('Generating Tile at X:'+ this.tile_width*j+ " Y: "+this.tile_height * i );
        
    }

}