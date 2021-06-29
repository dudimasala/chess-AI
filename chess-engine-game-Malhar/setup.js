//By Malhar Rajpal - Dudimasala - June 2021
const board = document.querySelector('.board');
const boardletters = document.querySelector('.letters');
const boardnumbers = document.querySelector(".numbers");
let letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
let index = 0;
let black = true;
let num = 1;
let directionOffSets = [8, -8, -1, 1, 7, -7, 9, -9];
let knightOffSets = [6, -6, 10, -10, 15, -15, 17, -17];
let possibleMoves = [];
function isInteger(value) {
    return /^\d+$/.test(value);
}

function setupUIClick(ele) {
    ele.addEventListener('click', function() {
        change = true;
        if(document.querySelector('.clickedImage')) {
            if(document.querySelector('.clickedImage') === ele) {
                change = false;
            }
            document.querySelector('.clickedImage').parentElement.classList.remove('clickedSquare');
            document.querySelector('.clickedImage').classList.remove('clickedImage');
            document.querySelectorAll('.square').forEach(function(ele) {
                ele.classList.remove('squareSelected');
            })
        }
        if(change) {

            ele.classList.add('clickedImage');
            ele.parentElement.classList.add('clickedSquare');
            document.querySelectorAll('.square').forEach(function(ele) {
                ele.classList.add('squareSelected');
            })
        }    
    })
}
for (let i=7; i>=0;i--) {
    let letter = document.createElement("li");
    letter.textContent = letters[i];
    boardletters.appendChild(letter);
    let numbers = document.createElement('li');
    numbers.textContent = num++
    boardnumbers.appendChild(numbers);
}


for(let sq = 0; sq < 64; sq++) { 
    const square=document.createElement('div');
    if(black) {
        square.classList.add('square');
        square.classList.add('white');
        index++;
        black = !black;
        }
    else {
        square.classList.add('square');
        square.classList.add('black');
        index++;
        black = !black;   
    }  
    if(sq % 8 === 7) {
        black = !black;
    }
    let firstNum = 63-sq;
    let secondNum = firstNum % 8;
    let thirdNum = firstNum - secondNum;
    secondNum = 7 - secondNum;
    let finalNum = thirdNum + secondNum;
    

    let sqClass = `--${finalNum}`;
    square.classList.add(sqClass);
    board.appendChild(square);   
    
}

//check this is it effective??????
document.querySelectorAll('.square').forEach(function(ele) {
    ele.addEventListener('click', function() {
        if(ele.hasChildNodes()) {
            let itsChild = Array.from(ele.children)[0];
            if(!(itsChild.classList.contains('movable'))) {
                if(document.querySelector('.clickedImage')) {          
                    document.querySelector('.clickedImage').parentElement.classList.remove('clickedSquare');
                    document.querySelector('.clickedImage').classList.remove('clickedImage');
                    document.querySelectorAll('.square').forEach(function(ele) {
                        ele.classList.remove('squareSelected');
                    })
                }    
            }
        } else {
            if(document.querySelector('.clickedImage')) {          
                document.querySelector('.clickedImage').parentElement.classList.remove('clickedSquare');
                document.querySelector('.clickedImage').classList.remove('clickedImage');
                document.querySelectorAll('.square').forEach(function(ele) {
                    ele.classList.remove('squareSelected');
                })
            }    
        }
    })
});