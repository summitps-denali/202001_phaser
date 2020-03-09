class Fireball extends Phaser.GameObjects.Sprite{
  constructor(scene){
// 	var speed = 1;
// 	var direction = 0;
var xSpeed = 1;
	//var ySpeed = 1;
    var x = 1900;
    var y = 400;
	var rng = Phaser.Math.Between(-100, 100);
	
	super(scene, x, y, "fireball");
    scene.add.existing(this);
	//type characteristics below
	scene.physics.world.enableBody(this);
	this.body.allowGravity = false;
	//this.body.setGravit
	//this.setDisplaySize(64, 64)
    //determine direction
//   	direction = Math.atan( (reticle.x-this.x) / (reticle.y-this.y));
// 	// Calculate X and y velocity of bullet to moves it from shooter to target
//         if (reticle.y >= this.y)
//         {
//             xSpeed = speed * Math.sin(direction);
//             ySpeed = speed * Math.cos(direction);
//         }
//         else
//         {
            
//             xSpeed = -speed * Math.sin(direction);
//             ySpeed = -speed * Math.cos(direction);
//         };

// 		if (reticle.x >= this.x) {
// 		//	this.body.angularVelocity = 30;
// 		//this.body.setAngularDrag = 120;
// 		///this.body.setGravityY(1);
// 	}
// 		else {
// 		//this.body.angularVelocity = -30;
// 		//this.body.setAngularDrag = -120;
// 		//this.body.setGravityY(1);
// 	}
	//this.setScale(0.5, 0.5)
	
	this.setOrigin(0.5, 0.5);
    //this.play("fireAnim");
    //this.body.velocity.y = 0;
    //this.body.velocity.x = 100;
	this.body.setSize(8, 8);
	//this.body.setOffset(40, 60);
	
    //this.rotation = Phaser.Math.Angle.Between(this.x, this.y, reticle.x, reticle.y);
    //this.body.setCollideWorldBounds(true);
    // 4.2 add the beam to the projectiles group

    this.body.velocity.x = xSpeed*-800;
    this.body.velocity.y = rng; // ySpeed*800 +
    scene.enemyMissiles.add(this);
  }

update(){

  }
}
