/*global Phaser*/

var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
var game_state = {};

game_state.main = function() {};
game_state.main.prototype = {

    preload: function() {
        //load images
        game.load.image("ground", "assets/platform.png");
        game.load.image("star", "assets/gold.png");
        game.load.spritesheet("knight", "assets/kca.png", 256, 256);
        game.load.image("B", "assets/backgroundB.png");
        game.load.image("F", "assets/backgroundF.png");
        game.load.image("lava", "assets/lava.png");
    },

    create: function() {
        //enable physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        //setup backgrounds
        this.midBackground1 = game.add.sprite(0, 0, "B");
        this.midBackground2 = game.add.sprite(game.world.width, 0, "B");
        this.frontBackground1 = game.add.sprite(0, 0, "F");
        this.frontBackground2 = game.add.sprite(game.world.width, 0, "F");
        this.midBackground1.scale.setTo(6.3, 5);
        this.midBackground2.scale.setTo(6.3, 5);
        this.frontBackground1.scale.setTo(6.3, 5);
        this.frontBackground2.scale.setTo(6.3, 5);
        
        //lava group
        this.lava = game.add.group();
        this.lava.enableBody = true;
        //add lava
        this.lava1 = this.lava.create(0, game.world.height - 64, "lava");
        this.lava1.scale.setTo(7, 3);
        this.lava1.body.immovable = true;
        this.lava2 = this.lava.create(game.world.width, game.world.height - 64, "lava");
        this.lava2.scale.setTo(7, 3);
        this.lava2.body.immovable = true;
        
        //platform group
        this.platforms = game.add.group();
        //enabel physics for platform group
        this.platforms.enableBody = true;
        //add platforms
        this.ledge = this.platforms.create(-200, 400, "ground");
        this.ledge.body.immovable = true;
        this.ledge1 = this.platforms.create(200, 500, "ground");
        this.ledge1.body.immovable = true;
        this.ledge2 = this.platforms.create(600, 400, "ground");
        this.ledge2.body.immovable = true;
        
        //star group
        this.stars = game.add.group();
        this.stars.enableBody = true;
        this.starList = [];
        //create stars
        for (var i = -3;i<15;i++){
            var star = this.stars.create(i * 70, 0, "star");
            star.body.gravity.y = 300;
            star.body.bounce.y = 0.7 * Math.random() * 0.2;
            star.scale.setTo(0.5, 0.5);
            this.starList.push(star);
        }
        
        //point display
        this.score = 0;
        this.scoreText = game.add.text(16, 16, "score: " + this.score, {fontSize: "32px", fill: "#000"});
        
        //setup player
        this.player = game.add.sprite(game.world.width / 2, game.world.height - 200, "knight");
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
        
        //player-lava interaction
        game.physics.arcade.collide(this.player, this.lava, this.touchLava, null, this);
        
        //reset player x velocity
        this.player.body.velocity.x = 0;
        
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
        
        //check for completion
        if (this.score == 18) {
            game.state.start("end");
        }
        
        //camera scroll
        this.cameraMovement = this.player.body.x - (game.world.width / 2);
        if (Math.abs(this.cameraMovement) > 150) {
            if (this.cameraMovement > 0) {
                this.cameraMovement = 10;
            }
            else {
                this.cameraMovement = -10;
            }
        }
        if (this.cursors.down.isDown) {//disable scrolling
            this.cameraMovement = 0;
        }
        //player
        this.player.body.x -= this.cameraMovement;
        //stars
        for(var i=0;i<this.starList.length;i++) {
            this.starList[i].body.x -= this.cameraMovement;
        }
        //platforms
        this.ledge.body.x -= this.cameraMovement;
        this.ledge1.x -= this.cameraMovement;
        this.ledge2.x -= this.cameraMovement;
        //backgrounds
        this.midBackground1.x -= this.cameraMovement / 4;
        this.midBackground2.x -= this.cameraMovement / 4;
        this.frontBackground1.x -= this.cameraMovement / 2;
        this.frontBackground2.x -= this.cameraMovement / 2;
        
        //lava
        this.lava1.x -= this.cameraMovement;
        this.lava2.x -= this.cameraMovement;
        
        //wrap backgrounds
        if (this.midBackground1.x > game.world.width) {
            this.midBackground1.x = -game.world.width;
        }
        if (this.midBackground1.x < -game.world.width) {
            this.midBackground1.x = game.world.width;
        }
        if (this.midBackground2.x > game.world.width) {
            this.midBackground2.x = -game.world.width;
        }
        if (this.midBackground2.x < -game.world.width) {
            this.midBackground2.x = game.world.width;
        }
        if (this.frontBackground1.x > game.world.width) {
            this.frontBackground1.x = -game.world.width;
        }
        if (this.frontBackground1.x < -game.world.width) {
            this.frontBackground1.x = game.world.width;
        }
        if (this.frontBackground2.x > game.world.width) {
            this.frontBackground2.x = -game.world.width;
        }
        if (this.frontBackground2.x < -game.world.width) {
            this.frontBackground2.x = game.world.width;
        }
        if (this.lava1.x > game.world.width) {
            this.lava1.x = -game.world.width;
        }
        if (this.lava1.x < -game.world.width) {
            this.lava1.x = game.world.width;
        }
        if (this.lava2.x > game.world.width) {
            this.lava2.x = -game.world.width;
        }
        if (this.lava2.x < -game.world.width) {
            this.lava2.x = game.world.width;
        }
    },
    collectStar: function(player, star) {
        star.kill();
        this.score += 1;
    },
    touchLava: function(player, lava) {
        player.kill();
        game.state.start("lose");
    }
};
game.state.add('main', game_state.main);
//game.state.start('main');
