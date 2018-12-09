/* ESLint global variables information */
/* global Setup */
var Status = {};
Status["gameWon"] = "Congratulations! You won!";
Status["gameLost"] = "Game over. You lost!";
Status["playAgain"] = " <a href='/play'>Play again!</a>";
Status["player1Intro"] = "Hello there, waiting for player 2 to join!!!!!!!!!!! ";
Status["prompt"] = "Word to guess";
Status["promptAgainLength"] = "Try again! 5-15 [A-Z] characters please!";
Status["promptChars"] = "Try again! A-Z only!";
Status["promptEnglish"] = "Try again, it has to be a valid English word!";
Status["chosen"] = "Your chosen word: ";
Status["player2Intro"] = "You win if you obtain a higher score than your opponent in " + Setup.MAX_ALLOWED_TURNS +" tries.";
Status["playerSecondIntro"] = "Let's go! You win if you obtain a higher score than your opponent in " + Setup.MAX_ALLOWED_TURNS +" tries.";
Status["played"] = "Player 2 made a turn ";
Status["aborted"] = "Your gaming partner is no longer available, game aborted. " + Status["playAgain"];
