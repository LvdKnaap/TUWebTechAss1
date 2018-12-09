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

