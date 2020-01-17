/*global Phaser game game_state  */
const level = new Audio();
level.src = "assets/level.mp3";

game_state.introiv = function() {};

game_state.introiv.prototype = {

    preload: function() {
        game.load.image('gponee', 'assets/gpone.JPG');
    },

    create: function() {
        game.stage.backgroundColor = '#009800';
        game.add.sprite(0,0, 'gponee');
        this.text = game.add.text(
            20, 20,
        );
        //  Simple check for keyboard, press s switch to main game screen
        game.input.keyboard.onPressCallback = function(e) {
            console.log("Successfully reached area 958");
            if (e == 'z') {
                //  disable keyboard callback
                game.input.keyboard.onPressCallback = null;
                level.play(1);
                game.state.start('main');
            }
        };
        
    },

    update: function() {
    
    }

};

game.state.add('introiv', game_state.introiv);