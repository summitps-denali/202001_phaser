/*global Phaser*/

var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
var game_state = {};
var score = 0;

game_state.main = function() {};
game_state.main.prototype = {

    preload: function() {
        game.load.image("sky", "assets/sky.png");
        game.load.image("ground", "assets/platform.png");
        game.load.image("guilder", "assets/guilder.png");
        game.load.spritesheet("dude", "assets/dude.png", 32, 48);
    },

    create: function() {
        // sky
        game.add.sprite(0,0,"sky");
        
        // platforms
        this.platforms = game.add.group();
        this.platforms.enableBody = true;
        
        var ground = this.platforms.create(0, game.world.height - 64, 'ground');
        ground.scale.setTo(2, 2);
        ground.body.immovable = true;
        
        var ledge_one = this.platforms.create(100, game.world.height - 200, 'ground');
        ledge_one.scale.setTo(2, 2);
        ledge_one.body.immovable = true;
        
        var ledge_two = this.platforms.create(150, game.world.height - 300, 'ground');
        ledge_two.scale.setTo(2, 2);
        ledge_two.body.immovable = true;
        
        var ledge_three = this.platforms.create(150, game.world.height - 250, 'ground');
        ledge_three.scale.setTo(2, 2);
        ledge_three.body.immovable = true;
        
        // player
        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.player = game.add.sprite(0,0,"dude");
        game.physics.arcade.enable(this.player);
        this.player.body.gravity.y = 300;
        this.player.body.collideWorldBounds = true;
        
        // movement keys
        this.cursors = game.input.keyboard.createCursorKeys();
        
        // add animations
        this.player.animations.add("left", [0, 1, 2, 3], 10, true);
        this.player.animations.add("right", [5, 6, 7, 8], 10, true);
        
        // guilders
        this.guilders = game.add.group();
        
        var g_one = this.guilders.create(200, 200, "guilder");
        var g_two = this.guilders.create(400, 200, "guilder");
        var g_three = this.guilders.create(600, 200, "guilder");
        
        game.physics.arcade.enable(this.guilders);
        
        // crates
        this.crates = game.add.group();
        
        var c_one = this.guilders.create(700, 270, "crate");
        
        game.physics.arcade.enable(this.crates);
        
        // scoreText
        this.scoreText = game.add.text(16, 16, "score: 0", {
            fontSize: "32px",
            fill: "#000"
        });
        
    },

    update: function() {
        // player collision
        game.physics.arcade.collide(this.player, this.platforms);
        
        // movement
        if (this.cursors.left.isDown){
            this.player.body.velocity.x = -150;
            this.player.animations.play("left");
        }
        else if (this.cursors.right.isDown){
            this.player.body.velocity.x = 150;
            this.player.animations.play("right");
        }
        else {
            this.player.body.velocity.x = 0;
            this.player.animations.stop();
        }
        
        // jumping
        if (this.cursors.up.isDown && this.player.body.touching.down){
            this.player.body.velocity.y = -300;
        }
        
        // collect guilder
        game.physics.arcade.overlap(this.player, this.guilders, function(player, star){
            star.kill();
            score++;
        } , null, this);
        
        // display score
        this.scoreText.text = "score: " + score;
    },

};

game.state.add('main', game_state.main);
game.state.start('main');