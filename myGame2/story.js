/*global Phaser game game_state*/
game_state.story = function() {};
game_state.story.prototype = {

    preload: function() {
        game.load.image('bg', 'assets/story_bg.png');
        game.load.spritesheet('mrface', 'assets/sprite.png', 128, 128);
        game.load.image('diamond', 'assets/diamond.png');
        game.load.image('start', 'assets/start_button.png');
    },

    create: function() {
        game.add.sprite(0, 0, 'bg');
        var mrface = game.add.sprite(150, 340, 'mrface');
        mrface.frame = 3;
        var diamond = game.add.sprite(500, 360, 'diamond');
        diamond.scale.setTo(2, 2);
        var start = game.add.sprite(300, 400, 'start');
        start.inputEnabled = true;
        start.events.onInputDown.add(function() {
            game.state.start('main');
        }, this);
    },

    update: function() {

    },
};
game.state.add('story', game_state.story);
game.state.start('story');
