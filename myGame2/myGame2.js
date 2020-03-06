/*  global Phaser game game_state  */

game_state.main = function() {};
game_state.main.prototype = {

    preload: function() {
        game.load.image('sky','assets/sky.png');   
        game.load.image('ground','assets/platform.png');
        game.load.image('star','assets/star.png');
        game.load.spritesheet('dude','assets/bird.png', 100,100);
    },

    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        game.add.sprite(0, 0, 'star');
        game.add.sprite(0, 0, 'sky');
        
        this.platforms = game.add.group();
        this.platforms.enableBody = true;
        //Here we create the ground.
        var ground = this.platforms.create(0, game.world.height - 64, 'ground');
        ground.scale.setTo(2, 2);
        // This stops it from falling away when you jump on it
        ground.body.immovable= true;

        // Now let's create two ledges
        var ledge= this.platforms.create(200, 200, 'ground');
        ledge.body.immovable=true;

        var ledge2= this.platforms.create(400, 350, 'ground');
        ledge2.body.immovable=true;

        // The this.player and its settings 
        this.player=game.add.sprite(
          32, game.world.height - 150, 'dude');
        // We need to enable physics on the this.player
        game.physics.arcade.enable(this.player);
        this.player.body.bounce.y = 0.1;
        this.player.body.gravity.y = 300;
        this.player.body.collideWorldBounds = true;
        this.player.animations.add('left',[0,1,2,3], 10, true);
        this.player.animations.add('right' [5,6,7,8], 10,true);

        this.cursors= game.input.keyboard.createCursorKeys();
        
        this.stars = game.add.group();
        this.stars.enableBody = true;
        for (var i = 0; i< 12; i++) {
            var star = this.stars.create(i * 70, 0, 'star');
            star.body.gravity.y = 300;
            star.body.bounce.y= 0.7 + Math.random() * 0.2;
        }
        
        game.physics.arcade.collide(this.stars, this.platforms);

        this.score = 0;
        this.scoreText = game.add.text(16, 16,
          'score: 0', {
              fontSize: '32px',fill: '#000'
              
          });
    },  //  create end

    update: function() {
        game.physics.arcade.collide(this.stars, this.platforms);
        game.physics.arcade.collide(this.player, this.platforms);
        game.physics.arcade.overlap(this.player, this.stars, this.collectStar, null, this);

        this.player.body.velocity.x= 0;

        if(this.cursors.left.isDown){
            this.player.body.velocity.x= -150;
            this.player.animations.play('left');
        }   
        else if (this.cursors.right.isDown){
            this.player.body.velocity.x= 150;
            this.player.animations.play('right');
        }
        else{
            this.player.animations.stop();
            this.player.frame= 4;
        }
            
        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.body.velocity.y = -350;
        }
    },  //  update: end


    collectStar: function(player, star) {
        star.kill();
        this.score++;
            
        this.scoreText.text = 'score: ' + this.score;
    },  //  collectStar: end

};

game.state.add('main', game_state.main);
