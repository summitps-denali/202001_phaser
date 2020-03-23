/*global Phaser storyState*/

//create global varibles
var keys = {
    mouseX: 0,
    mouseY: 0,
    mouseDown: false,
    o: false,
    right: false,
    left: false,
    up: false,
    down: false
};
var orbitPlanet = "Cubulus";
var playerX = "set";
var playerY = "set";
var locations = [[368,542],[674,20],[60,252],[705,500],[232,32],[61, 72],[348,197],[734,298],[497,102],[200,200]].sort(function(){return Math.random()-0.5});
var planetDiscStates = {};

//setup mouse tracker
window.addEventListener("mousemove",function(event){
    keys.mouseX = event.clientX;
    keys.mouseY = event.clientY;
},false);
window.addEventListener("mousedown",function(){keys.mouseDown = true;},false);
window.addEventListener("mouseup",function(){keys.mouseDown = false;},false);
//setup key trackers
window.addEventListener("keydown",function(event){
    if(event.key=="o"){keys.o=true;}
    if(event.key=="ArrowLeft"){keys.left=true;}
    if(event.key=="ArrowRight"){keys.right=true;}
    if(event.key=="ArrowUp"){keys.up=true;}
    if(event.key=="ArrowDown"){keys.down=true;}
},false);
window.addEventListener("keyup",function(event){
    if(event.key=="o"){keys.o=false;}
    if(event.key=="ArrowLeft"){keys.left=false;}
    if(event.key=="ArrowRight"){keys.right=false;}
    if(event.key=="ArrowUp"){keys.up=false;}
    if(event.key=="ArrowDown"){keys.down=false;}
},false);

//create game
var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
var game_state = {};

//create state
game_state.spaceMap = function() {};
game_state.spaceMap.prototype = {
    preload: function() {
        //planets
        game.load.spritesheet("planets","assets/planets.png",32,32);
        
        //player
        game.load.image("player","assets/ship.png");
        
        //arrow
        game.load.spritesheet("arrow","assets/arrow.png",32,32);
    },
    create: function() {
        //start physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        //create background
        //this.background = game.add.sprite(0,0,"background");
        
        //planet class
        class Planet {
            constructor(x,y,frame,discStat,name) {
                //set properties
                this.x = x;
                this.y = y;
                this.frame = frame;
                this.name = name;
                //set discovery status
                if(planetDiscStates[name]==undefined){
                    this.discStat = discStat;
                }
                else{
                    this.discStat = planetDiscStates[name];
                }
                
                //create sprite
                this.sprite = game.add.sprite(this.x,this.y,"planets");
                //create text
                this.nameText = game.add.text(-1000,0,this.name,{fontSize: "16px", fill: "#ffffff"});
            }
            update(x,y) {
                this.dist = Math.sqrt(Math.pow(this.x-x,2)+Math.pow(this.y-y,2));
                //show name if near player
                if(this.dist<50){
                    this.nameText.x = this.x-50;
                    this.nameText.y = this.y+25;
                }
                else{
                    this.nameText.x = -1000;
                }
                //discovery
                if(this.dist<150&&this.discStat=="unknown"){
                    this.discStat = "known";
                }
                if(this.dist<75){
                    this.discStat = "found";
                }
                //change sprites to match discovery status
                if(this.discStat=="unknown"){
                    //hide sprite
                    this.sprite.frame = 0;
                    //hide name
                    this.nameText.x = -1000;
                }
                if(this.discStat=="known"){
                    //show outline
                    this.sprite.frame = 1;
                    //hide name
                    this.nameText.x = -1000;
                }
                if(this.discStat=="found"){
                    //show sprite
                    this.sprite.frame = this.frame+1;
                }
                //set teleport if near
                if(this.dist<25){
                    orbitPlanet = this.name;
                }
                //update global state
                planetDiscStates[this.name] = this.discStat;
            }
        }
        //create planets
        this.planets = {
            scorchedTerra: new Planet(game.world.width/2.1,game.world.height/2.1,6,"unknown","Scorched Terra"),
            cubulus: new Planet(game.world.width/1.4,game.world.height/1.4,1,"found","Cubulus"),
            circulus: new Planet(98,554,2,"unknown","Circulus"),
            sb1: new Planet(150,400,14,"unknown","Starbase 1"),
            tsb: new Planet(600,250,16,"known","Tribase 175"),
            threePlanetSpace: new Planet(locations[9][0],locations[9][1],17,"unknown","Three Planet Space"),
            triangulus: new Planet(game.world.width/1.3,game.world.height/4.1,3,"unknown","Triangulus"),
            grethik: new Planet(locations[0][0],locations[0][1],4,"known","Grethik"),
            arbitrar: new Planet(locations[1][0],locations[1][1],5,"unknown","Arbitrar"),
            culculef: new Planet(locations[2][0],locations[2][1],7,"unknown","Culculef"),
            arkdome: new Planet(locations[3][0],locations[3][1],8,"unknown","Arkdome"),
            glissentov: new Planet(locations[4][0],locations[4][1],9,"unknown","Glissentof"),
            biltenlore: new Planet(locations[5][0],locations[5][1],10,"unknown","Biltenlore"),
            dolnos: new Planet(locations[6][0],locations[6][1],11,"unknown","Dolnos"),
            eyelkit: new Planet(locations[7][0],locations[7][1],12,"unknown","Eyelkit"),
            selicif: new Planet(locations[8][0],locations[8][1],13,"unknown","Selicif"),
        };
        
        //orbit text
        this.orbitText = game.add.text(-1000,10,orbitPlanet,{fontSize: "32px", fill: "#ffffff"});
        
        //clear orbit key
        keys.o = false;
        
        //create player
        if(playerX=="set"){
            playerX = game.world.width/1.4;
            playerY = game.world.height/1.4;
        }
        this.player = game.add.sprite(playerX,playerY,"player");
        //enable player physics
        game.physics.arcade.enable(this.player);
        //player physics properties
        this.player.body.bounce.y = 0;
        this.player.body.gravity.y = 0;
        this.player.body.collideWorldBounds = true;
        
        //ship rotation canceling
        this.rotCanX = [[-10,0,14],[-8,0,25],[5,19,27]];
        this.rotCanY = [[10,0,-2],[25,0,5],[35,30,18]];
        this.playerXYD = [0,0];
        
        //arrow
        this.arrow = game.add.sprite(-1000,0,"arrow");
        this.arrow.animations.add("normal",[0,1,2,3,4,5,6,7,8,9,10,11,12],24,true);
        this.arrow.animations.play("normal");
    },
    update: function() {
        this.playerXD = 0;
        this.playerYD = 0;
        //move player
        if(keys.left){
            this.player.x -= 2.5;
            this.playerXD -= 1;
        }
        if(keys.right){
            this.player.x += 2.5;
            this.playerXD += 1;
        }
        if(keys.up){
            this.player.y -= 2.5;
            this.playerYD -= 1;
        }
        if(keys.down){
            this.player.y += 2.5;
            this.playerYD += 1;
        }
        //rotation
        if(this.playerXYD[0] != this.playerXD || this.playerXYD[0] != this.playerYD){
            //remove old ofset
            this.player.x -= this.rotCanX[this.playerXYD[1]+1][this.playerXYD[0]+1];
            this.player.y -= this.rotCanY[this.playerXYD[1]+1][this.playerXYD[0]+1];
            //add new ofset
            this.player.x += this.rotCanX[this.playerYD+1][this.playerXD+1];
            this.player.y += this.rotCanY[this.playerYD+1][this.playerXD+1];
        }
        this.player.angle = [[315,0,45],[270,0,90],[225,180,135]][this.playerYD+1][this.playerXD+1];
        this.playerXYD = [this.playerXD,this.playerYD];
        
        //update planets
        orbitPlanet = "none";
        this.planets.scorchedTerra.update(this.player.x,this.player.y);
        this.planets.cubulus.update(this.player.x,this.player.y);
        this.planets.circulus.update(this.player.x,this.player.y);
        this.planets.triangulus.update(this.player.x,this.player.y);
        this.planets.grethik.update(this.player.x,this.player.y);
        this.planets.arbitrar.update(this.player.x,this.player.y);
        this.planets.culculef.update(this.player.x,this.player.y);
        this.planets.arkdome.update(this.player.x,this.player.y);
        this.planets.glissentov.update(this.player.x,this.player.y);
        this.planets.biltenlore.update(this.player.x,this.player.y);
        this.planets.dolnos.update(this.player.x,this.player.y);
        this.planets.eyelkit.update(this.player.x,this.player.y);
        this.planets.selicif.update(this.player.x,this.player.y);
        this.planets.sb1.update(this.player.x,this.player.y);
        if(storyState["told command"]){
            this.planets.tsb.update(this.player.x,this.player.y);
        }
        this.planets.threePlanetSpace.update(this.player.x,this.player.y);
        
        //update arrow
        this.arrow.x = [game.world.width/2.1,game.world.width/1.4,98,150,600,locations[9][0],game.world.width/1.3,locations[0][0],locations[1][0],locations[2][0],locations[3][0],locations[4][0],locations[5][0],locations[6][0],locations[7][0],locations[8][0],-1000][["Scorched Terra","Cubulus","Circulus","Starbase 1","Tribase 175","Three Planet Space","Triangulus","Grethik","Arbitrar","Culculef","Arkdome","Glissentof","Biltenlore","Dolnos","Eyelkit","Selicif","none"].indexOf(storyState.arrowLoc)];
        this.arrow.y = [game.world.height/2.1,game.world.height/1.4,554,400,250,locations[9][1],game.world.height/4.1,locations[0][1],locations[1][1],locations[2][1],locations[3][1],locations[4][1],locations[5][1],locations[6][1],locations[7][1],locations[8][1],0][["Scorched Terra","Cubulus","Circulus","Starbase 1","Tribase 175","Three Planet Space","Triangulus","Grethik","Arbitrar","Culculef","Arkdome","Glissentof","Biltenlore","Dolnos","Eyelkit","Selicif","none"].indexOf(storyState.arrowLoc)];
        
        //orbit
        if(orbitPlanet!="none"){
            //set text
            this.orbitText.text = "Press O to enter orbit around "+orbitPlanet;
            this.orbitText.x = 150;
            //change gamestate when orbit entered
            if(keys.o){
                playerX = this.player.x;
                playerY = this.player.y;
                game.state.start("SpaceOrbit");
            }
        }
        else{
            this.orbitText.x = -1000;
        }
    },
};

//add state
game.state.add('SpaceMap', game_state.spaceMap);
