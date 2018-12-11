/* ESLint global variables information */
/* global Setup, Status, Messages, englishDict*/

/* basic constructor of game state */
function GameState(sb, socket){

    this.playerType = null;
    this.playerPoints = 0;
    this.arrayScoreThis = ["","","","","","","","","","","","",""];
    this.NoTurns = 0;
    this.yahtzeeButtons = new YahtzeeButtons();
    this.yahtzeeButtons.initialize();
    this.statusBar = sb;

    this.getPlayerType = function () {
        return this.playerType;
    };

    this.setPlayerType = function (p) {
        console.assert(typeof p == "string", "%s: Expecting a string, got a %s", arguments.callee.name, typeof p);
        this.playerType = p;
    };

    this.incrNoTurns = function(){
        this.NoTurns++;
    };

    this.whoWon = function(){
        if (this.playerType == "B" && this.NoTurns != 13) {
            return null; //nobody won yet
        }
        if (this.NoTurns == 13) {
            return "A";
        }
        /* HIER HIER HIER HIER 
        if (this.playerPoints == 10) { //that.playerPoints) { // that.playerPoints denotes opponents points
            return "draw";
        } else {
            return this.playerPoints > 100 ? "A" : "B"; //that.playerPoints ? "A" : "B"; // idem dito
        }
        */
    };


    this.updateScore = function(){ // ?? todo?
        
    }

    this.updateGame = function(scoreOpponent){

        // this.yahtzeeButtons.makeButtonUnAvailable(clickedButton);

        var outgoingMsg = Messages.O_MAKE_A_TURN;
        outgoingMsg.data = scoreOpponent;
        console.log("updateGame, waarde die meegegeven wordt: " + outgoingMsg.data);

        // outgoingMsg.data = arrayScoreThis;
        socket.send(JSON.stringify(outgoingMsg));

        //is the game complete?
        let winner = this.whoWon();
        
        if(winner != null){
            let alertString;
            if( winner == this.playerType){
                alertString = Status["gameWon"];
            }
            else {
                alertString = Status["gameLost"];
            }
            alertString += Status["playAgain"];
            sb.setStatus(alertString);

            //player A sends final message
            if(this.playerType == "A"){
                let finalMsg = Messages.O_GAME_WON_BY;
                finalMsg.data = winner;
                socket.send(JSON.stringify(finalMsg));
            }
            socket.close();
        }
    };
}

function ButtonBoard(gs){

    //only initialize for player that should actually be able to use the board      
    // FALSE
    this.initialize = function(){

        var elements = document.querySelectorAll(".categorie");
        Array.from(elements).forEach( function(el){

            el.addEventListener("click", function singleClick(e){
               
                console.log(e.target.id);
                let tempString = e.target.id.substring(6, 7).toLowerCase() + e.target.id.substring(7, e.target.id.length) + 'Player1';
                console.log(tempString);
                let yahtzeeKind = tempString.substring(tempString.length-1) + "2";
                let dataArray = [document.getElementById("totalRemainingPointsBonusPlayer1").innerHTML,
                document.getElementById("bonusScorePlayer1").innerHTML, 
                document.getElementById("totalUpperScorePlayer1").innerHTML,
                document.getElementById("totalLowerScorePlayer1").innerHTML,
                document.getElementById("totalScorePlayer1").innerHTML,
                document.getElementById(tempString).innerHTML,
                yahtzeeKind];
                new Audio("../data/click.wav").play();
                console.log("event listener call");
                gs.updateGame(dataArray);

                /*
                 * every letter can only be selected once; handling this within
                 * JS is one option, here simply remove the event listener when a click happened 
                 */
                el.removeEventListener("click", singleClick, false);
            });
        });
    };
}

function disableButtons() {
    var buttons = document.getElementById("yathzeeButtons");
    var buttonDivs = yathzeeButtons.getElementsByTagName("div");
    for (i = 0; i < buttonDivs.length; i++) {
        buttonDivs.item(i).className += " buttonDisabled";
    }
}

//set everything up, including the WebSocket
(function setup(){
    var socket = new WebSocket(Setup.WEB_SOCKET_URL);
    console.log("Setup call");
    /*
     * initialize all UI elements of the game:
     * - visible word board (i.e. place where the hidden/unhidden word is shown)
     * - status bar
     * - alphabet board
     * 
     * the GameState object coordinates everything
     */ 
    
    
    var sb = new StatusBar();

    var gs = new GameState(sb, socket);
    var bb = new ButtonBoard(gs);

    socket.onmessage = function (event) {

        let incomingMsg = JSON.parse(event.data);
        console.log("Setup call, socket call");

        //set player type
        if (incomingMsg.type == Messages.T_PLAYER_TYPE) {
            console.log("socket call, set player type");
            gs.setPlayerType( incomingMsg.data );//should be "A" or "B"
            if (gs.getPlayerType()=="A")
            {
                sb.setStatus(Status["player1Intro"]);
                console.log("Now wait for player 2 (B)");
                //Now wait for player 2 (B), do nothing
            }
            else
            {
                sb.setStatus(Status["player2Intro"]);
                let outgoingMsg = Messages.O_FIRSTTURN;
                outgoingMsg.data = "";
                socket.send(JSON.stringify(outgoingMsg));
            }
        }

        //Play first turn A and update game 
        if (incomingMsg.type == Messages.T_FIRSTTURN && gs.getPlayerType() == "A"){
            console.log("socket call, first turn");
            sb.setStatus(Status["player1FirstTurn"]);
            //sb.setStatus(Status["playerSecondIntro"]);
            bb.initialize();
            let outgoingMsg = Messages.O_ZEROTURN;
            outgoingMsg.data = "";
            socket.send(JSON.stringify(outgoingMsg));
        }
          //Play first turn B and update game , still necessary???
          if (incomingMsg.type == Messages.T_ZEROTURN){
            console.log("socket call, first turn");
            sb.setStatus(Status["Wait"]);
            bb.initialize();
        }

        //Play turn and update game 
        if( incomingMsg.type == Messages.T_MAKE_A_TURN){
            console.log("socket call, update board with turn, current data is: " + incomingMsg.data + "message is" + incomingMsg.type + " number of turns:" + gs.NoTurns);
            
            let dataArray = incomingMsg.data;
            document.getElementById("totalRemainingPointsBonusPlayer2").innerHTML = dataArray[0];
            document.getElementById("bonusScorePlayer2").innerHTML = dataArray[1];
            document.getElementById("totalUpperScorePlayer2").innerHTML = dataArray[2];
            document.getElementById("totalLowerScorePlayer2").innerHTML = dataArray[3];
            document.getElementById("totalScorePlayer2").innerHTML = dataArray[4];
            document.getElementById(dataArray[6]).innerHTML = dataArray[5];
            sb.setStatus(Status["newTurn"]);
        }
    };

    socket.onopen = function(){
        socket.send("{}");
    };
    
    //server sends a close event only if the game was aborted from some side
    socket.onclose = function(){
        if(gs.whoWon()==null){
            sb.setStatus(Status["aborted"]);
        }
    };

    socket.onerror = function(){  
    };
})(); //execute immediately
