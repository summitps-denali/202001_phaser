/*global Phaser game game_state*/

game_state.story = function() {};
game_state.story.prototype = {

    preload: function() {
        //load images
        game.load.image("introBack", "assets/intro.png");
    },

    create: function() {
        //setup background
        this.backgroundIntro = game.add.sprite(0, -100, "introBack");
        this.backgroundIntro.scale.setTo(1.6, 1.6);
        
        //setup text
        this.storyText = ["Controls: < and > to move^ to jump, V for tea.    Space to use sword. >", "Hold  >  to  make  text  scroll faster, and good  luck >", "For years uncounted, this beast has plauged us ->", "It has stolen  our food, our wealth,  and   our   happiness ->", "Go, seek out this monster and reclaim what it has taken ->", "STARTGAME"];
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
game.state.add('story', game_state.story);
game.state.start('story');
