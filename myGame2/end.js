/*global Phaser game game_state  */


game_state.end = function() {};

game_state.end.prototype = {

    preload: function() {
        game.load.image('congrats', 'assets/congrats.JPG');
        
    },

    create: function() {
        game.stage.backgroundColor = '#009800';
        game.add.sprite(0,0, 'congrats');
        //  Simple check for keyboard, press s switch to main game screen
        game.input.keyboard.onPressCallback = function(e) {
            console.log("key pressed: ", e);
            if (e == 'z') {
                game.state.start('intro');
                //  disable keyboard callback
                game.input.keyboard.onPressCallback = null;
            }
        };
        
    },

    update: function() {
    
    }

};

game.state.add('end', game_state.end);