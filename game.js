var config = {
	type: Phaser.AUTO,
    width: 1500,
    height: 650,
    pixelArt: true,
	scene: [preload, scene15, scene2],
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
var enemyMechHitbox; //rcannon
var enemyMechHitbox2; //rshoulder
var reloadProgress = 0;
var reloadProgress2 = 0;
var enemyMechHitbox3; //body
var enemyMechHitbox4; //lcannon
var playerMechParts;
var missileLauncher;
var missileLauncher2;
var mechPartBoxes1;
var mechPartBoxes2;
var mechPartBoxes3;
var mechPartBoxes4;
var mechPartBoxes5;
var mechPartBoxes6;
var boxes;
var hpUI;
var hp;
var hpUI2;
var hp2;
var hpUI3;
var hp3;
var hpUI4;
var hp4;
var hpUI5;
var hp5;
var hpUI6;
var hp6;

var enemyMechHPUI;
var enemyMechHP;

var enemyMechHPUI2;
var enemyMechHP2;

var enemyMechHPUI3;
var enemyMechHP3;


var enemyMechHPUI4;
var enemyMechHP4;

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
var Ekey;
var Pkey;
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
var loadedMissiles = 4; //lmissiles
var loadedMissiles2 = 4; //rmissiles
var loadedBullets = 50;
var firingMissiles = false;
var firingMissiles2 = false;
var firingBullets = false;
var ammoCountUI;
var ammoCountUI2;
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
