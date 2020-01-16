/*  global game game_state  */

game_state.intro = function() {};

game_state.intro.prototype = {

    preload: function() {
        game.load.image('background', 'assets/Intro Background.png');
    },

    create: function() {
        game.add.sprite(0, 0, 'background');

        this.text = game.add.text(
            35, 150,
            'This story begins with a dog named Kai.\nKai overheard some evil men plotting to kill 10 people!\nHe decided he would have to stop them.\nUnfortunately, Kai does not know enough about their\nplan yet. Help Kai collect papers which will give him\nmore info about their plan. Then reach the computer to\nstop the bad guys. Press s to start and press the arrow\nkeys to move right, left, and up!', {
              fontSize: '32px',
              fill: '#fff'
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