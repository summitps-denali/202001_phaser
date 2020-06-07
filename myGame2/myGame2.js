/*global Phaser*/

var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
var game_state = {}

game_state.main = function() {};
game_state.main.prototype = {

    preload: function() {
        game.load.image('player', 'assets/actias.png');
        game.load.image('object', 'assets/object.png');
        game.load.spritesheet('player', 'assets/actias.png', 46, 91);
    },

    create: function() {
         game.stage.backgroundColor = '#3598db';
         game.physics.startSystem(Phaser.Physics.ARCADE);
        
        this.player = game.add.sprite(200, 400, 'player');
        game.physics.arcade.enable(this.player);
        this.player.enableBody = true;
        this.player.body.immovable = true;
        
        this.left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        this.player.animations.add('left', [1, 2, 3, 4], 10, true);
        this.player.animations.add('right', [5, 6, 7, 8], 10, true);
        
        this.objects = game.add.group();
        this.objects.enableBody = true;
        
        var _this = this;
        setInterval(function() {
            var object = _this.objects.create(Math.random() * 800, -64, 'object');
            object.body.gravity.y = 300;
        }, 1000)
        
        
    },

    update: function() {
        this.player.body.velocity.x = 0;
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
            this.player.frame = 0;
        }
        game.physics.arcade.overlap(this.player, this.objects, this.hitObject, null, this);
    },
        hitObject: function(player, object){
            object.kill();
    }
},

game.state.add('main', game_state.main);
game.state.start('main');
