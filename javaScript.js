for (let i = 65; i <= 90; ++i) {
    let numberToLetter = String.fromCharCode(i);
    document.getElementById("alphabet").innerHTML +=
        '<button type="button" class="btn-lg btn-info" style="font-weight: bold;"onclick="verifyLetter(\'' + numberToLetter + "');\">" + numberToLetter + "</button>";
}

document.getElementById("number of lives").style.visibility = "hidden";
document.getElementById("number of guesses").style.visibility = "hidden";

function hideAndSeek() {
    let insertedWord = document.getElementById("wordAdd").value;
    let hiddenWord = document.getElementById("display1");
    let charLetter = insertedWord.split("");
    charLetter.forEach((l, i) => {
        document.getElementById("letter guessed").innerHTML = guess;
        document.getElementById("number of lives").style.visibility = "visible";
        document.getElementById("livesLeft").innerHTML = lives;
        document.getElementById("number of guesses").style.visibility = "visible";
        hiddenWord.innerHTML = " ";
        for (let i = 0; i < insertedWord.length; i++) {
            let line = document.createElement("span");
            line.innerHTML = "⚫";
            line.id = i;
            hiddenWord.appendChild(line);
        }
    });
}

let guessed = document.getElementById("letter guessed");
let livesLeft = document.getElementById("livesLeft");
let showWordIfGameLost = document.getElementById("outcomes");
let positiveResult = document.getElementById("game result");
let negativeResult = document.getElementById("game result");

let guess = 0,
let lives = 6;
let wrongLettersList = [];

function showList() {
    let messageBox = document.getElementById("outcomes");
    messageBox.innerHTML = "";
    messageBox.innerHTML += "Wrong letters: " + wrongLettersList.join(", ");
}

function verifyLetter(letterParametre) {
    let addedWord = document.getElementById("wordAdd").value;
    let charLetter = addedWord.split("");
    let letterOccurrence = 0;
    if (guess < addedWord.length && lives != 0) {
        for (let i = 0; i < addedWord.length; i++) {
            if (letterParametre == charLetter[i].toUpperCase()) {
                let emptyLines = document.getElementById(i);
                if (emptyLines.innerText == "⚫") {
                    emptyLines.innerText = charLetter[i];
                }
                guess++;
                letterOccurrence++;
                guessed.innerHTML = guess;
            }
            if (letterParametre != charLetter[i] && i == addedWord.length - 1) {
                if (letterOccurrence == 0) {
                    lives--;
                    livesLeft.innerHTML = lives;
                    wrongLettersList.push(letterParametre);
                    letterOccurrence = 0;
                    showList();
                }
            }
        }
    }
    if (lives == 0) {
        negativeResult.innerHTML = "Looser!";
        showWordIfGameLost.innerHTML = "CORRECT WORD:" + " " + addedWord;
    }
    if (guess == addedWord.length && lives != 0) {
        positiveResult.innerHTML = "Winner!";
    }
}
