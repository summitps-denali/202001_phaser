class preload extends Phaser.Scene {

    constructor() {
        super("preload");
    }
    preload() {
        this.load.image('Background', 'assets/Background.png');
        this.load.image('Clouds', 'assets/Background Clouds.png');
        this.load.image('Color', 'assets/Background color.png');
        this.load.image('Moon', 'assets/Background Moon.png');
        this.load.image('ground', 'assets/ground.png');
        this.load.image('star', 'assets/star.png');
        this.load.spritesheet('bullet', 'assets/bullet.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('turret', 'assets/turret.png', { frameWidth: 37, frameHeight: 28 });
        this.load.image('turret bullet', 'assets/turret bullet.png');
        this.load.audio('oneShot', 'assets/oneShot.wav');
        this.load.spritesheet('Sigma Corps Marine',
            'assets/Sigma Corps Marine.png', { frameWidth: 48, frameHeight: 32 }
        );

    }
    create() {
        this.add.text(20, 20, "Loading game", { font: "25px Arial", fill: "white" });
        this.scene.start("title");
    }
}
