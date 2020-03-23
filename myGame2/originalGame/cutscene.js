/*global Phaser game game_state*/

game_state.cutscene = function() {};
game_state.cutscene.prototype = {

    preload: function() {
        //load images
        game.load.image("introBack", "assets/intro.png");
        game.load.image("BB", "assets/backgroundB.png");
        game.load.image("BF", "assets/backgroundF.png");
        game.load.image("lava", "assets/lava.png");
        game.load.image("platform", "assets/platform.png");
        game.load.image("knight", "assets/knightStand.png");
    },

    create: function() {
        //setup backgrounds
        this.backgroundB = game.add.sprite(0, 0, "BB");
        this.backgroundB.scale.setTo(6.3, 5);
        this.backgroundF = game.add.sprite(0, 0, "BF");
        this.backgroundF.scale.setTo(6.3, 5);
        this.lava = game.add.sprite(0, game.world.height - 64, "lava");
        this.lava.scale.setTo(7, 3);
        this.platforM = game.add.sprite(250, 400, "platform");
        this.knight = game.add.sprite(400, 145, "knight");
        this.backgroundIntro = game.add.sprite(0, -100, "introBack");
        this.backgroundIntro.scale.setTo(1.6, 1.6);
        
        //setup text
        this.storyText = [["HOW DARE YOU CHALLENGE ME ->", 1, "#f50"], ["Surrender and leave this land or I will be forced to fight you ->", 2, "#fff"], ["I SHALL NEVER SURRENDER  TO YOU! I WILL CRUSH YOU LIKE THE \"WORM\" YOU ARE->", 1, "#f50"], ["STARTGAME", 1, "#f50"]];
        this.shownText = "";
        this.textNum = 0;
        this.text1 = game.add.text(200, 100, "", {fontSize: "32px", fill: "#fff"});
        this.text2 = game.add.text(200, 200, "", {fontSize: "32px", fill: "#fff"});
        this.text3 = game.add.text(200, 300, "", {fontSize: "32px", fill: "#fff"});
        this.textAddTimer = 0;
        
        //add inputs
        this.cursors = game.input.keyboard.createCursorKeys();
    },

    update: function() {
        //change text
        if(this.textAddTimer > 5 || (this.textAddTimer > 1 && this.cursors.right.isDown)) {
            this.textAddTimer = 0;
            if(this.shownText.length < this.storyText[this.textNum][0].length){
                this.shownText += this.storyText[this.textNum][0][this.shownText.length];
            }
            else if(this.cursors.right.isDown){
                this.shownText = "";
                this.textNum += 1;
            }
        }
        else {
            this.textAddTimer += 1;
        }
        
        //change background
        if (this.storyText[this.textNum][1] == 1) {
            this.backgroundIntro.x = 0;
        }
        else if (this.storyText[this.textNum][1] == 2) {
            this.backgroundIntro.x = 1000;
        }
        
        //set text color
        this.text1.text = "";
        this.text2.text = "";
        this.text3.text = "";
        this.text1 = game.add.text(200, 100, "", {fontSize: "32px", fill: this.storyText[this.textNum][2]});
        this.text2 = game.add.text(200, 200, "", {fontSize: "32px", fill: this.storyText[this.textNum][2]});
        this.text3 = game.add.text(200, 300, "", {fontSize: "32px", fill: this.storyText[this.textNum][2]});
        
        //start game on "STARTGAME"
        if (this.storyText[this.textNum][0] == "STARTGAME"){
            game.state.start("boss");
        }
        
        //update text and handle lines
        for(var i=0;i<this.shownText.length;i++){
            if(i<25) {
                this.text1.text += this.shownText[i];
            }
            else if(i<50) {
                this.text2.text += this.shownText[i];
            }
            else if(i<75) {
                this.text3.text += this.shownText[i];
            }
        }
    },
};
game.state.add('cutscene', game_state.cutscene);
