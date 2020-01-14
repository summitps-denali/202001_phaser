/*global Phaser game game_state*/

var swordTimer = 0;

game_state.boss = function() {};
game_state.boss.prototype = {

    preload: function() {
        //load images
        game.load.image("ground", "assets/platform.png");
        game.load.image("star", "assets/fireball.png");
        game.load.spritesheet("knight", "assets/kca.png", 256, 256);
        game.load.image("B", "assets/backgroundB.png");
        game.load.image("F", "assets/backgroundF.png");
        game.load.image("lava", "assets/lava.png");
        game.load.spritesheet("boss", "assets/boss.png", 512, 512);
        game.load.image("thing", "assets/thing.png");
    },

    create: function() {
        //enable physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        //setup backgrounds
        this.midBackground1 = game.add.sprite(0, 0, "B");
        this.midBackground2 = game.add.sprite(game.world.width, 0, "B");
        this.frontBackground1 = game.add.sprite(0, 0, "F");
        this.frontBackground2 = game.add.sprite(game.world.width, 0, "F");
        this.midBackground1.scale.setTo(6.3, 5);
        this.midBackground2.scale.setTo(6.3, 5);
        this.frontBackground1.scale.setTo(6.3, 5);
        this.frontBackground2.scale.setTo(6.3, 5);
        
        //lava group
        this.lava = game.add.group();
        this.lava.enableBody = true;
        //add lava
        this.lava1 = this.lava.create(0, game.world.height - 64, "lava");
        this.lava1.scale.setTo(7, 7);
        this.lava1.body.immovable = true;
        this.lava2 = this.lava.create(game.world.width, game.world.height - 64, "lava");
        this.lava2.scale.setTo(7, 7);
        this.lava2.body.immovable = true;
        
        //platform group
        this.platforms = game.add.group();
        //enabel physics for platform group
        this.platforms.enableBody = true;
        //add platforms
        this.ledge = this.platforms.create(100, 250, "ground");
        this.ledge.body.immovable = true;
        this.ledge1 = this.platforms.create(150, 500, "ground");
        this.ledge1.body.immovable = true;
        this.ledge2 = this.platforms.create(550, 400, "ground");
        this.ledge2.body.immovable = true;
        
        //star group
        this.stars = game.add.group();
        this.stars.enableBody = true;
        this.starList = [];
        
        //point display
        this.score = 5;
        this.scoreText = game.add.text(16, 16, "Boss HP: " + this.score, {fontSize: "32px", fill: "#000"});
        this.hp = 5;
        this.hpText = game.add.text(game.world.width - 200, 16, "Player HP: " + this.hp);
        
        //setup player
        this.player = game.add.sprite(game.world.width / 2, game.world.height - 200, "knight");
        game.physics.arcade.enable(this.player);
        //player physics properties
        this.player.body.bounce.y = 0;
        this.player.body.gravity.y = 500;
        this.player.body.collideWorldBounds = true;
        //animations
        this.player.animations.add("left", [20, 21, 22, 23, 24, 25, 26, 27], 10, true);
        this.player.animations.add("right", [6, 7, 8, 9, 10, 11, 12, 13], 10, true);
        this.player.animations.add("teaR", [3, 4], 1, true);
        this.player.animations.add("teaL", [17, 18], 1, true);
        this.player.scale.setTo(0.25, 0.25);
        this.player.body.setSize(150, 250, 10, 0);
        this.playerDir = "left";
        this.playerNoAnimate = false;
        this.playerDamageCooldown = 0;
        //controls
        this.cursors = game.input.keyboard.createCursorKeys();
        swordTimer = 0;
        game.input.keyboard.onPressCallback = function(e) {
            if (e == ' ' && swordTimer == 0) {
                swordTimer = 50;
            }
        };
        
        //setup boss
        this.boss = game.add.sprite(550, 206, "boss");
        game.physics.arcade.enable(this.boss);
        this.boss.enableBody = true;
        this.boss.scale.setTo(0.5, 0.5);
        this.boss.body.setSize(300, 300, 100, 40);
        //boss animations
        this.boss.animations.add("fire", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 0], 20, false);
        //boss ai
        this.bossDamageCooldown = 0;
        this.bossAttack = "none";
        this.bossAttacks = ["fire", "fireball", "lava", "thing"];
        this.bossCooldown = 100;
    },
    update: function() {
        //player-platform collision
        game.physics.arcade.collide(this.player, this.platforms);
        
        //star-platform collision
        //game.physics.arcade.collide(this.stars, this.platforms);
        
        //player-star collection
        game.physics.arcade.overlap(this.player, this.stars, this.collectStar, null, this);
        
        //player-lava interaction
        game.physics.arcade.overlap(this.player, this.lava, this.touchLava, null, this);
        
        //player-boss interaction
        game.physics.arcade.overlap(this.player, this.boss, this.touchBoss, null, this);
        
        //reset player x velocity
        this.player.body.velocity.x = 0;
        
        //movement and animation
        if (this.player.body.velocity.y > 2) {
            this.player.animations.stop();
            if (this.playerDir == "left") {
                this.player.frame = 19;
            }
            else if (this.playerDir == "right") {
                this.player.frame = 5;
            }
            this.playerNoAnimate = true;
        }
        else if (this.player.body.velocity.y < -2) {
            this.player.animations.stop();
            if (this.playerDir == "left") {
                this.player.frame = 14;
            }
            else if (this.playerDir == "right") {
                this.player.frame = 0;
            }
            this.playerNoAnimate = true;
        }
        else {
            this.playerNoAnimate = false;
        }
        if (this.cursors.left.isDown) {
            //left
            this.player.body.velocity.x = -150;
            if (!this.playerNoAnimate) {
                this.player.animations.play("left");
            }
            this.playerDir = "left";
        }
        else if (this.cursors.right.isDown) {
            //right
            this.player.body.velocity.x = 150;
            if (!this.playerNoAnimate) {
                this.player.animations.play("right");
            }
            this.playerDir = "right";
        } 
        else if (this.cursors.down.isDown) {
            //tea!
            if (this.playerDir == "left") {
                this.player.animations.play("teaL");
            }
            else if (this.playerDir == "right") {
                this.player.animations.play("teaR");
            }
        }
        else {
            //stop
            if (!this.playerNoAnimate) {
                this.player.animations.stop();
                if (this.playerDir == "left") {
                    this.player.frame = 15;
                }
                else if (this.playerDir == "right") {
                    this.player.frame = 1;
                }
            }
        }
        
        //sword
        if (swordTimer > 30) {
            this.player.animations.stop();
            if (this.playerDir == "left") {
                this.player.frame = 16;
            }
            if (this.playerDir == "right") {
                this.player.frame = 2;
            }
        }
        if (swordTimer > 0) {
            swordTimer -= 1;
        }
        
        //jump if on ground and jump key held
        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.body.velocity.y = -400;
        }
        
        //boss AI
        if (this.bossCooldown != 0) {
            this.bossCooldown -= 1;
        }
        if (this.bossAttack == "none" && this.bossCooldown == 0) {
            this.bossAttack = this.bossAttacks[Math.floor(Math.random() * 100) % this.bossAttacks.length];
        }
        if (this.bossAttack == "fire") {
            if (this.bossCooldown == 0) {
                this.bossCooldown = 100;
                this.boss.body.setSize(500, 300, 0, 40);
            }
            if (this.bossCooldown < 50) {
                this.bossAttack = "none";
                this.boss.body.setSize(300, 300, 100, 40);
            }
            this.boss.animations.play("fire");
        }
        if (this.bossAttack == "fireball") {
            if (this.bossCooldown == 0) {
                this.bossCooldown = 100;
            }
            if (this.bossCooldown < 50) {
                this.bossAttack = "none";
            }
            if (this.bossCooldown % 20 == 0) {
                var star = this.stars.create(650, 300, "star");
                star.body.gravity.y = 0;
                star.body.bounce.y = 0;
                star.body.velocity.x = -Math.random() * 100 - 300;
                star.body.velocity.y = Math.random() * 200 - 100;
                star.scale.setTo(0.5, 0.5);
                this.starList.push(star);
            }
        }
        if (this.bossAttack == "lava") {
            if (this.bossCooldown == 0) {
                this.bossCooldown = 200;
            }
            if (this.bossCooldown < 50) {
                this.bossAttack = "none";
            }
            if (this.bossCooldown > 125) {
                this.lava1.y -= 1;
                this.lava2.y -= 1;
            }
            if (this.bossCooldown < 125) {
                this.lava1.y += 1;
                this.lava2.y += 1;
            }
        }
        if (this.bossAttack == "thing") {
            if (this.bossCooldown == 0) {
                this.bossCooldown = 100;
            }
            if (this.bossCooldown < 50) {
                this.bossAttack = "none";
            }
            if (this.bossCooldown % 20 == 0) {
                var star = this.stars.create(this.player.x + -50 + Math.random() * 100, -20, "thing");
                star.body.gravity.y = 300;
                star.scale.setTo(0.5, 0.5);
                this.starList.push(star);
            }
        }
        
        //damage cooldown
        if (this.playerDamageCooldown != 0) {
            this.playerDamageCooldown -= 1;
        }
        if (this.bossDamageCooldown != 0) {
            this.bossDamageCooldown -= 1;
        }
        
        //update score
        this.scoreText.text = "Boss HP: " + this.score;
        this.hpText.text = "Player HP: " + this.hp;
        
        //check for completion
        if (this.score < 1) {
            game.state.start("end");
            game.input.keyboard.onPressCallback = null;
        }
        
        //player death
        if (this.hp < 1) {
            game.state.start("lose");
            game.input.keyboard.onPressCallback = null;
        }
    },
    collectStar: function(player, star) {
        star.kill();
        if (this.playerDamageCooldown == 0) {
            this.playerDamageCooldown = 50;
            this.hp -= 1;
        }
    },
    touchLava: function(player, lava) {
        player.kill();
        game.state.start("lose");
        game.input.keyboard.onPressCallback = null;
    },
    touchBoss: function(player, boss) {
        if (this.bossAttack == "fire") {
            if (this.playerDamageCooldown == 0) {
                this.hp -= 2;
                this.playerDamageCooldown = 100;
            }
        }
        else if (swordTimer > 30) {
            if (this.bossDamageCooldown == 0) {
                this.score -= 1;
                this.bossDamageCooldown = 50;
            }
        }
        else if (this.playerDamageCooldown == 0) {
            this.hp -= 1;
            this.playerDamageCooldown = 50;
        }
    },
};
game.state.add('boss', game_state.boss);
//game.state.start('boss');
