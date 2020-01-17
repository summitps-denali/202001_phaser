/*global Phaser*/

var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
var game_state = {}

game_state.main = function() {};
game_state.main.prototype = {

    preload: function(){
        game.load.image('sky', 'assets/sky.png');
        game.load.image('ground', 'assets/platform.png');
        game.load.image('star', 'assets/star.png');
        game.load.spritesheet('New piskel', 'assets/New Piskel.png', 39, 39);
    },

    create: function() {
        game.add.sprite(0, 0, 'sky');
        game.add.sprite(0, 0, 'star');
    
        this.platforms = game.add.group();
        this.platforms.enableBody = true;
        var ground = this.platforms.create(
          0, game.world.height - 64, 'ground');
        ground.scale.setTo(2, 2);
        ground.body.immovable = true;
    
        var ledge1 = this.platforms.create(-50, 400, 'ground');
        ledge1.body.immovable = true;
        var ledge2 = this.platforms.create(420, 275, 'ground');
        ledge2.body.immovable = true;
        var ledge3 = this.platforms.create(-50, 150, 'ground');
        ledge3.body.immovable = true;
    
        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.player = game.add.sprite(32, game.world.height - 150, 'New piskel');
        game.physics.arcade.enable(this.player);
        this.player.body.bounce.y = 0.2;
        this.player.body.gravity.y = 300;
        this.player.body.collideWorldBounds = true;
        this.player.animations.add('left', [ 6, 7, 8, 9, 10], 12, true);
        this.player.animations.add('right', [0, 1, 2, 3, 4], 12, true);
        this.cursors = game.input.keyboard.createCursorKeys();
        
        this.stars = game.add.group();
        this.stars.enableBody = true;
        for (var i = 0; i < 20; i++) {
            var star = this.stars.create(i * 70, 0, 'star');
            star.body.gravity.y = 300;
            star.body.bounce.y = 0.7 + Math.random() * 0.2;
        }
        this.score = 0
      this.scoreText = game.add.text(16, 16, 'score: o', {
          frontSize: '32px',
          fill: '#00'
      });
        
    },

    update: function() {
        game.physics.arcade.collide(this.player, this.platforms);
        game.physics.arcade.collide(this.stars, this.platforms);
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
            this.player.frame = 5;
        }
        if (this.cursors.up.isDown && this.player.body.touching.down){
            this.player.body.velocity.y = -350;
        }
        game.physics.arcade.overlap(this.player, this.stars, this.collectStar, null, this);
    },
    collectStar: function(player, star) {
        star.kill();
        this.score += 1;
        this.scoreText.text = "score:" +this.score;
    }
}
game.state.add('main', game_state.main);
game.state.start('main');
