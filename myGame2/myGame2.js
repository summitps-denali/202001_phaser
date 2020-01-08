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
        // Set the background color to blue
        game.stage.backgroundColor = '#3598db';

        // Start the Arcade physics system (for movements and collisions)
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Add the player at the bottem of the screen
        this.player = game.add.sprite(200,400, 'player');

        // We need to enable physics on this .player
        game.physics.arcade.enable(this.player);

        // Enable body on player
        this.player.enableBody = true;

        // Make sure the player won't move when it hits the ball
        this.player.body.immovable = true;

        // Create the left/right arrow keys
        this.left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

        //Create objects group
        this.objects = game.add.group();

        //Enable body for all objects in the group
        this.objects.enableBody = true;

        // Anchor this object to _this variable
        var _this = this;

        // Create objects over time
        setInterval(function() {
            // create an object at the top of the screen at a random x
            var object = _this.objects.create(Math.random() * 800, -64, 'object');
            // Let gravity do its thing
            object.body.gravity.y =300;
        }, 1000) // 1000 = 1000ms = 1 second
    },

    update: function() {
        // Move the player left/right when an arrow key is pressed
        if (this.left.isDown) {
            this.player.body.velocity.x = -300;
        }
        else if (this.right.isDown) {
            this.player.body.velocity.x = 300;
        }
        // Stop the player when no key is pressed
        else{
            this.player.body.velocity.x = 0;
        }
        // Collision between the player and the object
        game.physics.arcade.overlap(this.player, this.objects, this.hitObject, null, this);
    },

    hitObject: function(player, object){
        object.kill();
    }

};

game.state.add('main', game_state.main);
game.state.start('main');
