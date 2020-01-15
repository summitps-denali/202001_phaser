/*  global this, game, game_state, Phaser  */

const duckSound = new Audio();
duckSound.src = "assets/duckQuack.mp3";

game_state.intro = function() {};

game_state.intro.prototype = {

    preload: function() {
    },

    create: function() {
        game.stage.backgroundColor = '#009800';

        this.text = game.add.text(
            20, 20,
            's: start\nx: quit\na: auto test', {
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
            else if (e == 'a') {
                duckSound.play(1);
            }
        }

    },

    update: function() {
    }

};

game.state.add('intro', game_state.intro);
