let throwsLeft = 3;
let selected = [false, false, false, false, false];
let currDice = [0, 0, 0, 0, 0];
let upperScore = 0; let lowerScore = 0;
let totScore = 0;
let bonusUnlockedPlayer1 = false;
let selectedCategories = 0;
let currentScore = 0;
let lowerScore = 0;
let upperScore = 0;


function deselectAll() {
    for (let i = 0; i < selected.length; i++) {
        let dieName = "die" + (i + 1);
        selected[i] = false;
        document.getElementById(dieName).style.background = 'darkred';
    }
}

function categorySelected() {
    selectedCategories++;
    if (selectedCategories == 13) {
        window.alert("congrats, you got " + totScore +  " points");
    }
    throwsLeft = 3;
    remainingThrows.innerHTML = 'Remaining throws: ' + throwsLeft;
    for (let i = 0; i < selected.length; i++) {
        let dieName = "die" + (i + 1);
        document.getElementById(dieName).value = "?";
        currDice[i] = 0;
        selected[i] = true; // icm met volgende line gaan ook de kleuren weer terug naar rood
    }
    deselectAll();
}

function checkWhetherWeCanSelectACategory() {
    if (currDice[0] == 0) {
        window.alert("You already selected a category this turn. Throw again");
        return false;
    } else {
        return true;
    }
}

function numbers(s) { // s = {0,...,5}
    if (checkWhetherWeCanSelectACategory()) {
        let strL;
        let strU;
        switch (s) {
            case 0:
                strL = 'ones'; strU = 'Ones'; // strL denotes lowercase, strU uppercase
                break;
            case 1:
                strL = 'twos'; strU = 'Twos';
                break;
            case 2:
                strL = 'threes'; strU = 'Threes';
                break;
            case 3:
                strL = 'fours'; strU = 'Fours';
                break;
            case 4:
                strL = 'fives'; strU = 'Fives';
                break;
            default:
                strL = 'sixes'; strU = 'Sixes';
                break;
        }
        strL = strL + 'Player1';
        strU = 'button' + strU;

        let score = 0; let value = s + 1; // value voor copy/pasten, is 2 voor twos etc
        for (let i = 0; i < selected.length; i++) {
            if (currDice[i] == value) {
                score += value;
            }
        }

        categorySelected();
        document.getElementById(strU).disabled = true;
        document.getElementById(strL).style.color = 'darkred'; // change to green if css implemented
    }
}



function smallStraight() {
    if (checkWhetherWeCanSelectACategory()) {
        let kleineStraat = false;
        // alle opties voor kleine straat: 1-2-3-4, 2-3-4-5, 3-4-5-6 
        if (currDice.includes(3) && currDice.includes(4)) {
            if (currDice.includes(1) && currDice.includes(2)) {
                kleineStraat = true;
            }
            if (currDice.includes(2) && currDice.includes(5)) {
                kleineStraat = true;
            }
            if (currDice.includes(5) && currDice.includes(6)) {
                kleineStraat = true;
            }
        }
        if (kleineStraat) {
            currentScore = 30;
            lowerScore += 30;
        } 
        categorySelected();
    }
}
