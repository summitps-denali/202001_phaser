var config = {
	type: Phaser.AUTO,
    width: 1500,
    height: 650,
    pixelArt: true,
	scene: [scene1, scene2],
	physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 600 },
            debug: true,
			//debugShowBody: true,
            //debugShowStaticBody: true,
            //debugShowVelocity: true,
        }
    },
}
var minigun;
var player;
var player2;
var enemyMechHitbox;
var playerMechParts;
var mechPartBoxes1;
var mechPartBoxes2;
var mechPartBoxes3;
var mechPartBoxes4;
var mechPartBoxes5;
var mechPartBoxes6;
var playerMech0;
var playerMech1;
var playerMech2;
var playerMech3;
var playerMech4;
var playerMech5;
var playerMech6;
var playerMech7;
var platforms;
var cursors;
var spacebar;
var Rkey;
var Zkey;
var Wkey;
var Akey;
var Skey;
var Dkey;
var score = 0;
var bulletSound;
var gameOver = false;
var scoreText;
var projectiles;
var beam;
var reticle;
var cam1;
var enemyMech;
var cam3;
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
