/*  global Phaser game game_state duckSound  */

game_state.main = function() {};
game_state.main.prototype = {

    preload: function() {
        game.load.image('sky','assets/sky.png');
        game.load.image ('ground','assets/platform.png');
        game.load.image('heart', 'assets/Heart.png', 46, 42);
        game.load.image('mike', 'assets/Mike.png', 41, 31);
    },

    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.add.sprite(0, 0, 'heart');
        game.add.sprite(0, 0, 'sky');
        
        this.platforms = game.add.group();
        this.platforms.enableBody = true;
        var ground = this.platforms.create(
            0, game.world.height - 64, 'ground');
        ground.scale.setTo (2, 2);
        ground.body.immovable = true;

        var ledge1 = this.platforms.create(20, 400, 'ground');
        ledge1.body. immovable = true;
        var ledge2 = this.platforms.create(200, 200, 'ground');
        ledge2.body. immovable = true;
        var ledge3 = this.platforms.create(300, 100, 'ground');
        ledge3.body. immovable = true;

        this.player = game.add.sprite(32, game.world.height = 150, 'mike');
        game.physics.arcade.enable(this.player);
        this.player.body.bounce.y = 0.1;
        this.player.body.gravity.y = 300;
        this.player.body.collideWorldBounds = true;
        this.player.animations.add('left',  [0, 1, 2, 3], 10, true);
        this.player.animations.add('right', [5, 6, 7, 8], 10, true);

        this.cursors = game.input.keyboard.createCursorKeys();

        this.hearts = game.add.group();
        this.hearts.enableBody = true;
        for (var i = 0; i < 12; i++) {
            var heart = this.hearts.create(i * 70, 0, 'heart');
            heart.body.gravity.y = 300;
            heart.body.bounce.y = 0.7 + Math.random () * 0.2;
        }

        this.score = 0;
        this.scoreText = game.add.text(16, 16, 'score: ' + this.score, {
            fontSize: '32px',
            fill: '#000'
        })
    },

    update: function() {
        game.physics.arcade.collide(this.player, this.platforms);

        this.player.body.velocity.x = 0;
        if (this.cursors.left.isDown){  
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
        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.body.velocity.y = -350;
        }

        game.physics.arcade.collide(this.hearts, this.platforms);

        game.physics.arcade.overlap(this.player, this.hearts, this.collectHeart, null, this);

        this.scoreText.text = "score: " + this.score;
        
    },

    collectHeart: function(player, heart) {
        heart.kill();
        this.score++;
        duckSound.play(1);
        if (this.score > 11) 
            game.state.start('end');
    },
    
};

game.state.add('main', game_state.main);
//game.state.start('main');
