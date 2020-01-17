/*global Phaser game game_state*/


game_state.story = function() {};
game_state.story.prototype = {

    preload: function() {
        game.load.spritesheet('introchest', 'assets/chest.png', 288, 288);
    },

    create: function() {
        this.chest = game.add.sprite(0, 0, 'introchest');
        this.introText = game.add.text(16, 16, 'A chest! Open it for treasure! [Hold ->]');
        this.chest.scale.setTo(2.805, 2.27);
        this.chest.animations.add('open', [0, 1, 2, 3], 5, true);
        this.cursors = game.input.keyboard.createCursorKeys();
    },

    update: function() {
        if (this.cursors.right.isDown) {
            this.chest.animations.play('open');
            this.introText = game.add.text(16, 50, 'Wait, something is...shaking... [Press <-]');
        }
        else {
            this.chest.animations.stop();
            this.chest.frame = 0;
        }
        if (this.cursors.left.isDown) {
            game.state.start('story2');
        }
    },
}
game.state.add('story', game_state.story);
game.state.start('story');