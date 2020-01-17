var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    pixelArt: true,
    scene: [preload, title, mainGame],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false,
            //debugShowBody: true,
            //debugShowStaticBody: true,
            //debugShowVelocity: true,
        }
    },
}

var platforms;
var bulletTimer = 0;
var bulletTimerEvent;
var player;
var cursors;
var stars;
var score = 0;
var scoreText;
var spacebar;
var crouching = false;
var cam;
var bulletSound;
var cloudTimer = 0;
var enemies;
var mechRightLeg;

var game = new Phaser.Game(config);
