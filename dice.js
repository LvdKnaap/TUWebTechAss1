let throwsLeft = 3;

function throwDice() {
    if (throwsLeft > 0) {
        let d1 = document.getElementById("die1");
        let d2 = document.getElementById("die2");
        let d3 = document.getElementById("die3");
        let d4 = document.getElementById("die4");
        let d5 = document.getElementById("die5");
        if (throwsLeft === 1) {
            d1.innerHTML = 6;
            d2.innerHTML = 6;
            d3.innerHTML = 6;
            d4.innerHTML = 6;
            d5.innerHTML = 6;

            document.getElementById("yahtzeeThrown").style.display = 'block';
        } else {
            d1.innerHTML = Math.floor(Math.random()*6)+1;
            d2.innerHTML = Math.floor(Math.random()*6)+1;
            d3.innerHTML = Math.floor(Math.random()*6)+1;
            d4.innerHTML = Math.floor(Math.random()*6)+1;
            d5.innerHTML = Math.floor(Math.random()*6)+1;
        }
        throwsLeft--;  
        remainingThrows.innerHTML = 'Remaining throws: '+throwsLeft;
    } else {
        window.alert("No more throws left");
    }
}
