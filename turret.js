class Turret extends Phaser.GameObjects.Sprite {
    constructor(scene) {
        var x = player.x + 800;
        var y = player.y;
        super(scene, x, y, "turret");
        scene.add.existing(this);
        //type characteristics below
        scene.physics.world.enableBody(this);
        this.body.allowGravity = false;
        this.setOrigin(0.5, 0.5);
        // this.body.setSize(8, 8);
        this.setInteractive();
        this.on('pointerdown', this.shoot, this);
        scene.enemies.add(this);
        //var bulletTimerEvent = this.time.addEvent({ delay: 100, callback: this.shoot, callbackScope: this, repeat: -1 });

        scene.physics.add.sprite(300, 300, 'turret bullet');
    }

    update() {

        // var bullet = new enemyBullet(this, this.x, this.y);
    }

    shoot() {
        this.setAlpha(0);

        // var bullet = new enemyBullet(this, this.x, this.y);
    }


}
