/*  global Phaser game_state game  */

game_state.fin = function() {};

game_state.fin.prototype = {

    preload: function() {
    },

    create: function() {
        game.stage.backgroundColor = '#00A9DC';

        this.text = game.add.text(
            250, 275,
            '    THE END', {
              fontSize: '64px',
              fill: '#FFF'
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

game.state.add('fin', game_state.fin);