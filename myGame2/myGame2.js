/*global Phaser*/

var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
var game_state = {}

game_state.main = function() {};
game_state.main.prototype = {

    preload: function() {
        game.load.image('sky', 'assets/castleWall.png');
        game.load.image('ground', 'assets/stoneFloor.png');
        game.load.image('floatingPlatform', 'assets/stoneBrick.png');
        game.load.image('star', 'assets/monsterKey.png');
        game.load.spritesheet('dude', 'assets/Knight.png', 160, 160);
    },

    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.add.sprite(0, 0, 'star');
        game.add.sprite(0, 0, 'sky');
        this.platforms = game.add.group();
        this.platforms.enableBody = true;
        var ground = this.platforms.create(0, game.world.height - 64, 'ground');
        ground.scale.setTo(4, 3);
        ground.body.immovable = true;
        var ledge = this.platforms.create(210, 385, 'floatingPlatform');
        var ledge2 = this.platforms.create(535, 280, 'floatingPlatform');
        var ledge3 = this.platforms.create(113, 150, 'floatingPlatform');
        ledge.scale.setTo (1.2,1.2 )
        ledge.body.immovable = true;
        ledge2.scale.setTo (1, 1);
        ledge2.body.immovable = true;
        ledge3.scale.setTo (1,1);
        ledge3.body.immovable = true;
        this.player = game.add.sprite(32, game.world.height - 150, 'dude');
        this.player.scale.setTo(0.75, 0.75);
        game.physics.arcade.enable(this.player);
        this.player.body.bounce.y  = 0.5;
        this.player.body.gravity.y = 299;
        this.player.body.collideWorldBounds = true;
        this.player.animations.add('left', [0, 1], 8, true);
        this.player.animations.add('right', [3, 4], 8, true);
        this.cursors = game.input.keyboard.createCursorKeys();
        this.stars = game.add.group();
        this.stars.enableBody = true;
        for (var i = 0; i < 12; i++) {
            var star = this.stars.create(i * 70, 0, 'star');
            star.scale.setTo (0.35, 0.35);
            star.body.gravity.y = 250;
            star.body.bounce.y = 0.1 + Math.random() + 0.2;
        }
        this.scoreText = game.add.text(16, 16, 'score: 0',{
            fontSize: '32px',
            fill: '#000'
        });
        this.score = 0;
    },

    update: function() {
        game.physics.arcade.collide(this.player, this.platforms);
        this.player.body.velocity.x = 0;
        if (this.cursors.left.isDown) {
            this.player.body.velocity.x = -150;
            
            this.player.animations.play('left');
        }
        else if (this.cursors.right.isDown) {
            this.player.body.velocity.x = 150;
            
            this.player.animations.play('right');
        }
        else {
            this.player.animations.stop();
            
            this.player.frame = 2;
        }
        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.body.velocity.y = -350;
        }
        game.physics.arcade.collide(this.stars, this.platforms);
        game.physics.arcade.overlap(this.player, this.stars, this.collectStar, null, this);
        this.player.body.setSize(80, 115, 28);
        //game.debug.body(this.player);
        
    },
    
    collectStar: function(player, star) {
        star.kill();
        this.score++;
        this.scoreText.text = 'score: ' + this.score;
        if (this.score == 12)
            game.state.start('end');
    }

}
game.state.add('main', game_state.main);
//game.state.start('main');
