/*  global Phaser game game_state  */

game_state.main = function() {};
game_state.main.prototype = {

    preload: function() {
        game.load.image('sky','assets/sky.png');
        game.load.image('ground','assets/platform.png');
        game.load.image('star','assets/star.png');
        game.load.spritesheet('dude','assets/dude.png',32,48);
        game.load.image('enemy','assets/enemy.png')
    },

    create: function() {
        game.add.sprite(0,0, 'star');
        game.add.sprite(0,0, 'sky');
        this.platforms = game.add.group();
        this.platforms.enableBody = true;
        var ground = this.platforms.create(0, game.world.height - 64, 'ground');
        ground.scale.setTo(2, 2);
        ground.body.immovable = true;
        game.add.sprite(60, 48,'enemy')
        
        //                                   x    y
        var ledge1 = this.platforms.create(  1, 110, 'ground');
        ledge1.body.immovable = true;
        var ledge2 = this.platforms.create(400, 250, 'ground');
        ledge2.body.immovable = true;
        var ledge3 = this.platforms.create(200, 400, 'ground');
        ledge3.body.immovable = true;

        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.player = game.add.sprite(32, game.world.height - 150, 'dude')
        game.physics.arcade.enable(this.player);
        this.player.body.bounce.y = 0.05;
        this.player.body.gravity.y = 300;
        this.player.body.collideWorldsBounds = true;
        this.player.animations.add('left', [0,1,2,3], 10, true);
        this.player.animations.add('right', [5,6,7,8], 10, true);
        
        game.physics.arcade.collide(this.player, this.platforms);
        this.cursors = game.input.keyboard.createCursorKeys();

        // Finally some this.stars to collect
        this.stars = game.add.group ();

        // We will enable physics for any star that is created in this group
        this.stars.enableBody = true;
        // Here we'll create 12 of them evenly spaced apart
        for (var i = 0; i < 12; i++) {
            // Create a star inside of the this.stars' group
            var star = this.stars.create (i * 70,0, 'star');
            // Let gravity do its thing
            star.body.gravity.y =300;
            // This just gives each star a slighty rnadom bounce value
            star.body.bounce.y = 0.7 + Math.random() * 0.2;
        }

        this.score = 0;
        this.scoreText = game.add.text(16, 16,
          'score: ' + this.score, {
            fontSize: '32px',
            fill: '#000'
        }); 
    },

    update: function() {
        this.player.body.velocity.x = 0;
        
        // Collide the stars and the platforms
        game.physics.arcade.collide(this.player, this.platforms);
        game.physics.arcade.collide(this.stars, this.platforms);
        // Checks to see if the this.player overlaps with any of the this.stars, if he does call the collectStar function
        game.physics.arcade.overlap(this.player, this.stars, this.collectStar, null, this);

        if (this.cursors.left.isDown) {
            // Move to the left
            this.player.body.velocity.x = -150;
        }
        else if (this.cursors.right.isDown) {
            // Move to the right
            this.player.body.velocity.x = 150;
            this.player.animations.play ('right');
        }
        else{
            // Stand still
            this.player.animations.stop ();
            this.player.frame = 4;
        } 
        // Allow the this.player to jump if they are touching the ground
        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.body.velocity.y = -350;
        }

    },

    collectStar: function (player,star) {
        // Removes the star from the screen
        star.kill();
        this.score += 1;
        this.scoreText.text = 'score: ' + this.score;
    },
}

game.state.add('main', game_state.main);
