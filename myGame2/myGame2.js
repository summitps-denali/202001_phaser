/*  global Phaser game game_state */

var animatePlayer = 0;

game_state.main = function() {};
game_state.main.prototype = {

    preload: function() {
        game.load.image('Cave', 'assets/Cave Background-1.png (1).png');
        game.load.image('ground', 'assets/Cave Ground-1.png.png');
        game.load.image('object', 'assets/Stalagmite-1.png.png');
        game.load.image('LightningBallLeft', 'assets/Lightning Ball Left-1.png.png');
        game.load.image('LightningBallRight', 'assets/Lightning Ball Right-1.png.png');
        game.load.spritesheet('dude', 'assets/Nimble_Quest_Card_08 (5).png', 90, 90);
        
    },
        
    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.add.sprite(0, 0, 'object');
        game.add.sprite(0, 0, 'Cave');
        game.add.sprite(0, -64, 'LightningBallLeft');
        game.add.sprite(0, -64, 'LightningBallRight');
        this.platforms = game.add.group();
        this.platforms.enableBody = true;
        var ground = this.platforms.create(0, game.world.height - 32, 'ground');
        ground.scale.setTo(2, 1);
        ground.body.immovable = true;
        this.player = game.add.sprite(400, game.world.height - 150, 'dude');
        game.physics.arcade.enable(this.player);
        this.player.body.bounce.y = 0.2;
        this.player.body.gravity.y = 300;
        this.player.body.collideWorldBounds = true;
        this.player.animations.add('left', [1, 2, 3], 20, true);
        this.player.animations.add('right', [4, 5, 6], 20, true);
        this.player.animations.add('fireleft', [8, 0], 2, false);
        this.player.animations.add('fireright', [7, 0], 2, false);
        this.player.scale.setTo(1, 1,);
        this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
	    this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
	    this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
	    this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
	    this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	    game.input.keyboard.addKeyCapture([ Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.SPACEBAR, Phaser.Keyboard.DOWN, Phaser.Keyboard.Up ]);
	    this.LightningBallLeft = game.add.group();
	    this.LightningBallLeft.enableBody = true;
	    this.timer=0;
	    this.LightningBallRight = game.add.group();
	    this.LightningBallRight.enableBody = true;
	    this.objects = game.add.group();    //  BALL, create group objects
        this.objects.enableBody = true;     //  BALL, activate collisions

        var _this = this;                   //  BALL, need this for timer
        var delayTimer = setInterval(function() {  //  BALL, every second timer
            var object = _this.objects.create(
              Math.random()*800,    //  x position
              -64,                  //  y position (just above viewable window)
              'object'
              );
            object.body.gravity.y = 300;
            //  WARNING: disable this timer before switching state (see below)
        }, 1000);
        
        game.input.keyboard.onPressCallback = function(e) {
            console.log("key pressed: ", e);
            if (e == 'x') {
                //  disable ball timer, disable keyboard callback
                clearInterval(delayTimer);
                game.input.keyboard.onPressCallback = null;
                game.state.start('intro');
            }
        }
        
        
        this.score = 0;
        this.scoreText = game.add.text(16, 16, 'score: 0' + this.score, {
            fontSize: '32px',
            fill: '#fff'
        });
       
    },

    update: function() {
        if (this.timer!=0) {
            this.timer-=1
        }
        game.physics.arcade.collide(this.player, this.platforms);
            if (this.downKey.isDown && this.timer==0) {
                this.player.animations.play('fireleft');
                animatePlayer = 1;
                this.timer=25
                var LightningBallLeftInstance = this.LightningBallLeft.create(this.player.x, this.player.y+30, "LightningBallLeft");
                LightningBallLeftInstance.body.velocity.x = -200;
            }
            else if (this.upKey.isDown && this.timer==0) {
                this.player.animations.play('fireright');
                animatePlayer = 1;
                this.timer=25
                var LightningBallRightInstance = this.LightningBallRight.create(this.player.x, this.player.y+30, "LightningBallRight");
                LightningBallRightInstance.body.velocity.x = 200;
            }
            
        if (this.leftKey.isDown) {
            this.player.body.velocity.x = -150;
            this.player.animations.play('left');
            animatePlayer = 0
        }
    
        else if (this.rightKey.isDown) {
            this.player.body.velocity.x = 150;
            this.player.animations.play('right');
            animatePlayer = 0
        }
        else if (animatePlayer == 0) {
            this.player.animations.stop();
            this.player.body.velocity.x = 0;
            this.player.frame = 0;
        }
        


        this.scoreText.text = 'score: 0' + this.score;
    },
    
    collectobject: function(LightningBall, object) {
        object.kill();
        this.score += 1;
    },
    
    collectplayer: function(player, object) {
        player.kill();
    },
    
};
game.state.add('main', game_state.main);
