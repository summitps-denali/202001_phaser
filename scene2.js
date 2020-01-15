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
	
	//still
	this.bgbg = this.add.tileSprite(0, 0, 300, 800, "bg1");
	this.bgbg.setOrigin(0, 0);
	this.bgbg.setScale(3, 3);
	this.bgbg2 = this.add.tileSprite(0, 0, 300, 800, "bg2");
	this.bgbg2.setOrigin(0, 0);
	this.bgbg2.setScale(3, 3);
	this.bgbg3 = this.add.tileSprite(0, 0, 300, 800, "bg3");
	this.bgbg3.setOrigin(0, 0); 
	this.bgbg3.setScale(3, 3);   
	this.bgbg4 = this.add.tileSprite(0, 0, 300, 800, "bg4");
	this.bgbg4.setOrigin(0, 0);
	this.bgbg4.setScale(3, 3);
	this.bgbg5 = this.add.tileSprite(0, 0, 300, 800, "bg5");
	this.bgbg5.setOrigin(0, 0);
	this.bgbg5.setScale(3, 3);
	this.bgbg6 = this.add.tileSprite(0, 0, 300, 800, "bg6");
	this.bgbg6.setOrigin(0, 0);
	this.bgbg6.setScale(3, 3);
	
	this.projectiles = this.add.group();
	
	var shadow = this.add.image(300, 800, 'shadow');
	shadow.setOrigin(0.5, 1).setScale(5, 5);
	
		// The player and settings
	player = this.physics.add.sprite(265, 300, 'player');
	player.setOrigin(0.5, 1).setScale(1, 1).setMaxVelocity(600).setFrame(0).refreshBody;
	player.body.setOffset(0, 0);
	player.visitedRoom = null;
	
	
    player2 = this.physics.add.sprite(265, 400, 'player');
	player2.setOrigin(0.5, 1).setScale(1, 1).setMaxVelocity(600).setFrame(0).refreshBody;
	player2.body.setOffset(0, 0);
//  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = this.physics.add.staticGroup();
    
    //this.physics.add.collider(this.projectiles, platforms, this.soundTest, null, this);
	//ground
    //platforms.create(600, 864, 'ground').setScale(20, 6).setAlpha(0).refreshBody();

	//mech platforms
	platforms.create(310, 330, 'ground').setScale(0.45, 0.2).setAlpha(0).refreshBody(); //top
	platforms.create(350, 508, 'ground').setScale(1, 0.2).setAlpha(0).refreshBody();
	platforms.create(350, 250, 'ground').setScale(1, 0.2).setAlpha(0).refreshBody();

//wallls
	platforms.create(480, 508, 'ground').setScale(0.01, 10).setOrigin(0.5, 1).setAlpha(0).refreshBody();
	platforms.create(200, 508, 'ground').setScale(0.01, 10).setOrigin(0.5, 1).setAlpha(0).refreshBody();
//boxes	
	platforms.create(180, 550, 'box').setScale(128, 128).setOrigin(0, 1).setAlpha(0).refreshBody();
	platforms.create(400, 550, 'box').setScale(128, 128).setOrigin(0, 1).setAlpha(0).refreshBody();
	
	
	mechPartBoxes1 = this.physics.add.sprite(400, 400, 'box');
	mechPartBoxes1.setOrigin(0, 1).setScale(100, 70).setAlpha(0);
	mechPartBoxes1.body.allowGravity = false;
	
	
	mechPartBoxes2 = this.physics.add.sprite(300, 300, 'box');
	mechPartBoxes2.setOrigin(0, 1).setScale(100, 128).setAlpha(0);
	mechPartBoxes2.body.allowGravity = false;
	
	
	mechPartBoxes3 = this.physics.add.sprite(300, 300, 'box');
	mechPartBoxes3.setOrigin(1, 1).setScale(128, 128).setAlpha(0);
	mechPartBoxes3.body.allowGravity = false;
	
	
	mechPartBoxes4 = this.physics.add.sprite(310, 450, 'box');
	mechPartBoxes4.setOrigin(1, 1).setScale(100, 100).setAlpha(0);
	mechPartBoxes4.body.allowGravity = false;
	
	
	mechPartBoxes5 = this.physics.add.sprite(310, 500, 'box');
	mechPartBoxes5.setOrigin(0, 1).setScale(70, 128).setAlpha(0);
	mechPartBoxes5.body.allowGravity = false;
	
	//mech parts
	playerMech1 = this.physics.add.sprite(300, 800, 'playerMech1');
	playerMech1.setOrigin(0.5, 1).setScale(5, 5);
	playerMech1.setFrame(0).body.allowGravity = false;
	//legs
	
	
	playerMech2 = this.add.image(300, 800, 'playerMech1');
	playerMech2.setOrigin(0.5, 1).setScale(5, 5);
	playerMech2.setFrame(1);
	//cockpit
	
	
	minigun = this.physics.add.sprite(435, 475, 'minigun');
	minigun.setOrigin(0, 0.5).setScale(5, 5).setFrame(3).body.allowGravity = false;
	
	
	playerMech7 = this.add.image(300, 800, 'playerMech1');
	playerMech7.setOrigin(0.5, 1).setScale(5, 5);
	playerMech7.setFrame(6);
	
	playerMech3 = this.add.image(300, 800, 'playerMech1');
	playerMech3.setOrigin(0.5, 1).setScale(5, 5);
	playerMech3.setFrame(2);
	//right missile launcher
	
	playerMech4 = this.add.image(300, 800, 'playerMech1');
	playerMech4.setOrigin(0.5, 1).setScale(5, 5);
	playerMech4.setFrame(3);
	//left missile launcher
	
	playerMech5 = this.add.image(300, 800, 'playerMech1');
	playerMech5.setOrigin(0.5, 1).setScale(5, 5);
	playerMech5.setFrame(4);
	//back
	
	playerMech6 = this.add.image(300, 800, 'playerMech1');
	playerMech6.setOrigin(0.5, 1).setScale(5, 5);
	playerMech6.setFrame(5);
	//middle
	
	
	enemyMech = this.physics.add.staticImage(2000, 800, 'enemyMech1');
	enemyMech.setOrigin(0.5, 1).setScale(7, 7).refreshBody;
	enemyMech.flipX = true;
	enemyMech.body.allowGravity = false;
	enemyMech.body.setSize(200, 200);
	enemyMech.body.setOffset(-50, -400);
	
	enemyMechHitbox = this.physics.add.staticGroup();
    
    //this.physics.add.collider(this.projectiles, platforms, this.soundTest, null, this);
	//ground
    //platforms.create(600, 864, 'ground').setScale(20, 6).setAlpha(0).refreshBody();

	//mech platforms
	enemyMechHitbox.create(2000, 500, 'box').setScale(64, 64).setAlpha(1).refreshBody(); //top
	
    this.physics.add.collider(this.projectiles, enemyMech, this.explosion, null, this);
    this.physics.add.collider(this.projectiles, enemyMechHitbox, this.explosion, null, this);
    
    
	
	//camera
    cam1 = this.cameras.add(0, 0, 750, 325);;
	cam1.startFollow(player, true); //necessary
	cam1.setZoom(1);
    cam1.setBounds(0, 0, game.config.width * 3, 800);
    

	this.physics.add.collider(player, platforms);
	this.physics.add.collider(player2, platforms);
    this.physics.add.collider(player, player2);
	this.physics.add.overlap(player, mechPartBoxes1, this.goGhost1, null, this); //cockpit
	this.physics.add.overlap(player2, mechPartBoxes1, this.goGhost1, null, this);
	this.physics.add.overlap(player, mechPartBoxes2, this.goGhost2, null, this); //rockets
	this.physics.add.overlap(player2, mechPartBoxes2, this.goGhost2, null, this);
	
	this.physics.add.overlap(player, mechPartBoxes3, this.goGhost3, null, this); //rockets 2
	this.physics.add.overlap(player2, mechPartBoxes3, this.goGhost3, null, this);
	
	this.physics.add.overlap(player, mechPartBoxes4, this.goGhost4, null, this);
	this.physics.add.overlap(player2, mechPartBoxes4, this.goGhost4, null, this);
    
	this.physics.add.overlap(player, mechPartBoxes5, this.goGhost5, null, this);
	this.physics.add.overlap(player2, mechPartBoxes5, this.goGhost5, null, this);
    
    
    var cam2 = this.cameras.add(0, 325, 750, 325);
	cam2.startFollow(player2, true); //necessary
	cam2.setZoom(1);
    cam2.setBounds(0, 0, game.config.width * 3, 800);
   
    
    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();
	spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
	Zkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
	Rkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
	
	//player 2 controls
	Wkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
	Akey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
	Skey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
	Dkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
	
	//bullets
	bulletCountUI = this.add.sprite(400, 325, 'bulletCounter')
	bulletCountUI.setFrame(50).setScale(2, 2).setOrigin(0, 1).setAlpha(0);
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
	//mechHead = this.add.sprite(88, 0, 'moduleUI')
	//mechHead.setScrollFactor(0).setFrame(6).setScale(4, 4).setOrigin(0, 0);
	
//animations
    this.anims.create({
        key: 'moveAnim',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: 0
    });
    
		this.anims.create({
        key: 'minigunFire',
        frames: this.anims.generateFrameNumbers('minigun', { start: 0, end: 3 }),
        frameRate: 100,
        repeat: 0
    });

	// Pointer lock will only work after mousedown
    game.canvas.addEventListener('mousedown', function () {
        game.input.mouse.requestPointerLock();
    });
	reticle = this.physics.add.sprite(2000, 455, 'crosshair');
	
	
	cam3 = this.cameras.add(750, 0, 750, 650);
	cam3.startFollow(reticle, true); //necessary
	//cam2.setZoom(1);
    //cam3.setBounds(1500, 0, 1000, 900); //1500
    cam3.setBounds(0, 0, 3000, 800); 
	
	reticle.setScale(4, 4); 
	//reticle.setScrollFactor(0)
	//setCollideWorldBounds(true).
	reticle.body.allowGravity = false;
	reticle.setOrigin(0.5, 0.5);
    // Move reticle upon locked pointer move
    this.input.on('pointermove', function (pointer) {
        if (this.input.mouse.locked)
        { //store position in variable
			//pointerPosX += pointer.movementX;
            reticle.x += pointer.movementX;
            reticle.y += pointer.movementY;

        }
    }, this);

  }//end

update(){
	
	this.bg1.tilePositionX = cam3.scrollX * .1;
	this.bg2.tilePositionX = cam3.scrollX * .11;
	this.bg3.tilePositionX = cam3.scrollX * .12;
	this.bg4.tilePositionX = cam3.scrollX * .13;
	this.bg5.tilePositionX = cam3.scrollX * .14;
	this.bg6.tilePositionX = cam3.scrollX * .15;
	
	this.bg1.tilePositionY = cam3.scrollY * .1;
	this.bg2.tilePositionY = cam3.scrollY * .11;
	this.bg3.tilePositionY = cam3.scrollY * .12;
	this.bg4.tilePositionY = cam3.scrollY * .13;
	this.bg5.tilePositionY = cam3.scrollY * .14;
	this.bg6.tilePositionY = cam3.scrollY * .15;
	
	
	minigun.rotation = Phaser.Math.Angle.Between(minigun.x, minigun.y, reticle.x, reticle.y);
	
	if(player.visitedRoom == 2 || player2.visitedRoom == 2) {
		playerMech2.setAlpha(.2);
		bulletCountUI.setAlpha(0.7);
	}
	else {
		playerMech2.setAlpha(1);
		bulletCountUI.setAlpha(0);
	}
	if(player.visitedRoom == 3 || player2.visitedRoom == 3) {
		playerMech3.setAlpha(.2);
	}
	else {
		playerMech3.setAlpha(1);
	}
	
	if(player.visitedRoom == 4 || player2.visitedRoom == 4) {
		playerMech4.setAlpha(.2);
	}
	else {
		playerMech4.setAlpha(1);
	}
	
	if(player.visitedRoom == 5 || player2.visitedRoom == 5) {
		playerMech5.setAlpha(.2);
	}
	else {
		playerMech5.setAlpha(1);
	}
	
	
	if(player.visitedRoom == 6 || player2.visitedRoom == 6) {
		playerMech6.setAlpha(.2);
	}
	else {
		playerMech6.setAlpha(1);
	}

	//move reticle based on camera scrolling
	//reticle.x = cam1.scrollX;
	//reset reticle to previous position
    //reticle.x += pointerPosX;
	
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
		
    	minigun.anims.play('minigunFire', true);
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
	
	if (cursors.left.isDown) {
        	player.setVelocityX(-150);
		player.anims.play('moveAnim', true);
		player.flipX = true;
    }
    else if (cursors.right.isDown) {
        	player.setVelocityX(150);
        player.anims.play('moveAnim', true);
		player.flipX = false;
    }
    else {
        player.setVelocityX(0);
		player.setFrame(0);
    }
	
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-350);
    }
//player 2
	if (Akey.isDown) {
    	player2.setVelocityX(-150);
		player2.anims.play('moveAnim', true);
		player2.flipX = true;
    }
    else if (Dkey.isDown) {
        player2.setVelocityX(150);
        player2.anims.play('moveAnim', true);
		player2.flipX = false;
    }
    else {
        player2.setVelocityX(0);
		player2.setFrame(0);
    }
	
    if (Wkey.isDown && player2.body.touching.down)
    {
        player2.setVelocityY(-350);
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
	bulletSound = this.sound.add('oneShot');
    bulletSound.play();
	this.time.addEvent({ delay: 100, callback: this.resetBulletCoolDown, callbackScope: this, repeat: 0 });
  	}
	resetBulletCoolDown(){
		firingBullets = false;
	}
	explosion(projectile, thing){
		var rng = Phaser.Math.Between(-5, 5);
		var explosionSound = this.sound.add('explosion');
    	explosionSound.play();
		var explosion = new Explosion(this);
		explosion.x = projectile.x-100;
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
		explosion.setScale(1, 1);
		
		projectile.destroy();
	}
	goGhost1(player, mechPartBoxes1){
	player.visitedRoom = 2;
	}
	goGhost2(player, mechPartBoxes2){
	player.visitedRoom = 3;
	}
	
	goGhost3(player, mechPartBoxes3){
	player.visitedRoom = 4;
	}
	
	goGhost4(player, mechPartBoxes4){
	player.visitedRoom = 5;
	}
	
	goGhost5(player, mechPartBoxes5){
	player.visitedRoom = 6;
	}
}//end
