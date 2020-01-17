/*global Phaser*/

var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
var game_state = {}

game_state.main = function() {};
game_state.main.prototype = {

    preload: function() {
        game.load.image('stopclock', 'assets/stopClock.png');
        game.load.image('sky', 'assets/sky.png');
        game.load.image('Cave1Back', 'assets/Cave1Back.png');
        game.load.image('Cave1Back2', 'assets/Cave1Back2.png');
        game.load.image('star', 'assets/star.png');
        game.load.image('Cave1', 'assets/Cave1.png');
        game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
        game.load.image('ground', 'assets/platform.png');
        game.load.image('Line', 'assets/Line.png');
        game.load.image('Cave1back3', 'assets/Cave1back3.png');
        game.load.image('Sun1', 'assets/Sun1.png');
        game.load.image('Grass1', 'assets/Grass1.png');
        game.load.spritesheet('RobotRunner', 'assets/RobotRunner.png', 320, 320);
        game.load.image('Man1', 'assets/Man1.png');
        game.load.spritesheet('Undertailman', 'assets/Undertailman.png', 320, 320);
        game.load.image('TextBox2', 'assets/TextBox2.png');
        game.load.image('Cave1Exit', 'assets/Cave1Exit.png');
        game.load.image('MouseDot', 'assets/MouseDot.png');
        game.load.image('UndertailScreen1#2', 'assets/UndertailScreen1number2.png');
        game.load.image('EvilYumm', 'assets/EvilYumm.png');
        game.load.image('FullDino', 'assets/FullDino.png');
        game.load.image('TimeFreeze', 'assets/TimeFreeze.png');
        game.load.image('Start', 'assets/Start.png');
        game.load.image('Darkness', 'assets/Darkness.png');
        game.load.image('UnderTail', 'assets/UnderTail.png');
        game.load.image('YouEscaped', 'assets/YouEscaped.png');
        game.load.spritesheet('ChaseDino', 'assets/ChaseDino.png', 320, 320);
        game.load.image('TextBox', 'assets/TextBox.png');
        game.load.image('Ok', 'assets/Ok.png');
    },

    create: function() {
// alert('test');
        //this.back = game.add.sprite(0, 0, 'Cave 1 Back');
        //this.back.scale.setTo(2, 2);
        this.talking = 0;
        this.WINCONDITION = 0;
        this.mousedot = game.add.sprite(400, 300, 'MouseDot');
        this.sky = game.add.sprite(0, 0, 'sky');
        this.sun = game.add.sprite(0, 0, 'Sun1');
        this.sun.scale.setTo(0.5, 0.5);
        this.sun2 = game.add.sprite(game.world.width, 0, 'Sun1');
        this.sun2.scale.setTo(0.5, 0.5);
        this.grass2 = game.add.sprite(game.world.width, 330, 'Grass1');
        this.grass = game.add.sprite(0, 330, 'Grass1');
        this.grass.scale.setTo(3, 1);
        this.grass2.scale.setTo(3, 1);
        this.back2 = game.add.sprite(0, 0, 'Cave1Back2');
        this.back2.scale.setTo(2.51, 2);
        this.back4 = game.add.sprite(game.world.width, 0, 'Cave1Back2');
        this.back4.scale.setTo(2.51, 2);
        this.back3 = game.add.sprite(0, 0, 'Cave1back3');
        this.back3.scale.setTo(2.51, 2);
        this.back5 = game.add.sprite(game.world.width, 0, 'Cave1back3');
        this.back5.scale.setTo(2.51, 2);
        this.man1 = game.add.sprite(1000, 445, 'Man1');
        this.man1.scale.setTo(0.3, 0.3);
        this.platforms = game.add.group();
        this.platforms.enableBody = true;
        this.RobotText = game.add.text(346, 280, '');
        this.robotText = game.add.text(375, 310, '');
        this.ground = this.platforms.create(0, game.world.height - 64, 'Cave1');
        this.ground2 = this.platforms.create(game.world.width, game.world.height - 64, 'Cave1');
        this.textboxout = game.add.sprite(970, 425, 'TextBox2');
        this.textboxout.scale.setTo(0.3, 0.3)
        this.textboxout.inputEnabled = true;
        this.textboxout.events.onInputDown.add(this.speaktoman1, this);
        //this.line = game.add.sprite(0, 0, 'Line');
        //this.line.enableBody = true;
        //this.line.body.immovable = true;
        this.ground.scale.setTo(2, 2);
        this.ground.body.setSize(20000, 340, 0, 4);
        this.ground.body.immovable = true;
        this.ground2.scale.setTo(2, 2);
        this.ground2.body.setSize(20000, 340, 0, 4);
        this.ground2.body.immovable = true;
        this.ledge = this.platforms.create(200, 150, 'Cave1');
        this.ledge.body.immovable = true;
        this.ledge.body.setSize(320, 50, 0, 270);
        this.ledge2 = this.platforms.create(1000, 100, 'Cave1');
        this.ledge2.body.immovable = true;
        this.ledge2.body.setSize(320, 50, 0, 270);
        this.ledge3 = this.platforms.create(1600, 40, 'Cave1');
        this.ledge3.body.immovable = true;
        this.ledge3.body.setSize(320, 50, 0, 270);
        this.ledge4 = this.platforms.create(2000, 240, 'Cave1');
        this.ledge4.body.immovable = true;
        this.ledge4.body.setSize(320, 50, 0, 270);
        this.ledge5 = this.platforms.create(2500, 60, 'Cave1');
        this.ledge5.body.immovable = true;
        this.ledge5.body.setSize(320, 50, 0, 270);
        this.ledge6 = this.platforms.create(3000, -60, 'Cave1');
        this.ledge6.body.immovable = true;
        this.ledge6.body.setSize(320, 50, 0, 270);
        this.ledge7 = this.platforms.create(3500, 60, 'Cave1');
        this.ledge7.body.immovable = true;
        this.ledge7.body.setSize(320, 50, 0, 270);
        this.ledge8 = this.platforms.create(4000, 120, 'Cave1');
        this.ledge8.body.immovable = true;
        this.ledge8.body.setSize(320, 50, 0, 270);
        this.ledge9 = this.platforms.create(4300, 80, 'Cave1');
        this.ledge9.body.immovable = true;
        this.ledge9.body.setSize(320, 50, 0, 270);
        this.ledge10 = this.platforms.create(4600, 40, 'Cave1');
        this.ledge10.body.immovable = true;
        this.ledge10.body.setSize(320, 50, 0, 270);
        this.wall = this.platforms.create(-1975, 225, "Line");
        this.wall.body.setSize(2000, 2000, -30, -1000)
        this.wall.body.immovable = true;
        this.player = game.add.sprite(game.world.width / 2, game.world.height - 150, 'Undertailman');
        game.physics.arcade.enable(this.player);
        this.player.body.bounce.y = 0.2;
        this.player.body.gravity.y = 300;
        this.player.body.collideWorldBounds = true;
        this.player.animations.add('left', [7, 8], 10, true);
        this.player.animations.add('right', [2, 3], 10, true);
        this.player.scale.setTo(0.2, 0.2);
        this.player.body.setSize(160, 320, 11.5, 0);
        this.cursors = game.input.keyboard.createCursorKeys();
        this.stars = game.add.group();
        this.runrobotrung = game.add.group();
        this.runrobotrung.enableBody = true;
        this.stars.enableBody = true;
        this.starList = [];
        this.runrobotrunListg = [];
        this.exitcave1 = game.add.sprite(2000, 0, 'Cave1Exit');
        this.exitcave1.scale.setTo(2.5, 2);
        this.runrobotrun = this.runrobotrung.create(4000, 350, 'RobotRunner');
        this.runrobotrun.inputEnabled = true;
        this.runrobotrun.events.onInputDown.add(this.getinrobot, this);
        this.runrobotrun.animations.add('run robot run!', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 10, true);
        this.runrobotrun.body.setSize(300, 300);
        this.ChaseDino = game.add.sprite(-80, 320, 'ChaseDino');
        this.ChaseDino.animations.add('chase dino chase!', [0, 1], 5, true);
        this.darkness = game.add.sprite(0, 0, 'Darkness');
        this.darkness.scale.setTo(2.5, 2);
        this.fixScroll = 0;
        this.startscreen = game.add.sprite(0, 0, 'UndertailScreen1#2');
        this.startscreen.scale.setTo(2.5, 2);
        this.UNDERTAIL = game.add.sprite(0, 0, 'UnderTail');
        this.start = game.add.sprite(250, 80, 'Start');
        this.start.inputEnabled = true;
        this.start.events.onInputDown.add(this.startthechase, this);
        this.startcount = 0;
        this.stopScroll = 0;
        this.sound = new Audio();
        this.sound.src = "assets/AStepSideways.mp3";
        this.sound.play(1);
        
        for (var i = 0; i < 95; i++) {
            var star = this.stars.create(i * 70, 0, 'stopclock');
            star.scale.setTo(0.2, 0.2);
            star.body.setSize(100, 180, 10, 0);
            star.body.gravity.y = 300;
            star.body.bounce.y = 0.7 + Math.random() * 0.2;
            this.starList.push(star);
        }

        this.score = 275;
        this.scoreText = game.add.text(16, 16, 'Can you escape?', {
            fontSize: '32px',
            fill: '#000'
        });
        this.textTimer = 100;
        this.starCOUNT = 12;
        this.playerX = 0;

    },

    update: function() {
        game.debug.body(this.mousedot);
        //game.debug.body(this.ground2);
        this.ChaseDino.animations.play('chase dino chase!');
        if (this.WINCONDITION == 0) {
            this.ChaseDino.y = this.player.y - 160;
            if (this.score >= 700) {
                this.ChaseDino.x = -100000000000;
            }
            if (this.score <= 700) {
                this.ChaseDino.x = -250;
            }
            if (this.score <= 600) {
                this.ChaseDino.x = -220;
            }
            if (this.score <= 500) {
                this.ChaseDino.x = -180;
            }
            if (this.score <= 400) {
                this.ChaseDino.x = -150;
            }
            if (this.score <= 300) {
                this.ChaseDino.x = -130;
            }
            if (this.score <= 200) {
                this.ChaseDino.x = -110;
            }
            if (this.score <= 100) {
                this.ChaseDino.x = -80;
            }
            if (this.score <= 0) {
                if (this.player.x > 0) {
                    this.player.x -= 10;
                    this.stopScroll = 1;
                }
                else {
                    this.player.kill();
                    this.EvilYumm = game.add.sprite(0, 0, 'EvilYumm');
                    this.FullDino = game.add.sprite(300, 60, 'FullDino');
                    this.EvilYumm.scale.setTo(2.5, 2);
                    this.FullDino.scale.setTo(1.8, 1.8);
                    
                }
            }
        }
        else {
            this.ChaseDino.x = -100000000000;
            this.score = 1000;
        }
        //game.debug.body(this.wall);
        // if (true) {
        //     this.mousedot.x = game.input.x
        //     this.mousedot.y = game.input.y
        // }
        game.physics.arcade.collide(this.player, this.platforms);
        game.physics.arcade.collide(this.stars, this.platforms);
        this.player.body.velocity.x = 0;
        if (this.startcount == 1 && this.talking == 0) {    
            if (this.cursors.left.isDown) {
                this.player.body.velocity.x = -150;
                this.player.animations.play('left');
                this.player.body.setSize(160, 310, 20, 0);
            }
            else if (this.cursors.right.isDown) {
                this.player.body.velocity.x = 150;
                this.player.animations.play('right');
                this.player.body.setSize(160, 310, 11.5, 0);
            }
            else {
                this.player.animations.stop();
                this.player.frame = 0;
                this.player.body.setSize(170, 320, 16, 0);
            }
            if (this.cursors.up.isDown && this.player.body.touching.down){
                this.player.body.velocity.y = -350;
            }
        }    
        game.physics.arcade.overlap(this.player, this.stars, this.collectStar, null, this);
        game.physics.arcade.overlap(this.player, this.runrobotrun, this.getinrobot2, null, this);
        if (this.startcount == 1 && this.talking == 0) {    
            this.score -= 1;
            this.scoreText.text = "Distance From Dino: " + (this.score / 10);
            if (this.textTimer > 0) {
                this.scoreText.text = "RUN FROM THE DINO! GET EXTRA TIME!";
                this.textTimer -= 1;
            }
        }
        if (this.WINCONDITION == 1){
            this.scoreText.text = "You Got Away!";
        }
        else if (this.score <= 0){
            this.scoreText.text = "The Dino Has Caught You";
        }
        
        //camera scroll
        this.cameraMovement = this.player.body.x - (game.world.width / 2);
        if (this.fixScroll == 1) {
            this.cameraMovement = 2.5;
        }
        if (this.stopScroll == 1) {
            this.cameraMovement = 0;
        }
        //player
        this.player.body.x -= this.cameraMovement;
        this.playerX += this.cameraMovement;
        //stars
        for(var i=0;i<this.starList.length;i++) {
            this.starList[i].body.x -= this.cameraMovement;
        }
        //platforms
        this.ledge.body.x -= this.cameraMovement;
        this.ledge2.body.x -= this.cameraMovement;
        this.ledge3.body.x -= this.cameraMovement;
        this.ledge4.body.x -= this.cameraMovement;
        this.ledge5.body.x -= this.cameraMovement;
        this.ledge6.body.x -= this.cameraMovement;
        this.ledge7.body.x -= this.cameraMovement;
        this.ledge8.body.x -= this.cameraMovement;
        this.ledge9.body.x -= this.cameraMovement;
        this.ledge10.body.x -= this.cameraMovement;
        this.wall.body.x -= this.cameraMovement;
        this.grass.x -= this.cameraMovement;
        this.grass2.x -= this.cameraMovement;
        this.man1.x -= this.cameraMovement;
        this.textboxout.x -= this.cameraMovement;
        //backgrounds
        this.back2.x -= this.cameraMovement / 4;
        //console.log(this.cameraMovement);
        this.back3.x -= this.cameraMovement / 2;
        this.back4.x -= this.cameraMovement / 4;
        this.back5.x -= this.cameraMovement / 2;
        this.sun.x -= this.cameraMovement / 4;
        this.sun2.x -= this.cameraMovement / 4;
        this.grass.x -= this.cameraMovement / 2;
        this.grass2.x -= this.cameraMovement / 2;
        this.ground.x -= this.cameraMovement / 2;
        this.ground2.x -= this.cameraMovement / 2;
        this.exitcave1.x -= this.cameraMovement / 2;
        if (this.fixScroll == 0) {
            this.runrobotrun.x -= this.cameraMovement / 2;
        }
        //wrap backgrounds
        if (this.back2.x > game.world.width && this.playerX < 1000) {
            this.back2.x = -game.world.width;
        }
        if (this.back2.x < -game.world.width && this.playerX < 1000) {
            this.back2.x = game.world.width;
        }
        if (this.back3.x > game.world.width && this.playerX < 1000) {
            this.back3.x = -game.world.width;
        }
        if (this.back3.x < -game.world.width && this.playerX < 1000) {
            this.back3.x = game.world.width;
        }
        if (this.back4.x > game.world.width && this.playerX < 1000) {
            this.back4.x = -game.world.width;
        }
        if (this.back4.x < -game.world.width && this.playerX < 1000) {
            this.back4.x = game.world.width;
        }
        if (this.back5.x > game.world.width && this.playerX < 1000) {
            this.back5.x = -game.world.width;
        }
        if (this.back5.x < -game.world.width && this.playerX < 1000) {
            this.back5.x = game.world.width;
        }
        if (this.sun.x > game.world.width) {
            this.sun.x = -game.world.width;
        }
        if (this.sun.x < -game.world.width) {
            this.sun.x = game.world.width;
        }
        if (this.sun2.x > game.world.width) {
            this.sun2.x = -game.world.width;
        }
        if (this.sun2.x < -game.world.width) {
            this.sun2.x = game.world.width;
        }
        if (this.grass.x > game.world.width) {
            this.grass.x = -game.world.width;
        }
        if (this.grass.x < -game.world.width) {
            this.grass.x = game.world.width;
        }
        if (this.grass2.x > game.world.width) {
            this.grass2.x = -game.world.width;
        }
        if (this.grass2.x < -game.world.width) {
            this.grass2.x = game.world.width;
        }
        if (this.ground.x > game.world.width) {
            this.ground.x = -game.world.width;
        }
        if (this.ground.x < -game.world.width) {
            this.ground.x = game.world.width;
        }
        if (this.ground2.x > game.world.width) {
            this.ground2.x = -game.world.width;
        }
        if (this.ground2.x < -game.world.width) {
            this.ground2.x = game.world.width;
        }
    },
    collectStar: function(player, star) {
        if (this.score > 0) {    
            star.kill();
            this.score += 45;
            this.starCOUNT -= 1;
        }
    },
    getinrobot2: function(player, runrobotrun) {
        //player.kill();
        //console.log("get in robot");
        //this.runrobotrun.animations.play("run robot run!");
        this.RobotText.text = "Click Robot";
        this.robotText.text = "To Enter";
        console.log(this.WINCONDITION);
    },
    getinrobot: function() {
        this.WINCONDITION = 1;
        this.player.kill();
        console.log("get in robot");
        this.sound.pause();
        this.sound = new Audio();
        this.sound.src = "assets/MrRick.mp3";
        this.sound.play(1);
        this.runrobotrun.animations.play("run robot run!");
        this.runrobotrun.x = 0;
        this.fixScroll = 1;
        this.WINCONDITION = 1;
        this.WinText = game.add.sprite(0, 0, 'YouEscaped');
        this.WINCONDITION = 1;
        this.robotText.text = "Constant support (and literally everything else): Andrew C.";
        this.robotText.x = 20;
        this.robotText.y = 330;
        this.RobotText.text = "All drawings, most of coding: Joshua D.";
        this.RobotText.x = 150;
        this.RobotText.y = 290;
        this.WINCONDITION = 1;
        this.WinText = game.add.sprite(0, 0, 'YouEscaped');
        this.WINCONDITION = 1;
    },
    startthechase: function() {
        this.start.kill();
        this.startscreen.kill();
        this.darkness.kill();
        this.UNDERTAIL.kill();
        this.startcount = 1;
    },
    speaktoman1: function() {
        this.talking = 1;
        this.textboxin = game.add.sprite(0, 0, 'TextBox');
        this.textboxin.scale.setTo(2.5, 1.868);
        this.Ok = game.add.sprite(635, 400, 'Ok');
        this.Ok.inputEnabled = true;
        this.Ok.events.onInputDown.add(this.endspeaktoman1, this);
        this.man1text1 = game.add.text(300, 200, "What are you doing");
        this.man1text2 = game.add.text(300, 235, "talking to me? RUN!");
    },
    endspeaktoman1: function() {
        this.talking = 0;
        this.textboxin.kill();
        this.Ok.kill();
        this.man1text1.text = "";
        this.man1text2.text = (355, 310, "");
    }
};
game.state.add('main', game_state.main);
game.state.start('main');
