/*global Phaser*/

var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
var game_state = {};

game_state.main = function() {};
game_state.main.prototype = {

    preload: function() {
        //load images
        game.load.image("ground", "assets/platform.png");
        game.load.image("star", "assets/star.png");
        game.load.spritesheet("knight", "assets/kca.png", 256, 256);
        //game.load.spritesheet("backgrounds", "assets/backgrounds", 128, 128);
        game.load.image("sky", "assets/Useless trash/sky.png");
    },

    create: function() {
        //enable physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        //setup backgrounds
        /*
        this.deepBackground = game.add.sprite(0, 0, "backgrounds");
        this.midBackground1 = game.add.sprite(0, 0, "backgrounds");
        this.midBackground2 = game.add.sprite(0, 0, "backgrounds");
        this.frontBackground1 = game.add.sprite(0, 0, "backgrounds");
        this.frontBackground2 = game.add.sprite(0, 0, "backgrounds");
        */
        this.background = game.add.sprite(0, 0, "sky");
        
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
        this.player = game.add.sprite(32, game.world.height - 150, "knight");
        game.physics.arcade.enable(this.player);
        //player physics properties
        this.player.body.bounce.y = 0;
        this.player.body.gravity.y = 500;
        this.player.body.collideWorldBounds = true;
        //animations
        this.player.animations.add("left", [20, 21, 22, 23, 24, 25, 26, 27], 10, true);
        this.player.animations.add("right", [6, 7, 8, 9, 10, 11, 12, 13], 10, true);
        this.player.animations.add("teaR", [3, 4], 1, true);
        this.player.animations.add("teaL", [17, 18], 1, true);
        this.player.scale.setTo(0.25, 0.25);
        this.player.body.setSize(150, 250, 10, 0);
        this.playerDir = "left";
        this.playerNoAnimate = false;
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
        
        //camera scroll
        //this.cameraMovement = this.player.body.
        
        //reset player x velocity
        this.player.body.velocity.x = 0;
        
        /**/
        
        //movement and animation
        if (this.player.body.velocity.y > 0) {
            this.player.animations.stop();
            if (this.playerDir == "left") {
                this.player.frame = 19;
            }
            else if (this.playerDir == "right") {
                this.player.frame = 5;
            }
            this.playerNoAnimate = true;
        }
        else if (this.player.body.velocity.y < -2) {
            this.player.animations.stop();
            if (this.playerDir == "left") {
                this.player.frame = 14;
            }
            else if (this.playerDir == "right") {
                this.player.frame = 0;
            }
            this.playerNoAnimate = true;
        }
        else {
            this.playerNoAnimate = false;
        }
        if (this.cursors.left.isDown) {
            //left
            this.player.body.velocity.x = -150;
            if (!this.playerNoAnimate) {
                this.player.animations.play("left");
            }
            this.playerDir = "left";
        }
        else if (this.cursors.right.isDown) {
            //right
            this.player.body.velocity.x = 150;
            if (!this.playerNoAnimate) {
                this.player.animations.play("right");
            }
            this.playerDir = "right";
        }
        else if (this.cursors.down.isDown) {
            //tea!
            if (this.playerDir == "left") {
                this.player.animations.play("teaL");
            }
            else if (this.playerDir == "right") {
                this.player.animations.play("teaR");
            }
        }
        else {
            //stop
            if (!this.playerNoAnimate) {
                this.player.animations.stop();
                if (this.playerDir == "left") {
                    this.player.frame = 15;
                }
                else if (this.playerDir == "right") {
                    this.player.frame = 1;
                }
            }
        }
        
        //jump if on ground and jump key held
        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.body.velocity.y = -400;
        }
        
        //update score
        this.scoreText.text = "Score: " + this.score;
    },
    collectStar: function(player, star) {
        star.kill();
        this.score += 1;
    }
};
game.state.add('main', game_state.main);
game.state.start('main');
