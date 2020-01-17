/*global Phaser game game_state*/


game_state.story2 = function() {};
game_state.story2.prototype = {

    preload: function() {
        game.load.spritesheet('introgate', 'assets/closingGate.png', 285, 285);
    },

    create: function() {
        this.gate = game.add.sprite(0, 0, 'introgate');
        this.gate.scale.setTo(2.805, 2.27);
        this.gate.animations.add('close', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], 10, true);
        this.cursors = game.input.keyboard.createCursorKeys();
    },

    update: function() {
        if (this.cursors.right.isDown) {
            this.gate.animations.play('close');
                this.introText = game.add.text(16, 16, 'Oh no! The gate closed; it was a trap!', {
                    fontSize: '32px',
                    fill: '#000'
                }); 
                    this.introText = game.add.text(16, 50, 'Collect all the keys to escape the castle!');
                    this.introText = game.add.text(16, 100, '[Press <- to continue');
        }
        else {
            this.gate.animations.stop();
            this.gate.frame = 13;
        }
        if (this.cursors.left.isDown) {
            game.state.start('main');
        }
            }
}

game.state.add('story2', game_state.story2);
//game.state.start('story2');
