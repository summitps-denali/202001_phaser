/*global Phaser game game_state*/

game_state.end = function() {};
game_state.end.prototype = {

    preload: function() {
        game.load.image('endtreasure', 'assets/endtreasure.png');
    },

    create: function() {
        game.add.sprite(0, 0, 'endtreasure');  
        this.endText = game.add.text(16, 16, 'You escaped and got all the treasure!');
    },

    update: function() {

    },
}
game.state.add('end', game_state.end);
//game.state.start('end');