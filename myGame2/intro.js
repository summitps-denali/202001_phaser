/*  global Phaser game game_state  */

game_state.intro = function() {};

game_state.intro.prototype = {

    preload: function() {
        game.load.spritesheet('beginning', 'assets/New Piskel (1).png', 600, 600);
    },

    create: function() {
        game.stage.backgroundColor = '#5175ff';
        this.player = game.add.sprite(100, game.world.height - 599, 'beginning');
        this.player.animations.add('move', [0, 1, 2, 3, 4, 5, 6], 6, true);
        this.player.animations.play('move');

        this.text = game.add.text(
            20, 20,
            'Collect the cupcakes for your friends!\ns: start\nx: quit', {
              fontSize: '32px',
              fill: '#000'
            }
        );

        //  Simple check for keyboard, press s switch to main game screen
        game.input.keyboard.onPressCallback = function(e) {
            console.log("key pressed: ", e);
            if (e == 's') {
                //  disable keyboard callback
                game.input.keyboard.onPressCallback = null;
                game.state.start('main');
            }
        }

    },

    update: function() {
    }

};

game.state.add('intro', game_state.intro);