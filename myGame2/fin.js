/*  global Phaser game_state game  */

game_state.fin = function() {};

game_state.fin.prototype = {

    preload: function() {
        game.load.image('sky', 'assets/background.png');
    },

    create: function() {
        
        game.add.sprite(0, 0, 'sky');

        this.text = game.add.text(
            250, 250,
            'THE END', {
              fontSize: '64px',
              fill: '#000'
            }
        );

    },

    update: function() {
    }

};

game.state.add('fin', game_state.fin);