class Turret extends Phaser.GameObjects.Sprite {
    constructor(scene) {
        var x = player.x;
        var y = player.y;
        super(scene, x, y, "turret");
        scene.add.existing(this);
        //type characteristics below
        scene.physics.world.enableBody(this);
        this.body.allowGravity = false;
        this.setOrigin(0.5, 0.5);
        // this.body.setSize(8, 8);

        scene.enemies.add(this);

    }

    update() {

    }


}
