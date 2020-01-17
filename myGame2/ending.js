/*global Phaser game game_state*/
game_state.ending = function() {};
game_state.ending.prototype = {

    preload: function() {
        game.load.image('background', 'assets/end screen.png');
    },

    create: function() {
        game.add.sprite(0, 0, 'background');
        
        this.text = game.add.text(
            50, 170,
            'You have successfully prevented the apocalypse!', {
                fontSize: '32px',
                fill: '#000'
            }
        );
    },

    update: function() {

    },
}
game.state.add('ending', game_state.ending);
