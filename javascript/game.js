var started = false;
var wins = 0;
var losses = 0;
var maxguesses = 6;
var guessedword = [];
var guessedletters = [];
var word = {
    "word": "",
    "correct": 0,
    "incorrect": 0,
    "hint": "",
    "definition": "",

    setWordInfo: function (newword) {
        this.word= newword[0];
        this.definition=newword[1];
        this.hint=newword[2];
    }
};
document.onkeyup = function (event) {
    var letter = event.key.toUpperCase();
    var matches = letter.match(/[A-Z]+/g);
    console.log("onkeyup  "+letter);
    console.log("started: "+started +"  matches: "+matches);
    if(!started || !matches)    return;
    makeGuess(letter);
    console.log(letter);
    checkWinLose();
    updateDisplay();
}

function evaluate (letter) {
    console.log("evaluate...");
    var idxOfLetter = [];
    for(var i =0;i<this.word.word.length;i++){
        if(this.word.word[i].toUpperCase() === letter) {
            console.log("pushing idx "+i +"  for letter "+letter);
            idxOfLetter.push(i);
        }
    }

    if(idxOfLetter.length > 0) {
        for(var i=0;i<idxOfLetter.length;i++){
            console.log("pushing idx "+i +"  for letter "+letter + "to guessedword");
            guessedword[idxOfLetter[i]] = letter;
        }
    }
    //bad guess
    else {
        this.word.incorrect++;
    }
}
function checkWinLose() {
    if(guessedword.indexOf("_") === -1) {
        //win
        wins++;
        setImageVisible("winner",true);
    }
    else if (maxguesses - this.word.incorrect <= 0) {
        //loser
        losses++;
        setImageVisible("loser",true);
        guessedword = this.word.word.toUpperCase();

    }
}

function makeGuess(letter) {
   if(maxguesses - this.word.incorrect >= 0) {
        //check if letter has been used
        if(guessedletters.indexOf(letter) === -1) {
            guessedletters.push(letter);
            evaluate(letter);
        }
    }
}
function pickWord() {
    var temp = words[Math.floor(Math.random() * words.length)];
    word.setWordInfo(temp);
    //initialize guessedword
    for(var i=0;i<this.word.word.length; i++){
        if(this.word.word[i]=== " ")             guessedword.push(" ");
        // else if(this.word.word[i] === "-")      guessedword.push("-");
        else                                    guessedword.push("_");
    }
    console.log("current word "+this.word.word);
    updateDisplay();
}

function updateDisplay() {
    document.getElementById("wins").innerHTML = wins;
    document.getElementById("losses").innerHTML = losses;
    document.getElementById("this-correct").innerHTML = this.word.correct;
    document.getElementById("this-incorrect").innerHTML = this.word.incorrect;
    document.getElementById("this-hint").innerHTML = this.word.hint;
    document.getElementById("this-definition").innerHTML = this.word.definition;
    //update the word
    var temp = "";
    for(var i=0;i<guessedword.length; i++) {
        temp += "<span class=\"bigText\">";
        if(guessedword[i] === " ")      temp+= "&nbsp;";
        else                            temp+= guessedword[i];
        temp += "</span>"
    }
    document.getElementById("currentword").innerHTML = temp;
    //update the guessed letters
    var temp = "";
    for(var i=0;i<guessedletters.length; i++) {
        temp += "<span class=\"bigText\">";
        temp+= guessedletters[i];
        temp += "</span>"
    }
    document.getElementById("guessedletters").innerHTML = temp;
    var imgPath = "images/"

    switch (maxguesses - this.word.incorrect) {
    case 0:
        imgPath += (started)?"gameover.png" : "start.png";
        break;
    case 1:
        imgPath += "inc5.png";
        break;
    case 2:
        imgPath += "inc4.png";
        break;
    case 3:
        imgPath += "inc3.png";
        break;
    case 4:
        imgPath += "inc2.png";
        break;
    case 5:
        imgPath += "inc1.png";
        break;
    default:
        imgPath += "start.png";
    }
    document.getElementById("g-image").src = imgPath;
}
function startGame() {
    started = true;
    pickWord();
}
// function quitGame() {
//     resetGame();
//     started = false;
// }
function resetGame() {
    // started = true;
    this.word.incorrect=0;
    this.word.correct=0;
    setImageVisible("winner", false);
    setImageVisible("loser", false);
    guessedletters = [];
    guessedword = [];
}
function playAgain() {
    if(!started)  return;
    resetGame();
    pickWord();
}
function setImageVisible(id, visible) {
    var img = document.getElementById(id);
    img.style.visibility = (visible ? 'visible' : 'hidden');
}
