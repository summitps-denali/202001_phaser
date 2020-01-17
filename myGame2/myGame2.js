/*global Phaser  game game_state  */
const jump = new Audio();
jump.src = "assets/jump.mp3";
const item = new Audio();
item.src = "assets/item.mp3";
const wow = new Audio();
wow.src = "assets/wow.mp3";
const winner = new Audio();
winner.src = "assets/winner.mp3";
game_state.main = function() {};
game_state.main.prototype = {

    preload: function() {
        game.load.image('sky', 'assets/background.jpg');
        game.load.image('ground', 'assets/shroom.png');
        game.load.image('groundd', 'assets/wreckedspaceship.JPG');
        game.load.image('star', 'assets/nice.png');
        game.load.image('boot', 'assets/boots.png');
        game.load.spritesheet('dude', 'assets/cpt_boyu.png', 32, 48);
        game.load.spritesheet('arrow', 'assets/arroww.png', 32, 48);
    },

    create: function() {
        game.input.keyboard.onPressCallback = function(e) {
            console.log("No log message available at the moment, captain");
            if (e == 'z') {
            }
        };
        game.add.sprite(0,0, 'star');
        game.add.sprite(0,0, 'sky');
        this.platforms = game.add.group();
        this.platforms.enableBody = true;
        var ground = this.platforms.create(-13, game.world.height - 44, 'groundd');
        ground.scale.setTo(0.8, 0.8);
        ground.body.immovable = true;
        var ledge = this.platforms.create(155, 500, 'ground');
        var ledgei = this.platforms.create(210, 400, 'ground');
        var ledgeii = this.platforms.create(70, 300, 'ground');
        var ledgeiii = this.platforms.create(420, 325, 'ground');
        var ledgeiiii = this.platforms.create(560, 350, 'ground');
        var ledgeiiiii = this.platforms.create(630, 309, 'ground');
        var ledgeiiiiii = this.platforms.create(140, 240, 'ground');
        ledge.body.immovable = true;
        ledgei.body.immovable = true;
        ledgeii.body.immovable = true;
        ledgeiii.body.immovable = true;
        ledgeiiii.body.immovable = true;
        ledgeiiiii.body.immovable = true;
        ledgeiiiiii.body.immovable = true;
        
        
        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.player = game.add.sprite(32, game.world.height - 150, 'dude');
        game.physics.arcade.enable(this.player);
        this.player.body.bounce.y = 0.0;
        this.player.body.gravity.y = 555;
        this.player.body.collideWorldBounds = true;
        this.player.animations.add('left', [0, 1, 2, 3], 10, true);
        this.player.animations.add('right', [5, 6, 7, 8], 10, true);
        this.arrow = game.add.sprite(700, game.world.height - 160, 'arrow');
        this.arrow.animations.add('bob', [4, 5], 1, true);
        this.cursors = game.input.keyboard.createCursorKeys();
        this.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.stars = game.add.group();
        this.stars.enableBody = true;
        this.boots = game.add.group();
        this.boots.enableBody = true;
        for (var i = 0; i < 12; i++) {
            var star = this.stars.create(i * 70, 0, 'star');
            star.body.gravity.y = 300;
            star.body.bounce.y = 0.99 + Math.random() * 0.02;
            
            }
        for (var t = 0; t < 1; t++) {
            var boot = this.boots.create(700, 500, 'boot');
            boot.body.gravity.y = 0;
            boot.body.bounce.y = 0 ;
            
            }
        this.scoreText = game.add.text(16, 16, 'Thingies Left: 12', {
            fontFamily: 'Arial',
            fontsize: '32px',
            fill: '#d90011'
        });
        this.score = 12;
        this.sauce = 1;
    },

    update: function() {
        game.physics.arcade.collide(this.player, this.platforms);
        this.player.body.velocity.x = 0;
        if (this.cursors.left.isDown && this.player.body.touching.down) {
            this.player.body.velocity.x = (-150 * this.sauce);
            game.time.slowMotion = (1 * this.sauce);
            this.player.animations.play('left');
        }
        else if (this.cursors.left.isDown) {
            this.player.body.velocity.x = (-150 * this.sauce);
            game.time.slowMotion = (1 * this.sauce);
            this.player.frame = 1;
        }
        else if (this.cursors.right.isDown && this.player.body.touching.down) {
            this.player.body.velocity.x = (150 * this.sauce);
            game.time.slowMotion = (1 * this.sauce);            
            this.player.animations.play('right');
            this.arrow.animations.play ('bob');
        }
        else if (this.cursors.right.isDown) {
            this.player.body.velocity.x = (150 * this.sauce);
            game.time.slowMotion = (1 * this.sauce);            
            this.player.frame = 8;
            this.arrow.animations.play ('bob');
        }
        else {
            this.player.animations.stop();
            this.player.frame = 4;
            game.time.slowMotion = 1.0;
        }
        if (this.cursors.up.isDown && this.player.body.touching.down) {
            jump.play(1);
            this.player.body.velocity.y = -350;

        }    
        else if (this.cursors.down.isDown) {
            this.player.body.velocity.y = 355;
        if (this.cursors.down.isDown && this.player.body.touching.down) {
            this.player.frame = 9;
            } 

        }
        
        
        game.physics.arcade.collide(this.stars, this.platforms);
        game.physics.arcade.overlap(this.player, this.stars, this.collectStar, null, this);
        game.physics.arcade.overlap(this.player, this.boots, this.collectBoots, null, this);
        if (this.score === 0){
            game.state.start('end');
            winner.play(1);
            console.log("All thingies acquired");
        }
      
    },
    
    collectStar: function(player, star) {
        star.kill();
        this.score --;
        wow.play(1);
        this.scoreText.text = "Thingies Left: " + this.score;
    },
    collectBoots: function(player, boot) {
        boot.kill();
        this.arrow.kill();
        item.play(1);
        this.sauce ++;
        this.sauce ++;
        console.log("Gravity boots equipped. Have fun");
    },

    
};
game.state.add('main', game_state.main);
game.state.start('intro');                                           