/*global Phaser game game_state*/
game_state.platformer = function() {};
game_state.platformer.prototype = {

    preload: function() {
        game.load.spritesheet('player', 'assets/char/guy.png', 32, 32);
        game.load.image('tile', 'assets/space_bg.png');
        game.load.tilemap('map', 'assets/tilemaps/map.csv');
        game.load.image('tileset', 'assets/tilesets/spaceship_tileset.png');
        game.load.image('blank', 'assets/blank.png');
        game.load.image('enter_icon', 'assets/HUD/enter_icon.png');
    },

    create: function() {
        
        this.map = game.add.tilemap('map', 16, 16);
        this.map.addTilesetImage('tileset');
        this.layer = this.map.createLayer(0);
        this.map.setCollisionBetween(0,2);
        this.map.setCollisionBetween(8,9);
        this.map.setCollisionBetween(16,17);
        this.layer.resizeWorld();
        
        this.exitDoor = game.add.sprite(128,336,'blank');
        game.physics.arcade.enable(this.exitDoor);
        this.exitDoor.enableBody = true;
        this.exitDoor.body.setSize(64,96);
        
        // Enabling physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        // Setting the Stage
        game.stage.backgroundColor = "#FAFAFA";
        
        
        // Enabling key press recognition
        this.cursors = game.input.keyboard.createCursorKeys();
        this.keyW = game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.keyA = game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.keyS = game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.keyD = game.input.keyboard.addKey(Phaser.Keyboard.D);
        this.keySpace = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.keyE = game.input.keyboard.addKey(Phaser.Keyboard.E);
        this.keyE.onDown.add(function(){}, this);
        
        this.player = game.add.sprite(132, 380, 'player');
        this.player.scale.setTo(2, 2);
        game.physics.arcade.enable(this.player);
        this.player.body.gravity.y = 1800;
        this.player.body.collideWorldBounds = true;
        this.player.animations.add('right', [0,1,2], 10, true);
        this.player.animations.add('left', [6,7,8], 10, true);
        this.player.body.setSize(14, 28, 18, 8);
        
        // Camera
        game.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);
        
        // HUD
        this.enter_icon = game.add.sprite(160, 312, 'enter_icon');
        this.enter_icon.anchor.set(0.5);
    },

    update: function() {
        this.enter_icon.visible = false;
        this.keyE.reset(true);
        
        // Colliders
        game.physics.arcade.collide(this.player, this.layer, function(p, g) {
            if ((this.cursors.up.isDown || this.keySpace.isDown)&& this.player.body.onFloor()) {
                this.player.body.velocity.y = -520;
            }
        }, null, this);
        game.physics.arcade.overlap(this.player, this.exitDoor, function(p, d) {
            this.keyE.reset(true);
            this.enter_icon.visible = true;
            this.keyE.onDown.add(function() {
                game.state.start('space');
            }, this);
        }, null, this);
        if (this.cursors.left.isDown || this.keyA.isDown) {
            this.player.body.velocity.x = -300;
            
            if (this.player.body.onFloor()) {
                this.player.animations.play('left');
            }
            else {
                this.player.animations.stop();
                this.player.frame = 5;
            }
        }
        else if (this.cursors.right.isDown || this.keyD.isDown) {
            this.player.body.velocity.x = 300;
            
            if (this.player.body.onFloor()) {
                this.player.animations.play('right');
            }
            else {
                this.player.animations.stop();
                this.player.frame = 3;
            }
        }
        else if (this.player.body.onFloor()) {
            this.player.animations.stop();
            this.player.frame = 4;
            this.player.body.velocity.x = 0;
        }
        else {
            this.player.body.velocity.x = 0;
        }
        
        // game.debug.body(this.exitDoor);
    },
};
game.state.add('platformer', game_state.platformer);
