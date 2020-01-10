/*global Phaser game game_state*/
game_state.death = function() {};
game_state.death.prototype = {

    preload: function() {
        game.load.image('bg', 'assets/dead_bg.png');
    },

    create: function() {
        game.add.sprite(0, 0, 'bg');
    },

    update: function() {

    },
};
game.state.add('death', game_state.death);