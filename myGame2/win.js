/*global Phaser game game_state*/
game_state.win = function() {};
game_state.win.prototype = {

    preload: function() {
        game.load.image('bg', 'assets/win_bg.png');
        game.load.spritesheet('mrface', 'assets/sprite.png', 128, 128);
        game.load.image('diamond', 'assets/diamond.png');
    },

    create: function() {
        game.add.sprite(0, 0, 'bg');
        var mrface = game.add.sprite(310, 390, 'mrface');
        mrface.frame = 3;
        var diamond = game.add.sprite(340, 340, 'diamond');
        diamond.scale.setTo(2, 2);
    },

    update: function() {

    },
};
game.state.add('win', game_state.win);