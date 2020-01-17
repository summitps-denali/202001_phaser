/*  global Phaser game game_state  */

game_state.main = function() {};
game_state.main.prototype = {

    preload: function() {
        game.load.image('sky', 'assets/sky.png');
        game.load.image('ground', 'assets/platform.png');
        game.load.image('cupcake', 'assets/cupcake.png');
        game.load.spritesheet('dude', 'assets/New Piskel.png', 100, 100);
    },

    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.add.sprite(0, 0, 'cupcake');
        game.add.sprite(0, 0, 'sky');
        
        this.platforms = game.add.group();
        this.platforms.enableBody = true;
        var ground = this.platforms.create(0, game.world.height - 64, 'ground');
        ground.scale.setTo(2, 2);
        ground.body.immovable = true;

        var ledge = this.platforms.create(200, 350, 'ground');
        ledge.body.immovable = true;

        this.player = game.add.sprite(32, game.world.height - 200, 'dude');
        game.physics.arcade.enable(this.player);
        this.player.body.bounce.y = 0.5;
        this.player.body.gravity.y =  500;
        this.player.collideWorldBounds = true;
        this.player.enableBody = true;
        this.player.animations.add('left', [2, 3, 4, 5, 6, 7], 15, true);
        this.player.animations.add('right', [8, 9, 10, 11, 12, 13], 15, true);
        this.player.body.setSize(60, 80, 20, 5);
        this.cursors = game.input.keyboard.createCursorKeys();

        this.cupcake = game.add.group();
        this.cupcake.scale.x = 0.5;
        this.cupcake.scale.y = 0.5;
        this.cupcake.enableBody = true;
        for (var i = 0; i < 12; i++) {
            var cupcake = this.cupcake.create(i * 70, 0, 'cupcake');
            cupcake.body.gravity.y = 300;
            cupcake.body.bounce.y = 0.3 + Math.random() * 0.2;
        }
        this.score = 0;
        this.scoreText = game.add.text(16, 16, 'score: 0', {
            fontSize: '32px',
            fill: '#000'
        });
    },
    update: function() {
        game.physics.arcade.collide(this.player, this.platforms);
        game.physics.arcade.collide(this.cupcake, this.platforms);
        game.physics.arcade.overlap(this.player, this.cupcake, this.collectCupcake, null, this);

        this.player.body.velocity.x = 0;
        game.debug.body(this.cupcake);
        
        if (this.cursors.left.isDown) {
            this.player.body.velocity.x = -300;
            this.player.animations.play('left');
        }
        else if (this.cursors.right.isDown) {
            this.player.body.velocity.x = 300;
            this.player.animations.play('right');
        }
        else {
            this.player.animations.stop();
            this.player.body.velocity.x = 0;
            this.player.frame = 0;
        
        }
        
        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.body.velocity.y = -480;
        }
    },

    collectCupcake: function(player, cupcake) {
        cupcake.kill();
        this.score += 1;
        this.scoreText.text = 'score: ' + this.score;
        if (this.score > 11)
            game.state.start('fin');

    }
}
game.state.add('main', game_state.main);
