/* global game game_state */

game_state.end = function() {};

game_state.end.prototype = {

    preload: function() {
    },

    create: function() {
        game.stage.backgroundColor = '#449a12';

        this.text = game.add.text( 
            20, 20,
            'Thank you for helping me collect my hearts!', {
              fontSize: '32px',
              fill: '#000'
            }
        );
    },

    update: function() {
    }

};

game.state.add('end', game_state.end);
