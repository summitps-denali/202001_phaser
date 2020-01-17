class title extends Phaser.Scene {
    constructor() {
        super({ key: 'title' });
    }
    create() {
        // background = this.add.sprite(0, 0, 'Background');
        // background.setOrigin(0, 0);

        var titleButton = this.add.text(275, 200, "Sigma Corps", { font: "50px Arial", fill: "blue" });

        var text = this.add.text(350, 275, '---> Start!');
        text.setInteractive({ useHandCursor: true });

        text.on('pointerdown', () => this.clickButton());

    }
    clickButton() {
        this.scene.switch('mainGame');
    }
}
