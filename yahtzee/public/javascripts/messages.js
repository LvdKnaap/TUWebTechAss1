(function(exports){

    /* 
     * Client to server: game is complete, the winner is ... 
     */
    exports.T_GAME_WON_BY = "GAME-WON-BY";             
    exports.O_GAME_WON_BY = {
        type: exports.T_GAME_WON_BY,
        data: null
    };

    /*
     * Server to client: abort game (e.g. if second player exited the game) 
     */
    exports.O_GAME_ABORTED = {                          
        type: "GAME-ABORTED"
    };
    exports.S_GAME_ABORTED = JSON.stringify(exports.O_GAME_ABORTED);

    /*
     * Server to client: set as player A 
     */
    exports.T_PLAYER_TYPE = "PLAYER-TYPE";
    exports.O_PLAYER_A = {                            
        type: exports.T_PLAYER_TYPE,
        data: "A"
    };
    exports.S_PLAYER_A = JSON.stringify(exports.O_PLAYER_A);

    /* 
     * Server to client: set as player B 
     */
    exports.O_PLAYER_B = {                            
        type: exports.T_PLAYER_TYPE,
        data: "B"
    };
    exports.S_PLAYER_B = JSON.stringify(exports.O_PLAYER_B);

/* 
     * Server to Player A & B or Player A & B to server: first turn
     */
    exports.T_FIRSTTURN = "FIRST TURN";
    exports.O_FIRSTTURN = {                         
        type: exports.T_FIRSTTURN,
        data: null
    };

    /* 
     *Player A to server: zero turn
     */
   exports.T_ZEROTURN = "ZERO TURN";
   exports.O_ZEROTURN = {                         
       type: exports.T_ZEROTURN,
       data: null
   };


    //exports.S_TARGET_WORD does not exist, as we always need to fill the data property

    /* 
     * Player B to server OR server to Player A: guessed character 
     */
    exports.T_MAKE_A_TURN = "MAKE-A-TURN";         
    exports.O_MAKE_A_TURN = {
        type: exports.T_MAKE_A_TURN,
        data: null
    };
    //exports.S_MAKE_A_GUESS does not exist, as data needs to be set

    /* 
     * Server to Player A & B: game over with result won/loss 
     */
    exports.T_GAME_OVER = "GAME-OVER";              
    exports.O_GAME_OVER = {
        type: exports.T_GAME_OVER,
        data: null
    };


}(typeof exports === "undefined" ? this.Messages = {} : exports));
//if exports is undefined, we are on the client; else the server