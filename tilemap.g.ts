// 自动生成的代码。请勿编辑。
namespace myTiles {
    //% fixedInstance jres blockIdentity=images._tile
    export const transparency16 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile1 = image.ofBuffer(hex``);

    helpers._registerFactory("tilemap", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "level1":
            case "级别1":return tiles.createTilemap(hex`0a0008000000000000000000000000000000000000000000000001010101010000000000010300020100000000000101010101000000000000000000000000000000000000000000000000000000000000000000`, img`
. . . . . . . . . . 
. . . . . . . . . . 
. . 2 2 2 2 2 . . . 
. . 2 . . . 2 . . . 
. . 2 2 2 2 2 . . . 
. . . . . . . . . . 
. . . . . . . . . . 
. . . . . . . . . . 
`, [myTiles.transparency16,sprites.builtin.forestTiles0,sprites.swamp.swampTile1,myTiles.tile1], TileScale.Sixteen);
            case "level2":
            case "级别2":return tiles.createTilemap(hex`0a0008000000000000000000000000000000000000000000000202020202020200000002030000000302000000020202010202020000000000020202000000000000000000000000000000000000000000000000`, img`
. . . . . . . . . . 
. . . . . . . . . . 
. 2 2 2 2 2 2 2 . . 
. 2 . . . . . 2 . . 
. 2 2 2 . 2 2 2 . . 
. . . 2 2 2 . . . . 
. . . . . . . . . . 
. . . . . . . . . . 
`, [myTiles.transparency16,myTiles.tile1,sprites.builtin.forestTiles0,sprites.swamp.swampTile1], TileScale.Sixteen);
            case "level3":
            case "level3":return tiles.createTilemap(hex`0a0008000000000000000000000000020202020202020000000203000002030200000002020200020002000000020000010000020000000200020002020200000002030200000302000000020202020202020000`, img`
. . . . . . . . . . 
. 2 2 2 2 2 2 2 . . 
. 2 . . . 2 . 2 . . 
. 2 2 2 . 2 . 2 . . 
. 2 . . . . . 2 . . 
. 2 . 2 . 2 2 2 . . 
. 2 . 2 . . . 2 . . 
. 2 2 2 2 2 2 2 . . 
`, [myTiles.transparency16,myTiles.tile1,sprites.builtin.forestTiles0,sprites.swamp.swampTile1], TileScale.Sixteen);
        }
        return null;
    })

    helpers._registerFactory("tile", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "transparency16":return transparency16;
            case "spawnTile":
            case "tile1":return tile1;
        }
        return null;
    })

}
// 自动生成的代码。请勿编辑。
