/*global Phaser game game_state*/
game_state.end = function() {};
game_state.end.prototype = {

    preload: function() {
        game.load.image('background', 'assets/End Screen.png');
    },

    create: function() {
        game.add.sprite(0, 0, 'background');
        
        this.text = game.add.text(
            50, 270,
            'Congratulations! You helped Kai defeat the bad guys.', {
                fontSize: '32px',
                fill: '#000'
            }
        );
    },

    update: function() {

    },
}
game.state.add('end', game_state.end);
//game.state.start('end');