/* ESLint global variables information */
/* global Setup, Status, Messages, englishDict*/

/* basic constructor of game state */
function GameState(sb, socket){

    this.playerType = null;
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
        //too many wrong guesses? Player A (who set the word) won
        if( this.wrongGuesses>Setup.MAX_ALLOWED_GUESSES){
            return "A";
        }
        //word solved? Player B won
        if( this.visibleWordArray.indexOf("#")<0){
            return "B";
        }
        return null; //nobody won yet
    };

    this.updateScore = function(){
    };
    
    this.updateGame = function(clickedButton){

        console.log("update game call");


        this.yahtzeeButtons.makeButtonUnAvailable(clickedButton);

        var outgoingMsg = Messages.O_MAKE_A_TURN;
        outgoingMsg.data = clickedButton;
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
    this.initialize = function(){

        var elements = document.querySelectorAll(".yahtzeeButtons");
        Array.from(elements).forEach( function(el){

            el.addEventListener("click", function singleClick(e){
                var clickedButton = e.target.id;
                new Audio("../data/click.wav").play();
                console.log("event lisener call");
                gs.updateGame(clickedButton);

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
            }
            else
            {
                sb.setStatus(Status["player2Intro"]);
            }
            let outgoingMsg = Messages.T_FIRSTTURN;
            socket.send(JSON.stringify(outgoingMsg));
        }

        //Play first turn and update game 
        if (incomingMsg.type == Messages.T_FIRSTTURN){
            console.log("socket call, first turn");

            sb.setStatus(Status["playerSecondIntro"]);
            bb.initialize();
            gs.updateGame(incomingMsg.data);
        }

        //waarsch werkt dit niet omdat we in update game zitten
        //Play turn and update game 
        if( incomingMsg.type == Messages.T_MAKE_A_TURN){
            console.log("socket call, update board with guesses");
            sb.setStatus(Status["played"] + incomingMsg.data);
            gs.updateGame(incomingMsg.data);
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
