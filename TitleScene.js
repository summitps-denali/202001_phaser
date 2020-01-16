class TitleScene extends Phaser.Scene {
    constructor() {
        super({ key: 'TitleScene' });
    }
    preload() {
        this.load.image('Background', 'assets/Background.png');
    }
    create() {
        let background = this.add.sprite(0, 0, 'Background');
        background.setOrigin(0, 0);
    }
}
export default TitleScene;
