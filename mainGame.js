class mainGame extends Phaser.Scene {
    constructor() {
        super("mainGame");
    }

    create() {
        this.enemies = this.add.group();
        this.time.addEvent({ delay: 200, callback: this.cloudCallback, callbackScope: this, repeat: 0 });
        bulletSound = this.sound.add('oneShot');

        this.bg4 = this.add.image(0, 0, "Moon");
        this.bg4.setOrigin(0, 0);
        this.bg4.setScrollFactor(0);
        this.bg4.setScale(1, 1);


        this.bg3 = this.add.tileSprite(0, 0, 3000, 800, "Clouds");
        this.bg3.setOrigin(0, 0);
        this.bg3.setScrollFactor(0);
        this.bg3.setScale(8, 8);

        this.bg2 = this.add.tileSprite(0, 0, 3000, 800, "Background");
        this.bg2.setOrigin(0, 0);
        this.bg2.setScrollFactor(0);
        this.bg2.setScale(8, 8);

        this.bg1 = this.add.tileSprite(0, 550, 3000, 800, "ground");

        this.bg1.setOrigin(0, 0);
        //this.bg1.setScale(3, 3);

        this.physics.add.existing(this.bg1, true);


        platforms = this.physics.add.staticGroup();
        platforms.create(250, 400, 'ground');
        platforms.create(600, 400, 'ground');
        platforms.create(50, 250, 'ground');
        platforms.create(750, 220, 'ground');

        platforms.create(1200, 568, 'ground').setScale(2).refreshBody();

        platforms.create(1000, 400, 'ground');
        platforms.create(1800, 350, 'ground');
        platforms.create(1250, 200, 'ground');
        platforms.create(2350, 2000, 'ground');

        platforms.create(2000, 568, 'ground').setScale(2).refreshBody();

        platforms.create(2600, 400, 'ground');
        platforms.create(3000, 350, 'ground');
        platforms.create(2450, 200, 'ground');
        platforms.create(3550, 2000, 'ground');

        platforms.create(2800, 568, 'ground').setScale(2).refreshBody();

        platforms.create(3200, 400, 'ground');
        platforms.create(3600, 350, 'ground');
        platforms.create(3050, 200, 'ground');
        platforms.create(4150, 2000, 'ground');


        platforms.create(3600, 568, 'ground').setScale(2).refreshBody();


        player = this.physics.add.sprite(100, 450, 'Sigma Corps Marine');
        player.setOrigin(0, 0);
        player.setScale(2, 2).body.setSize(10, 30).refreshBody;
        //player.body.setOffset(25, 16);


        player.setCollideWorldBounds(false);

        this.physics.add.collider(player, this.bg1);
        cursors = this.input.keyboard.createCursorKeys();
        cam = this.cameras.main;
        cam.startFollow(player, true);

        cam.setBounds(0, 0, game.config.width * 5, game.config.height);

        spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);


        this.anims.create({
            //name
            key: 'idle',
            frames: this.anims.generateFrameNumbers('Sigma Corps Marine', { start: 8, end: 9 }),
            frameRate: 2.5,
            repeat: -1
        });

        this.anims.create({
            key: 'move',
            frames: this.anims.generateFrameNumbers('Sigma Corps Marine', { start: 0, end: 4 }),
            frameRate: 6,
            repeat: -1
        });


        this.anims.create({
            key: 'crouch',
            frames: this.anims.generateFrameNumbers('Sigma Corps Marine', { start: 13, end: 13 }),
            frameRate: 1,
            repeat: -1
        });


        this.anims.create({
            key: 'shoot',
            frames: this.anims.generateFrameNumbers('Sigma Corps Marine', { start: 5, end: 8 }),
            frameRate: 60,
            repeat: 0
        });


        this.anims.create({
            key: 'crouchShoot',
            frames: this.anims.generateFrameNumbers('Sigma Corps Marine', { start: 10, end: 13 }),
            frameRate: 60,
            repeat: -1
        });


        this.anims.create({
            key: 'bulletAnim',
            frames: this.anims.generateFrameNumbers('bullet', { start: 0, end: 1 }),
            frameRate: 5,
            repeat: -1
        });

        player.body.setGravityY(300);
        this.physics.add.collider(player, platforms);

        stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });

        stars.children.iterate(function(child) {

            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

        });
        this.physics.add.collider(stars, platforms);
        this.physics.add.overlap(player, stars, this.collectStar, null, this);
        scoreText = this.add.text(616, 16, 'score: 0', { fontSize: '32px', fill: '#fff' });
        scoreText.setScrollFactor(0);
    } //end

    update() {
        for (var i = 0; i < this.enemies.getChildren().length; i++) {
            var blank = this.enemies.getChildren()[i];
            blank.update();
        }
        this.bg2.tilePositionX = cam.scrollX * .12;
        this.bg3.tilePositionX = cloudTimer + cam.scrollX * .11
        this.bg4.x = cam.scrollX * .01;

        if (spacebar.isDown && cursors.down.isDown && bulletTimer == 0) {
            player.setVelocityX(0);
            player.anims.play('crouchShoot', true);
            bulletTimer = 1;
            var bullet = new Bullet(this, player.x, player.y);
            bulletSound.play();
            bulletTimerEvent = this.time.addEvent({ delay: 100, callback: this.resetBulletCoolDown, callbackScope: this, repeat: 0 });
        }

        else if (spacebar.isDown && bulletTimer == 0) {

            player.setVelocityX(0);
            bulletTimer = 1;
            var bullet = new Bullet(this, player.x, player.y);
            var turret = new Turret(this);

            bulletTimerEvent = this.time.addEvent({ delay: 100, callback: this.resetBulletCoolDown, callbackScope: this, repeat: 0 });

            player.anims.play('shoot', true);

            bulletSound.play();

        }
        else if (cursors.up.isDown && player.body.touching.down) {
            player.setVelocityY(-500);
            player.setScale(2, 2).body.setSize(10, 30).refreshBody;
            player.body.setOffset(43, 16);
            crouching = false;
        }
        else if (cursors.left.isDown && !spacebar.isDown) {
            player.setVelocityX(-160);
            player.flipX = true
            player.anims.play('move', true);
            player.setScale(2, 2).body.setSize(10, 30).refreshBody;
            player.body.setOffset(43, 16);
            crouching = false;
        }
        else if (cursors.right.isDown && !spacebar.isDown) {
            player.setVelocityX(160);
            player.flipX = false
            player.anims.play('move', true);
            player.setScale(2, 2).body.setSize(10, 30).refreshBody;
            player.body.setOffset(43, 16);
            crouching = false;
        }
        else if (cursors.down.isDown) {
            player.setVelocityX(0);
            player.setScale(2, 2).body.setSize(10, 15).refreshBody;
            player.body.setOffset(43, 30);
            player.anims.play('crouch', true);
            crouching = true;
        }

        else {
            player.setVelocityX(0);

            player.anims.play('idle', true);
            player.setScale(2, 2).body.setSize(10, 30).refreshBody;
            player.body.setOffset(43, 16);
            crouching = false;
        }

    }

    collectStar(player, star) {
        star.disableBody(true, true);
        score += 10;
        scoreText.setText('score: ' + score);

    }

    resetBulletCoolDown() {
        bulletTimer = 0;
    }

    cloudCallback() {
        cloudTimer += 0.1;

        this.time.addEvent({ delay: 200, callback: this.cloudCallback, callbackScope: this, repeat: 0 });
    }
} //end
