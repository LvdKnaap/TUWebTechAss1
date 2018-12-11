let throwsLeft = 3;
let selected = [false, false, false, false, false];
let currDice = [0, 0, 0, 0, 0];
let upperScore = 0; let lowerScore = 0;
let totScore = 0;
let bonusUnlockedPlayer1 = false;
let selectedCategories = 0;
let currentScore = 0;

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
}

function selectDeselect(i) {
    if (currDice[0] != 0) {
        let dieName = "die" + (i + 1);
        if (selected[i]) {
            selected[i] = false;
            document.getElementById(dieName).style.background = 'darkred';
        } else {
            selected[i] = true;
            document.getElementById(dieName).style.background = 'white';
        }
    }
}

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

        document.getElementById(strL).innerHTML = score;
        upperScore += score;
        totalUpperScorePlayer1.innerHTML = upperScore;
        totalRemainingPointsBonusPlayer1.innerHTML = Math.max(0, 63 - upperScore);
        if (upperScore >= 63 && !bonusUnlockedPlayer1) {
            bonusScorePlayer1.innerHTML = 35;
            upperScore += 35;
            bonusUnlockedPlayer1 = true;
            totalUpperScorePlayer1.innerHTML = upperScore;
        }
        totScore = lowerScore + upperScore;
        totalScorePlayer1.innerHTML = totScore;


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

function largeStraight() {
    if (checkWhetherWeCanSelectACategory()) {
        let groteStraat = false;
        // alle opties voor kleine straat: 1-2-3-4-5, 2-3-4-5-6
        if (currDice.includes(2) && currDice.includes(3) && currDice.includes(4) && currDice.includes(5)) {
            if (currDice.includes(1) || currDice.includes(6)) {
                groteStraat = true;
            }
        }
        if (groteStraat) {
            currentScore = 40;
            lowerScore += 40;
        } 
        
        categorySelected();
    }
}

function fullHouse() {
    if (checkWhetherWeCanSelectACategory()) {
        let fullHouse = false;

        let highDice = 0; let lowDice = 7;
        for (let i = 0; i < currDice.length; i++) {
            if (currDice[i] > highDice) {
                highDice = currDice[i];
            }
            if (currDice[i] < lowDice) {
                lowDice = currDice[i];
            }
        }
        let highCount = 0; let lowCount = 0;
        for (let i = 0; i < currDice.length; i++) {
            if (currDice[i] == highDice) {
                highCount++;
            }
            if (currDice[i] == lowDice) {
                lowCount++;
            }
        }

        if ((highCount == 3 && lowCount == 2) || (highCount == 2 && lowCount == 3)) {
            fullHouse = true;
        }

        if (fullHouse) {
            currentScore = 25;
            lowerScore += 25;
        }

        categorySelected();
    }
}

function threeOfAKind() {
    if (checkWhetherWeCanSelectACategory()) {
        let threeOfAKind = false;

        let currDiceCopy = [];
        for (let i = 0; i < currDice.length; i++) {
            currDiceCopy.push(currDice[i]);
        }
        currDiceCopy.sort();

        if (currDiceCopy[0] == currDiceCopy[1] && currDiceCopy[1] == currDiceCopy[2]) {
            threeOfAKind = true;
        }
        if (currDiceCopy[1] == currDiceCopy[2] && currDiceCopy[2] == currDiceCopy[3]) {
            threeOfAKind = true;
        }
        if (currDiceCopy[2] == currDiceCopy[3] && currDiceCopy[3] == currDiceCopy[4]) {
            threeOfAKind = true;
        }
        console.log(threeOfAKind);
        if (threeOfAKind) {
            let som = 0;
            for (let i = 0; i < currDice.length; i++) {
                som += currDice[i];
            }
            threeOfAKindPlayer1.innerHTML = som;
            lowerScore += som;
            totalLowerScorePlayer1.innerHTML = lowerScore;
        } else {
            threeOfAKindPlayer1.innerHTML = 0;
        }
        totScore = lowerScore + upperScore;
        totalScorePlayer1.innerHTML = totScore;
        categorySelected();
        document.getElementById("buttonThreeOfAKind").disabled = true;
        document.getElementById("threeOfAKindPlayer1").style.color = 'darkred';
    }
}

function fourOfAKind() {
    if (checkWhetherWeCanSelectACategory()) {
        let fourOfAKind = false;

        let currDiceCopy = [];
        for (let i = 0; i < currDice.length; i++) {
            currDiceCopy.push(currDice[i]);
        }
        currDiceCopy.sort();

        if (currDiceCopy[0] == currDiceCopy[1] && currDiceCopy[1] == currDiceCopy[2] && currDiceCopy[2] == currDiceCopy[3]) {
            fourOfAKind = true;
        }
        if (currDiceCopy[1] == currDiceCopy[2] && currDiceCopy[2] == currDiceCopy[3] && currDiceCopy[3] == currDiceCopy[4]) {
            fourOfAKind = true;
        }

        if (fourOfAKind) {
            let som = 0;
            for (let i = 0; i < currDice.length; i++) {
                som += currDice[i];
            }
            fourOfAKindPlayer1.innerHTML = som;
            lowerScore += som;
            totalLowerScorePlayer1.innerHTML = lowerScore;
        } else {
            fourOfAKindPlayer1.innerHTML = 0;
        }
        totScore = lowerScore + upperScore;
        totalScorePlayer1.innerHTML = totScore;
        categorySelected();
        document.getElementById("buttonFourOfAKind").disabled = true;
        document.getElementById("fourOfAKindPlayer1").style.color = 'darkred';
    }
}

function chance() {
    if (checkWhetherWeCanSelectACategory()) {
        let som = 0;
        for (let i = 0; i < currDice.length; i++) {
            som += currDice[i];
        }
        chancePlayer1.innerHTML = som;
        lowerScore += som;
        totalLowerScorePlayer1.innerHTML = lowerScore;
        totScore = lowerScore + upperScore;
        totalScorePlayer1.innerHTML = totScore;
        categorySelected();
        document.getElementById("buttonChance").disabled = true;
        document.getElementById("chancePlayer1").style.color = 'darkred';
    }
}

function yahtzee() {
    if (checkWhetherWeCanSelectACategory()) {
        if (currDice[0] == currDice[1] && currDice[1] == currDice[2] && currDice[2] == currDice[3] && currDice[3] == currDice[4]) {
            yahtzeePlayer1.innerHTML = 50; // wat hier
            lowerScore += currDice[0] + currDice[1] + currDice[2] + currDice[3] + currDice[4];
            totalLowerScorePlayer1.innerHTML = lowerScore;
            totScore = lowerScore + upperScore; 
            totalScorePlayer1.innerHTML = totScore; 
        } else {
            yahtzeePlayer1.innerHTML = 0;
        }
        categorySelected(); // hier hier hier gaat niet goed
        document.getElementById("buttonYahtzee").disabled = true; // hier hier hier gaat niet goed
        document.getElementById("yahtzeePlayer1").style.color = 'darkred';
    }
}