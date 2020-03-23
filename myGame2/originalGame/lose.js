/*global Phaser game game_state*/

game_state.lose = function() {};
game_state.lose.prototype = {

    preload: function() {
        //load images
        game.load.image("loseBack", "assets/intro.png");
    },

    create: function() {
        //setup background
        this.backgroundIntro = game.add.sprite(0, -100, "loseBack");
        this.backgroundIntro.scale.setTo(1.6, 1.6);
        
        //setup text
        this.storyText = [
            "Alas, our great hero has been vanquished ->", "Quick, search the kingdom for one more worthy ->", "STARTGAME"];
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
            if(this.shownText.length < this.storyText[this.textNum].length){
                this.shownText += this.storyText[this.textNum][this.shownText.length];
            }
            else if(this.cursors.right.isDown){
                this.shownText = "";
                this.textNum += 1;
            }
        }
        else {
            this.textAddTimer += 1;
        }
        
        //start game on "STARTGAME"
        if (this.storyText[this.textNum] == "STARTGAME"){
            game.state.start("main");
        }
        
        //update text and handle lines
        this.text1.text = "";
        this.text2.text = "";
        this.text3.text = "";
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
game.state.add('lose', game_state.lose);