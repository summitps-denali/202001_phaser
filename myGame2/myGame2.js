/*  global Phaser  */

var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
var game_state = {}

game_state.main = function() {};
game_state.main.prototype = {

    preload: function() {
        game.load.image('sky','assets/sky.png');
        game.load.image('ground','assets/platform.png');
        game.load.image('star','assets/star.png');
        game.load.spritesheet('dude','assets/dude.png', 32,48);
    },  //  preload:(end)zh,  

    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.add.sprite(0,0,'star');
        game.add.sprite(0,0,'sky')
        
        this.platforms = game.add.group();
        this.platforms.enableBody = true;
        
        var ground = this.platforms.create(
          0, game.world.height - 64, 'ground');
        ground.scale.setTo(2,2);
        ground.body.immovable = true;
    
        var ledge1 = this.platforms.create(200, 200,'ground');
        ledge1.body.immovable = true;
        var ledge2 = this.platforms.create(700, 300,'ground');
        ledge2.body.immovable = true;
        var ledge3 = this.platforms.create(700, 400,'ground');
        ledge3.body.immovable = true
        
        this.player = game.add.sprite(
          32, game.world.height - 110, 'dude');
        game.physics.arcade.enable(this.player);
        this.player.body.bounce.y = 0.1; 
        this.player.body.gravity.y= 250;
        this.player.body.collideworldbounds = true;
        this.player.animations.add('left',[0,1,2,3],10,true);
        this.player.animations.add('right',[5,6,7,8],10,true);

        this.cursors = game.input.keyboard.createCursorKeys();
        this.stars = game.add.group();
        this.stars.enableBody = true;
        for (var i = 0; i < 12; i++) {
        var star = this.stars.create(i * 70, 0,'star');
        star.body.gravity.y = 300;
        star.body.bounce.y = 0.7 + Math.random() * 0.2;

        this.score = 0;
        this.scoreText = game.add.text(16, 16,
          'score:', {fontSize: '32px;, fill: #000'});

        }

    },  //  create:(end)

    update: function() {
        game.physics.arcade.collide(this.player, this.platforms);
        game.physics.arcade.collide(this.stars, this.platforms);
        
        game.physics.arcade.overlap(this.player, this.stars,
          this.collectStar, null, this);

        this.player.body.velocity.x = 0;
        if (this.cursors.left.isDown) {
            this.player.body.velocity.x = -150;
            this.player.animations.play('left');
            
        }
        else if (this.cursors.right.isDown) {
            this.player.body.velocity.x = 150;
            this.player.animations.play('right'); 
        }
        else{
            this.player.animations.stop();
            this.player.frame = 4;
        }
        if(this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.body.velocity.y = -350;    
        }

    },  //  update:(end)

    collectStar: function(player,star) {
        star.kill();
        this.score += 1;
        this.scoreText.text = 'score: ' + this.score;
     },
    
    
}
game.state.add('main', game_state.main);
game.state.start('main');
