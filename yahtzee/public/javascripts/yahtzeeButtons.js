const USED = -1; //letter has been used, not available anymore
const AVAIL = 1; //letter has not been used yet

function YahtzeeButtons() {

    this.buttons = undefined;

    this.initialize = function () {
        this.buttons = {
            Ones: AVAIL,
            Twos: AVAIL,
            Threes: AVAIL,
            Fours: AVAIL,
            Fives: AVAIL,
            Sixes: AVAIL,
            ThreeKind: AVAIL,
            FourKind: AVAIL,
            FullHouse: AVAIL,
            SmallStraight: AVAIL,
            LargeStraight: AVAIL,
            Yahtzee: AVAIL,
            Chance: AVAIL
        };
    };

    //is it an available letter?
    this.isButtonAvailable = function (button) {
        return this.buttons[button] == AVAIL;
    };

    this.makeButtonUnAvailable = function (button) {
        this.buttons[button] = USED;

        //visually switch off the UI element by simply adding a classname
        document.getElementById(button).disabled = true;
    };
}

