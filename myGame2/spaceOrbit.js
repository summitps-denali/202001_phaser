/*global Phaser game game_state keys orbitPlanet*/

//create global variables
var teleDest = "Intro";
var orbitCoor = {do: true};

//create state
game_state.spaceOrbit = function() {};
game_state.spaceOrbit.prototype = {
    preload: function() {
        //planets
        game.load.spritesheet("planets","assets/planetsX15.png",480,480);
        
        //player
        game.load.image("player","assets/ship.png");
        
        //teleport location marker
        game.load.spritesheet("tpLocation","assets/teleportMarker.png",96,96);
    },
    create: function() {
        //start physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        //setup position memory
        if(orbitCoor.do){
            orbitCoor = {
                Cubulus: [375,400],
                Circulus: [game.world.width/2,game.world.height/2],
                Triangulus: [game.world.width/2,game.world.height/2],
                Grethik: [game.world.width/2,game.world.height/2],
                Arbitrar: [game.world.width/2,game.world.height/2],
                "Scorched Terra": [game.world.width/2,game.world.height/2],
                Culculef: [game.world.width/2,game.world.height/2],
                Arkdome: [game.world.width/2,game.world.height/2],
                Glissentof: [game.world.width/2,game.world.height/2],
                Biltenlore: [game.world.width/2,game.world.height/2],
                Dolnos: [game.world.width/2,game.world.height/2],
                Eyelkit: [game.world.width/2,game.world.height/2],
                Selicif: [game.world.width/2,game.world.height/2],
                "Starbase 1": [game.world.width/2,game.world.height/2],
                "Tribase 175": [game.world.width/2,game.world.height/2],
                "Three Planet Space": [game.world.width/2,game.world.height/2],
            };
        }
        
        //planet sprite
        this.planet = game.add.sprite(150,50,"planets");
        this.planet.frame = ["Cubulus","Circulus","Triangulus","Grethik","Arbitrar","Scorched Terra","Culculef","Arkdome","Glissentof","Biltenlore","Dolnos","Eyelkit","Selicif","Starbase 1","SPACER","Tribase 175","Three Planet Space"].indexOf(orbitPlanet)+2;
        
        //teleport location class
        class TPlocation {
            constructor([x,y,name]){
                //set properties
                this.x = x;
                this.y = y;
                this.name = name;
                //sprite
                this.sprite = game.add.sprite(this.x,this.y,"tpLocation");
                this.sprite.animations.add("blink",[0,1,2,3,4,5,6,7,8,9],14,true);
                this.sprite.animations.play("blink");
                this.sprite.scale.setTo(0.5,0.5);
            }
            update(x,y){
                //find dist
                this.dist = Math.sqrt(Math.pow(this.x-x,2)+Math.pow(this.y-y,2));
                
                //set teleport dest
                if(this.dist<25){
                    teleDest = this.name;
                }
            }
        }
        
        //setup teleport locations
        this.locations = {
            Cubulus: [[375,400,"Cube Fleet HQ"]],
            Circulus: [],
            Triangulus: [],
            Grethik: [[575,200,"???"]],
            Arbitrar: [],
            "Scorched Terra": [],
            Culculef: [],
            Arkdome: [],
            Glissentof: [],
            Biltenlore: [],
            Dolnos: [],
            Eyelkit: [],
            Selicif: [],
            "Starbase 1": [],
            "Tribase 175": [[200,200,"wreckage"]],
            "Three Planet Space": [],
        }[orbitPlanet];
        for(var i=0;i<this.locations.length;i++){
            this.locations[i] = new TPlocation(this.locations[i]);
        }
        
        //create player
        this.player = game.add.sprite(orbitCoor[orbitPlanet][0],orbitCoor[orbitPlanet][1],"player");
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
        
        //teleport text
        this.teleText = game.add.text(-1000,10,teleDest,{fontSize: "32px", fill: "#ffffff"});
        
        //leave text
        this.leaveText = game.add.text(-1000,10,"Press O to leave orbit",{fontSize: "32px", fill: "#ffffff"});
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
        
        //update locations
        teleDest = "none";
        for(var i=0;i<this.locations.length;i++){
            this.locations[i].update(this.player.x,this.player.y);
        }
        
        //check for leaving
        if(this.player.x<50||this.player.x>game.world.width-50||this.player.y<50||this.player.y>game.world.height-50){
            this.leaveText.x = 200;
            if(keys.o){
                orbitCoor[orbitPlanet] = [game.world.width/2,game.world.height/2];
                game.state.start("SpaceMap");
            }
        }
        else{
            this.leaveText.x = -1000;
        }
        
        //teleport text
        if(teleDest!="none"){
            this.teleText.text = "Press O to teleport to "+teleDest;
            this.teleText.x = 200;
            if(keys.o){
                orbitCoor[orbitPlanet] = [this.player.x,this.player.y];
                game.state.start("SpaceLand");
            }
        }
        else{
            this.teleText.x = -1000;
        }
    },
};

//add state
game.state.add('SpaceOrbit', game_state.spaceOrbit);
