    /*global Phaser*/

    var game = new Phaser.Game(800,600, Phaser.AUTO, '');
    var game_state = {};

    game_state.main = function () {};
    game_state.main.prototype = {
    
        preload: function() {
             game.load.image('Background', 'assets/Background.png');      
             game.load.image('ground', 'assets/platform.png');
             game.load.image('HolyRelic', 'assets/HolyRelic.png');
             game.load.spritesheet('crusader', 'assets/crusader.png', 144, 105);
        },

        create: function() {
             game.physics.startSystem(Phaser.Physics.ARCADE);

             game.add.sprite(0,0, 'HolyRelic');
             game.add.sprite(0,0, 'Background');

             this.platforms = game.add.group();
             this.platforms.enableBody = true;
             var ground = this.platforms.create(0, game.world.height - 64, 'ground');
             ground.scale.setTo(2, 2);
             ground.body.immovable = true;

             var ledge1 = this.platforms.create(300, 350, 'ground');
             ledge1.body.immovable = true;
             
             this.player = game.add.sprite(32, game.world.height - 300, 'crusader');
             game.physics.arcade.enable(this.player);
             this.player.body.bounce.y = 0.5;
             this.player.body.gravity.y = 300;
             this.player.body.collideWorldBounds = true;
             this.player.body.setSize(60, 60, 45, 45);
             this.player.animations.add('left', [4, 5, 6, 7, 8], 10, true);
             this.player.animations.add('right', [10, 11, 12, 13, 14], 10, true);
            this.player.wd = 0;  //  0 whatever, 1 left, 2 right
             
            this.cursors = game.input.keyboard.createCursorKeys();
            
            this.score = 0;
            this.HolyRelic = game.add.group();
            this.HolyRelic.enableBody = true;
            for (var i = 0; i < 12; i++) {
                var HolyRelic = this.HolyRelic.create(i * 70, 0, 'HolyRelic');
                HolyRelic.body.gravity.y = 300;
                HolyRelic.body.bounce.y = 0.7 + Math.random() * 0.2;
            } 
                
            this.scoreText = game.add.text(16, 16,
              'score: 0', {
                fontSize: '32px',
                fill: '#000'
              }
            );
             
         },
         update: function() {
            game.debug.body(this.player);  
            game.physics.arcade.collide(this.platforms, this.player);
            game.physics.arcade.collide(this.HolyRelic,  this.platforms);
            game.physics.arcade.overlap(this.player, this.HolyRelic, this.collectHolyRelic, null, this);          
            
            this.player.body.velocity.x = 0;
            
            if(this.cursors.left.isDown) {
               this.player.body.velocity.x = -150;
               this.player.animations.play('left');
               this.player.wd = 1;
            }   
            else if (this.cursors.right.isDown) {
                this.player.body.velocity.x = 150;
                this.player.animations.play('right');
               this.player.wd = 2;
            }
            else {
                this.player.animations.stop();
                if (this.player.wd == 1 )
                    this.player.frame = 9;
                else
                    this.player.frame = 15;
            }
            
            if(this.cursors.up.isDown && this.player.body.touching.down) {
               this.player.body.velocity.y = -350;
            }
         },
         
        collectHolyRelic: function(player, HolyRelic) {
            HolyRelic.kill();
            this.score += 25;
            this.scoreText.text = "Score:Glory" + this.score;
        },
         
    };
    game.state.add('main', game_state.main);
    game.state.start('main');