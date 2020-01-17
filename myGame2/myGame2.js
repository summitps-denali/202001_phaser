/*  global Phaser game game_state  */

game_state.main = function() {};
game_state.main.prototype = {

    preload: function() {
        game.load.image('background', 'assets/backg.png');
        game.load.image('ground', 'assets/ground.png');
        game.load.image('platform', 'assets/platform.png')
        game.load.image('code', 'assets/code.png');
        game.load.spritesheet('player', 'assets/actias.png', 46, 91);
        game.load.image('moth', 'assets/moth.png');
    },

    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        game.add.sprite(0, 0, 'background');
        
        this.score = 0;
        
        this.platforms = game.add.group();
        this.platforms.enableBody = true;
        
        var ground = this.platforms.create(0, game.world.height - 85, 'ground');
        ground.scale.setTo(10, 10);
        ground.body.immovable = true;
        
        var ledge = this.platforms.create (0, 180, 'platform');
        ledge.body.immovable = true;
        ledge.scale.setTo(0.5, 0.5);
        
        var ledge = this.platforms.create (190, 350, 'platform');
        ledge.body.immovable = true;
        
        //exit
        this.mothExit = game.add.group();
        this.mothExit.enableBody = true;
        this.moth = this.mothExit.create(600, 50, 'moth');
        this.moth.body.immovable = true;
        
        //player
        this.player = game.add.sprite(32, game.world.height - 200, 'player');
        game.physics.arcade.enable(this.player);
        this.player.enableBody = true;
        
        this.player.body.bounce.y = 0.1;
        this.player.body.gravity.y = 360;
        this.player.body.collideWorldBounds = true;
        
        //animations
        this.player.animations.add('left', [1, 2, 3, 4], 10, true);
        this.player.animations.add('right', [5, 6, 7, 8], 10, true);
        
        this.cursors = game.input.keyboard.createCursorKeys();
 
        this.code = game.add.group();
        this.code.enableBody = true;
        for (var i = 0; i < 12; i++) {
            var code = this.code.create(i*70, 0, 'code');
            this.code.scale.setTo(0.75);
            code.body.gravity.y = 300;
            code.body.bounce.y = 0.2 + Math.random()*0.2;
         
        }
        this.scoreText = game.add.text(650, 16, 'score: 0', {
            fontSize: '32px',
            fill: '#fff'
        });
        
    },

    update: function() {
         this.player.body.velocity.x = 0;
         
        if (this.cursors.left.isDown) {
            this.player.body.velocity.x = -300;
            this.player.animations.play('left');
        }
        else if (this.cursors.right.isDown) {
            this.player.body.velocity.x = 300;
            this.player.animations.play('right');
        }
        else {
            this.player.animations.stop();
            this.player.frame = 0;
        }
         
        game.physics.arcade.collide(this.player, this.platforms);
        game.physics.arcade.collide(this.player, this.platforms);
        game.physics.arcade.collide(this.code, this.platforms);
        game.physics.arcade.overlap(this.player, this.code, this.collectCode, null, this);
        game.physics.arcade.overlap(this.player, this.moth, this.collectMoth, null, this);

        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.body.velocity.y = -360;
        }
        
        this.scoreText.text = "Score: " + this.score; 

    },
    
    collectCode: function(player, code) {
        code.kill();
        this.score += 1;
    },
    
    collectMoth: function(player, moth) {
        if (this.score > 11)
            game.state.start('ending');
            
    }

}
game.state.add('main', game_state.main);
