/*global Phaser*/


var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
var game_state = {};

var jumped = false;
var plats = [];
var enemyDirection = 'left';
game_state.main = function() {};
game_state.main.prototype = {

    preload: function() {
        game.load.image('sky', 'assets/sky.png');
        game.load.image('ground', 'assets/platform.png');
        game.load.image('platform', 'assets/imperm_platform.png');
        game.load.image('diamond', 'assets/diamond.png');
        game.load.image('enemy_wall', 'assets/enemy_wall.png');
        game.load.spritesheet('player','assets/sprite.png',128,128);
        game.load.spritesheet('enemy', 'assets/bad_sprite.png',128,128);
    },

    create: function() {
        game.add.sprite(0, 0, 'sky');
        
        // Loading wall groups
        this.platforms = game.add.group();
        this.platforms.enableBody = true;
        this.floors = game.add.group();
        this.floors.enableBody = true;
        this.enemyWalls = game.add.group();
        this.enemyWalls.enableBody = true;
        
        // Making the floor
        var ground = this.floors.create(0, game.world.height - 64, 'ground');
        ground.scale.setTo(2, 2);
        ground.body.immovable = true;
        
        // Making invisible walls for enemies
        var enemyWall1 = this.enemyWalls.create(96, 192, 'enemy_wall');
        enemyWall1.scale.setTo(1, 2);
        enemyWall1.body.immovable = true;
        var enemyWall2 = this.enemyWalls.create(528, 192, 'enemy_wall');
        enemyWall2.scale.setTo(1, 2);
        enemyWall2.body.immovable = true;
        
        // Making the floating ledge
        var ledge = this.floors.create(128, 256, 'ground');
        ledge.body.immovable = true;
        
        // Making the walls
        var walls = [];
        walls.push(this.floors.create(720, 210, 'ground'));
        walls.push(this.floors.create(620, 210, 'ground'));
        for (var i = 0; i < walls.length; i++) {
            walls[i].body.immovable = true;
        }
        walls[0].scale.setTo(0.05,11);
        walls[1].scale.setTo(0.05,278/32);
        
        // Making the platforms
        plats.push(this.platforms.create(640, 480, 'platform'));
        plats[0].scale.setTo(0.2,1);
        plats.push(this.platforms.create(640, 420, 'platform'));
        plats[1].scale.setTo(0.2,1);
        plats.push(this.platforms.create(640, 360, 'platform'));
        plats[2].scale.setTo(0.2,1);
        plats.push(this.platforms.create(640, 300, 'platform'));
        plats[3].scale.setTo(0.2,1);
        plats.push(this.platforms.create(640, 240, 'platform'));
        plats[4].scale.setTo(0.2,1);
        for (var i = 0; i < plats.length; i++) {
            plats[i].body.immovable = true;
            plats[i].body.checkCollision.down = false;
            plats[i].body.checkCollision.left = false;
            plats[i].body.checkCollision.right = false;
        }
        
        // Making collectable diamonds
        this.diamonds = game.add.group();
        this.diamonds.enableBody = true;
        for (var i=0; i < 9; i++) {
            var diamond = this.diamonds.create(i * 60 + 16, 0, 'diamond');
            diamond.body.gravity.y = 300;
            diamond.body.bounce.y = 0.35 + Math.random() * 0.1;
        }
        this.diamonds.create(436, 322, 'diamond');
        
        // Enabling physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        // Creating the enemy
        this.enemy = game.add.sprite(256, 192, 'enemy');
        this.enemy.scale.setTo(0.25, 0.25);
        game.physics.arcade.enable(this.enemy);
        this.enemy.body.gravity.y = 1800;
        this.enemy.body.collideWorldBounds = true;
        this.enemy.animations.add('left', [0,1,2], 10, true);
        this.enemy.animations.add('right', [4,5,6], 10, true);
        this.enemy.body.setSize(112, 112, 2, 2);
        
        // Creating the player
        this.player = game.add.sprite(32, game.world.height - 256, 'player');
        this.player.scale.setTo(0.25,0.25);
        game.physics.arcade.enable(this.player);
        this.player.body.gravity.y = 1800;
        this.player.body.collideWorldBounds = true;
        this.player.animations.add('left', [0,1,2], 10, true);
        this.player.animations.add('right', [4,5,6], 10, true);
        this.player.body.setSize(112, 112, 2, 2);
        
        // Allowing key press recognition
        this.cursors = game.input.keyboard.createCursorKeys();
        
        // Creating scoreboard
        this.scoreText = game.add.text(16, 16, 'Score: 0', {
            fontSize: '32px',
            fill: '#111'
        });
        this.score = 0;
    },

    update: function() {
        // Creating colliders
        game.physics.arcade.collide(this.diamonds, this.floors);
        game.physics.arcade.collide(this.diamonds, this.platforms);
        // player V floors handles jump, wall-slide, and wall-jump
        game.physics.arcade.collide(this.player, this.floors, function() {
            // player jump
            if (this.cursors.up.isDown && this.player.body.touching.down && jumped == false) {
                this.player.body.velocity.y += -330;
                jumped = true;
            }
        
            // sliding down walls
            if (this.player.body.velocity.y >= 100) {
                this.player.body.velocity.y = (-10/(this.player.body.velocity.y - 99))+40;
            }
            
            // player wall-jump
            if (this.cursors.up.isDown && this.player.body.touching.right && jumped == false && !this.player.body.touching.down) {
                this.player.body.velocity.x = -500;
                this.player.body.velocity.y = -250;
                jumped = true;
            }
            else if (this.cursors.up.isDown && this.player.body.touching.left && jumped == false && !this.player.body.touching.down) {
                this.player.body.velocity.x = 500;
                this.player.body.velocity.y = -250;
                jumped = true;
            }

        }, null, this);
        // player V platforms handles jump
        game.physics.arcade.collide(this.player, this.platforms, function() {
            // player jump
            if (this.cursors.up.isDown && this.player.body.touching.down && jumped == false) {
                this.player.body.velocity.y += -330;
                jumped = true;
            }
        }, null, this);
        game.physics.arcade.collide(this.enemy, this.floors, function() {
            if (this.enemy.body.touching.left || this.enemy.body.touching.right) {
                if (enemyDirection == 'left') {
                    enemyDirection = 'right';
                }
                else if (enemyDirection == 'right') {
                    enemyDirection = 'left';
                }
            }
        }, null, this);
        game.physics.arcade.collide(this.enemy, this.platforms, function() {
            if (this.enemy.body.touching.left || this.enemy.body.touching.right) {
                if (enemyDirection == 'left') {
                    enemyDirection = 'right';
                }
                else if (enemyDirection == 'right') {
                    enemyDirection = 'left';
                }
            }
        }, null, this);
        game.physics.arcade.collide(this.enemy, this.enemyWalls, function() {
            if (this.enemy.body.touching.left || this.enemy.body.touching.right) {
                if (enemyDirection == 'left') {
                    enemyDirection = 'right';
                }
                else if (enemyDirection == 'right') {
                    enemyDirection = 'left';
                }
            }
        }, null, this);
        
        game.physics.arcade.overlap(this.player, this.diamonds, this.collectDiamond, null, this);
        game.physics.arcade.overlap(this.player, this.enemy, this.gameOver, null, this);
        
        // Move player left/right
        if (this.cursors.left.isDown) {
            this.player.body.velocity.x += this.player.body.touching.down ? -50 : -30;
            if (this.player.body.velocity.x < -400) {
                this.player.body.velocity.x = -400;
            }
            
            
            this.player.animations.play('left');
        }
        else if (this.cursors.right.isDown) {
            this.player.body.velocity.x += this.player.body.touching.down ? 50 : 30;
            if (this.player.body.velocity.x > 400) {
                this.player.body.velocity.x = 400;
            }
            
            
            this.player.animations.play('right');
        }
        else {
            this.player.body.velocity.x /= this.player.body.touching.down ? 2 : 1.05;
            if (this.player.body.velocity.x < 10 && this.player.body.velocity.x > -10) {
                this.player.body.velocity.x = 0;
            }
            
            this.player.animations.stop();
            this.player.frame = 3;
            
            
        }
        
        // Player jump extend
        if (this.cursors.up.isDown && this.player.body.velocity.y <= -200) {
            this.player.body.velocity.y += -22;
        }
        if (this.cursors.up.isUp) {
            jumped = false;
        }
        
        // Going down through platforms
        if (this.cursors.down.isDown && this.player.body.touching.down) {
            for (var i = 0; i < plats.length; i++) {
                plats[i].body.checkCollision.up = false;
            }
        }
        else if (this.player.body.velocity.y >= 100) {
            for (var i = 0; i < plats.length; i++) {
                plats[i].body.checkCollision.up = true;
            }
        }
        
        // Enemy movement
        if (enemyDirection == 'left') {
            this.enemy.body.velocity.x = -100;
            this.enemy.animations.play('left');
        }
        else if (enemyDirection == 'right') {
            this.enemy.body.velocity.x = 100;
            this.enemy.animations.play('right');
        }
        else {
            this.enemy.body.velocity.x = 0;
            this.enemy.animations.stop();
            this.enemy.frame = 3;
        }
        
        // game.debug.body(this.enemy);
    },
    
    collectDiamond: function(player, diamond) {
        diamond.kill();
        this.score += 10;
        this.scoreText.text = "Score: " + this.score;
        if (this.score >= 100) {
            game.state.start('win');
        }
    },
    
    gameOver: function(player, enemy) {
        game.state.start('death');
    }

};
game.state.add('main', game_state.main);