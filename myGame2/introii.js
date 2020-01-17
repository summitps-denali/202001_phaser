/*global Phaser game game_state  */


game_state.introii = function() {};

game_state.introii.prototype = {
    
    preload: function() {
        game.load.image('gpthreee', 'assets/gpthree.JPG');
    },

    create: function() {
        game.stage.backgroundColor = '#009800';
        game.add.sprite(0,0, 'gpthreee');
        this.text = game.add.text(
            20, 20,
        );
        //  Simple check for keyboard, press s switch to main game screen
        game.input.keyboard.onPressCallback = function(e) {
            console.log("Registered thingies no. in spaceship: 0");
            if (e == 'z') {
                //  disable keyboard callback
                game.input.keyboard.onPressCallback = null;
                beep.play(1);
                game.state.start('introiii');
            }
        };
        
    },

    update: function() {
    
    }

};

game.state.add('introii', game_state.introii);