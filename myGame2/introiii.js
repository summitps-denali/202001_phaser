/*global Phaser game game_state  */


game_state.introiii = function() {};

game_state.introiii.prototype = {

    preload: function() {
        game.load.image('gptwoo', 'assets/gptwo.JPG');
    },

    create: function() {
        game.stage.backgroundColor = '#009800';
        game.add.sprite(0,0, 'gptwoo');
        this.text = game.add.text(
            20, 20,
        );
        //  Simple check for keyboard, press s switch to main game screen
        game.input.keyboard.onPressCallback = function(e) {
            console.log("Scanning...");
            console.log("... ...");
            console.log("Thingies location found: area 958");
            if (e == 'z') {
                //  disable keyboard callback
                game.input.keyboard.onPressCallback = null;
                beep.play(1);
                game.state.start('introiv');
            }
        };
        
    },

    update: function() {
    
    }

};

game.state.add('introiii', game_state.introiii);