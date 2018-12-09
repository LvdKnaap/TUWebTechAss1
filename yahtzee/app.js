var express = require("express");
var http = require("http");
var websocket = require("ws");

var indexRouter = require("./routes/index");
var messages = require("./public/javascripts/messages");

var gameStatus = require("./statTracker");
var Game = require("./game");

var port = process.argv[2];
var app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/play", indexRouter);

//TODO: move to routes/index
app.get("/", (req, res) => {
    res.render("splash.ejs", { gamesInitialized: gameStatus.gamesInitialized, gamesCompleted: gameStatus.gamesCompleted });
});

var server = http.createServer(app);
const wss = new websocket.Server({ server });

var websockets = {};//property: websocket, value: game

/*
 * regularly clean up the websockets object
 */ 
setInterval(function() {
    for(let i in websockets){
        if(websockets.hasOwnProperty(i)){
            let gameObj = websockets[i];
            //if the gameObj has a final status, the game is complete/aborted
            if(gameObj.finalStatus!=null){
                console.log("\tDeleting element "+i);
                delete websockets[i];
            }
        }
    }
}, 50000);

var currentGame = new Game(gameStatus.gamesInitialized++);
var connectionID = 0;//each websocket receives a unique ID

wss.on("connection", function connection(ws) {
    console.log("app caller, connection");
    
    /*
     * two-player game: every two players are added to the same game
     */
    let con = ws; 
    con.id = connectionID++;
    let playerType = currentGame.addPlayer(con);
    websockets[con.id] = currentGame;

    console.log("Player %s placed in game %s as %s", con.id, currentGame.id, playerType);

    /*
     * inform the client about its assigned player type
     */ 
    con.send((playerType == "A") ? messages.S_PLAYER_A : messages.S_PLAYER_B);

    /*
     * once we have two players, there is no way back; 
     * a new game object is created;
     * if a player now leaves, the game is aborted (player is not preplaced)
     */ 
    if (currentGame.hasTwoConnectedPlayers()) {
        currentGame = new Game(gameStatus.gamesInitialized++);
    }

    /*
     * message coming in from a player:
     *  1. determine the game object
     *  2. determine the opposing player OP
     *  3. send the message to OP 
     */ 
    con.on("message", function incoming(message) {
        
        let oMsg = JSON.parse(message);
 
        let gameObj = websockets[con.id];
        let isPlayerA = (gameObj.playerA == con) ? true : false;

        if (isPlayerA) {
            console.log("app caller player A, message: " + message);

            /*
             * player A cannot do a lot, just send the target word;
             * if player B is already available, send message to B
             */
            if (oMsg.type == messages.T_FIRSTTURN) {
                gameObj.setWord(oMsg.data);

                if(gameObj.hasTwoConnectedPlayers()){
                    gameObj.playerB.send(message); 
                }                
            }

            if(oMsg.type == messages.T_MAKE_A_TURN){
                gameObj.playerB.send(message);
                gameObj.setStatus("MADE A TURN");
                console.log(gameObj.setStatus("MADE A TURN"));
            }
            /*
             * player A can state who won/lost
             */ 
            if( oMsg.type == messages.T_GAME_WON_BY){
                gameObj.setStatus(oMsg.data);
                //game was won by somebody, update statistics
                gameStatus.gamesCompleted++;
            }  
        }
        else {
            console.log("app caller player B, message: " + message);
            /*
             * player B can make a guess; 
             * this guess is forwarded to A
             */ 
            if(oMsg.type == messages.T_MAKE_A_TURN){
                gameObj.playerA.send(message);
                gameObj.setStatus("MADE A TURN");
                console.log(gameObj.setStatus("MADE A TURN"));
            }   
        }
    });

    con.on("close", function (code) {
        
        /*
         * code 1001 means almost always closing initiated by the client;
         * source: https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent
         */
        console.log(con.id + " disconnected ...");

        if (code == "1001") {
            /*
            * if possible, abort the game; if not, the game is already completed
            */
            let gameObj = websockets[con.id];

            if (gameObj.isValidTransition(gameObj.gameState, "ABORTED")) {
                gameObj.setStatus("ABORTED"); 
                gameStatus.gamesAborted++;

                /*
                 * determine whose connection remains open;
                 * close it
                 */
                try {
                    gameObj.playerA.close();
                    gameObj.playerA = null;
                }
                catch(e){
                    console.log("Player A closing: "+ e);
                }

                try {
                    gameObj.playerB.close(); 
                    gameObj.playerB = null;
                }
                catch(e){
                    console.log("Player B closing: " + e);
                }                
            }
            
        }
    });
});

server.listen(port);

