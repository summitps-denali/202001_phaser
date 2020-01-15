/*global Phaser*/

var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
var game_state = {}

game_state.main = function() {};
game_state.main.prototype = {

    preload: function() {
        game.load.image('sky', 'assets/sky.png');
        game.load.image('ground', 'assets/platform.png');
        game.load.image('star', 'assets/star.png');
        game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    },

    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        this.score = 0;
        game.add.sprite(0, 0, 'star');
        game.add.sprite(0, 0, 'sky');   

        this.platforms = game.add.group();
        // We will be able enable physics for any object that is created in this group
        this.platforms.enableBody = true;
        // Here we create the ground.
        var ground = this.platforms.create(0, game.world.height - 64, 'ground');
        // Scale it to fit the width of the game (the original sprite is 400x32 in size)
        ground.scale.setTo(2,2);
        ground.body.immovable = true;

        // Now let's create two ledges
        var ledge = this.platforms.create(50, 200, 'ground');
        ledge.body.immovable = true;
        var ledge2 = this.platforms.create(350, 350, 'ground');
        ledge2.body.immovable = true;
        
        //  player
        this.player = game.add.sprite(32, game.world.height - 150, 'dude');
        game.physics.arcade.enable(this.player);
        this.player.body.bounce.y = 0.1;
        this.player.body.gravity.y = 300;
        this.player.body.collideWorlBounds = true;

        this.player.animations.add('left', [0,1,2,3], 10, true);
        this.player.animations.add('right', [5,6,7,8], 10, true);
   
        this.cursors = game.input.keyboard.createCursorKeys();
        
        this.stars = game.add.group();
        this.stars.enableBody = true;
        
        for (var i = 0; i < 12; i++) {
            var star = this.stars.create(i * 70,0, "star");
            star.body.gravity.y = 300;
            star.body.bounce.y = 0.7 + Math.random() * 0.2;
        }

        this.scoreText = game.add.text(16, 16,
          'score: 0', {
              fontSize: '32px',
              fill: '#000'
              
        });
    },

    update: function() {
        game.physics.arcade.collide(
          this.player,
          this.platforms);
        game.physics.arcade.collide(
          this.stars,
          this.platforms);
        game.physics.arcade.overlap(
          this.player,
          this.stars,
          this.collectStar, null, this);

        this.player.body.velocity.x = 0
        if (this.cursors.left.isDown) {
            // Move to the left
            this.player.body.velocity.x = -150
            this.player.animations.play('left');
        }
        else if (this.cursors.right.isDown) {   
            this.player.body.velocity.x = 150;
            this.player.animations.play('right');
        }
        else {   
            // stand still
            this.player.animations.stop();
            this.player.frame = 4;
        }

        // Allow the this.player to jump if they are touching the ground
        if (this.cursors.up.isDown &&
            this.player.body.touching.down) {
            this.player.body.velocity.y = -350;
        }
    },

    collectStar: function(player, star) {
        this.score += 1;
        this.scoreText.text = 'score: ' + this.score;
        star.kill();
    },

};

game.state.add('main', game_state.main);
game.state.start('main');
