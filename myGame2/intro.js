/*global Phaser game game_state  */

const beep = new Audio();
beep.src = "assets/beep.mp3";


game_state.intro = function() {};

game_state.intro.prototype = {

    preload: function() {
        game.load.image('gpfourr', 'assets/gpfour.JPG');
    },

    create: function() {
        game.stage.backgroundColor = '#009800';
        game.add.sprite(0,0, 'gpfourr');
        this.text = game.add.text(
            20, 20,
            
        );
        //  Simple check for keyboard, press s switch to main game screen
        game.input.keyboard.onPressCallback = function(e) {
            console.log("Facecam re-enabled successfully");
            if (e == 'z') {
                //  disable keyboard callback
                game.input.keyboard.onPressCallback = null;
beep.play(1);
                game.state.start('introii');
            }
        };
        
    },

    update: function() {
    
    }

};

game.state.add('intro', game_state.intro);