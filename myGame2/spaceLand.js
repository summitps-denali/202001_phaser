/*global game game_state keys teleDest*/

//create global variable
var storyState = {arrowLoc:"Grethik"};

//create state
game_state.spaceLand = function() {};
game_state.spaceLand.prototype = {
    preload: function() {
        //text backgrounds
        game.load.image("blue bar!","assets/textBG.png");
        game.load.image("blue bar 2","assets/bar2.png");
        //backgrounds
        game.load.image("cubeFleetHQ","assets/cubeFleetHQ.png");
        game.load.image("grimsmore","assets/theLostGrimsmore.png");
        game.load.image("bridge","assets/bridge.png");
        game.load.image("black","assets/blackness.png");
        //sprites
        game.load.spritesheet("admiral","assets/admiral.png",32,32);
        game.load.spritesheet("grethican","assets/grethican.png",32,32);
        game.load.spritesheet("crew","assets/crew.png",480,480);
        game.load.spritesheet("teleport","assets/teleport.png",480,480);
        game.load.spritesheet("battle","assets/battle.png",1440,1440);
        game.load.spritesheet("endings","assets/endings.png",200,200);
        game.load.spritesheet("logo","assets/introLogo.png",300,300);
        game.load.spritesheet("name","assets/introName.png",100,100);
    },
    create: function() {
        //sprites
        this.sprites = {
            //backgrounds
            CFHQ: game.add.sprite(-1000,0,"cubeFleetHQ"),
            Grimsmore: game.add.sprite(-1000,0,"grimsmore"),
            Bridge: game.add.sprite(-1000,0,"bridge"),
            black: game.add.sprite(-1000,0,"black"),
            //sprites
            admiral: game.add.sprite(-700,200,"admiral"),
            admiral1: game.add.sprite(-700,500,"admiral"),
            grethican: game.add.sprite(-800,450,"grethican"),
            crew: game.add.sprite(-800,200,"crew"),
            teleport: game.add.sprite(-1000,0,"teleport"),
            battle: game.add.sprite(-900,0,"battle"),
            endings: game.add.sprite(-1000,100,"endings"),
            grethican1: game.add.sprite(-700,200,"grethican"),
            logo: game.add.sprite(-725,95,"logo"),
            name: game.add.sprite(-700,150,"name"),
        };
        
        //resizing
        this.sprites.CFHQ.scale.setTo(1.481,1.481);
        this.sprites.Bridge.scale.setTo(1.7,1.5);
        this.sprites.Grimsmore.scale.setTo(2.3,2.3);
        this.sprites.grethican.scale.setTo(4,4);
        this.sprites.crew.scale.setTo(0.5,0.5);
        this.sprites.teleport.scale.setTo(1.7,1.3);
        this.sprites.admiral.scale.setTo(2.5,2.5);
        this.sprites.admiral1.scale.setTo(2.5,2.5);
        this.sprites.battle.scale.setTo(0.4,0.4);
        this.sprites.endings.scale.setTo(4,4);
        this.sprites.grethican1.scale.setTo(4,4);
        this.sprites.logo.scale.setTo(0.9,0.9);
        this.sprites.name.scale.setTo(2.5,2.5);
        //admiral
        this.sprites.admiral.animations.add("normal",[0,1],2,true);
        this.sprites.admiral.animations.add("unhappy",[2,3],2,true);
        this.sprites.admiral.animations.add("squinting",[4,5],2,true);
        this.sprites.admiral.animations.add("questioning",[6,7],2,true);
        this.sprites.admiral.animations.add("worried",[8,9],2,true);
        this.sprites.admiral.animations.add("angry",[10,11],2,true);
        this.sprites.admiral.animations.add("suprised",[12,13],2,true);
        //admiral1
        this.sprites.admiral1.animations.add("normal",[0,1],2,true);
        this.sprites.admiral1.animations.add("unhappy",[2,3],2,true);
        this.sprites.admiral1.animations.add("squinting",[4,5],2,true);
        this.sprites.admiral1.animations.add("questioning",[6,7],2,true);
        this.sprites.admiral1.animations.add("worried",[8,9],2,true);
        this.sprites.admiral1.animations.add("angry",[10,11],2,true);
        this.sprites.admiral1.animations.add("suprised",[12,13],2,true);
        //grethican
        this.sprites.grethican.animations.add("normal",[0],0,true);
        //crew
        this.sprites.crew.animations.add("com",[0,1],2,true);
        this.sprites.crew.animations.add("sci",[8,9],2,true);
        this.sprites.crew.animations.add("tac",[2,3],2,true);
        this.sprites.crew.animations.add("med",[6,7],2,true);
        this.sprites.crew.animations.add("eng",[10,11],2,true);
        //teleport
        this.sprites.teleport.animations.add("out",[0,1,2,3],2,false);
        this.sprites.teleport.animations.add("in",[3,4,5,6,15],2,false);
        //battle
        this.sprites.battle.animations.add("run",[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22],4,false);
        //endings
        this.sprites.endings.animations.add("1",[0],0,false);
        this.sprites.endings.animations.add("2",[1],0,false);
        this.sprites.endings.animations.add("3",[2],0,false);
        this.sprites.endings.animations.add("4",[3],0,false);
        //grethican
        this.sprites.grethican1.animations.add("normal",[0],0,true);
        
        /*
        Formats:
            cutscene ["cutscene",BGname,spriteName,[[spriteAnimation,[text...]]...],destination]
            choice ["choice",BGname,spriteName,spriteAnimation,choiceText1,destination1,choiceText2,destination2]
            flag ["flag",flagName,value,destination]
            check ["check",flagName,test,trueDest,falseDest]
        */
        
        //////////////////////////////////////////////////////////////////////////////////////////////
        /*
        talking: ["talking",spriteName,spriteAnimation,spriteLocation,text,destination]
        choice: ["choice",spriteName,spriteAnimation,spriteLocation,choiceText1,destination1,choiceText2,destination2,choiceText3,destination3,choiceText4,destination4]
        */
        //////////////////////////////////////////////////////////////////////////////////////////////
        
        //story
        this.story = {
            //intro
            Intro: ["cutscene","Bridge","logo",[["normal",[
                "Selvakian Games presents   ->"
            ]]],"Intro2"],
            Intro2: ["cutscene","Bridge","name",[["normal",[
                "                                              ->"
            ]]],"Intro3"],
            Intro3: ["cutscene","Bridge","crew",[["com",[
                "Commanding Officer: Captain! Before we   start our first mission, why not         familiarize ourselves with our new ship? ->"
            ]],["sci",[
                "Science Officer: First, the              communications sytem. Hold -> to fast    forward text and move to the next line.  Try it here. ->",
            ]]],"Intro4"],
            Intro4: ["cutscene","Bridge","crew",[["sci",[
                "When presented with a choice, click on   the option you want"
            ]]],"Intro5"],
            Intro5: ["choice","Bridge","crew","sci","Got it","Intro6","Wait, what?","Intro4"],
            Intro6: ["cutscene","Bridge","crew",[["eng",[
                "Engineering Officer: Use <, ^ ,>, and v  to move the ship",
                "While on the map, the location of your   next objective will be marked",
                "To enter the orbit of a planet, simply   press O while near that planet on the map",
                "A message will appear when you are close enough",
                "To leave a planet's orbit, go to the edgeof the map and press O",
                "Teleporting down to a planet works the   same way.",
                "Let's not keep the Admiral waiting.      Teleporting you now",
            ]]],"Intro7"],
            Intro7: ["cutscene","Bridge","teleport",[["out",[
                "Teleporting... ->"
            ]]],"Intro8"],
            Intro8: ["cutscene","CFHQ","teleport",[["in",[
                "Teleporting... ->"
            ]]],"Cube Fleet HQ"],
            //cube fleet
            "Cube Fleet HQ": ["check","mission 1","","CFHQRV","CFHQM1"],//"CFHQM1"],//check if the player has seen the admiral's first mission
            CFHQM1: ["cutscene","CFHQ","admiral1",[["normal",[
                "Admiral: Hello there captain! Nice to seeyou again, finally with a ship of your   own!",
                "You: I am honored that you put me up for this, Admiral.",
                "Admiral: You were more than qualified, I didn’t do much. Though there is somethingI require you to do.",
                "You: Yes, Admiral?",
                "Admiral: Your first mission as a captain in Cube Fleet is to investigate the      disappearance of the Grimsmore. Last     contact with it was over Grethik, we willpopulate your map with its location.",
                "You: What do you think happened to it?"
            ]],["angry",[
                "Admiral: I don’t know. It was a beast of a ship, one of a kind. It would take a   fleet to destroy it. Whoever did this hasa lot of resources."
            ]],["normal",[
                "Admiral: Now, when you get there, if you find anything hostile just make sure     you’re not seen. No interactions, even ifthey're Circles. Just find the Grimsmore and contact us about it’s status. So, areyou prepared to go?"
            ]]],"CFHQC1"],//starting cutscene in cube fleet HQ
            CFHQC1: ["choice","CFHQ","admiral1","normal","Immediately, sir","CFHQSM1","I still have some questions","CFHQC1R"],//first choice in the game
            CFHQC1R: ["cutscene","CFHQ","admiral1",[["normal",[
                "Admiral: What would those be?",
                "You: Most ships have an overall mission  statement and reason for their           construction. Does my ship have one?",
                "Admiral: As a matter of fact, it does.   There was an empire that spanned the     entire galaxy, I bet you’ve already heardof the Terran Empire in history class.",
                "Though millions of years old, much of    their technology is still intact. Your   mission, and the mission of many other   Cube Fleet ships are to seek out and findthe old tech that allowed one race to    rule.",
                "If we can do that, we can bring peace to the galaxy. We can also stop all future  skirmishes with the Circulun people."
            ]],["angry",[
                "Admiral: But always remember, those      circles can’t get their hands on vital   Terran tech or we run the risk of a      galactic Circle empire."
            ]],["normal",[
                "You: What about the Triangles?",
                "Admiral: Their only goal for finding the tech is to stop the Squarian and Circulunfighting, then lock it away. They aren’t very motivated.",
                "You: How about Scorched Terra?",
                "Admiral: Well, Scorched Terra used to be Terra, the homeworld of the Terrans.     Though a civil war on their home planet  singed, more scorched, the entire surfaceand that destroyed the empire. There are no artifacts there. Now get going."
            ]]],"CFHQSM1"],
            CFHQSM1: ["flag","mission 1",true,"END"],//set flag for getting first mission
            CFHQRV: ["check","found Grimsmore","","CFHQTG","CFHQNF"],//check if they have found the Grimsmore
            CFHQNF: ["cutscene","CFHQ","admiral1",[["worried",[
                "You haven't found the Grimsmore yet..."
            ]]],"END"],
            CFHQTG: ["check","told command","","CFHQSI","CFHQTC"],//check if the player has told command (in person or over comms) about the Grimsmore
            CFHQTC: ["cutscene","CFHQ","admiral1",[["questioning",[
                "Admiral: What is the matter captain? Why have you come to Cubulus?",
                "You: I have some… Bad news",
            ]],["suprised",[
                "Admiral: Well if you came all this way   then it must be important. Come on, tell me.",
                "You: When we got there, we found the     Grimsmore scattered across the Planet’s  surface. No Squarian bi-signs.",
            ]],["unhappy",[
                "Admiral: We had suspicions, but why did  you come all the way to Cubulus.",
                "You: I wanted to inform in person sir",
            ]],["angry",[
                "Admiral: That is a rookie mistake        captain. You could have told me all this over the communication network. I expect better of you. Next time, hail me        immediatly.",
                "You: Yes, Admiral.",
            ]],["questioning",[
                "Admiral: Now, do we know how it was      destroyed, more importantly, who.",
                "You: Yes, Admiral. We figured it out.",
            ]],["interested",[
                "Admiral: Really! Well, who?",
                "You: It was the Tri’ Angs",
            ]],["suprised",[
                "Admiral: The Triangles! That can’t be!",
                "You: Why not?",
            ]],["normal",[
                "Admiral: We at command were just         contacted by the Tri’ Angs. They want to finally make an alliance with us.",
                "You: We don’t know much about the        Tri’ Angs",
                "Admiral: That's true, that highly        advanced secretive race has barely       attempted first contact with any other   race to our current knowledge.",
                "It could be their custom to destroy the  pride of an enemy just before they make  an alliance with that enemy so the enemy has a harder time saying no because they are clearly inferior.",
                "You: It's possible…",
                "Admiral: Alright, now I am going to      quickly schedule a clean up for the      Grimsmore…",
            ]]],"CSGC"],
            CSGC: ["choice","CFHQ","admiral1","normal","          Wait!","DSGC","           Ok","FCC"],
            DSGC: ["cutscene","CFHQ","admiral1",[["normal",[
                "You: No, please don’t do that!",
            ]],["worried",[
                "Admiral: And why not?",
                "You: The only reason we know that it was the Triangles was because a native       species on the surface told us it was    them.",
                "Admiral: So why are we not salvaging our previous flagship?",
            ]],["normal",[
                "You: The people told me that the scrap   would feed his people for months. It's   not my decision but I don’t think        salvaging the Grimsmore would be as      beneficial for us as it will be for them.",
                "Admiral: Alright then. No salvage.",
                "You: Thank you Admiral.",
            ]]],"GRASFC"],
            GRASFC: ["flag","salvaged",true,"FCC"],
            FCC: ["cutscene","CFHQ","admiral1",[["normal",[
                "Admiral: Now, I don’t know about the     ethics of the situation but what they didworked. Our biggest ship is destroyed by them, easily too, which will worry the   rest of command.",
                "As an Admiral in Cube Fleet, I am        assigning you the task of forging an     alliance with the Tri’ Angs. You were thesecond biggest ship in the fleet.",
                "You: I would be honored to make peace    with the Tri’ Angs, despite the past.",
                "Admiral: Good, captain, you are to       facilitate the proceedings yourself.     Captains are trained in diplomacy.",
                "You: Yes Admiral.",
                "Admiral: Now the Tri’ Angs wish to meet  face to face on a star base close to     Triangulus, we will populate it on your  map. You are to head there immediately,  good luck captain.",
                "You: Thank you Admiral",
            ]]],"BTC"],
            BTC: ["flag","back2Cubulus",true,"SASB"],
            SASB: ["flag","arrowLoc","Tribase 175","TC"],
            CFHQSI: ["check","seen starbase","","CFHQBC","CFHQGS"],
            CFHQGS: ["cutscene","CFHQ","admiral1",[["worried",[
                "You should head to Starbase 1..."
            ]]],"END"],
            CFHQBC: ["check","back2Cubulus","","CFHQSFC","CFHQSD"],
            CFHQSFC: ["cutscene","Bridge","crew",[["sci",[
                "Science Officer: Sir two vessels are     approaching",
            ]],["tac",[
                "Tactical Officer: Their weapons are      charged!",
            ]],["sci",[
                "Science Officer: Captain, we are         receiving a hail from the Admiral, it is priority ‘mandatory’ Sir! I can’t block  the transmission!"
            ]]],"CFHQFC"],
            CFHQFC: ["cutscene","Bridge","admiral",[["unhappy",[
                "Admiral: Hello, captain.",
                "You: What is this?",
                "Admiral: I am sorry captain. On your journey here, me and the Admiralty all       discussed the matter of the Tri’ Angs    star base.",
                "You: I think I get an idea of what you decided from the laser cannons pointed at  my ship.",
            ]],["angry",[
                "Admiral: CAPTAIN! Be quiet and listen. This is hard for me as I don’t fully agree with it and will do everything in my     power to stop it sooner than later.",
            ]],["unhappy",[
                "Admiral: The Admiralty have accused you of treason and you shall be tried for yourcrimes. I believe you as I know you      better than every other Admiral does thatyou didn’t fire on that station.",
                "Though, because you have shown that you make mistakes like the one you made in    telling me about the Grimsmore, and for  the Tri’ Angs benefit, you and your crew will be court marshalled and sentenced tolife imprisonment.",
            ]],["angry",[
                "Admiral: Better thank me as it would have been death.",
            ]],["worried",[
                "Admiral: Now give up peacefully, no one will be harmed if you do that.",
            ]]],"CFHQTGR"],
            CFHQTGR: ["check","salvaged","","CFHQFC2","CFHQFC1"],
            CFHQFC1: ["cutscene","Bridge","admiral",[["normal",[
                "Admiral: Goodbye, Captain."
            ]]],"Ending1"],
            CFHQFC2: ["cutscene","Bridge","admiral",[["normal",[
                "Admiral: Goodbye, Capta..."
            ]]],"CFHQGOH"],
            CFHQGOH: ["cutscene","Bridge","crew",[["sci",[
                "Science Officer: Captain! I am receiving a very long ranged transmission from the Grethikans!",
                "You: Well, let's not keep them waiting!"
            ]]],"CFHQGOH2"],
            CFHQGOH2: ["cutscene","Bridge","grethican1",[["normal",[
                "Grethic Native: Hello there captain! So nice to see you.",
                "You: You as well, but how did you get off Grethik?",
                "Grethic Native: We are a very advanced species! We fixed up the Grimsmore quite   easily and resumed shipping cargo in a   massive ship!",
                "You: So you didn’t sell it for scrap?",
                "Grethic Native: No, we couldn’t have made enough money doing that! All the weaponswere trashed and valuable information    destroyed so we really only got a big    space bag. No valuable Cube Fleet        secrets.",
                "You: So you lied to me?",
                "Grethic Native: We are traders, you wouldn’t have helped us if we told the truth.",
                "You: So are you really a Grethik native?",
                "Grethic Native: Yes! We have a trade route from home to a planet you never heard  of. When we were back home selling and   buying more cargo though, someone stole  our ship!",
                "You: That unfortunate but you still shouldn’t have lied to me.",
                "Grethic Native: Well, that lie will help you get out of this mess! I am almost    there and I can get you out of that nastycourt marshall.",
            ]]],"CFHQGOHC"],
            CFHQGOHC: ["choice","Bridge","grethican1","normal","I’m alright, thank you","CFHQGOHR","Yes please! Get here faster!","CFHQGOHA"],
            CFHQGOHR: ["cutscene","Bridge","grethican1",[["normal",[
                "You: I don’t need the help of a liar. My government knows what they're doing and  if a court martial will help stop a war  then so be it.",
                "Grethic Native: You are loyal. Oh well,  suit yourself! Turn her around boys. See ya around Captain."
            ]]],"Ending1"],
            CFHQGOHA: ["cutscene","Bridge","crew",[["sci",[
                "You: Well hurry up! I might be okay with a court martial but I won’t make my crew suffer. Alright Crew! Let's get out of   here!",
                "Science Officer: Lets go!"
            ]],["tac",[
                "Tactical Officer: Lets go!"
            ]],["med",[
                "Medical Officer: Lets go!"
            ]],["com",[
                "Command Officer: Lets go!"
            ]],["eng",[
                "Engineering Officer: Lets go!"
            ]]],"Ending2"],
            CFHQSD: ["cutscene","CFHQ","admiral1",[["normal",[
                "Admiral: Hello there Captain!",
                "You: Hello there Admiral!",
                "Admiral: Now, me and the Admiralty       talked, a lot, on your way here.",
                "You: Well there aren’t any laser cannons pointed at my ship so I hope they thoughtof something good?",
                "Admiral: Well, because of your pretty    much perfect track record as captain, I  got through to them. I convinced all the Admirals that you were being set up, I   didn’t lie to them did I?",
                "You: No, sir, I did not destroy that starbase.",
                "Admiral: I’ve known you long enough to   tell when you're telling the truth. Now, they thought that it was a great idea to put you and your ship at the head of the research task force for finding out what happened!",
                "Now… wait… I am receiving a transmission."
            ]],["angry",[
                "Admiral: What! Captain, Starbase 1 has   just been destroyed! I need to go!",
            ]]],"CFHQGET"],
            CFHQGET: ["cutscene","CFHQ","teleport",[["out",[
                "Teleporting... ->"
            ]]],"CFHQGET2"],
            CFHQGET2: ["cutscene","Bridge","teleport",[["in",[
                "Teleporting... ->"
            ]]],"CFHQGE"],
            CFHQGE: ["check","salvaged","","CFHQCG","CFHQSD2"],
            CFHQSD2: ["cutscene","Bridge","crew",[["sci",[
                "Science Officer: Captain! I am receiving the battle report. Starbase 1 was        completely obliterated. Another thing is very disturbing, captain.",
                "You: Well, what is it?",
                "Science Officer: It was, the Tri’ Angs"
            ]]],"Ending3"],
            CFHQCG: ["cutscene","Bridge","crew",[["sci",[
                "Science Officer: Captain, I am receiving a transmission from the… the Grethikans? They say they have information for us.",
                "You: Well, lets not keep them waiting,   open a channel."
            ]]],"CFHQCG2"],
            CFHQCG2: ["cutscene","Bridge","grethican1",[["normal",[
                "Grethic Native: Hello there captain! So  nice to see you.",
                "You: You as well, but how did you get offGrethik?",
                "Grethic Native: We are a very advanced   species! We fixed up the Grimsmore quite easily and resumed shipping cargo in a   massive ship!",
                "You: So you didn’t sell it for scrap?",
                "Grethic Native: No, we couldn’t have madeenough money doing that! All the weapons were trashed and valuable information    destroyed so we really only got a big    space bag. No valuable Cube Fleet        secrets.",
                "You: So you lied to me?",
                "Grethic Native: We are traders, you      wouldn’t have helped us if we told the   truth.",
                "You: So are you really a Grethik native?",
                "Grethic Native: Yes! We have a trade     route from home to a planet you never    heard of. When we were back home selling and buying more cargo though, someone    stole our ship!",
                "You: That unfortunate but you still      shouldn’t have lied to me.",
                "Grethic Native: Well, that lie will help you get out of this mess! You will soon  receive information from your HQ that theTriangles were the ones attacking the    star base.",
            ]]],"CFHQCG3"],
            CFHQCG3: ["cutscene","Bridge","crew",[["sci",[
                "Science Officer: Their right! Command    just transmitted the information that theTri’ Angs were the ones who attacked the star base!"
            ]]],"CFHQCG4"],
            CFHQCG4: ["cutscene","Bridge","grethican1",[["normal",[
                "You: What are you getting at?",
                "Grethic Native: Well, don’t trust that   analysis, you were set up and so were theTriangles.",
                "You: Well then, who was the real         attacker?",
                "Grethic Native: The Circles.",
            ]]],"Ending4"],
            //Wreckage of the Grimsmore
            "???": ["check","found Grimsmore","","w4","w0"],//check if the player has already seen the Grimsmore
            w0: ["cutscene","Bridge","crew",[["sci",[
                "Science Officer: Captain, scans are      showing that there is a large metallic   structure protruding out of the desert.  It is not a natural formation."
            ]]],"W1"],
            W1: ["cutscene","Bridge","crew",[["med",[
                "Medical Officer: I am not reading        Squarian, Circulun, or Tri’ Ang bio signson the surface. If that is the Grimsmore down there, it's lifeless.",
                "You: Alright, lets go check it out."
            ]]],"T1"],
            T1: ["cutscene","Bridge","teleport",[["out",[
                "Teleporting... ->"
            ]]],"T1.5"],
            "T1.5": ["cutscene","Grimsmore","teleport",[["in",[
                "Teleporting... ->"
            ]]],"W2"],
            W2: ["cutscene","Grimsmore","grethican",[["normal",[
                "Grethic Native: I saw who did it, who    destroyed the ship!",
                "You: Alright then, who did it?",
                "Grethic Native: After the ship crashed,  the ships who shot it down landed and we saw triangular creatures step out of the craft to inspect the wreckage. They got  back in their ship and left.",
                "You: Alright, thank you for the          information.",
                "Grethic Native: Wait! My people need     something in return!",
                "You: What would that be?",
                "Grethic Native: Please don’t salvage the ship! The parts will feed my people for  months!",
                "You: I will pass the message to comma…"
            ]]],"T2"],
            T2: ["cutscene","Grimsmore","teleport",[["out",[
                "Teleporting... ->"
            ]]],"T2.5"],
            "T2.5": ["cutscene","Bridge","teleport",[["in",[
                "Teleporting... ->"
            ]]],"W3"],
            W3: ["cutscene","Bridge","crew",[["tac",[
                "Tactical Officer: Captain! A Tri’ Ang    ship is bearing down on us! We are being attacked!"
            ]]],"realBattle"],
            w4: ["cutscene","Grimsmore","grethican",[["normal",[
                "Revisiting the wreckage of the Grimsmore"
            ]]],"END"],
            //battle with Tri'Ang ship
            realBattle: ["cutscene","black","battle",[["run",[
                "                          "
            ]]],"Battle"],
            "Battle": ["cutscene","Bridge","crew",[["sci",[
                "Science Officer: I wonder why the        Triangles would attack the Grimsmore and then patrol the area searching for a     fight.",
                "You: Why would the Tri’ Angs attack the  Grimsmore in the first place?",
                "Science Officer: Captain, we should      probably contact command and relay this  troubling information.",
            ]]],"BC"],
            BC: ["flag","found Grimsmore",true,"SF"],
            SF: ["choice","Bridge","crew","sci","Contact them immediately","CI1","Tell them face to face","BTCSF"],
            CISF: ["flag","arrowLoc","Tribase 175","CI"],
            BTCSF: ["flag","arrowLoc","Cubulus","END"],
            CI1: ["flag","arrowLoc","Tribase 175","CI"],
            CI: ["cutscene","Bridge","admiral",[["normal",[
                "Admiral: So, what the report on the      Grimsmore?",
                "You: It was destroyed and is scattered   about the surface of Grethik.",
            ]],["unhappy",[
                "Admiral: Thats, unfortunate.",
                "You: Though we do know who did it.",
            ]],["interested",[
                "Admiral: Really! Well, who?",
                "You: It was the Tri’ Angs",
            ]],["suprised",[
                "Admiral: The Triangles! That can’t be!",
                "You: Why not?",
            ]],["normal",[
                "Admiral: We at command were just         contacted by the Tri’ Angs. They want to finally make an alliance with us.",
                "You: We don’t know much about the        Tri’ Angs",
                "Admiral: That's true, that highly        advanced secretive race has barely       attempted first contact with any other   race to our current knowledge.",
                "It could be their custom to destroy the  pride of an enemy just before they make  an alliance with that enemy so the enemy has a harder time saying no because they are clearly inferior.",
                "You: It's possible…",
                "Admiral: Alright, now I am going to      quickly schedule a clean up for the      Grimsmore…"
            ]]],"CSGB"],
            CSGB: ["choice","Bridge","admiral","normal","          Wait!","DSGB","           Ok","FCB"],
            DSGB: ["cutscene","Bridge","admiral",[["normal",[
                "You: No, please don’t do that!",
            ]],["confused",[
                "Admiral: And why not?",
                "You: The only reason we know that it was the Triangles was because a native       species on the surface told us it was    them.",
                "Admiral: So why are we not salvaging our previous flagship?",
            ]],["normal",[
                "You: The people told me that the scrap   would feed his people for months. It's   not my decision but I don’t think        salvaging the Grimsmore would be as      beneficial for us as it will be for them.",
                "Admiral: Alright then. No salvage.",
                "You: Thank you Admiral.",
            ]]],"GRASF"],
            GRASF: ["flag","salvaged",true,"FCB"],
            FCB: ["cutscene","Bridge","admiral",[["normal",[
                "Admiral: Now, I don’t know about the     ethics of the situation but what they didworked. Our biggest ship is destroyed by them, easily too, which will worry the   rest of command.",
                "As an Admiral in Cube Fleet, I am        assigning you the task of forging an     alliance with the Tri’ Angs. You were thesecond biggest ship in the fleet.",
                "You: I would be honored to make peace    with the Tri’ Angs, despite the past.",
                "Admiral: Good, captain, you are to       facilitate the proceedings yourself.     Captains are trained in diplomacy.",
                "You: Yes Admiral.",
                "Admiral: Now the Tri’ Angs wish to meet  face to face on a star base close to     Triangulus, we will populate it on your  map. You are to head there immediately,  good luck captain.",
                "You: Thank you Admiral",
            ]]],"TC"],
            TC: ["flag","told command",true,"END"],
            "wreckage": ["check","told command","","H0","END"],
            H0: ["cutscene","Bridge","crew",[["sci",[
                "You: What are we looking at?",
                "Science Officer: This is where the Star  Base is supposed to be.",
            ]],["med",[
                "Medical Officer: There are no lifesigns  in the vicinity of where that base used  to be.",
            ]],["tac",[
                "Tactical Officer: There are several      places where the hull was breached by    weapons fire.",
                "You: Scan the wreckage, find out which   ship the lasers are registered to.",
            ]],["sci",[
                "Science Officer: Captain, scans show thatwe were the ones who fired those lasers.",
                "You: What?",
                "Science Officer: It doesn’t make sense…",
            ]],["tac",[
                "Tactical Officer: Captain, we have       several torpedoes that are missing from  the launch bay.",
            ]],["sci",[
                "Science Officer: There is an undetonated warhead in the wreck, registry of        5900270080.",
            ]],["tac",[
                "Tactical Officer: Captain, that is one ofthe torpedoes that was supposedly loaded onto the ship in our last refit. It is   also missing from the torpedo storage    bay.",
            ]],["sci",[
                "Science Officer: There is a transmission incoming from the Admiral.",
                "You: As far as everyone can tell, we     attacked that star base, let's make sure that Cube Fleet doesn’t think that too.  Accept the hail.",
            ]]],"H1"],
            H1: ["cutscene","Bridge","admiral",[["normal",[
                "Admiral: Captain! Sorry for interrupting the proceedings, how are they going by   the way.",
                "You: They aren’t going Admiral.",
            ]],["confused",[
                "Admiral: Did they not accept our terms?  What happened?",
                "You: The Star Base was destroyed when we got here.",
            ]],["suprised",[
                "Admiral: What! Who did this?",
            ]],["squinting",[
                "Admiral: Who are the weapon signatures   registered to?",
                "You: Our scans say it was us.",
            ]],["angry",[
                "Admiral: What! That's impossible!",
                "You: The scans show that my ship’s       weapons where the ones fired on the base.Some of our torpedoes are even missing,  one of our torpedoes is even lodged in   the Star Base’s hull undetonated.",
                "Admiral: Did you fire on that base, don’tlie to me.",
                "You: No sir! We are being set up. We     didn’t fire a shot. It is an elaborate   inside job. Quite frankly, I don’t think it was the triangles who shot down the   Grimsmore at all!",
                "Admiral: Alright, slow down. Get back to Cubulus and we will sort this all out.   Admiral out.",
            ]]],"H1.5"],
            "H1.5": ["cutscene","Bridge","crew",[["sci",[
                "Science Officer: We should head back to  Cubulus now, it would be suspicious if wedidn’t."
            ]]],"SSBSF"],
            SSBSF: ["flag","seen starbase",true,"BTCSF"],
            Ending1: ["cutscene","black","endings",[["1",[
                "GAME OVER: Ending - Court Marshalled"
            ]]],"Credits"],
            Ending2: ["cutscene","black","endings",[["2",[
                "GAME OVER: Ending - Fugitive"
            ]]],"Credits"],
            Ending3: ["cutscene","black","endings",[["3",[
                "GAME OVER: Ending - War"
            ]]],"Credits"],
            Ending4: ["cutscene","black","endings",[["4",[
                "GAME OVER: Ending - To Be Continued..."
            ]]],"Credits"],
            Credits: ["cutscene","Bridge","crew",[["sci",[
                "I'm the Science officer!"
            ]],["tac",[
                "I'm the Tactical officer!"
            ]],["med",[
                "I'm the Medical officer!"
            ]],["eng",[
                "I'm the Chief of Engineering!"
            ]],["com",[
                "I'm the First officer!"
            ]],["com",[
                "Coding and other AWESOME STUFF by Andrew Cudzinovic!"
            ]],["com",[
                "Art and Story by Joshua DeWinter!"
            ]],["sci",[
                "This has been Star Square Beta,"
            ]]],"EndingOfAll"],
            EndingOfAll: ["cutscene","black","admiral",[["normal",[
                "Full game coming soonish..."
            ]]],"EndingOfAll"],
        };
        
        //parser variables
        this.storyItem = teleDest;
        this.state = "parse";
        this.bgOld = "none";
        this.spriteOld = "none";
        
        //text background
        this.textBG = game.add.sprite(0,-555,"blue bar!");
        this.textBG.scale.setTo(1.5,1.5);
        this.choiceBG = game.add.sprite(0,-10,"blue bar 2");
        this.choiceBG.scale.setTo(5,1);
        
        //text for cutscene
        this.text = "";
        this.textWait = 0;
        this.storyText1 = game.add.text(-1000,10,"",{fontSize: "32px", fill: "#000"});
        this.storyText2 = game.add.text(-1000,30,"",{fontSize: "32px", fill: "#000"});
        this.storyText3 = game.add.text(-1000,50,"",{fontSize: "32px", fill: "#000"});
        this.storyText4 = game.add.text(-1000,70,"",{fontSize: "32px", fill: "#000"});
        this.storyText5 = game.add.text(-1000,90,"",{fontSize: "32px", fill: "#000"});
        this.storyText6 = game.add.text(-1000,110,"",{fontSize: "32px", fill: "#000"});
        //text for choices
        this.choice1 = game.add.text(-1000,100,"",{fontSize: "32px", fill: "#000"});
        this.choice2 = game.add.text(-1000,100,"",{fontSize: "32px", fill: "#000"});
    },
    update: function() {
        if(this.storyItem=="END"){
            game.state.start("SpaceOrbit");
        }
        else if(this.state=="parse"){
            this.item = this.story[this.storyItem];
            if(this.item[0]=="cutscene"){
                //set background
                if(this.bgOld!="none"){
                    this.sprites[this.bgOld].x = -1000;
                }
                this.sprites[this.item[1]].x = 0;
                this.bgOld = this.item[1];
                //set sprite
                if(this.spriteOld!="none"){
                    this.sprites[this.spriteOld].x -= 1000;
                }
                this.sprites[this.item[2]].x += 1000;
                this.spriteOld = this.item[2];
                
                //set state and position
                this.state = "text";
                this.textNum = 0;
                this.lineNum = 0;
                
                //move text into position
                this.storyText1.x = 10;
                this.storyText2.x = 10;
                this.storyText3.x = 10;
                this.storyText4.x = 10;
                this.storyText5.x = 10;
                this.storyText6.x = 10;
            }
            else if(this.item[0]=="choice"){
                //set background
                if(this.bgOld!="none"){
                    this.sprites[this.bgOld].x = -1000;
                }
                this.sprites[this.item[1]].x = 0;
                this.bgOld = this.item[1];
                //set sprite
                if(this.spriteOld!="none"){
                    this.sprites[this.spriteOld].x -= 1000;
                }
                this.sprites[this.item[2]].x += 1000;
                this.spriteOld = this.item[2];
                //start sprite animation
                this.sprites[this.item[2]].animations.play(this.item[3]);
                //setup text
                this.choice1.text = this.item[4];
                this.choice2.text = this.item[6];
                this.choice1.x = 10;
                this.choice2.x = 400;
                //set state
                this.state = "choice";
            }
            else if(this.item[0]=="flag"){
                storyState[this.item[1]] = this.item[2];
                this.storyItem = this.item[3];
            }
            else if(this.item[0]=="check"){
                if(Function("flag","return flag"+this.item[2]+";")(storyState[this.item[1]])){
                    this.storyItem = this.item[3];
                }
                else{
                    this.storyItem = this.item[4];
                }
            }
        }
        else if(this.state=="text"){
            if(keys.right){
                this.textWait = 0;
            }
            if(this.text.length<this.item[3][this.textNum][1][this.lineNum].length){
                if(this.textWait<1){
                    //reset wait
                    this.textWait = 2;
                    //add to text
                    this.text += this.item[3][this.textNum][1][this.lineNum][this.text.length];
                    //play animation
                    this.sprites[this.item[2]].animations.play(this.item[3][this.textNum][0]);
                }
                else{
                    this.textWait -= 1;
                }
            }
            else if(keys.right){
                //check for line and text changes
                this.lineNum += 1;
                this.text = "";
                if(this.lineNum>=this.item[3][this.textNum][1].length){
                    this.lineNum = 0;
                    this.textNum += 1;
                    if(this.textNum>=this.item[3].length){
                        this.state = "parse";
                        this.storyItem = this.item[4];
                        //hide text
                        this.storyText1.x = -1000;
                        this.storyText2.x = -1000;
                        this.storyText3.x = -1000;
                        this.storyText4.x = -1000;
                        this.storyText5.x = -1000;
                        this.storyText6.x = -1000;
                    }
                }
            }
            //display text
            this.storyText1.text = this.text.slice(0,41);
            this.storyText2.text = this.text.slice(41,82);
            this.storyText3.text = this.text.slice(82,123);
            this.storyText4.text = this.text.slice(123,164);
            this.storyText5.text = this.text.slice(164,205);
            this.storyText6.text = this.text.slice(205,246);
        }
        else if(this.state=="choice"&&keys.mouseDown){
            this.state = "parse";
            this.choice1.x = -1000;
            this.choice2.x = -1000;
            if(keys.mouseX<400){
                this.storyItem = this.item[5];
            }
            else{
                this.storyItem = this.item[7];
            }
        }
        if(this.state=="text"){
            this.textBG.x = 0;
        }
        else{
            this.textBG.x = -1000;
        }
        if(this.state=="choice"){
            this.choiceBG.x = 0;
        }
        else{
            this.choiceBG.x = -1000000;
        }
    },
};

//add state
game.state.add('SpaceLand', game_state.spaceLand);
//start game
game.state.start("SpaceLand");