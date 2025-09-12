import '../css/style.css';

const clickMeButton = document.querySelector("#btn-start");
const homeSection = document.querySelector("#home");
const gameSection = document.querySelector("#game");
/* console.log(clickMeButton); */

clickMeButton.addEventListener('click', function () {
    homeSection.style.display = "none";
    gameSection.style.display = "grid";
});

const clickMePicture = document.querySelector(".box5 img");
clickMePicture.addEventListener('click', function () {
    homeSection.style.display = "grid";
    gameSection.style.display = "none";
});

const clickSymbol1 = document.querySelector("#symbol1");
const clickSymbol2 = document.querySelector("#symbol2");
const clickSymbol3 = document.querySelector("#symbol3");
const clickSymbol4 = document.querySelector("#symbol4");
const clickSymbol5 = document.querySelector("#symbol5");

let choice;

function randomSymbol() {
    return Math.floor(Math.random() * 5) + 1;
}
let randomNum = randomSymbol();

/* 	
        Computer
User        Stein(1)	Schere(2)	Papier(3)	Spock(4)    Echse(5)
Stein(1)	O		    +		    −	        −	        +
Schere(2)	−	        O	        +	        −	        +
Papier(3)	+	        −	        O	        +	        −
Spock(4)	+	        +	        −	        O	        −
Echse(5)	−	        −	        +	        +	        O 

User gewinnt, wenn nicht unentschieden und:
1 <--> 2 || 5
2 <--> 3 || 5
3 <--> 1 || 4
4 <--> 1 || 2
5 <--> 3 || 4

*/

let userNum = {
    gameUserNum: 0,
    matchUserNum: 0
}

let compNum = {
    gameCompNum: 0,
    matchCompNum: 0
}

function changeCounter(object) {
    if (object === userNum) {
        if (object.gameUserNum < 1) {
            object.gameUserNum += 1;
        } else {
            if (object.matchUserNum < 1) {
                object.matchUserNum += 1;
                object.gameUserNum = 0;
                return object;
            } else {
                object.gameUserNum = 0;
                object.matchUserNum = 0;
                console.log("User hat das Spiel gewonnen")
                return object;
            }
        }
    } else {
        if (object.gameCompNum < 1) {
            object.gameCompNum += 1;
        } else {
            if (object.matchCompNum < 1) {
                object.matchCompNum += 1;
                object.gameCompNum = 0;
                return object;
            } else {
                object.gameCompNum = 0;
                object.matchCompNum = 0;
                console.log("Computer hat das Spiel gewonnen");
                return object;
            }
        }
    }
    return object;
}

function createInfo(choice, randomNum) {
    if ((choice === 1 && randomNum === 2) || (choice === 2 && randomNum === 1)) {
        console.log("Stein macht die Schere stumpf.")
    }
    if ((choice === 1 && randomNum === 5) || (choice === 5 && randomNum === 1)) {
        console.log("Stein zerquetscht Echse.")
    }
    if ((choice === 2 && randomNum === 3) || (choice === 3 && randomNum === 2)) {
        console.log("Schere zerschneidet Papier.")
    }
    if ((choice === 2 && randomNum === 5) || (choice === 5 && randomNum === 2)) {
        console.log("Schere köpft die Echse.")
    }
    if ((choice === 3 && randomNum === 1) || (choice === 1 && randomNum === 3)) {
        console.log("Papier wickelt den Stein ein.")
    }
    if ((choice === 3 && randomNum === 4) || (choice === 4 && randomNum === 3)) {
        console.log("Papier widerlegt Spock.")
    }
    if ((choice === 4 && randomNum === 1) || (choice === 1 && randomNum === 4)) {
        console.log("Spock verdampft Stein.")
    }
    if ((choice === 4 && randomNum === 2) || (choice === 2 && randomNum === 4)) {
        console.log("Spock zertrümmert Schere.")
    }
    if ((choice === 5 && randomNum === 3) || (choice === 3 && randomNum === 5)) {
        console.log("Echse frisst Papier.")
    }
    if ((choice === 5 && randomNum === 4) || (choice === 4 && randomNum === 5)) {
        console.log("Echse vergiftet Spock")
    }
}

function handleChoice(choiceValue: number) {
    choice = choiceValue;
    if (choice === randomNum) {
        console.log("Unentschieden !!!");
        randomNum = randomSymbol();

    } else if (
        (choice === 1 && (randomNum === 2 || randomNum === 5)) ||
        (choice === 2 && (randomNum === 3 || randomNum === 5)) ||
        (choice === 3 && (randomNum === 1 || randomNum === 4)) ||
        (choice === 4 && (randomNum === 1 || randomNum === 2)) ||
        (choice === 5 && (randomNum === 3 || randomNum === 4))
    ) {
        createInfo(choice, randomNum);

        console.log("User gewinnt!")
        console.log("User gewinnt: " + userNum.gameUserNum, userNum.matchUserNum);
        userNum = changeCounter(userNum);
        console.log("User gewinnt: " + userNum.gameUserNum, userNum.matchUserNum);
        randomNum = randomSymbol();

    } else {
        createInfo(choice, randomNum);

        console.log("Computer gewinnt!");
        console.log("Computer gewinnt: " + compNum.gameCompNum, compNum.matchCompNum);
        compNum = changeCounter(compNum);
        console.log("Computer gewinnt: " + compNum.gameCompNum, compNum.matchCompNum);
        randomNum = randomSymbol();

    }
}

clickSymbol1.addEventListener('click', function () {
    handleChoice(1);
});
clickSymbol2.addEventListener('click', function () {
    handleChoice(2);
});
clickSymbol3.addEventListener('click', function () {
    handleChoice(3);
});
clickSymbol4.addEventListener('click', function () {
    handleChoice(4);
});
clickSymbol5.addEventListener('click', function () {
    handleChoice(5);
});
