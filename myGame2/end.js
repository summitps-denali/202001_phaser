/*global Phaser game game_state*/

game_state.end = function() {};
game_state.end.prototype = {

    preload: function() {
        //load images
        game.load.image("endingBack", "assets/endback.png");
    },

    create: function() {
        //setup background
        this.backgroundIntro = game.add.sprite(0, -100, "endingBack");
        this.backgroundIntro.scale.setTo(3.2, 3.2);
        
        //setup text
        this.storyText = [
            "Thank you, greatest hero ->", 
            "Your name shall be known here forever more ->", 
            "Credits: Game design  -  Andrew C | Art - Andrew C | Coding - Andrew C ->", 
            "Made with - Phaser.io |  Hosted on - AWS ->", 
            "Thanks to - Joshua D, for constant support ->", 
            "/-----------------------\\|      THE END      |    \\-----------------------/", "END"];
        this.shownText = "";
        this.textNum = 0;
        this.text1 = game.add.text(200, 100, "", {fontSize: "32px", fill: "#000"});
        this.text2 = game.add.text(200, 200, "", {fontSize: "32px", fill: "#000"});
        this.text3 = game.add.text(200, 300, "", {fontSize: "32px", fill: "#000"});
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
            else if(this.cursors.right.isDown && this.storyText[this.textNum + 1] != "END"){
                this.shownText = "";
                this.textNum += 1;
            }
        }
        else {
            this.textAddTimer += 1;
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
game.state.add('end', game_state.end);