/*global Phaser*/

var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
var game_state = {}

game_state.main = function() {};
game_state.main.prototype = {

    preload: function() {
    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/star.png');
    game.load.spritesheet('NewPiskel',
      'assets/New Piskel (6).png', 49, 49);
    },

    create: function() {
    
    //background
    game.add.sprite(0, 0, 'sky');
    
    //physics
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    game.add.sprite(0, 0, 'star');
    //platforms
    this.platforms = game.add.group();
    this.platforms.enableBody = true;
    
    //creating ground
    var ground = this.platforms.create(0, game.world.height - 64, 'ground');
    ground.scale.setTo(2, 2);
    ground.body.immovable = true;
    
    //creating ledges
    var ledge = this.platforms.create(130, 450, 'ground');
    ledge.body.immovable = true;
    var ledge = this.platforms.create(260, 290, 'ground');
    ledge.body.immovable = true;
    
    //player
    this.player = game.add.sprite(32, game.world.height - 150, 'NewPiskel');
    game.physics.arcade.enable(this.player);
    /*this.player.scale.setTo(0.5, 0.5);
    this.player.body.setSize(72, 72, 10, 10);*/
    //physics property's
    this.player.body.bounce.y = 0.2;
    this.player.body.gravity.y = 320;
    this.player.body.collideWorldBounds = true;
    //Animations
    this.player.animations.add('right', [5, 6, 7, 8], 10, true);
    this.player.animations.add('left', [0, 1, 2, 3,], 10, true);
    //controls
    this.cursors = game.input.keyboard.createCursorKeys();
    
    //Stars
    this.stars = game.add.group();
    this.stars.enableBody = true;
    
    //creating more stars
    for (var i = 0; i < 60; i++) {
        //create a star inside of the 'this.stars' group
        var star = this.stars.create(i * 70, 0, 'star');
        //gravity for star
        star.body.gravity.y = 300;
        //random bounce value
        star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }
    this.score = 0;    
    //the score
    this.scoreText = game.add.text(16, 16, 'Score:' + this.score, {
        fontSize:'32px',
        fill: '#000'
    })

    },

    update: function() {
    //colisions
    game.physics.arcade.collide(this.player, this.platforms);
    //Reset players velocity
    this.player.body.velocity.x = 0;
    
    if(this.cursors.left.isDown) {
        //left
        this.player.body.velocity.x = -150;
        
        this.player.animations.play('left');
    }
    else if (this.cursors.right.isDown){
        //right
        this.player.body.velocity.x = 150;
        this.player.animations.play('right');
    }
    else {
        //Idle
        this.player.animations.stop();
        this.player.frame = 4;
    }
    
    //jump
    if (this.cursors.up.isDown && this.player.body.touching.down){
        this.player.body.velocity.y = -350;
    }
    //Collision for stars
    game.physics.arcade.collide(this.stars, this.platforms);
    
    //checking if this.player is overlapping with the stars or not
    game.physics.arcade.overlap(this.player, this.stars, this.collectStar, null, this);
    
    
    },
    collectStar: function(player, star) {
    this.score += 1;
    star.kill();
    this.scoreText.text = 'Score:' + this.score;
}
};

game.state.add('main', game_state.main);
game.state.start('main');
