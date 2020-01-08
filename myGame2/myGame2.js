/*global Phaser*/

var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
var game_state = {};

game_state.main = function() {};
game_state.main.prototype = {

    preload: function() {
        //load images
        game.load.image("sky", "assets/sky.png");
        game.load.image("ground", "assets/platform.png");
        game.load.image("star", "assets/star.png");
        game.load.spritesheet("dude", "assets/dude.png", 32, 48);
    },

    create: function() {
        //enable physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        //make sprites
        game.add.sprite(0, 0, "sky");
        
        //platform group
        this.platforms = game.add.group();
        //enabel physics for platform group
        this.platforms.enableBody = true;
        
        //setup ground
        var ground = this.platforms.create(0, game.world.height - 64, "ground");
        ground.scale.setTo(2, 2);
        ground.body.immovable = true;
        
        //add platforms
        var ledge = this.platforms.create(100, 400, "ground");
        ledge.body.immovable = true;
        
        //star group
        this.stars = game.add.group();
        this.stars.enableBody = true;
        //create stars
        for (var i = 0;i<12;i++){
            var star = this.stars.create(i * 70, 0, "star");
            star.body.gravity.y = 300;
            star.body.bounce.y = 0.7 * Math.random() * 0.2;
        }
        
        //point display
        this.score = 0;
        this.scoreText = game.add.text(16, 16, "score: " + this.score, {
            fontSize: "32px",
            fill: "#000",
        });
        
        //setup player
        this.player = game.add.sprite(32, game.world.height - 150, "dude");
        game.physics.arcade.enable(this.player);
        //player physics properties
        this.player.body.bounce.y = 0.5;
        this.player.body.gravity.y = 300;
        this.player.body.collideWorldBounds = true;
        //animations
        this.player.animations.add("left", [0, 1, 2, 3], 10, true);
        this.player.animations.add("right", [5, 6, 7, 8], 10, true);
        //controls
        this.cursors = game.input.keyboard.createCursorKeys();
    },

    update: function() {
        //player-platform collision
        game.physics.arcade.collide(this.player, this.platforms);
        //star-platform collision
        game.physics.arcade.collide(this.stars, this.platforms);
        //player-star collection
        game.physics.arcade.collide(this.player, this.stars, this.collectStar, null, this);
        
        //reset player x velocity
        this.player.body.velocity.x = 0;
        
        //left-right movement
        if (this.cursors.left.isDown) {
            //left
            this.player.body.velocity.x = -150;
            this.player.animations.play("left");
        }
        else if (this.cursors.right.isDown) {
            //right
            this.player.body.velocity.x = 150;
            this.player.animations.play("right");
        }
        else {
            //stop
            this.player.animations.stop();
            this.player.frame = 4;
        }
        
        //jump if on ground and jump key held
        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.body.velocity.y = -350;
        }
    },
    collectStar: function(player, star) {
        star.kill();
        this.score += 1;
    }
};
game.state.add('main', game_state.main);
game.state.start('main');
