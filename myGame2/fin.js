/*  global Phaser game game_state  */

game_state.fin = function() {};

game_state.fin.prototype = {

    preload: function() {
    },

    create: function() {
        game.stage.backgroundColor = '#000098';

        this.text = game.add.text(
            20, 20,
            's: start\nx: quit', {
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

game.state.add('fin', game_state.fin);