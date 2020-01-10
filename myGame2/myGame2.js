/*global Phaser*/

var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
var game_state = {}

game_state.main = function() {};
game_state.main.prototype = {

    preload: function() {
        game.load.image('sky', 'assets/sky.png');
        game.load.image('Cave 1 Back', 'assets/Cave 1 Back.png')
        game.load.image('Cave 1 Back2', 'assets/Cave 1 Back2.png')
        game.load.image('star', 'assets/star.png');
        game.load.image('Cave 1', 'assets/Cave 1.png');
        game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
        game.load.image('ground', 'assets/platform.png');
    },

    create: function() {
        game.add.sprite(0, 0, 'star');
        this.back = game.add.sprite(0, 0, 'Cave 1 Back');
        this.back.scale.setTo(2, 2);
        this.back2 = game.add.sprite(300, 0, 'Cave 1 Back2');
        this.back2.scale.setTo(2, 2);
        this.platforms = game.add.group();
        this.platforms.enableBody = true;
        this.ground = this.platforms.create(0, game.world.height - 64, 'Cave 1');
        this.ground.scale.setTo(2, 2);
        this.ground.body.setSize(500, 340, 0, 4);
        this.ground.body.immovable = true;
        this.ledge = this.platforms.create(200, 150, 'Cave 1');
        this.ledge.body.immovable = true;
        this.ledge.body.setSize(320, 50, 0, 270);
        this.player = game.add.sprite(32, game.world.height - 150, 'dude');
        game.physics.arcade.enable(this.player);
        this.player.body.bounce.y = 0.2;
        this.player.body.gravity.y = 300;
        this.player.body.collideWorldBounds = true;
        this.player.animations.add('left', [0, 1, 2, 3], 10, true);
        this.player.animations.add('right', [5, 6, 7, 8], 10, true);
        this.cursors = game.input.keyboard.createCursorKeys();
        this.stars = game.add.group();
        this.stars.enableBody = true;
        for (var i = 0; i < 12; i++) {
            var star = this.stars.create(i * 70, 0, 'star');
            star.body.gravity.y = 300;
            star.body.bounce.y = 0.7 + Math.random() * 0.2;
        }
        this.score = 275;
        this.scoreText = game.add.text(16, 16, 'RUN FROM THE DINO!!!', {
            fontSize: '32px',
            fill: '#000'
        });
        this.textTimer = 100;
        this.starCOUNT = 12
    },

    update: function() {
        game.physics.arcade.collide(this.player, this.platforms);
        game.physics.arcade.collide(this.stars, this.platforms);
        this.player.body.velocity.x = 0;
        if (this.cursors.left.isDown) {
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
        if (this.cursors.up.isDown && this.player.body.touching.down){
            this.player.body.velocity.y = -350;
        }
        game.physics.arcade.overlap(this.player, this.stars, this.collectStar, null, this);
        this.score -= 1;
        this.scoreText.text = "Distance From Dino: " + (this.score / 10);
        if (this.textTimer > 0) {
            this.scoreText.text = "RUN FROM THE DINO! GET THE STARS!";
            this.textTimer -= 1;
        }
        if (this.starCOUNT == 0){
            this.scoreText.text = "You Got Away!";
        }
        else if (this.score <= 0){
            this.scoreText.text = "The Dino Has Caught You"
            this.player.kill();
        }
    },
    collectStar: function(player, star) {
        star.kill();
        this.score += 50;
        this.starCOUNT -= 1;
    }
};
game.state.add('main', game_state.main);
game.state.start('main');
