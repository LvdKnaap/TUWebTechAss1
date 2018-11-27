let throwsLeft = 3;
let selected = [false, false, false, false, false];
let currDice = [0, 0, 0, 0, 0];
let upperScore = 0; let lowerScore = 0;
let bonusUnlockedPlayer1 = false;

function throwDice() {
    if (throwsLeft > 0) {
        for (let i = 0; i < selected.length; i++) {
            if (!selected[i]) {
                let dieName = "die" + (i + 1);
                let newValue = Math.floor(Math.random() * 6) + 1;
                document.getElementById(dieName).value = newValue;
                currDice[i] = newValue;
            }
        }
        throwsLeft--;
        remainingThrows.innerHTML = 'Remaining throws: ' + throwsLeft;
    } else {
        window.alert("No more throws left. Select a category below.");
    }
    document.getElementById("clickDiceToHold").style.display = 'block';
    showPotentialScores();
}

function selectDeselect(i) {
    let dieName = "die" + (i + 1);
    if (selected[i]) {
        selected[i] = false;
        document.getElementById(dieName).style.background = 'red';

    } else {
        selected[i] = true;
        document.getElementById(dieName).style.background = 'lightgrey';
    }
}

function categorySelected() {
    throwsLeft = 3;
    remainingThrows.innerHTML = 'Remaining throws: ' + throwsLeft;
    for (let i = 0; i < selected.length; i++) {
        let dieName = "die" + (i + 1);
        document.getElementById(dieName).value = "?";
        currDice[i] = 0;
        selected[i] = true; // icm met volgende line gaan ook de kleuren weer terug naar rood
        selectDeselect(i);
    }
}
/*
function showPotentialScores() {
    let values = [0,0,0,0,0,0];
    for (let i = 0; i < currDice.length; i++) {
        values[currDice[i]-1] += currDice[i];
    }
    onesPlayer1.innerHTML = values[0];
    twosPlayer1.innerHTML = values[1];
    threesPlayer1.innerHTML = values[2];
    foursPlayer1.innerHTML = values[3];
    fivesPlayer1.innerHTML = values[4];
    sixesPlayer1.innerHTML = values[5];
}
*/

function checkWhetherWeCanSelectACategory() {
    if (currDice[0] == 0) {
        window.alert("You already selected a category this turn. Throw again");
        return false;
    } else {
        return true;
    }
}

function ones() {
    if (checkWhetherWeCanSelectACategory()) {
        let score = 0; let value = 1; // value voor copy/pasten, is 2 voor twos etc
        for (let i = 0; i < selected.length; i++) {
            if (currDice[i] == value) {
                score += value;
            }
        }
        onesPlayer1.innerHTML = score;
        upperScore += score;
        totalUpperScorePlayer1.innerHTML = upperScore;
        totalRemainingPointsBonus.innerHTML = Math.max(0, 63 - upperScore);
        if (upperScore >= 63 && !bonusUnlockedPlayer1) {
            bonusScorePlayer1.innerHTML = 35;
            upperScore += 35;
            bonusUnlockedPlayer1 = true;
            totalUpperScorePlayer1.innerHTML = upperScore;
        }
        categorySelected();
        document.getElementById("buttonOnes").disabled = true;
    }
}

function twos() {
    if (checkWhetherWeCanSelectACategory()) {
        let score = 0; let value = 2; // value voor copy/pasten, is 2 voor twos etc
        for (let i = 0; i < selected.length; i++) {
            if (currDice[i] == value) {
                score += value;
            }
        }
        twosPlayer1.innerHTML = score;
        upperScore += score;
        totalUpperScorePlayer1.innerHTML = upperScore;
        totalRemainingPointsBonus.innerHTML = Math.max(0, 63 - upperScore);
        if (upperScore >= 63 && !bonusUnlockedPlayer1) {
            bonusScorePlayer1.innerHTML = 35;
            upperScore += 35;
            bonusUnlockedPlayer1 = true;
            totalUpperScorePlayer1.innerHTML = upperScore;
        }
        categorySelected();
        document.getElementById("buttonTwos").disabled = true;
    }
}

function threes() {
    if (checkWhetherWeCanSelectACategory()) {
        let score = 0; let value = 3; // value voor copy/pasten, is 2 voor twos etc
        for (let i = 0; i < selected.length; i++) {
            if (currDice[i] == value) {
                score += value;
            }
        }
        threesPlayer1.innerHTML = score;
        upperScore += score;
        totalUpperScorePlayer1.innerHTML = upperScore;
        totalRemainingPointsBonus.innerHTML = Math.max(0, 63 - upperScore);
        if (upperScore >= 63 && !bonusUnlockedPlayer1) {
            bonusScorePlayer1.innerHTML = 35;
            upperScore += 35;
            bonusUnlockedPlayer1 = true;
            totalUpperScorePlayer1.innerHTML = upperScore;
        }
        categorySelected();
        document.getElementById("buttonThrees").disabled = true;
    }
}

function fours() {
    if (checkWhetherWeCanSelectACategory()) {
        let score = 0; let value = 4; // value voor copy/pasten, is 2 voor twos etc
        for (let i = 0; i < selected.length; i++) {
            if (currDice[i] == value) {
                score += value;
            }
        }
        foursPlayer1.innerHTML = score;
        upperScore += score;
        totalUpperScorePlayer1.innerHTML = upperScore;
        totalRemainingPointsBonus.innerHTML = Math.max(0, 63 - upperScore);
        if (upperScore >= 63 && !bonusUnlockedPlayer1) {
            bonusScorePlayer1.innerHTML = 35;
            upperScore += 35;
            bonusUnlockedPlayer1 = true;
            totalUpperScorePlayer1.innerHTML = upperScore;
        }
        categorySelected();
        document.getElementById("buttonFours").disabled = true;
    }
}

function fives() {
    if (checkWhetherWeCanSelectACategory()) {
        let score = 0; let value = 5; // value voor copy/pasten, is 2 voor twos etc
        for (let i = 0; i < selected.length; i++) {
            if (currDice[i] == value) {
                score += value;
            }
        }
        fivesPlayer1.innerHTML = score;
        upperScore += score;
        totalUpperScorePlayer1.innerHTML = upperScore;
        totalRemainingPointsBonus.innerHTML = Math.max(0, 63 - upperScore);
        if (upperScore >= 63 && !bonusUnlockedPlayer1) {
            bonusScorePlayer1.innerHTML = 35;
            upperScore += 35;
            bonusUnlockedPlayer1 = true;
            totalUpperScorePlayer1.innerHTML = upperScore;
        }
        categorySelected();
        document.getElementById("buttonFives").disabled = true;
    }
}

function sixes() {
    if (checkWhetherWeCanSelectACategory()) {
        let score = 0; let value = 6; // value voor copy/pasten, is 2 voor twos etc
        for (let i = 0; i < selected.length; i++) {
            if (currDice[i] == value) {
                score += value;
            }
        }
        sixesPlayer1.innerHTML = score;
        upperScore += score;
        totalUpperScorePlayer1.innerHTML = upperScore;
        totalRemainingPointsBonus.innerHTML = Math.max(0, 63 - upperScore);
        if (upperScore >= 63 && !bonusUnlockedPlayer1) {
            bonusScorePlayer1.innerHTML = 35;
            upperScore += 35;
            bonusUnlockedPlayer1 = true;
            totalUpperScorePlayer1.innerHTML = upperScore;
        }
        categorySelected();
        document.getElementById("buttonSixes").disabled = true;
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
            smallStraightPlayer1.innerHTML = 30;
        } else {
            smallStraightPlayer1 = 0;
        }
        categorySelected();
        document.getElementById("buttonSmallStraight").disabled = true;
    }
}

