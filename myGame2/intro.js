/*global game game_state*/

game_state.intro = function() {};
game_state.intro.prototype = {

    preload: function() {
        game.load.image('introbg', 'assets/introbg.png');
    },

    create: function() {
        game.add.sprite(0, 0, 'introbg');
        
        this.text = game.add.text(
            35, 150,
            'You are destined to bring the end of the world. \nThere is a way for you to escape your fate, though. \nCollect the code pieces left around by your \nmechanic friend. \nUse them to hack into your own body. \nThen disable the bomb from there. \nPress the S key to begin, and use the arrow keys to \nmove.', {
                fontsize: '32px',
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

    },
}

game.state.add('intro', game_state.intro);
