/*global Phaser*/

var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
var game_state = {}

game_state.main = function() {};
game_state.main.prototype = {

    preload: function() {
        game.load.image('player', 'assets/player.png');
        game.load.image('object', 'assets/object.png');
    },

    create: function() {
        game.stage.backgroundColor = '#3598db';
        game.physics.startSystem(Phaser.Physics.ARCADE);
        //adding player into the game
        this.player = game.add.sprite(200, 400, 'player');

        //adding gravity and physics
        game.physics.arcade.enable(this.player);

        //give player a body
        this.player.enableBody = true;

        //render player immoveable until ball
        this.player.body.immovable = true;

        //going left/right
        this.left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

        //creating objects
        this.objects = game.add.group();
        
        //Enable body for all objects
        this.objects.enableBody = true;
        
        //Anchor  this object to _this variable
        var _this = this;
        
        //timing
        setInterval(function(){
            //top of screen
            var object = _this.objects.create(
                Math.random() * 800, -64, 'object');
            //make gravity a thing
            object.body.gravity.y = 300;
        }, 1000)
    },

    update: function() {
        //moving left
        if (this.left.isDown) {
            this.player.body.velocity.x = -300
        }
        else if (this.right.isDown){
            this.player.body.velocity.x = 300
        }
        else {
            this.player.body.velocity.x = 0
        }
        //collision
        game.physics.arcade.overlap(this.player, this.objects, this.hitObject, null, this);
    },
    hitObject: function(player,object) {
        object.kill();
    }

}
game.state.add('main', game_state.main);
game.state.start('main');
