/*global Phaser*/

var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
var game_state = {};
var score = 0;
var level = 1;
var l2_coins = 0;

game_state.main = function() {};
game_state.main.prototype = {

    preload: function() {
        game.load.image("sky", "assets/sky.png");
        game.load.image("ground", "assets/platform.png");
        game.load.image("guilder", "assets/guilder.png");
        game.load.image("crate", "assets/crate.png");
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
        this.player = game.add.sprite(700, 480, "dude");
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
        
        var c_one = this.crates.create(700, 270, "crate");
        
        game.physics.arcade.enable(this.crates);
        
        // scoreText
        this.scoreText = game.add.text(16, 16, "score: 0", {
            fontSize: "32px",
            fill: "#000"
        });
        
        this.posText = game.add.text(16, 32, "position: 0", {
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
        
        // display score
        this.scoreText.text = "score: " + score;
        
        this.posText.text = "position: " + Math.round(this.player.body.position.x) + " " + Math.round(this.player.body.position.y);
        
        // move to next level
        if (this.player.body.position.x > 750 && this.player.body.position.y < 255 && level == 1) {
            this.guilders.forEach(e => e.kill());
            this.crates.forEach(e => e.kill());
            this.platforms.forEach(e => e.kill());
            
            level++;
            
            // level 2 setup
            var ground = this.platforms.create(0, game.world.height - 64, 'ground');
            ground.scale.setTo(2, 2);
            ground.body.immovable = true;
        
            var ledge_one = this.platforms.create(100, game.world.height - 200, 'ground');
            ledge_one.scale.setTo(0.5, 1);
            ledge_one.body.immovable = true;
        
            var ledge_two = this.platforms.create(200, game.world.height - 300, 'ground');
            ledge_two.scale.setTo(0.5, 1);
            ledge_two.body.immovable = true;
        
            var ledge_three = this.platforms.create(300, game.world.height - 400, 'ground');
            ledge_three.scale.setTo(0.5, 1);
            ledge_three.body.immovable = true;
            
            var g_four = this.guilders.create(200, 200, "guilder");
            var g_five = this.guilders.create(600, 200, "guilder");
            game.physics.arcade.enable(this.guilders);
        }
        // end level 2 setup
          
        // collect guilders
        game.physics.arcade.overlap(this.player, this.guilders, function(player, star){
            star.kill();
            score++;
            
            if (level == 2){
                l2_coins++;
            }
        } , null, this);
        
        // open crates
        game.physics.arcade.overlap(this.player, this.crates, function(player, star){
            star.kill();
            console.log("1");
            score += 5;
        }, null, this);
        
        // end screen
        if (l2_coins == 2){
            l2_coins++;
            
            this.end = this.platforms.create(0, 0, "ground");
            this.end.scale.setTo(100, 100);
            this.end.immovable = true;
            
            this.scoreText.destroy();
            game.add.text(game.world.width / 3, game.world.height / 3, "game complete!\n\nscore: " + score + " coins out of a possible 10");
        }
    },

};

game.state.add('main', game_state.main);
game.state.start('main');