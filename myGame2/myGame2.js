/*global Phaser*/


var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
var game_state = {};

var jumped = false;
var plats = [];

game_state.main = function() {};
game_state.main.prototype = {

    preload: function() {
        game.load.image('sky', 'assets/sky.png');
        game.load.image('ground', 'assets/platform.png');
        game.load.image('platform', 'assets/imperm_platform.png');
        game.load.image('star', 'assets/star.png');
        game.load.spritesheet('player','assets/sprite.png',128,128);
    },

    create: function() {
        game.add.sprite(0, 0, 'sky');
        
        this.platforms = game.add.group();
        this.platforms.enableBody = true;
        this.floors = game.add.group();
        this.floors.enableBody = true;
        
        var ground = this.floors.create(0, game.world.height - 64, 'ground');
        ground.scale.setTo(2, 2);
        ground.body.immovable = true;
        
        var ledge = this.floors.create(128, 256, 'ground');
        ledge.body.immovable = true;
        
        var walls = [];
        walls.push(this.floors.create(720, 210, 'ground'));
        walls.push(this.floors.create(620, 210, 'ground'));
        for (var i = 0; i < walls.length; i++) {
            walls[i].body.immovable = true;
        }
        walls[0].scale.setTo(0.05,11);
        walls[1].scale.setTo(0.05,278/32);
        
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
        
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        this.player = game.add.sprite(32, game.world.height - 256, 'player');
        this.player.scale.setTo(0.25,0.25);
        game.physics.arcade.enable(this.player);
        this.player.body.gravity.y = 1800;
        this.player.body.collideWorldBounds = true;
        this.player.animations.add('left', [0,1,2], 10, true);
        this.player.animations.add('right', [4,5,6], 10, true);
        this.player.body.setSize(112, 112, 2, 2);
        
        this.cursors = game.input.keyboard.createCursorKeys();
    },

    update: function() {
        game.physics.arcade.collide(this.player, this.floors);
        game.physics.arcade.collide(this.player, this.platforms);
        
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
        
        if (this.cursors.up.isDown && this.player.body.touching.down && jumped == false) {
            this.player.body.velocity.y += -330;
            jumped = true;
        }
        else if (this.cursors.up.isDown && this.player.body.velocity.y <= -200) {
            this.player.body.velocity.y += -22;
        }
        if (this.cursors.up.isUp)
        {
            jumped = false;
        }
        
        if (this.cursors.up.isDown && this.player.body.touching.right && jumped == false) {
            this.player.body.velocity.x = -500;
            this.player.body.velocity.y = -250;
            jumped = true;
        }
        else if (this.cursors.up.isDown && this.player.body.touching.left && jumped == false) {
            this.player.body.velocity.x = 500;
            this.player.body.velocity.y = -250;
            jumped = true;
        }
        
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
        
        if ((this.player.body.touching.right || this.player.body.touching.left) && this.player.body.velocity.y >= 100) {
            this.player.body.velocity.y = (-10/(this.player.body.velocity.y - 99))+40;
        }
        
        // game.debug.body(this.player);
    },

};
game.state.add('main', game_state.main);
game.state.start('main');
