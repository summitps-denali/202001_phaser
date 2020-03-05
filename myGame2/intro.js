/* global game game_state */

game_state.intro = function() {};

game_state.intro.prototype = {

    preload: function() {
        
    },

    create: function() {
        game.stage.backgroundColor = '#d30bf6';

        this.text = game.add.text(
            20, 20,
            'Welcome to my game!' +
            '\nI am trying to find my hearts,' +
            '\nhelp me collect all my hearts! '+
            '\nPress the arrow keys to move and help me catch the hearts. '+
            '\nPress s to start.', {
              fontSize: '32px',
              fill: '#000'
            }
        );

        game.input.keyboard.onPressCallback = function(e) {
            console.log("key pressed: ", e);
            if (e == 's') {
                game.input.keyboard.onPressCallback = null;
                game.state.start('main');
            }
        }

    },

    update: function() {
    }

};

game.state.add('intro', game_state.intro);
