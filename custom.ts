//%block="消防员的故事"
//% weight=100 color=#0fbc11 icon=""
namespace custom {


    enum WaterballDirection {
        UP, RIGHT, DOWN, LEFT
    }

    const SPRITE_KIND_WATER_BALL = SpriteKind.create()
    const SPRITE_KIND_FIRE = SpriteKind.create()
    const SPRITE_KIND_FIREMAN = SpriteKind.create()

    let levels: tiles.TileMapData[]
    let currentLevel = -1

    let playerSprite:Sprite = null

    let currentDirection:WaterballDirection = WaterballDirection.DOWN
    let moving = false;
    let currentLevelFire :number

    let initialized = false

    let eventsBound = false

    function bindEvents() {
        if (eventsBound) {
            return 
        }

        sprites.onOverlap(SPRITE_KIND_WATER_BALL, SPRITE_KIND_FIRE, 
            function(sprite:Sprite, otherSprite:Sprite){
            sprite.destroy()
            otherSprite.destroy()
            currentLevelFire -= 1
            if (currentLevelFire == 0) {
                startNextLevel()
            }
        })

        sprites.onOverlap(SPRITE_KIND_FIRE, SPRITE_KIND_FIREMAN, 
            function(sprite:Sprite, otherSprite:Sprite) {
                game.splash("被火烧到了")
                restartLevel()
        })

        eventsBound = true
    }

    //%blockid=customthrowwaterballup block="往上洒水"
    //%group="洒水"
    export function throwWaterballUp() {
        throwWaterBall(WaterballDirection.UP)
    }

    //%blockid=customthrowwaterballdown block="往下洒水"
    //%group="洒水"
    export function throwWaterballDown() {
        throwWaterBall(WaterballDirection.DOWN)
    }

    //%blockid=customthrowwaterballright block="往右洒水"
    //%group="洒水"
    export function throwWaterballRight() {
        throwWaterBall(WaterballDirection.RIGHT)
    }

    //%blockid=customthrowwaterballleft block="往左洒水"
    //%group="洒水"
    export function throwWaterballLeft() {
        throwWaterBall(WaterballDirection.LEFT)
    }

    function prepareFire() {
        currentLevelFire = 0
        for (let grassLocation of tiles.getTilesByType(sprites.swamp.swampTile1)) {
            currentLevelFire += 1
            let fireSprite = sprites.create(img`
                . . . . 2 2 . . . 2 . . 2 . . .
                . 2 2 . . 2 2 . . 2 2 . . 2 . .
                . . 2 . 2 2 4 4 4 2 2 . . 2 2 .
                . . 2 2 2 4 5 5 2 2 4 4 4 2 2 .
                . 2 4 d 5 2 5 5 2 d d d 2 2 . .
                . 2 4 5 2 2 1 2 2 d 5 5 2 4 . .
                . 2 2 2 2 1 1 1 2 2 1 5 2 4 4 .
                . 4 2 2 1 1 5 5 2 2 1 5 2 2 4 .
                . 2 2 5 1 1 5 2 2 5 5 d 2 2 4 .
                . 2 2 5 5 2 1 1 1 5 2 1 2 2 2 .
                . 2 d 5 5 d 2 1 1 5 2 1 5 5 2 .
                . . 2 4 d 2 2 5 5 2 2 d 5 4 . .
                . . . 2 2 2 2 5 5 d 2 4 4 . . .
                . . 2 2 2 2 2 4 4 4 2 2 2 . . .
                . . . 2 2 4 4 4 4 4 4 2 2 . . .
                . . . . . 2 2 2 2 2 2 . . . . .
            `, SPRITE_KIND_FIRE) 
            tiles.placeOnTile(fireSprite, grassLocation)
        }
    }

    function prepareFireman() {
        playerSprite = sprites.create(img`
            . . . . . . 5 5 5 5 . . . . . .
            . . . . 5 5 5 5 5 5 5 5 . . . .
            . . . 5 5 5 5 5 5 5 5 5 5 . . .
            . . 5 5 5 5 5 2 2 5 5 5 5 5 . .
            . . 5 5 5 5 5 2 2 5 5 5 5 5 . .
            . . 5 5 5 5 5 5 5 5 5 5 5 5 . .
            . . 5 5 5 5 e e e e 5 5 5 5 . .
            . 5 5 e 5 b f 4 4 f b 5 e 5 5 .
            . 5 e e 8 1 f d d f 1 8 e e 5 .
            . . f e e d d d d d d e e f . .
            . . . f e e 8 8 8 8 e e f . . .
            . . e 8 f 8 8 5 5 8 8 f 8 e . .
            . . 8 d f 8 8 8 8 8 8 f d 8 . .
            . . 8 8 f 8 8 5 5 8 8 f 8 8 . .
            . . . . . f f f f f f . . . . .
            . . . . . 8 8 . . 8 8 . . . . .
        `, SPRITE_KIND_FIREMAN)
        controller.moveSprite(playerSprite)
        scene.cameraFollowSprite(playerSprite)

        let lastMovingTimeStamp = game.runtime()
        game.onUpdate(function() {
            if (playerSprite.vy < 0) {
                currentDirection = WaterballDirection.UP
            } else if (playerSprite.vy > 0) {
                currentDirection = WaterballDirection.DOWN
            } else if (playerSprite.vx < 0) {
                currentDirection = WaterballDirection.LEFT
            } else if (playerSprite.vx > 0) {
                currentDirection = WaterballDirection.RIGHT
            }
            
            game.onUpdate(function () {
                if (playerSprite.vx != 0 || playerSprite.vy != 0) {
                    moving = true;
                    lastMovingTimeStamp = game.runtime()
                } else if (game.runtime() - lastMovingTimeStamp > 500) {
                    moving = false
                }
            })
        })

        game.onPaint(function () {
            if (playerSprite.vy < 0) {
                playerSprite.setImage(img`
                    . . . . . . f f f f . . . . . .
                    . . . . f f 5 5 5 5 f f . . . .
                    . . . f 5 5 5 5 5 5 5 5 f . . .
                    . . f 5 5 5 5 2 2 5 5 5 5 f . .
                    . . f 5 5 2 5 2 2 5 2 5 5 f . .
                    . . f 5 2 5 5 2 2 5 5 2 5 f . .
                    . . f 5 5 5 5 2 2 5 5 5 5 f . .
                    . f 5 5 5 5 5 2 2 5 5 5 5 5 f .
                    . f 5 5 5 5 5 2 2 5 5 5 5 5 f .
                    . . f 5 5 5 5 5 5 5 5 5 5 f . .
                    . . . f 5 5 5 5 5 5 5 5 f . . .
                    . . e 8 f f f f f f f f 8 e . .
                    . . 8 d f 8 8 5 5 8 8 f d 8 . .
                    . . 8 8 f 8 8 8 8 8 8 f 8 8 . .
                    . . . . . f f f f f f . . . . .
                    . . . . . f f . . f f . . . . .
                `)
            } else if (playerSprite.vy > 0) {
                playerSprite.setImage(img`
                    . . . . . . 5 5 5 5 . . . . . .
                    . . . . 5 5 5 5 5 5 5 5 . . . .
                    . . . 5 5 5 5 5 5 5 5 5 5 . . .
                    . . 5 5 5 5 5 2 2 5 5 5 5 5 . .
                    . . 5 5 5 5 5 2 2 5 5 5 5 5 . .
                    . . 5 5 5 5 5 5 5 5 5 5 5 5 . .
                    . . 5 5 5 5 e e e e 5 5 5 5 . .
                    . 5 5 e 5 b f 4 4 f b 5 e 5 5 .
                    . 5 e e 8 1 f d d f 1 8 e e 5 .
                    . . f e e d d d d d d e e f . .
                    . . . f e e 8 8 8 8 e e f . . .
                    . . e 8 f 8 8 5 5 8 8 f 8 e . .
                    . . 8 d f 8 8 8 8 8 8 f d 8 . .
                    . . 8 8 f 8 8 5 5 8 8 f 8 8 . .
                    . . . . . f f f f f f . . . . .
                    . . . . . 8 8 . . 8 8 . . . . .
                `)
            } else if (playerSprite.vx < 0) {
                playerSprite.setImage(img`
                    . . . . . . . . . . . . . . . .
                    . . . . f f f f f f . . . . . .
                    . . . f 5 5 5 5 5 2 f f . . . .
                    . . f 5 2 5 5 5 5 2 2 f f . . .
                    . . f 2 2 5 5 5 5 5 2 2 f . . .
                    . f 2 2 2 5 5 5 5 5 5 2 f . . .
                    . f 5 5 f f f f 5 5 5 5 f . . .
                    . f f f e e e f f f f f f f . .
                    . f e e 4 4 f b e 4 4 e f f . .
                    . . f e d d f 1 4 d 4 e e f . .
                    . . . f d d d e e e e e f . . .
                    . . . f 8 8 8 d d 8 f . . . . .
                    . . . f 5 8 8 d d 8 f . . . . .
                    . . f f 8 8 f 8 8 f f f . . . .
                    . . f f f f f f f f f f . . . .
                    . . . f f f . . . f f . . . . .
                `)
            } else if (playerSprite.vx > 0) {
                playerSprite.setImage(img`
                    . . . . . . . . . . . . . . . .
                    . . . . . . f f f f f f . . . .
                    . . . . f f 2 5 5 5 5 5 f . . .
                    . . . f f 2 2 5 5 5 5 2 5 f . .
                    . . . f 2 2 5 5 5 5 5 2 2 f . .
                    . . . f 2 5 5 5 5 5 5 2 2 2 f .
                    . . . f 5 5 5 5 f f f f 5 5 f .
                    . . f f f f f f f e e e f f f .
                    . . f f e 4 4 e b f 4 4 e e f .
                    . . f e e 4 d 4 1 f d d e f . .
                    . . . f e e e e e d d d f . . .
                    . . . . . f 8 d d 8 8 8 f . . .
                    . . . . . f 8 d d 8 8 5 f . . .
                    . . . . f f f 8 8 f 8 8 f f . .
                    . . . . f f f f f f f f f f . .
                    . . . . . f f . . . f f f . . .
                `)
            }
        })
    }

    function setupLevelTilemaps() {
        levels = [tilemap`level1`, tilemap`level2`, tilemap`level3`]
    }

    function startNextLevel() {
        for (let waterSprite of sprites.allOfKind(SPRITE_KIND_WATER_BALL)) {
            waterSprite.destroy()
        }
        currentLevel += 1
        if (currentLevel == levels.length) {
            game.over(true)
        } else {
            tiles.setTilemap(levels[currentLevel])
            tiles.placeOnRandomTile(playerSprite, assets.tile`spawnTile`)
            prepareFire()
        }
    }

    function restartLevel() {
        for(let fireSprite of sprites.allOfKind(SPRITE_KIND_FIRE)) {
            fireSprite.destroy()
        }
        tiles.setTilemap(levels[currentLevel])
        tiles.placeOnRandomTile(playerSprite, assets.tile`spawnTile`)
        prepareFire()
    }

    //%blockid=customprepareleveli block="开始灭火行动"
    //%group="故事开始"
    export function prepareLevelI() {
        setupLevelTilemaps()
        bindEvents()
        prepareFireman()

        startNextLevel()   
    }

    function createWaterball(direction:WaterballDirection) {
        let waterballSprite = sprites.create(img`
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . 9 9 . . . . . . .
                    . . . . . . 9 9 9 9 . . . . . .
                    . . . . . 9 9 1 9 9 9 . . . . .
                    . . . . 9 9 1 1 9 9 9 9 . . . .
                    . . . 9 9 1 1 9 9 9 9 9 9 . . .
                    . . . 9 1 1 9 9 9 9 9 9 9 . . .
                    . . . 9 9 9 9 9 9 9 9 9 9 . . .
                    . . . 9 9 9 9 9 9 9 9 9 9 . . .
                    . . . . 9 9 9 9 9 9 9 9 . . . .
                    . . . . . 9 9 9 9 9 9 . . . . .
                    . . . . . . 9 9 9 9 . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                `, SPRITE_KIND_WATER_BALL)
        waterballSprite.x = playerSprite.x 
        waterballSprite.y = playerSprite.y
        waterballSprite.setFlag(SpriteFlag.AutoDestroy, true)
        waterballSprite.setFlag(SpriteFlag.DestroyOnWall, true)
        if (direction == WaterballDirection.UP) {
            waterballSprite.vy = -80
        } else if (direction == WaterballDirection.RIGHT) {
            waterballSprite.vx = 80
        } else if (direction == WaterballDirection.DOWN) {
            waterballSprite.vy = 80
        } else {
            waterballSprite.vx = -80
        }
    }

    function throwWaterBall(direction: WaterballDirection) {
        if (controller.up.isPressed() || controller.down.isPressed() ||
            controller.right.isPressed() || controller.left.isPressed() ||
            moving) {
            playerSprite.sayText("需要站着不动才能洒水", 1000)
            return
        }

        if (currentDirection != direction) {
            game.splash("只能向正前方洒水")
            restartLevel()
            return
        }
        createWaterball(direction)
    }

}
