class scene2 extends Phaser.Scene{
  constructor(){
    super("playGame");
  }

  create(){
	//parallax
	this.bg1 = this.add.tileSprite(0, 0, game.config.width, 800, "bg1");
	this.bg1.setOrigin(0, 0);
	this.bg1.setScrollFactor(0);
	this.bg1.setScale(3, 3);
	this.bg2 = this.add.tileSprite(0, 0, game.config.width, 800, "bg2");
	this.bg2.setOrigin(0, 0);
	this.bg2.setScrollFactor(0);
	this.bg2.setScale(3, 3);
	this.bg3 = this.add.tileSprite(0, 0, game.config.width, 800, "bg3");
	this.bg3.setOrigin(0, 0);
	this.bg3.setScrollFactor(0); 
	this.bg3.setScale(3, 3);   
	this.bg4 = this.add.tileSprite(0, 0, game.config.width, 800, "bg4");
	this.bg4.setOrigin(0, 0);
	this.bg4.setScrollFactor(0);
	this.bg4.setScale(3, 3);
	this.bg5 = this.add.tileSprite(0, 0, game.config.width, 800, "bg5");
	this.bg5.setOrigin(0, 0);
	this.bg5.setScrollFactor(0);
	this.bg5.setScale(3, 3);
	this.bg6 = this.add.tileSprite(0, 0, game.config.width, 800, "bg6");
	this.bg6.setOrigin(0, 0);
	this.bg6.setScrollFactor(0);
	this.bg6.setScale(3, 3);
	this.projectiles = this.add.group();

//  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = this.physics.add.staticGroup();

    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    platforms.create(600, 864, 'ground').setScale(20, 6).refreshBody();
	platforms.create(4000, 600, 'ground');
    platforms.create(1500, 400, 'ground');
    platforms.create(1200, 400, 'ground')
    platforms.create(3000, 200, 'ground').setScale(6).refreshBody();
	this.projectiles = this.add.group();
    this.physics.add.collider(this.projectiles, platforms, this.soundTest, null, this);
		// The player's MECH and settings
	player = this.physics.add.sprite(100, 720, 'lilMech');
	player.setOrigin(0.5, 1).setScale(4, 4).setMaxVelocity(600).setDragX(2000).setFrame(0);
	//player.setBounce(0.2);
    //player.setCollideWorldBounds(true);
	//camera
    myCam = this.cameras.main;
	myCam.startFollow(player, true);
	myCam.setZoom(1);
    myCam.setBounds(0, 0, game.config.width * 3, 800);
	this.physics.add.collider(player, platforms);
    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();
	spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
	Zkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
	Rkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
	//bullets
	bulletCountUI = this.add.sprite(0, 900, 'bulletCounter')
	bulletCountUI.setScrollFactor(0).setFrame(50).setScale(4, 4).setOrigin(0, 1);
	//rockets
	ammoCountUI = this.add.sprite(128, 900, 'rocketCounter')
	ammoCountUI.setScrollFactor(0).setFrame(6).setScale(4, 4).setOrigin(0, 1);
	//coolant
	coolantUI = this.add.sprite(256, 900, 'coolantActive')
	coolantUI.setScrollFactor(0).setFrame(0).setScale(4, 4).setOrigin(0, 1);
	//repair
	repairUI = this.add.sprite(384, 900, 'repairActive')
	repairUI.setScrollFactor(0).setFrame(0).setScale(4, 4).setOrigin(0, 1);
	//sword
	swordUI = this.add.sprite(512, 900, 'swordActive')
	swordUI.setScrollFactor(0).setFrame(0).setScale(4, 4).setOrigin(0, 1);
	//mech modules
	mechHead = this.add.sprite(88, 0, 'moduleUI')
	mechHead.setScrollFactor(0).setFrame(6).setScale(4, 4).setOrigin(0, 0);
	
	mechTorso = this.add.sprite(88, 88, 'moduleUI')
	mechTorso.setScrollFactor(0).setFrame(17).setScale(4, 4).setOrigin(0, 0);
	
	mechLeftArm = this.add.sprite(0, 88, 'moduleUI')
	mechLeftArm.setScrollFactor(0).setFrame(2).setScale(4, 4).setOrigin(0, 0);
	
	mechRightArm = this.add.sprite(176, 88, 'moduleUI')
	mechRightArm.setScrollFactor(0).setFrame(8).setScale(4, 4).setOrigin(0, 0);

	mechPelvis = this.add.sprite(88, 176, 'moduleUI')
	mechPelvis.setScrollFactor(0).setFrame(18).setScale(4, 4).setOrigin(0, 0);

	mechLeftLeg = this.add.sprite(0, 176, 'moduleUI')
	mechLeftLeg.setScrollFactor(0).setFrame(14).setScale(4, 4).setOrigin(0, 0);

	mechRightLeg = this.add.sprite(176, 176, 'moduleUI')
	mechRightLeg.setScrollFactor(0).setFrame(19).setScale(4, 4).setOrigin(0, 0);

    //  Our player animations, turning, walking left and walking right.
    this.anims.create({
        key: 'moveAnim',
        frames: this.anims.generateFrameNumbers('lilMech', { start: 1, end: 13 }),
        frameRate: 16,
        repeat: 0
    });

	// Pointer lock will only work after mousedown
    game.canvas.addEventListener('mousedown', function () {
        game.input.mouse.requestPointerLock();
    });
	reticle = this.physics.add.sprite(100, 720, 'crosshair');
	reticle.setScale(4, 4); //setScrollFactor(0).setCollideWorldBounds(true).
	reticle.body.allowGravity = false;
    // Move reticle upon locked pointer move
    this.input.on('pointermove', function (pointer) {
        if (this.input.mouse.locked)
        { //store position in variable
			pointerPosX += pointer.movementX;
            reticle.y += pointer.movementY;

        }
    }, this);

  }//end

update(){
	//move reticle based on camera scrolling
	reticle.x = myCam.scrollX;
	//reset reticle to previous position
    reticle.x += pointerPosX;
	this.bg1.tilePositionX = myCam.scrollX * .1;
	this.bg2.tilePositionX = myCam.scrollX * .11;
	this.bg3.tilePositionX = myCam.scrollX * .12;
	this.bg4.tilePositionX = myCam.scrollX * .13;
	this.bg5.tilePositionX = myCam.scrollX * .14;
	this.bg6.tilePositionX = myCam.scrollX * .15;
	
	ammoCountUI.setFrame(loadedMissiles);
	if (spacebar.isDown && firingMissiles == false && loadedMissiles > 0){
		//fire loaded missiles
		firingMissiles = true;
		loadedMissiles -= 1;
		this.shootBeam();
    }
	else if (Phaser.Input.Keyboard.JustDown(spacebar) && loadedMissiles == 0){
		var emptySound = this.sound.add('emptyClip');
    	emptySound.play();
	}
	if (Phaser.Input.Keyboard.JustDown(Rkey)){
		this.reloadMissiles();
	}
	//now bullets
	bulletCountUI.setFrame(loadedBullets);
	if (Zkey.isDown && firingBullets == false && loadedBullets > 0){
		//fire loaded missiles
		firingBullets = true;
		loadedBullets -= 1;
		this.shootBullet();
    }
	else if (Phaser.Input.Keyboard.JustDown(Zkey) && loadedBullets == 0){
		var emptySound = this.sound.add('emptyClip');
    	emptySound.play();
	}

   // 4.2 update all the beams
    for(var i = 0; i < this.projectiles.getChildren().length; i++){
      var beam = this.projectiles.getChildren()[i];
      beam.update();
    }
	
	//if player is off ground, thrusters activate
	if (!player.body.touching.down){
		
		player.setDragX(200);
		player.setFrame(0);
		//consume fuel
		if (cursors.left.isDown) {
        	player.setAccelerationX(-600);
			player.flipX = true;
		}
		else if (cursors.right.isDown) {
        	player.setAccelerationX(600);
			player.flipX = false;
    	}
		else {
			player.setAccelerationX(0);
		}
	}
	else {
		player.setDragX(2000);
		
	if (cursors.left.isDown) {
        	player.setAccelerationX(-600);
		player.anims.play('moveAnim', true);
		player.flipX = true;
    }
    else if (cursors.right.isDown) {
        	player.setAccelerationX(600);
        player.anims.play('moveAnim', true);
		player.flipX = false;
    }
    else {
        //player.setVelocityX(0);
        player.setAccelerationX(0);
		player.setFrame(0);
    }
	}

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-600);
    }

}
// 2.2 create the shootBeam function
  	shootBeam(){
    // fire missile
    var beam = new Missile(this);
	var missileSound = this.sound.add('missileFire');
    missileSound.play();
	this.time.addEvent({ delay: 200, callback: this.resetMissileCoolDown, callbackScope: this, repeat: 0 });
  	}
	resetMissileCoolDown(){
		firingMissiles = false;
	}
	reloadMissiles(){
		if(loadedMissiles < 6){
		loadedMissiles += 1;	
		}
		loadedBullets = 50;
		//var reloadSound = this.sound.add('gunCock');
    	//reloadSound.play();
	}
	shootBullet(){
    // fire missile
    var bullet = new Bullet(this);
	var bulletSound = this.sound.add('oneShot');
    bulletSound.play();
	this.time.addEvent({ delay: 100, callback: this.resetBulletCoolDown, callbackScope: this, repeat: 0 });
  	}
	resetBulletCoolDown(){
		firingBullets = false;
	}
	soundTest(projectile, platform){
		var rng = Phaser.Math.Between(-5, 5);
		var explosionSound = this.sound.add('explosion');
    	explosionSound.play();
		var explosion = new Explosion(this);
		explosion.x = projectile.x;
		explosion.y = projectile.y;
		//make angle semi-determined by projectile angle.
		if (projectile.body.touching.down) {
			explosion.angle = 0
		}
		else if (projectile.body.touching.right){
			explosion.angle = -90
		}
		else if (projectile.body.touching.left){
			explosion.angle = -90
		}
		else if (projectile.body.touching.up){
			explosion.angle = 180
		}
		explosion.angle += rng;
		
		projectile.destroy();
	}
}//end
