class scene15 extends Phaser.Scene{
	
	constructor() {
		super("titleScreen");
	}
	create() {
       // var titleButton = this.add.text(20, 20, "TITLE game", { font: "25px Arial", fill: "white" });

		var title = this.add.image(750, 325, 'TITLE');
		title.setScale(9, 9 )
        var text = this.add.text(750, 500, 'click to start');
        text.setOrigin(0.5, 0.5);
        title.setInteractive({ useHandCursor: true });

        text.setInteractive({ useHandCursor: true });
        title.on('pointerdown', () => this.startGame());
        text.on('pointerdown', () => this.startGame());
	}
    startGame() {
        this.scene.switch('playGame');
    }
}

