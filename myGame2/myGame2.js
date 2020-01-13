/*global Phaser*/

var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
var game_state = {}

game_state.main = function() {};
game_state.main.prototype = {

    preload: function() {
       game.load.image('sky', 'assets/sky.png');
       game.load.image('ground', 'assets/green platform.png');
       game.load.image('paper', 'assets/Paper.png', 58, 74);
       game.load.spritesheet('player', 'assets/Dog.png', 100, 100);
    },

    create: function() {
       game.physics.startSystem(Phaser.Physics.ARCADE);

       this.score = 0;
       game.add.sprite(0, 0, 'paper');
       // game.add.sprite(0, 0, 'sky');
       game.stage.backgroundColor = '#c1cad6';

       this.platforms = game.add.group();
       this.platforms.enableBody = true;
       
        //game.stage.backgroundColor = '#000000';
        //this.text = game.add.text(
          // 20, 20,
          //  'This story begins with a dog named Kai. Kai was living on the streets when he overheard some evil men plotting to kill 10 people! He decided he would have to stop them. Unfortunately, Kai does not know enough about their plan yet. Help Kai collect papers which will give him more info about the bad guys plan.', {
          // fontSize: '30px',
          // fill: '#fff'
          // }
       // );
     // game.input.keyboard.onPressCallback = function(e) {
        //  console.log("key pressed: ", e);
        //  if (e == 's') {
         //     game.input.keyboard.onPressCallback = null;
          //    game.state.start('main');
        //  }
    //  }

       var ground = this.platforms.create(0, game.world.height - 64, 'ground');
       ground.scale.setTo(2, 2);
       ground.body.immovable = true;

       var ledge = this.platforms.create(20, 150, 'ground');
       ledge.body.immovable = true;

       this.player = game.add.sprite(32, game.world.height = 150, 'player');
       this.player.scale.setTo(1.1);
       game.physics.arcade.enable(this.player);
       this.player.body.bounce.y = 0.1
       this.player.body.gravity.y = 300
       this.player.body.collideWorldBounds = true;
       
       this.player.animations.add('left', [0, 1, 2, 3], 10, true);
       this.player.animations.add('right', [5, 6, 7, 8], 10, true);

//       game.physics.arcade.collide(this.player, this.platforms);
    
       this.cursors = game.input.keyboard.createCursorKeys();
       this.papers = game.add.group();
       this.papers.enableBody = true;
       for (var i = 0; i < 12; i++) {
           var paper = this.papers.create(i * 70, 0, 'paper');
           this.papers.scale.setTo(.75);
           paper.body.gravity.y = 300;
           paper.body.bounce.y = 0.7 + Math.random() * 0.2;
       }
       this.scoreText = game.add.text(16, 16, 'score: 0', {
           fontSize: '32px', 
           fill: '#000'
       });
    },

    update: function() {
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
            this.player.frame = 4;
        }
        if (this.cursors.up.isDown && this.player.body.touching.down){
            alert('test');
            this.player.body.velocity.y = -350;
        }
        game.physics.arcade.collide(this.player, this.platforms);
        game.physics.arcade.collide(this.papers, this.platforms);
        game.physics.arcade.overlap(this.player, this.papers, this.collectPaper, null, this);
        this.scoreText.text = "score: " + this.score;
    },
   // game.state.add('intro', game_state.intro);
    collectPaper: function(player, paper) {
        paper.kill();
        this.score += 1;
    }
}
game.state.add('main', game_state.main);
game.state.start('main');
