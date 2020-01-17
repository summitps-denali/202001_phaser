/*global Phaser game game_state*/
/*global maxFuel maxHull locations*/

var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
var game_state = {};

var playerSpeed = 0;
var lastFrame = new Date();
var FPS = 0;

game_state.space = function() {};
game_state.space.prototype = {

    preload: function() {
        // game.load.image('bg', 'assets/space_bg.png');
        game.load.spritesheet('player', 'assets/ships/base_t1.png', 48, 48);
        game.load.image('asteroid1', 'assets/asteroids/1.png');
        game.load.image('fuel_icon', 'assets/HUD/fuel_icon.png');
        game.load.image('fuel_bar', 'assets/HUD/fuel_bar.png');
        game.load.image('hull_icon', 'assets/HUD/hull_icon.png');
        game.load.image('hull_bar', 'assets/HUD/hull_bar.png');
        game.load.image('icon_bar', 'assets/HUD/icon_bar.png');
        game.load.image('wayfinder_marker', 'assets/HUD/wayfinder_marker.png');
        game.load.image('ship_chunk', 'assets/ships/ship_chunk.png');
        game.load.image('home_station', 'assets/stations/home_station.png');
        game.load.image('enter_icon', 'assets/HUD/enter_icon.png');
    },

    create: function() {
        game.world.setBounds(0, 0, 3200, 2400);
        
        // Enabling physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        // Creating BG
        game.stage.backgroundColor = "#02044D";
        // game.add.sprite(0, 0, 'bg');
        
        this.fuel = maxFuel;
        this.hull = maxHull;
        
        // Enabling key press recognition
        this.cursors = game.input.keyboard.createCursorKeys();
        this.keyW = game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.keyA = game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.keyS = game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.keyD = game.input.keyboard.addKey(Phaser.Keyboard.D);
        this.keyE = game.input.keyboard.addKey(Phaser.Keyboard.E);
        this.keyE.onDown.add(function(){}, this);
        
        // Camera
        game.camera.follow(this.player);
        
        // Space Stations
        var home_station = game.add.sprite(1600, 1200, 'home_station');
        home_station.anchor.set(0.5);
        
        // Creating Player
        this.player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
        this.player.anchor.set(0.5);
        game.physics.arcade.enable(this.player);
        this.player.animations.add('forward', [1,2], 10, true);
        this.player.animations.add('left', [3,4], 10, true);
        this.player.animations.add('right', [5,6], 10, true);
        this.player.body.setSize(32, 40);
        this.player.body.bounce.x = 0.2;
        this.player.body.bounce.y = 0.2;
        
        // Asteroids
        this.asteroids = game.add.group();
        this.asteroids.enableBody = true;
        for (var i = 0; i < 100; i++) {
            var a = this.asteroids.create(Math.random() * 2800, Math.random() * 2000, 'asteroid1');
            if ((a.body.x > 1400 && a.body.x < 1800) && (a.body.y > 1000 && a.body.y < 1400)) {
                replaceAsteroid(a);
            }
            
            a.body.setSize(32, 41, 8, 3);
            a.body.velocity.x = Math.random() * 20 - 10;
            a.body.velocity.y = Math.random() * 20 - 10;
            a.body.bounce.x = 0.2;
            a.body.bounce.y = 0.2;
            a.checkWorldBounds = true;
            a.events.onOutOfBounds.add(replaceAsteroid, this);
        }
        
        // Creating ship chunk group
        this.chunks = game.add.group();
        this.chunks.enableBody = true;
    
        // HUD Set-up
        var hull_icon = game.add.sprite(32, 16, 'hull_icon');
        hull_icon.fixedToCamera = true;
        
        var hull_icon_bar = game.add.sprite(72, 16, 'icon_bar');
        hull_icon_bar.fixedToCamera = true;
        
        this.hull_bar = game.add.sprite(72, 16, 'hull_bar');
        this.hull_bar.fixedToCamera = true;
        
        var fuel_icon = game.add.sprite(32, 48, 'fuel_icon');
        fuel_icon.fixedToCamera = true;
        
        var fuel_icon_bar = game.add.sprite(72, 48, 'icon_bar');
        fuel_icon_bar.fixedToCamera = true;
        
        this.fuel_bar = game.add.sprite(72, 48, 'fuel_bar');
        this.fuel_bar.fixedToCamera = true;
        
        this.enter_icon = game.add.sprite(400, 260, 'enter_icon');
        this.enter_icon.anchor.set(0.5);
        this.enter_icon.fixedToCamera = true;
        
        // Creating wayfinder
        this.wayfinder = game.add.sprite(400, 300, 'wayfinder_marker');
        this.wayfinder.fixedToCamera = true;
        this.wayfinder.anchor.set(0.5);
        this.wayfinder.scale.setTo(1.5);
        this.wayfinder.pathTo = "home";
        
        // this.FPSText = game.add.text(8, 8, String(FPS), { font: "32px Arial", fill: "#ffffff", align: "left" });
        // this.FPSText.fixedToCamera = true;
        // setInterval(function(f) {f.text = String(Math.floor(FPS));}, 100, this.FPSText);
    },

    update: function() {
        FPS =  1 / ((Date.now() - lastFrame.getTime()) / 1000);
        this.enter_icon.visible = false;
        this.keyE.reset(true);
        
        // Colliders
        game.physics.arcade.collide(this.asteroids, this.asteroids);
        game.physics.arcade.collide(this.asteroids, this.chunks);
        game.physics.arcade.collide(this.player, this.asteroids, function(p, a) {
            var d = 0;
            if (p.body.touching.left || p.body.touching.right) {
                d = Math.floor(Math.abs(p.body.velocity.x - a.body.velocity.x));
            }
            else if (p.body.touching.up || p.body.touching.down) {
                d = Math.floor(Math.abs(p.body.velocity.y - a.body.velocity.y));
            }
            this.hull -= d;
            createShipChunks(this.player.x, this.player.y, this.player.body.velocity.x, this.player.body.velocity.y, this.player.body.angularVelocity, Math.floor(Math.pow(d - 15, 1/5)), this.chunks);
        }, null, this);
        
        // Events
        
        if (this.hull <= 0) {
            if (this.player.alive) {
                createShipChunks(this.player.x, this.player.y, this.player.body.velocity.x, this.player.body.velocity.y, this.player.body.angularVelocity, Math.floor(Math.pow(maxHull, 1/3)), this.chunks);
            }
            this.player.kill();
        } // Death event
        
        // Move player
        if ((this.cursors.right.isDown || this.keyD.isDown) && this.fuel >= 1) {
            this.player.body.angularVelocity = -Math.pow(2, -((playerSpeed - 240) / 40)) + 158;
            // this.player.body.velocity.copyFrom(game.physics.arcade.velocityFromAngle(this.player.angle - 90, this.player.body.speed >= 120 ? this.player.body.speed : 120));
            playerSpeed += Math.pow(2, -((playerSpeed - 120)/ 22)) + 1.4;
            this.player.animations.play('left');
            this.fuel -= this.player.body.speed > 120 ? 2 : 1;
        }
        else if ((this.cursors.left.isDown || this.keyA.isDown) && this.fuel >= 1) {
            this.player.body.angularVelocity = -(-Math.pow(2, -((playerSpeed - 240) / 40)) + 158);
            // this.player.body.velocity.copyFrom(game.physics.arcade.velocityFromAngle(this.player.angle - 90, this.player.body.speed >= 120 ? this.player.body.speed : 120));
            playerSpeed += Math.pow(2, -((playerSpeed - 120)/ 22)) + 1.4;
            this.player.animations.play('right');
            this.fuel -= this.player.body.speed > 120 ? 2 : 1;
        }
        else if ((this.cursors.up.isDown || this.keyW.isDown) && this.fuel >= 2) {
            this.player.body.angularVelocity /= 1.1;
            // this.player.body.velocity.copyFrom(game.physics.arcade.velocityFromAngle(this.player.angle - 90, 240));
            playerSpeed += Math.pow(2, -((playerSpeed - 240)/ 40)) + 3.8;
            this.player.animations.play('forward');
            this.fuel -= 2;
        }
        else {
            this.player.body.angularVelocity /= 1.05;
            this.player.animations.stop();
            this.player.frame = 0;
        }
        playerSpeed /= 1.02;
        this.player.body.velocity.x = Math.sin(this.player.angle * Math.PI / 180) * playerSpeed;
        this.player.body.velocity.y = -Math.cos(this.player.angle * Math.PI / 180) * playerSpeed;
        
        // World Bounds and Camera
        game.world.setBounds(this.player.x - 1600, this.player.y - 1200, 3200, 2400);
        game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON);
        
        // Icon Updaters
        this.hull_bar.scale.setTo(this.hull >= 0 ? this.hull / maxHull : 0, 1);
        this.fuel_bar.scale.setTo(this.fuel / maxFuel, 1);
        
        // Wayfinder
        var dest = locations[this.wayfinder.pathTo];
        var distanceFromWaypoint = Math.sqrt(Math.pow(dest["x"] - this.player.x, 2) + Math.pow(dest["y"] - this.player.y, 2));
        if (distanceFromWaypoint <= 300) {
            this.wayfinder.kill();
        }
        else {
            if (!this.wayfinder.alive) {
                this.wayfinder.revive();
            }
            this.wayfinder.cameraOffset.x = 400 + 100 * Math.cos(Math.atan((dest["y"] - this.player.y) / (dest["x"] - this.player.x))) * (dest["x"] - this.player.x >= 0 ? 1 : -1);
            this.wayfinder.cameraOffset.y = 300 + 100 * Math.sin(Math.atan((dest["y"] - this.player.y) / (dest["x"] - this.player.x))) * (dest["x"] - this.player.x >= 0 ? 1 : -1);
            this.wayfinder.angle = Math.atan((dest["y"] - this.player.y) / (dest["x"] - this.player.x)) * (180 / Math.PI) + 90 + (dest["x"] - this.player.x >= 0 ? 0 : 180) ;
        }
        
        // Home Station
        if (Math.sqrt(Math.pow(this.player.x - 1600, 2) + Math.pow(this.player.y - 1200, 2)) <= 50) {
            this.fuel += 5;
            this.hull += 0.3;
            this.keyE.reset(true);
            this.enter_icon.visible = true;
            this.keyE.onDown.add(function() {
                game.state.start('platformer');
            }, this);
        }
        
        if (this.fuel >= maxFuel) {this.fuel = maxFuel;}
        if (this.hull >= maxHull) {this.hull = maxHull;}
        
        // Debuggers
        
        // game.debug.body(this.player);
        // game.debug.cameraInfo(game.camera, 32, 32);
        // game.debug.spriteCoords(this.player, 32, 500);
        
        lastFrame.setTime(Date.now());
    },
};
game.state.add('space', game_state.space);

// Functions
function replaceAsteroid(a) {
    var newX = Math.random() * 3200;
    var newY = Math.random() * 2400;
    
    while (newX > 100 && newX < 3100 && newY > 100 && newY < 2300) {
        newX = Math.random() * 3200;
        newY = Math.random() * 2400;
    }
    
    a.body.x = newX + game.world.bounds['x'];
    a.body.y = newY + game.world.bounds['y'];
    a.x = newX + game.world.bounds['x'];
    a.y = newY + game.world.bounds['y'];
    
    a.body.velocity.x = Math.random() * 20 - 10;
    a.body.velocity.y = Math.random() * 20 - 10;
}

function createShipChunks(x, y, dx, dy, dt, chunks, chunksGroup) {
    for (var i = 0; i < chunks; i++) {
        var c = chunksGroup.create(x, y, 'ship_chunk');
        c.body.velocity.x = dx / 1.5 + Math.random() * 60 - 30;
        c.body.velocity.y = dy / 1.5 + Math.random() * 60 - 30;
        c.body.angularVelocity = dt + Math.random() * 50 - 25;
        c.body.bounce.x = 0.2;
        c.body.bounce.y = 0.2;
        c.checkWorldBounds = true;
        c.outOfBoundsKill = true;
    }
}