/*  global Phaser game game_state  */

const collectSound = new Audio();
collectSound.src = "assets/collect sound.mp3";

game_state.main = function() {};
game_state.main.prototype = {

    preload: function() {
       game.load.image('platform', 'assets/final platform.png', 400, 32);
       game.load.image('smaller platform', 'assets/smaller platform.png', 200, 32);
       game.load.image('ground', 'assets/ground.png');
       game.load.image('computer', 'assets/Computer.png', 71, 65);
       game.load.image('paper', 'assets/Paper.png', 58, 74);
       game.load.spritesheet('player', 'assets/Dog.png', 100, 100);
       
    },

    create: function() {
       game.physics.startSystem(Phaser.Physics.ARCADE);

       this.score = 0;
       game.stage.backgroundColor = '#c1cad6';

       this.platforms = game.add.group();
       this.platforms.enableBody = true;

       var ground = this.platforms.create(0, game.world.height - 64, 'ground');
       ground.scale.setTo(2, 2);
       ground.body.immovable = true;

       var ledge = this.platforms.create(250, 330, 'platform');
       ledge.body.immovable = true;
       
       var ledge = this.platforms.create(600, 150, 'smaller platform');
       ledge.body.immovable = true;
       
      this.comGroup = game.add.group();
       this.comGroup.enableBody = true;
       this.computer = this.comGroup.create(700, 67, 'computer');
       this.computer.body.immovable = true;

       this.player = game.add.sprite(32, game.world.height - 200, 'player');
       this.player.scale.setTo(.99);
       game.physics.arcade.enable(this.player);
       this.player.body.bounce.y = 0.1;
       this.player.body.gravity.y = 300;
       this.player.body.collideWorldBounds = true;
       
       this.player.animations.add('left', [0, 1, 2, 3], 10, true);
       this.player.animations.add('right', [5, 6, 7, 8], 10, true);

       this.cursors = game.input.keyboard.createCursorKeys();
       
       this.papers = game.add.group();
       this.papers.enableBody = true;
       for (var i = 0; i < 12; i++) {
           var paper = this.papers.create(i * 70, 0, 'paper');
           this.papers.scale.setTo(.75);
           paper.body.gravity.y = 300;
           paper.body.bounce.y = 0.2 + Math.random() * 0.2;
       }
       this.scoreText = game.add.text(650, 16, 'score: 0', {
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

        game.physics.arcade.collide(this.player, this.platforms);
        game.physics.arcade.collide(this.papers, this.platforms);
        //game.physics.arcade.collide(this.player, this.computer);
        game.physics.arcade.overlap(this.player, this.papers, this.collectPaper, null, this);
        game.physics.arcade.overlap(this.player, this.computer, this.collectComputer, null, this);

        if (this.cursors.up.isDown && this.player.body.touching.down){
            this.player.body.velocity.y = -362;
        }

        this.scoreText.text = "score: " + this.score;
       
    },

    collectPaper: function(player, paper) {
        paper.kill();
        this.score += 1;
        collectSound.play(1);
        
    },

    collectComputer: function(player, computer) {
        if (this.score > 11)
            game.state.start('end');
            collectSound.play(1);
    },
    
};
game.state.add('main', game_state.main);
