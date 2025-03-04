/* 
 In-memory game statistics "tracker".
 As future work, this object should be replaced by a DB backend.
*/

var gameStatus = {
    since : Date.now(),     /* since we keep it simple and in-memory, keep track of when this object was created */
    gamesInitialized : 0,   /* number of games initialized */
    gamesAborted : 0,       /* number of games aborted */
    gamesCompleted : 0,      /* number of games successfully completed */
    turnsPlayed : 0,
    currWaiting : 0,
    cookiez: 0
};

module.exports = gameStatus;