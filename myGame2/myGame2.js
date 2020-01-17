/*global Phaser*/
/*global BOUNCE*/
/*global GRAVITY*/
/*global Value*/

var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
var game_state = {}

game_state.main = function() {};
game_state.main.prototype = {

    preload: function() {
        game.load.image('sky', 'assets/sky.png');
        game.load.image('ground', 'assets/platform.png');
        game.load.image('star', 'assets/star.png');
        game.load.spritesheet('duck', 'assets/duck.png', 140, 140);
    },

    create: function() {
        // var BOUNCE;
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.add.sprite(0, 0, 'star');
        game.add.sprite(0, 0, 'sky');
        this.platforms = game.add.group();
        this.platforms.enableBody = true;
        var ground = this.platforms.create(0, game.world.height - 64, 'ground');
        ground.scale.setTo(2, 2);
        ground.body.immovable = true;
        var ledge = this.platforms.create(200, 300, 'ground');
        ledge.body.immovable = true;
        var ledge = this.platforms.create(654, 434, 'ground');
        ledge.body.immovable = true;
        this.player = game.add.sprite(32, 100, 'duck');
        this.player.scale.setTo(0.5,0.5);
        game.physics.arcade.enable(this.player);
        this.player.body.bounce.y = 0.2;
        this.player.body.gravity.y = 500;
        this.player.body.collideWorldBounds = true;
        this.player.animations.add('left', [1, 2, 3], 1, true);
        this.player.animations.add('right', [4, 5, 6], 1, true);
        this.stars = game.add.group();
        this.stars.enableBody = true;
        this.score = +1
        for (var i = 0; i < 12; i++){
            var star = this.stars.create(i *70, 0, 'star');
            star.body.gravity.y = 300;
            star.body.bounce.y = 0.2 + Math.random() * 0.2;
        }
        this.scoreText = game.add.text(16, 16, 'score: 0', {
            fontSize: '32px',
            fill: '#000'
        });
    },

    update: function() {
      game.physics.arcade.collide(this.player, this.platforms);
      this.cursors = game.input.keyboard.createCursorKeys();
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
          this.player.frame = 0;
      }
      
      game.physics.arcade.collide(this.stars, this.platforms);
      game.physics.arcade.overlap(this.player, this.stars, this.collectStar, null, this);
      
      if (this.cursors.up.isDown & this.player.body.touching.down) {
          this.player.body.velocity.y = -375;
      }
      
      this.scoreText.text='nfpoint'+this.score 
      game.debug.body(this.player);
     
    },
    collectStar: function(player, star) {
        star.kill();
        this.score+=1
    }
    

   
};

game.state.add('main', game_state.main);
game.state.start('main');

