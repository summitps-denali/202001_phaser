class Explosion extends Phaser.GameObjects.Sprite{
  constructor(scene){

    super(scene, 0, 0, "missileExplosion");

    scene.add.existing(this);
    this.on('animationcomplete', this.animComplete, this);
    this.play("missileExplosionAnim");
	//this.setOrigin(0, 1); 
    //scene.physics.world.enableBody(this);
	//this.body.setSize(32, 32);
	this.angle = 0;
	//this.setScale(2, 2);
    //this.body.setCollideWorldBounds(true);
    //scene.projectiles.add(this);


  }

  update(){
  }
 	animComplete (animation, frame)
	{
    this.destroy();
	}
}
