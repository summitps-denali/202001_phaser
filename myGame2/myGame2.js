/*  global Phaser game game_state  */

game_state.main = function() {};
game_state.main.prototype = {

    preload: function() {
        game.load.image('player', 'assets/player.png');
        game.load.image('object', 'assets/object.png');
        game.load.spritesheet(
          'realplayer',
          'assets/New Piskel.png', 100, 100);
    },

    create: function() {
        game.stage.backgroundColor = '#3598db';

        game.physics.startSystem(Phaser.Physics.ARCADE);

        this.player = game.add.sprite(400, 400, 'realplayer');
        game.physics.arcade.enable(this.player);
        this.player.enableBody = true;
        this.player.body.setSize(60,85,20,5);
        this.player.body.immovable = true;
        this.player.animations.add('left', [2, 3, 4, 5, 6, 7], 15, true);
        this.player.animations.add('right', [8, 9, 10, 11, 12, 13], 15, true);

        this.left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

        this.objects = game.add.group();
        this.objects.enableBody = true;

        var _this = this;
        setInterval(function() {
           var object = _this.objects.create(Math.random() * 800, -64, 'object');
           object.body.gravity.y = 300;
        }, 1000);
    },

    update: function() {
        game.physics.arcade.overlap(this.player, this.objects, this.hitObject, null, this);

        if (this.left.isDown) {
            this.player.body.velocity.x = -300;
            this.player.animations.play('left');
        }
        else if (this.right.isDown) {
            this.player.body.velocity.x = 300;
            this.player.animations.play('right');
        }
        else {
            this.player.animations.stop();
            this.player.body.velocity.x = 0;
            this.player.frame = 0;
        }
    },

    hitObject: function(player, object){
        object.kill();
    }
}
game.state.add('main', game_state.main);
