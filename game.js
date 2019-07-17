var config = {
	type: Phaser.AUTO,
    width: 1900,
    height: 900,
    pixelArt: true,
	scene: [scene1, scene2],
	physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            //debug: true,
			//debugShowBody: true,
            //debugShowStaticBody: true,
            //debugShowVelocity: true,
        }
    },
}
var player;
var platforms;
var cursors;
var spacebar;
var Rkey;
var Zkey;
var score = 0;
var gameOver = false;
var scoreText;
var projectiles;
var beam;
var reticle;
var myCam;
var loadedMissiles = 6;
var loadedBullets = 50;
var firingMissiles = false;
var firingBullets = false;
var ammoCountUI;
var bulletCountUI;
var repairUI;
var coolantUI;
var swordUI;
var camDummy;
var pointerPosX = 950;
var mechHead = {
	health: 100,
	active: true
};
var mechTorso;
var mechLeftArm;
var mechRightArm;
var mechPelvis;
var mechLeftLeg;
var mechRightLeg;
var game = new Phaser.Game(config);
