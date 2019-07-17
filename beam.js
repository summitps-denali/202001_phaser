class Beam extends Phaser.GameObjects.Sprite{
  constructor(scene){

	var rng = Phaser.Math.Between(-5, 5);
    var x = player.x;
    var y = player.y-200;
	//var randomArc = Phaser.Math.Between(min, max);
    super(scene, x, y, "missile");
    scene.add.existing(this);
	//type characteristics below
    scene.physics.world.enableBody(this);
	//this.body.allowGravity = false;
	this.setDisplaySize(128, 128);
	//this.setScale(0.5, 0.5)
	
	this.setOrigin(0.5, 0.5);
    this.play("fireAnim");
    this.body.velocity.y = -140 + rng;
    this.body.velocity.x = 400;;
	this.body.setSize(20, 20);
	this.body.setOffset(40, 60);
	this.angle = -120;
    //this.body.setCollideWorldBounds(true);


    // 4.2 add the beam to the projectiles group
    scene.projectiles.add(this);


  }

  update(){
	this.angle += 1;
	if (this.angle > 0){
		this.angle = 0;
	}
  }
}
