class Bullet extends Phaser.GameObjects.Sprite {
    constructor(scene) {
        var x = player.x;
        var y = player.y;
        var yrng = Phaser.Math.Between(-10, 10);
        var xrng = Phaser.Math.Between(-20, 20);
        super(scene, x, y, "bullet");
        scene.add.existing(this);
        //type characteristics below
        scene.physics.world.enableBody(this);
        this.body.allowGravity = false;
        this.setOrigin(0.5, 0.5);
        this.body.setSize(8, 8);


        if (crouching == true) {

            this.y += 36;
        }
        else {
            this.y += 24;

        }

        if (player.flipX == true) {
            this.flipX = true;
            this.x += 10;
            this.body.velocity.x = -600;
        }
        else {
            this.flipX = false;
            this.x += 80;
            this.body.velocity.x = 600;
        }

        this.play("bulletAnim");
        this.body.velocity.y = yrng;
    }


}
