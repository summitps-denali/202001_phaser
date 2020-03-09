class Bullet extends Phaser.GameObjects.Sprite{
  constructor(scene){
    var type = 1;
	var speed = 1;
	var direction = 0;
	var xSpeed = 0;
	var ySpeed = 0;
    var x = minigun.x; //1150
    var y = minigun.y;
    var ghost = 1;
	var rng = Phaser.Math.Between(-100, 100);
	super(scene, x, y, "bullet");
    scene.add.existing(this);
    this.depth = -90;
	//type characteristics below
	scene.physics.world.enableBody(this);
	this.body.allowGravity = false;
	//this.setDisplaySize(64, 64)
    //determine direction
   	direction = Math.atan( (reticle.x-this.x) / (reticle.y-this.y));
	// Calculate X and y velocity of bullet to moves it from shooter to target
        if (reticle.y >= this.y)
        {
            xSpeed = speed * Math.sin(direction);
            ySpeed = speed * Math.cos(direction);
        }
        else
        {
            
            xSpeed = -speed * Math.sin(direction);
            ySpeed = -speed * Math.cos(direction);
        };
	//this.setScale(0.5, 0.5)
	
    this.rotation = Phaser.Math.Angle.Between(this.x, this.y, reticle.x, reticle.y);
    
	this.setOrigin(1, 0.5);	
	this.body.setSize(10, 3).refreshBody;

	this.setDisplaySize(100, 200);
    //this.body.velocity.y = 0;
    //this.body.velocity.x = 100;
	//this.body.setSize(8, 8);
	//this.body.setOffset(40, 60);
	//this.angle = -90
	
    //this.body.setCollideWorldBounds(true);
    // 4.2 add the beam to the projectiles group

    this.body.velocity.x = xSpeed*2500;
    this.body.velocity.y = ySpeed*2500 + rng;
    scene.bullets.add(this);
    
  }

update(){
  }

}
