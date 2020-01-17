class enemyBullet extends Phaser.GameObjects.Sprite {
    constructor(scene) {
        var xrng = Phaser.Math.Between(-20, 20);
        super(scene, 300, 300, "bullet");
        scene.add.existing(this);
        //type characteristics below
        scene.physics.world.enableBody(this);
        this.body.allowGravity = false;
        this.setOrigin(0.5, 0.5);
        this.body.setSize(8, 8);


        //this.play("bulletAnim");
        this.body.velocity.y = yrng;
    }


}
