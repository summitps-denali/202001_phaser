/*  global Phaser game_state game  */

game_state.intro = function() {};

game_state.intro.prototype = {

    preload: function() {
    },

    create: function() {
        game.stage.backgroundColor = '#00A9DC';

        this.text = game.add.text(
            200, 250,
            'Toby the Slug is hungry. \nCollect all 12 berries to feed Toby! \nPRESS S TO START', {
              fontSize: '64px',
              fill: '#ffffff'
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