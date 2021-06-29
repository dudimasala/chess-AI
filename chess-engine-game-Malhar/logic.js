//By Malhar Rajpal - Dudimasala - June 2021

let helperFunction = (function() {
    let whitePieceCount = 16;
    let whiteMajPieceCount = 8;
    let whitePawnCount = 8;
    let whiteQueenOnBoard = true;
    let blackPieceCount = 16;
    let blackMajPieceCount = 8;
    let blackPawnCount = 8;
    let blackQueenOnBoard = true;
    let pieceValues = {
        "00": 0,
        "wp": 100,
        "wn": 300,
        "wb": 320,
        "wr": 500,
        "wq": 900,
        "wk": 20000,
        "bp": -100,
        "bn": -300,
        "bb": -320,
        "br": -500,
        "bq": -900,
        "bk": -20000
    };

    let pawnScoreTable = [
        0,   0,   0,   0,   0,   0,   0,   0,
        178, 173, 158, 134, 147, 132, 165, 187,
         94, 100,  85,  67,  56,  53,  82,  84,
         32,  24,  13,   5,  -2,   4,  17,  17,
         13,   9,  -3,  -7,  -7,  -8,   -5,  -1,
          4,   7,  -6,   1,   0,  -5,  -1,  -8,
         13,   8,   8,  10,  13,   0,   2,  -7,
          0,   0,   0,   0,   0,   0,   0,   0
    ];

    let pawnScoreEarlyTable = [
        0,   0,   0,   0,   0,   0,  0,   0,
        98, 134,  61,  95,  68, 126, 34, -11,
        -6,   7,  26,  31,  65,  56, 25, -20,
       -14,  13,   6,  21,  23,  12, 17, -23,
       -27,  -2,  -5,  12,  17,   -50, -30, -25,
       -26,  -4,  -4, -10,   3,   3, 33, -12,
       -35,  -1, -20, -23, -15,  24, 38, -22,
         0,   0,   0,   0,   0,   0,  0,   0
    ];

    let bishopScoreTable = [
        -29,   4, -82, -37, -25, -42,   7,  -8,
        -26,  16, -18, -13,  30,  59,  18, -47,
        -16,  37,  43,  40,  35,  50,  37,  -2,
         -4,   5,  19,  50,  37,  37,   7,  -2,
         -6,  13,  13,  26,  34,  12,  10,   4,
          0,  15,  15,  15,  14,  27,  18,  10,
          4,  15,  16,   0,   7,  21,  33,   1,
        -33,  -3, -14, -21, -13, -12, -39, -21
    ];

    let bishopEndTable = [
        -14, -21, -11,  -8, -7,  -9, -17, -24,
        -8,  -4,   7, -12, -3, -13,  -4, -14,
         2,  -8,   0,  -1, -2,   6,   0,   4,
        -3,   9,  12,   9, 14,  10,   3,   2,
        -6,   3,  13,  19,  7,  10,  -3,  -9,
       -12,  -3,   8,  10, 13,   3,  -7, -15,
       -14, -18,  -7,  -1,  4,  -9, -15, -27,
       -23,  -9, -23,  -5, -9, -16,  -5, -17
    ]

    let knightScoreTable = [
        -167, -89, -34, -49,  61, -97, -15, -107,
        -73, -41,  72,  36,  23,  62,   7,  -17,
        -47,  60,  37,  65,  84, 129,  73,   44,
         -9,  17,  19,  53,  37,  69,  18,   22,
        -13,   4,  16,  13,  28,  19,  21,   -8,
        -23,  -9,  12,  10,  19,  17,  25,  -16,
        -29, -53, -12,  -3,  -1,  18, -14,  -19,
       -105, -21, -58, -33, -17, -28, -19,  -23
    ];

    let knightEndTable = [
        -58, -38, -13, -28, -31, -27, -63, -99,
        -25,  -8, -25,  -2,  -9, -25, -24, -52,
        -24, -20,  10,   9,  -1,  -9, -19, -41,
        -17,   3,  22,  22,  22,  11,   8, -18,
        -18,  -6,  16,  25,  16,  17,   4, -18,
        -23,  -3,  -1,  15,  10,  -3, -20, -22,
        -42, -20, -10,  -5,  -2, -20, -23, -44,
        -29, -51, -23, -15, -22, -18, -50, -64
    ];

    let rookScoreTable = [
        32,  42,  32,  51, 63,  9,  31,  43,
        27,  32,  58,  62, 80, 67,  26,  44,
        -5,  19,  26,  36, 17, 45,  61,  16,
       -24, -11,   7,  26, 24, 35,  -8, -20,
       -36, -26, -12,  -1,  9, -7,   6, -23,
       -45, -25, -16, -17,  3,  0,  -5, -33,
       -44, -16, -20,  -9, -1, 11,  -6, -71,
       -19, -13,   1,  17, 16,  7, -37, -26
    ];

    let rookEndTable = [
        13, 10, 18, 15, 12,  12,   8,   5,
        11, 13, 13, 11, -3,   3,   8,   3,
         7,  7,  7,  5,  4,  -3,  -5,  -3,
         4,  3, 13,  1,  2,   1,  -1,   2,
         3,  5,  8,  4, -5,  -6,  -8, -11,
        -4,  0, -5, -1, -7, -12,  -8, -16,
        -6, -6,  0,  2, -9,  -9, -11,  -3,
        -9,  2,  3, -1, -5, -13,   4, -20
    ]

    let queenScoreTable = [
        -28,   0,  29,  12,  59,  44,  43,  45,
        -24, -39,  -5,   1, -16,  57,  28,  54,
        -13, -17,   7,   8,  29,  56,  47,  57,
        -27, -27, -16, -16,  -1,  17,  -2,   1,
         -9, -26,  -9, -10,  -2,  -4,   3,  -3,
        -14,   2, -11,  -2,  -5,   2,  14,   5,
        -35,  -8,  11,   2,   8,  15,  -3,   1,
         -1, -18,  -9,  10, -15, -25, -31, -50
    ];

    let queenEndTable = [
        -9,  22,  22,  27,  27,  19,  10,  20,
        -17,  20,  32,  41,  58,  25,  30,   0,
        -20,   6,   9,  49,  47,  35,  19,   9,
          3,  22,  24,  45,  57,  40,  57,  36,
        -18,  28,  19,  47,  31,  34,  39,  23,
        -16, -27,  15,   6,   9,  17,  10,   5,
        -22, -23, -30, -16, -16, -23, -36, -32,
        -33, -28, -22, -43,  -5, -32, -20, -41
    ]

    let kingScoreTable = [
        -65,  23,  16, -15, -56, -34,   2,  13,
        29,  -1, -20,  -7,  -8,  -4, -38, -29,
        -9,  24,   2, -16, -20,   6,  22, -22,
       -17, -20, -12, -27, -30, -25, -14, -36,
       -49,  -1, -27, -39, -46, -44, -33, -51,
       -14, -14, -22, -46, -44, -30, -15, -27,
         1,   7,  -8, -64, -43, -16,   9,   8,
       -15,  36,  12, -54,   8, -28,  24,  14
    ];

    let kingScoreEndGame = [
        -74, -35, -18, -18, -11,  15,   4, -17,
        -12,  17,  14,  17,  17,  38,  23,  11,
         10,  17,  23,  15,  20,  45,  44,  13,
         -8,  22,  24,  27,  26,  33,  26,   3,
        -18,  -4,  21,  24,  27,  23,   9, -11,
        -19,  -3,  11,  21,  23,  16,   7,  -9,
        -27, -11,   4,  13,  14,   4,  -5, -17,
        -53, -34, -21, -11, -28, -14, -24, -43
    ]

    let bookOpenings = {
        "1a18": {
            "57a42": {
                "12a28": {
                    "61a34": {
                        "13a29": ["51a43"],
                        "11a19": ["51a43"],
                        "13a21": ["51a43"],
                        "5a26": ["51a43"],
                        "9a17": ["51a43"],
                        "6a21": ["51a43"],
                        "5a33": ["51a43"]
                    }
                },
                "9a17": {
                    "61a34": {
                        "2a9": ["51a43"],
                        "12a28": ["51a43"],
                        "12a20": ["51a43"],
                        "13a29": ["51a43"]
                    }
                },
                "11a19": ["51a43"],

            }
        },

        "12a28": {
            "57a42": {
                "1a18": {
                    "61a34": {
                        "13a29": ["51a43"],
                        "11a19": ["51a43"],
                        "13a21": ["51a43"],
                        "5a26": ["51a43"],
                        "9a17": ["51a43"],
                        "6a21": ["51a43"],
                        "5a33": ["51a43"]
                    }
            
                },
                "13a21": {
                    "61a34": {
                        "1a18": ["51a43"],
                        "5a26": ["51a43"],
                        "11a19": ["51a43"],
                        "5a33": ["51a43"],
                        "9a17": ["51a43"]
                    }
                },
                "13a29": ["51a43"],
                "11a19": {
                    "61a34": {
                        "1a18": ["51a43"],
                        "2a20": ["51a43"],
                        "13a29": ["51a43"],
                        "13a21": ["51a43"],
                        "6a21": ["51a43"],
                        "10a26": ["51a43"]
                    }
                },
                "6a21": ["51a43"],

                "5a26": ["61a34"]
            }
        },

        "11a19": {
            "51a35": {
                "12a28": ["62a45"],
                "13a29": ["57a42"],
                "14a22": ["57a42"],
                "4a32": ["58a44"]
            }
        },

        "12a20": {
            "51a35": {
                "1a18": ["62a45"],
                "9a17": ["62a45"],
                "11a27": ["57a42"]
            }
        },

        "13a29": ["51a43"]

        

        
    }
/*
    let newBookOpenings = {
        "13a29": {
            "57a42": {
                "12a20": {
                    "58a30": {
                        "5a12": ["30a12"],
                        "6a12": ["62a45"],
                        "6a21": ["30a21"]
                    }
                },
                "6a21": {
                    "58a30": {
                        "9a17": ["62a45"],
                        "12a20": ["62a45"],
                        "11a19": ["62a45"],
                        "1a18": ["62a45"]
                    }
                },
                "11a19": {
                    "62a45": {
                        "6a21": ["58a30"],

                    }
                }
            }
        }
    }

*/
    let numSquares = []; 
    

    function preliminaryData() {
        for(let square = 0; square < 64; square++) {
            let sqrRow = Math.floor(square / 8);
            let sqrCol = square % 8;
            let northSq = 7 - sqrRow;
            let southSq = sqrRow
            let westSq = sqrCol;
            let eastSq = 7 - sqrCol;
    
            numSquares[square] = [
                northSq, 
                southSq, 
                westSq, 
                eastSq, 
                Math.min(northSq, westSq), 
                Math.min(southSq, eastSq), 
                Math.min(northSq, eastSq), 
                Math.min(southSq, westSq)
            ]
        }
    }
    preliminaryData();
    function generateSlidingMoves(startSqr, piece, possibleMoves, arrboard, colourToMove, opponentColour) {
        let startDirIndex = piece === "b" ? 4 : 0;
        let endDirIndex = piece === "r" ? 4 : 8;
        for(let direction = startDirIndex; direction < endDirIndex; direction++) {
            for(let i = 0; i<numSquares[startSqr][direction]; i++) {
                let targetSquare = startSqr + directionOffSets[direction] * (i+1);
                let pieceOnTarget = arrboard[targetSquare];
                if(pieceOnTarget[0] === colourToMove) {
                    break;
                } 

                possibleMoves.push([startSqr, targetSquare]);
    
                if(pieceOnTarget[0] === opponentColour) {
                    break;
                }
            }
        }
        return possibleMoves;
    }

    function slidingMoveSquare(startSqr, piece, arrboard, colourToMove, opponentColour, neededSquare) {
        let startDirIndex = piece === "b" ? 4 : 0;
        let endDirIndex = piece === "r" ? 4 : 8;
        for(let direction = startDirIndex; direction < endDirIndex; direction++) {
            for(let i = 0; i<numSquares[startSqr][direction]; i++) {
                let targetSquare = startSqr + directionOffSets[direction] * (i+1);
                let pieceOnTarget = arrboard[targetSquare];
                if(pieceOnTarget[0] === colourToMove) {
                    break;
                } 
                if(targetSquare === neededSquare) {
                    return true;
                }
    
                if(pieceOnTarget[0] === opponentColour) {
                    break;
                }
            }
        }
        return false;
    }

    function generatePawnMoves(startSqr, possibleMoves, arrboard, colourToMove, opponentColour, enPassant) {
        if(colourToMove === 'b') {
            let targetSquare = startSqr + directionOffSets[0];
            let pieceOnTarget = arrboard[targetSquare];
            if(pieceOnTarget === "00") {
                possibleMoves.push([startSqr, targetSquare]);
            }
            if(numSquares[startSqr][2] >= 1) {
                targetSquare = startSqr + directionOffSets[4];
                pieceOnTarget = arrboard[targetSquare];
                if(pieceOnTarget !== "00" && pieceOnTarget[0] === opponentColour) {
                    possibleMoves.push([startSqr, targetSquare]);
                } else if(targetSquare === enPassant) {
                    possibleMoves.push([startSqr, targetSquare]);
                }
            }
            if(numSquares[startSqr][3] >= 1) {
                targetSquare = startSqr + directionOffSets[6];
                pieceOnTarget = arrboard[targetSquare];
                if(pieceOnTarget !== "00" && pieceOnTarget[0] === opponentColour) {
                    possibleMoves.push([startSqr, targetSquare]);
                } else if(targetSquare === enPassant) {
                    possibleMoves.push([startSqr, targetSquare]);
                }
            }

            if(startSqr > 7 && startSqr < 16 && arrboard[startSqr + 8] === "00") {
                let targetSquare = startSqr + (directionOffSets[0] * 2);
                let pieceOnTarget = arrboard[targetSquare];
                if(pieceOnTarget === "00") {
                    possibleMoves.push([startSqr, targetSquare]);
                }  
            }
        } else {
            let targetSquare = startSqr + directionOffSets[1];
            let pieceOnTarget = arrboard[targetSquare];
            if(pieceOnTarget === "00") {
                possibleMoves.push([startSqr, targetSquare]);
            }
            if(numSquares[startSqr][3] >= 1) {
                targetSquare = startSqr + directionOffSets[5];
                pieceOnTarget = arrboard[targetSquare];
                if(pieceOnTarget !== "00" && pieceOnTarget[0] === opponentColour) {
                    possibleMoves.push([startSqr, targetSquare]);
                } else if(targetSquare === enPassant) {
                    possibleMoves.push([startSqr, targetSquare]);
                }
            }
            if(numSquares[startSqr][2] >= 1) {
                targetSquare = startSqr + directionOffSets[7];
                pieceOnTarget = arrboard[targetSquare];
                if(pieceOnTarget !== "00" && pieceOnTarget[0] === opponentColour) {
                    possibleMoves.push([startSqr, targetSquare]);
                } else if(targetSquare === enPassant) {
                    possibleMoves.push([startSqr, targetSquare]);
                }
            }

            if(startSqr > 47 && startSqr < 56 && arrboard[startSqr - 8] === "00") {
                let targetSquare = startSqr + (directionOffSets[1] * 2);
                let pieceOnTarget = arrboard[targetSquare];
                if(pieceOnTarget === "00") {
                    possibleMoves.push([startSqr, targetSquare]);
                }   
            }
        }
        return possibleMoves;
    }

    function squarePawnMove(startSqr, arrboard, colourToMove, opponentColour, neededSquare) {
        if(colourToMove === 'b') {
            if(numSquares[startSqr][2] >= 1) {
                targetSquare = startSqr + directionOffSets[4];
                if(targetSquare === neededSquare) {
                    return true;
                }
            }
            if(numSquares[startSqr][3] >= 1) {
                targetSquare = startSqr + directionOffSets[6];
                if(targetSquare === neededSquare) {
                    return true;
                }
            }

        } else {
            if(numSquares[startSqr][3] >= 1) {
                targetSquare = startSqr + directionOffSets[5];
                if(targetSquare === neededSquare) {
                    return true;
                }
            }
            if(numSquares[startSqr][2] >= 1) {
                targetSquare = startSqr + directionOffSets[7];
                if(targetSquare === neededSquare) {
                    return true;
                }
            }
        }
        return false;
    } 

    function generateKnightMoves(startSqr, possibleMoves, arrboard, colourToMove, opponentColour) {
        for(let i = 0; i < knightOffSets.length; i++) {
            let targetSquare = startSqr + knightOffSets[i];
            if(targetSquare < 0 || targetSquare > 63) {
                continue;
            }
            let pieceOnTarget = arrboard[targetSquare];
            if(pieceOnTarget[0] === colourToMove) {
                continue;
            }
            let westDist = numSquares[startSqr][2];
            let eastDist = numSquares[startSqr][3];
            if(i === 0 || i === 3) {
                if(westDist >= 2) {
                    possibleMoves.push([startSqr, targetSquare]);
                    continue;
                }
            } else if(i === 1 || i === 2) {
                if(eastDist >= 2) {
                    possibleMoves.push([startSqr, targetSquare]);
                    continue;
                }
            } else if(i === 4 || i === 7) {
                if(westDist >= 1) {
                    possibleMoves.push([startSqr, targetSquare]);
                    continue;
                }            
            } else {
                if(eastDist >= 1) {
                    possibleMoves.push([startSqr, targetSquare]);
                }   
            }
        }
        return possibleMoves;
    }

    function squareKnightMoves(startSqr, arrboard, colourToMove, opponentColour, neededSquare) {
        for(let i = 0; i < knightOffSets.length; i++) {
            let targetSquare = startSqr + knightOffSets[i];
            if(targetSquare < 0 || targetSquare > 63) {
                continue;
            }
            let pieceOnTarget = arrboard[targetSquare];
            if(pieceOnTarget[0] === colourToMove) {
                continue;
            }
            let westDist = numSquares[startSqr][2];
            let eastDist = numSquares[startSqr][3];
            if(i === 0 || i === 3) {
                if(westDist >= 2) {
                    if(targetSquare === neededSquare) {
                        return true;
                    }
                    continue;
                }
            } else if(i === 1 || i === 2) {
                if(eastDist >= 2) {
                    if(targetSquare === neededSquare) {
                        return true;
                    }
                    continue;
                }
            } else if(i === 4 || i === 7) {
                if(westDist >= 1) {
                    if(targetSquare === neededSquare) {
                        return true;
                    }
                    continue;
                }            
            } else {
                if(eastDist >= 1) {
                    if(targetSquare === neededSquare) {
                        return true;
                    }
                }   
            }
        }
        return false;
    }

    function generateKingMoves(startSqr, possibleMoves, arrboard, colourToMove, opponentColour, castle) {
        for(let direction=0; direction<8; direction++) {
            for(let i = 0; i<numSquares[startSqr][direction]; i++) {
                if(i >= 1) {
                    break;
                }
                let targetSquare = startSqr + directionOffSets[direction] * (i+1);
                let pieceOnTarget = arrboard[targetSquare];
                if(pieceOnTarget[0] === colourToMove) {
                    break;
                } 
                if(!(helperFunction.squareAttacked(targetSquare, arrboard, opponentColour, colourToMove))) {
                    possibleMoves.push([startSqr, targetSquare]);
                }
                if(pieceOnTarget[0] === opponentColour) {
                    break;
                }
            }
        }

        if(colourToMove === 'w') {
            if(castle[0] === "K") {
                if(arrboard[60] === "00" && arrboard[61] === "00" && arrboard[62] === "00") {
                    if(!(helperFunction.squareAttacked(59, arrboard, opponentColour, colourToMove)) && !(helperFunction.squareAttacked(60, arrboard, opponentColour, colourToMove)) && !(helperFunction.squareAttacked(61, arrboard, opponentColour, colourToMove))) {
                        possibleMoves.push([59, 61]);
                    }
                }
            }
            if(castle[1] === "Q") {
                if(arrboard[58] === "00" && arrboard[57] === "00") {
                    if(!(helperFunction.squareAttacked(59, arrboard, opponentColour, colourToMove)) && !(helperFunction.squareAttacked(58, arrboard, opponentColour, colourToMove)) && !(helperFunction.squareAttacked(57, arrboard, opponentColour, colourToMove))) {
                        possibleMoves.push([59, 57]);
                    }
                }
            }
        } else {
            if(castle[2] === "k") {
                if(arrboard[4] === "00" && arrboard[5] === "00" && arrboard[6] === "00") {
                    if(!(helperFunction.squareAttacked(3, arrboard, opponentColour, colourToMove)) && !(helperFunction.squareAttacked(4, arrboard, opponentColour, colourToMove)) && !(helperFunction.squareAttacked(5, arrboard, opponentColour, colourToMove))) {
                        possibleMoves.push([3, 5]);
                    }
                }
            }
            if(castle[3] === "q") {
                if(arrboard[1] === "00" && arrboard[2] === "00") {
                    if(!(helperFunction.squareAttacked(3, arrboard, opponentColour, colourToMove)) && !(helperFunction.squareAttacked(2, arrboard, opponentColour, colourToMove)) && !(helperFunction.squareAttacked(1, arrboard, opponentColour, colourToMove))) {
                        possibleMoves.push([3, 1]);
                    }
                }
            }
        }

        return possibleMoves;
    }

    function squareKingMoves(startSqr, arrboard, colourToMove, opponentColour, neededSquare) {
        for(let direction=0; direction<8; direction++) {
            for(let i = 0; i<numSquares[startSqr][direction]; i++) {
                if(i >= 1) {
                    break;
                }
                let targetSquare = startSqr + directionOffSets[direction] * (i+1);
                if(targetSquare === neededSquare) {
                    return true;
                }
            }
        }

        return false;
    }
    return {
        convertFromFen: function(initArray) {
            let pieceUI;
            for(let currentIndex = 0; currentIndex<initArray[0].length; currentIndex++) {
                if(document.querySelector(`.--${currentIndex}`).hasChildNodes()) {
                    document.querySelector(`.--${currentIndex}`).removeChild(document.querySelector(`.--${currentIndex}`).firstChild);
                }
                if(initArray[0][currentIndex] === "00") {
                    continue;
                }
                if(initArray[0][currentIndex][0] === "w") {
                    if(initArray[0][currentIndex][1] === "p") {
                        pieceUI = document.createElement('img');
                        pieceUI.className = 'pieceImg w pawn';
                        pieceUI.src = './images/whitePawn.webp';
                    } else if(initArray[0][currentIndex][1] === "r") {
                        pieceUI = document.createElement('img');
                        pieceUI.className = 'pieceImg w rook';
                        pieceUI.src = './images/whiteRook.webp';
                    } else if(initArray[0][currentIndex][1] === "b") {
                        pieceUI = document.createElement('img');
                        pieceUI.className = 'pieceImg w bishop';
                        pieceUI.src = './images/whiteBishop.webp';
                    } else if(initArray[0][currentIndex][1] === "n") {
                        pieceUI = document.createElement('img');
                        pieceUI.className = 'pieceImg w knight';
                        pieceUI.src = './images/whiteKnight.png';
                    } else if(initArray[0][currentIndex][1] === "k") {
                        pieceUI = document.createElement('img');
                        pieceUI.className = 'pieceImg w king';
                        pieceUI.src = './images/whiteKing.webp';
                    } else {
                        pieceUI = document.createElement('img');
                        pieceUI.className = 'pieceImg w queen';
                        pieceUI.src = './images/whiteQueen.webp';
                    }
                } else {
                    if(initArray[0][currentIndex][1] === "p") {
                        pieceUI = document.createElement('img');
                        pieceUI.className = 'pieceImg b pawn';
                        pieceUI.src = './images/blackPawn.webp';
                    } else if(initArray[0][currentIndex][1] === "r") {
                        pieceUI = document.createElement('img');
                        pieceUI.className = 'pieceImg b rook';
                        pieceUI.src = './images/blackRook.png';
                    } else if(initArray[0][currentIndex][1] === "b") {
                        pieceUI = document.createElement('img');
                        pieceUI.className = 'pieceImg b bishop';
                        pieceUI.src = './images/blackBishop.webp';
                    } else if(initArray[0][currentIndex][1] === "n") {
                        pieceUI = document.createElement('img');
                        pieceUI.className = 'pieceImg b knight';
                        pieceUI.src = './images/blackKnight.png';
                    } else if(initArray[0][currentIndex][1] === "k") {
                        pieceUI = document.createElement('img');
                        pieceUI.className = 'pieceImg b king';
                        pieceUI.src = './images/blackKing.webp';
                    } else {
                        pieceUI = document.createElement('img');
                        pieceUI.className = 'pieceImg b queen';
                        pieceUI.src = './images/blackQueen.webp';
                    }
                }
                document.querySelector(`.--${currentIndex}`).appendChild(pieceUI);
                //if not effective, we can fix this
                setupUIClick(pieceUI);
                if(pieceUI.classList.contains('b')) {
                    if(initArray[1] === 'b') {
                        pieceUI.classList.add('movable');
                    }
                } else {
                    if(initArray[1] === 'w') {
                        pieceUI.classList.add('movable');
                    }
                }
            }
        },

        generateMoves: function(initboard, colourToMove, opponentColour, castle, enPassant) {
            let arrboard = initboard[0];
            let possibleMoves = [];
            let finalMoves = [];
            let kingSquare;
            for(let i = 0; i < 64; i++) {
                let piece = arrboard[i];
                if(piece[0] === colourToMove) {
                    if(piece[1] === 'q' || piece[1] === 'r' || piece[1] === 'b') {
                        generateSlidingMoves(i, piece[1], possibleMoves, arrboard, colourToMove, opponentColour);    
                    } else if(piece[1] === 'p') {
                        generatePawnMoves(i, possibleMoves, arrboard, colourToMove, opponentColour, enPassant);
                    } else if(piece[1] === 'n') {
                        generateKnightMoves(i, possibleMoves, arrboard, colourToMove, opponentColour);
                    } else if(piece[1] === 'k') {
                        generateKingMoves(i, possibleMoves, arrboard, colourToMove, opponentColour, castle);
                    }
                }

            }
            for(let i=0; i<possibleMoves.length; i++) {
                let npiece = arrboard[possibleMoves[i][0]];
                let newBoard = helperFunction.makeMove(possibleMoves[i][0], possibleMoves[i][1], npiece, initboard, false, 0, 100)[0];
                let newArrboard = newBoard[0];
                if(colourToMove === 'w') {
                    kingSquare = newArrboard.indexOf('wk');
                } else {
                    kingSquare = newArrboard.indexOf('bk')
                }
                if(!(helperFunction.squareAttacked(kingSquare, newArrboard, opponentColour, colourToMove))) {
                    finalMoves.push(possibleMoves[i]);
                } 
            }
            return finalMoves;
        },

        generateCaptureMoves: function(initboard, colourToMove, opponentColour, castle, enPassant) {
            let arrboard = initboard[0];
            let possibleMoves = [];
            let finalMoves = [];
            let kingSquare;
            for(let i = 0; i < 64; i++) {
                let piece = arrboard[i];
                if(piece[0] === colourToMove) {
                    if(piece[1] === 'q' || piece[1] === 'r' || piece[1] === 'b') {
                        generateSlidingMoves(i, piece[1], possibleMoves, arrboard, colourToMove, opponentColour);    
                    } else if(piece[1] === 'p') {
                        generatePawnMoves(i, possibleMoves, arrboard, colourToMove, opponentColour, enPassant);
                    } else if(piece[1] === 'n') {
                        generateKnightMoves(i, possibleMoves, arrboard, colourToMove, opponentColour);
                    } else if(piece[1] === 'k') {
                        generateKingMoves(i, possibleMoves, arrboard, colourToMove, opponentColour, castle);
                    }
                }

            }
            for(let i=0; i<possibleMoves.length; i++) {
                let npiece = arrboard[possibleMoves[i][0]];
                let newBoard = helperFunction.makeMove(possibleMoves[i][0], possibleMoves[i][1], npiece, initboard, false, 0, 100)[0];
                let newArrboard = newBoard[0];
                if(colourToMove === 'w') {
                    kingSquare = newArrboard.indexOf('wk');
                } else {
                    kingSquare = newArrboard.indexOf('bk')
                }
                if(!(helperFunction.squareAttacked(kingSquare, newArrboard, opponentColour, colourToMove)) && (initboard[0][possibleMoves[i][1]][0] === opponentColour)) {
                    finalMoves.push(possibleMoves[i]);
                } 
            }
            return finalMoves;
        },

        squareAttacked: function(square, arrboard, movingSide, oppositeSide) {
            for(let i = 0; i < 64; i++) {
                let piece = arrboard[i];
                if(piece[0] === movingSide) {
                    if(piece[1] === 'q' || piece[1] === 'r' || piece[1] === 'b') {
                        if(slidingMoveSquare(i, piece[1], arrboard, movingSide, oppositeSide, square)) {
                            return true;
                        }    
                    } else if(piece[1] === 'n') {
                        if(squareKnightMoves(i, arrboard, movingSide, oppositeSide, square)) {
                            return true;
                        }
                    } else if(piece[1] === 'p') {
                        if(squarePawnMove(i, arrboard, movingSide, oppositeSide, square)) {
                            return true;
                        }
                    } else if(piece[1] === 'k') {
                        if(squareKingMoves(i, arrboard, movingSide, oppositeSide, square)) {
                            return true;
                        }
                    }
                }
            }
            return false;
        },

        makeMove: function(startSquare, endSquare, piece, initboard, on, score, moveNumber) {
            let fen = JSON.parse(JSON.stringify(initboard));
            fen[6].push([startSquare, endSquare]);
            let enPassant = endSquare === fen[3];
            let tempScore = score - pieceValues[initboard[0][endSquare]];
            fen[3] = "-"
            if(piece === 'wk') {
                if(on) {
                    fen[2][0] = "0";
                    fen[2][1] = "0";
                }
                if(startSquare - endSquare === -2) {
                    fen[0][60] = "wr";
                    fen[0][61] = "00";
                    fen[0][62] = "00";
                    fen[0][63] = "00";
                } else if(startSquare - endSquare === 2) {
                    fen[0][56] = "00";
                    fen[0][57] = "00";
                    fen[0][58] = "wr";
                }
            } else if(piece === 'bk') {
                if(on) {
                    fen[2][2] = "0";
                    fen[2][3] = "0";
                }
                if(startSquare - endSquare === -2) {
                    fen[0][4] = "br";
                    fen[0][5] = "00";
                    fen[0][6] = "00";
                    fen[0][7] = "00";
                } else if(startSquare - endSquare === 2) {
                    fen[0][0] = "00";
                    fen[0][1] = "00";
                    fen[0][2] = "br";
                }
            } else if(piece === "wr") {
                if(startSquare === 63 && on) {
                    fen[2][0] = "0";
                } else if(startSquare === 56 && on) {
                    fen[2][1] = "0";
                }
            } else if(piece === "br") {
                if(startSquare === 7 && on) {
                    fen[2][2] = "0"
                } else if(startSquare === 0 && on) {
                    fen[2][3] = "0";
                }
            } else if(piece === "wp") {
                if(startSquare - endSquare === 16 && on) {
                    fen[3] = startSquare - 8;
                } else if(enPassant) {
                    let enPassantSquare = endSquare + 8;
                    fen[0][enPassantSquare] = "00";
                    tempScore += 100;
                } else if(endSquare < 8) {
                    piece = "wq";
                    tempScore += 800;
                }
            } else if(piece === "bp") {
                if(endSquare - startSquare === 16 && on) {
                    fen[3] = startSquare + 8;
                } else if(enPassant) {
                    let enPassantSquare = endSquare - 8;
                    fen[0][enPassantSquare] = "00";
                    tempScore -= 100;
                } else if(endSquare > 55) {
                    piece = "bq";
                    tempScore -= 800;
                }
            } 
            fen[0][endSquare] = piece;
            fen[0][startSquare] = "00";
            if(on) {
                fen[1] = fen[1] === 'w' ? 'b':'w';
            }
            let beforeScore = tempScore;
            //creat eval parameter for time
            for(let i=0; i<fen[0].length; i++) {
                let varWhite = (8*Math.floor(i/8) + (7-(i%8))); 
                let varBlack = 63-i;
                if(!(fen[0][i] === "00")) {
                    if(fen[0][i] === "bp") {
                        if((whiteMajPieceCount > 2 && whiteQueenOnBoard) || (whiteMajPieceCount > 3 && !whiteQueenOnBoard)) {
                            tempScore -= pawnScoreEarlyTable[varBlack];
                        } else {
                            tempScore -= pawnScoreTable[varBlack];
                        }
                        
                    } else if(fen[0][i] === "wp") {
                        if((blackMajPieceCount > 2 && blackQueenOnBoard) || (blackMajPieceCount > 3 && !blackQueenOnBoard)) {
                            tempScore += pawnScoreEarlyTable[varWhite];
                        } else {
                            tempScore += pawnScoreTable[varWhite];
                        }
                    } else if(fen[0][i] === "br") {
                        if((whiteMajPieceCount > 2 && whiteQueenOnBoard) || (whiteMajPieceCount > 3 && !whiteQueenOnBoard)) {
                            tempScore -= rookScoreTable[varBlack];
                        } else {
                            tempScore -= rookEndTable[varBlack];
                        }
                    } else if(fen[0][i] === "wr") {
                        if((blackMajPieceCount > 2 && blackQueenOnBoard) || (blackMajPieceCount > 3 && !blackQueenOnBoard)) {
                            tempScore += rookScoreTable[varWhite];
                        } else {
                            tempScore += rookEndTable[varWhite];
                        }
                    } else if(fen[0][i] === "bn") {
                        if((whiteMajPieceCount > 2 && whiteQueenOnBoard) || (whiteMajPieceCount > 3 && !whiteQueenOnBoard)) {
                            tempScore -= knightScoreTable[varBlack];
                        } else {
                            tempScore -= knightEndTable[varBlack];
                        }
                    } else if(fen[0][i] === "wn") {
                        if((blackMajPieceCount > 2 && blackQueenOnBoard) || (blackMajPieceCount > 3 && !blackQueenOnBoard)) {
                            tempScore += knightScoreTable[varWhite];
                        } else {
                            tempScore += knightEndTable[varWhite];
                        }
                    } else if(fen[0][i] === "bb") {
                        if((whiteMajPieceCount > 2 && whiteQueenOnBoard) || (whiteMajPieceCount > 3 && !whiteQueenOnBoard)) {
                            tempScore -= bishopScoreTable[varBlack];
                        } else {
                            tempScore -= bishopEndTable[varBlack];
                        }
                    } else if(fen[0][i] === "wb") {
                        if((blackMajPieceCount > 2 && blackQueenOnBoard) || (blackMajPieceCount > 3 && !blackQueenOnBoard)) {
                            tempScore += bishopScoreTable[varWhite]
                        } else {
                            tempScore += bishopEndTable[varWhite];
                        }
                    } else if(fen[0][i] === "bk") {
                       // tempScore -= kingScoreTable[63-i];
                        if((whiteMajPieceCount > 2 && whiteQueenOnBoard) || (whiteMajPieceCount > 3 && !whiteQueenOnBoard)) {
                            tempScore -= kingScoreTable[varBlack];
                        } else {
                            tempScore -= kingScoreEndGame[varBlack];
                            if((blackMajPieceCount > whiteMajPieceCount || (whiteMajPieceCount === blackMajPieceCount && blackPawnCount > whitePawnCount)) && ((whitePieceCount + blackPieceCount) < 6)) {
                                let whiteKingInd = fen[0].indexOf("wk");
                                let blackKingInd = fen[0].indexOf("bk");
                                tempScore -= 10*(14-(Math.abs((whiteKingInd % 8 - blackKingInd % 8)) + Math.abs((Math.floor(whiteKingInd / 8) - Math.floor(blackKingInd / 8)))));
                            }
                           /*
                            if(blackMajPieceCount > whiteMajPieceCount || (whiteMajPieceCount === blackMajPieceCount && blackPawnCount > whitePawnCount)) {
                                let whiteKingInd = fen[0].indexOf("wk");
                                let blackKingInd = fen[0].indexOf("bk");
                                tempScore -= 10*(14-(Math.abs((whiteKingInd % 8 - blackKingInd % 8)) + Math.abs((Math.floor(whiteKingInd / 8) - Math.floor(blackKingInd / 8)))));
                            }
                            */
                        }
                    } else if(fen[0][i] === "wk") {
                        //tempScore += kingScoreTable[i];
                        if((blackMajPieceCount > 2 && blackQueenOnBoard) || (blackMajPieceCount > 3 && !blackQueenOnBoard)) {
                            tempScore += kingScoreTable[varWhite];
                        } else {
                            tempScore += kingScoreEndGame[varWhite];
                            if((whiteMajPieceCount > blackMajPieceCount || (whiteMajPieceCount === blackMajPieceCount && whitePawnCount > blackPawnCount)) && ((whitePieceCount + blackPieceCount) < 6)) {
                                let whiteKingInd = fen[0].indexOf("wk");
                                let blackKingInd = fen[0].indexOf("bk");
                                tempScore += 10*(14-(Math.abs((whiteKingInd % 8 - blackKingInd % 8)) + Math.abs((Math.floor(whiteKingInd / 8) - Math.floor(blackKingInd / 8)))));  
                            }
                            /*
                            if(whiteMajPieceCount > blackMajPieceCount || (whiteMajPieceCount === blackMajPieceCount && whitePawnCount > blackPawnCount)) {
                                let whiteKingInd = fen[0].indexOf("wk");
                                let blackKingInd = fen[0].indexOf("bk");
                                tempScore += 10*(14-(Math.abs((whiteKingInd % 8 - blackKingInd % 8)) + Math.abs((Math.floor(whiteKingInd / 8) - Math.floor(blackKingInd / 8)))));
                            }
                            */
                        }
                    } else if(fen[0][i] === "bq") {
                        if((whiteMajPieceCount > 2 && whiteQueenOnBoard) || (whiteMajPieceCount > 3 && !whiteQueenOnBoard)) {
                            tempScore -= queenScoreTable[varBlack];
                        } else {
                            tempScore -= queenEndTable[varBlack];
                        }
                    } else {
                        if((blackMajPieceCount > 2 && blackQueenOnBoard) || (blackMajPieceCount > 3 && !blackQueenOnBoard)) {
                            tempScore += queenScoreTable[varWhite];
                        } else {
                            tempScore += queenEndTable[varWhite];
                        }
                    }
                }
            }

            /*
            if((fen[0][8]) === "bp") {
                tempScore -= 5;
                pawnsFound++;
            }
            if((fen[0][9]) === "bp") {
                tempScore -= 10;
                pawnsFound++;
            }
            if((fen[0][10]) === "bp") {
                tempScore -= 10;
                pawnsFound++;
            }
            if((fen[0][11]) === "bp") {
                tempScore += 20;
                pawnsFound++;
            }
            if((fen[0][12]) === "bp") {
                tempScore += 20;
                pawnsFound++;
            }
            if((fen[0][13]) === "bp") {
                tempScore -= 10;
                pawnsFound++;
            }
            if((fen[0][14]) === "bp") {
                tempScore -= 10;
                pawnsFound++;
            }
            if((fen[0][15]) === "bp") {
                tempScore -= 5;
                pawnsFound++;
            }
            if((fen[0][16] === "bp") && pawnsFound < 8) {
                tempScore -= 5;
                pawnsFound++;
            }
            if((fen[0][17] === "bp") && pawnsFound < 8) {
                tempScore += 5;
                pawnsFound++;
            }
            if((fen[0][18] === "bp") && pawnsFound < 8) {
                tempScore += 10;
                pawnsFound++;
            }
            if((fen[0][21] === "bp") && pawnsFound < 8) {
                tempScore += 10;
                pawnsFound++;
            }
            if((fen[0][22] === "bp") && pawnsFound < 8) {
                tempScore += 5;
                pawnsFound++;
            }
            if((fen[0][23] === "bp") && pawnsFound < 8) {
                tempScore -= 5;
                pawnsFound++;
            }
            if((fen[0][27] === "bp") && pawnFound < 8) {
                tempScore -= 20;
                pawnFound++;
            }
            if((fen[0][28] === "bp") && pawnFound < 8) {
                tempScore -= 20;
                pawnFound++;
            }
            if((fen[0][32] === "bp") && pawnFound < 8) {
                tempScore -= 5;
                pawnFound++;
            }
            if((fen[0][33] === "bp") && pawnFound < 8) {
                tempScore -= 5;
                pawnFound++;
            }
            if((fen[0][34] === "bp") && pawnFound < 8) {
                tempScore -= 10;
                pawnFound++;
            }
            if((fen[0][35] === "bp") && pawnFound < 8) {
                tempScore -= 25;
                pawnFound++;
            }
            if((fen[0][36] === "bp") && pawnFound < 8) {
                tempScore -= 25;
                pawnFound++;
            }
            if((fen[0][37] === "bp") && pawnFound < 8) {
                tempScore -= 10;
                pawnFound++;
            }
            if((fen[0][38] === "bp") && pawnFound < 8) {
                tempScore -= 5;
                pawnFound++;
            }
            if((fen[0][39] === "bp") && pawnFound < 8) {
                tempScore -= 5;
                pawnFound++;
            }
            if((fen[0][40] === "bp") && pawnFound < 8) {
                tempScore -= 10;
                pawnFound++;
            }
            if((fen[0][41] === "bp") && pawnFound < 8) {
                tempScore -= 10;
                pawnFound++;
            }
            if((fen[0][42] === "bp") && pawnFound < 8) {
                tempScore -= 20;
                pawnFound++;
            }
            if((fen[0][43] === "bp") && pawnFound < 8) {
                tempScore -= 30;
                pawnFound++;
            }
            if((fen[0][44] === "bp") && pawnFound < 8) {
                tempScore -= 30;
                pawnFound++;
            }
            if((fen[0][45] === "bp") && pawnFound < 8) {
                tempScore -= 20;
                pawnFound++;
            }
            if((fen[0][46] === "bp") && pawnFound < 8) {
                tempScore -= 10;
                pawnFound++;
            }
            if((fen[0][47] === "bp") && pawnFound < 8) {
                tempScore -= 10;
                pawnFound++;
            }
            if((fen[0][48] === "bp") && pawnFound < 8) {
                tempScore -= 50;
                pawnFound++;
            }
            if((fen[0][49] === "bp") && pawnFound < 8) {
                tempScore -= 50;
                pawnFound++;
            }
            if((fen[0][50] === "bp") && pawnFound < 8) {
                tempScore -= 50;
                pawnFound++;
            }
            if((fen[0][51] === "bp") && pawnFound < 8) {
                tempScore -= 50;
                pawnFound++;
            }
            if((fen[0][52] === "bp") && pawnFound < 8) {
                tempScore -= 50;
                pawnFound++;
            }
            if((fen[0][53] === "bp") && pawnFound < 8) {
                tempScore -= 50;
                pawnFound++;
            }
            if((fen[0][54] === "bp") && pawnFound < 8) {
                tempScore -= 50;
                pawnFound++;
            }
            if((fen[0][55] === "bp") && pawnFound < 8) {
                tempScore -= 50;
                pawnFound++;
            }

            pawnFound = 0;

            if((fen[0][48]) === "wp") {
                tempScore += 5;
                pawnsFound++;
            }
            if((fen[0][49]) === "wp") {
                tempScore += 10;
                pawnsFound++;
            }
            if((fen[0][50]) === "wp") {
                tempScore += 10;
                pawnsFound++;
            }
            if((fen[0][51]) === "wp") {
                tempScore -= 20;
                pawnsFound++;
            }
            if((fen[0][52]) === "wp") {
                tempScore -= 20;
                pawnsFound++;
            }
            if((fen[0][53]) === "wp") {
                tempScore += 10;
                pawnsFound++;
            }
            if((fen[0][54]) === "wp") {
                tempScore += 10;
                pawnsFound++;
            }
            if((fen[0][55]) === "wp") {
                tempScore += 5;
                pawnsFound++;
            }
            if((fen[0][40] === "wp") && pawnsFound < 8) {
                tempScore += 5;
                pawnsFound++;
            }
            if((fen[0][41] === "wp") && pawnsFound < 8) {
                tempScore -= 5;
                pawnsFound++;
            }
            if((fen[0][42] === "wp") && pawnsFound < 8) {
                tempScore -= 10;
                pawnsFound++;
            }
            if((fen[0][45] === "wp") && pawnsFound < 8) {
                tempScore -= 10;
                pawnsFound++;
            }
            if((fen[0][46] === "wp") && pawnsFound < 8) {
                tempScore -= 5;
                pawnsFound++;
            }
            if((fen[0][47] === "wp") && pawnsFound < 8) {
                tempScore += 5;
                pawnsFound++;
            }
            if((fen[0][35] === "wp") && pawnFound < 8) {
                tempScore += 20;
                pawnFound++;
            }
            if((fen[0][36] === "wp") && pawnFound < 8) {
                tempScore += 20;
                pawnFound++;
            }
            if((fen[0][24] === "wp") && pawnFound < 8) {
                tempScore += 5;
                pawnFound++;
            }
            if((fen[0][25] === "wp") && pawnFound < 8) {
                tempScore += 5;
                pawnFound++;
            }
            if((fen[0][26] === "wp") && pawnFound < 8) {
                tempScore += 10;
                pawnFound++;
            }
            if((fen[0][27] === "wp") && pawnFound < 8) {
                tempScore += 25;
                pawnFound++;
            }
            if((fen[0][28] === "wp") && pawnFound < 8) {
                tempScore += 25;
                pawnFound++;
            }
            if((fen[0][29] === "wp") && pawnFound < 8) {
                tempScore += 10;
                pawnFound++;
            }
            if((fen[0][30] === "wp") && pawnFound < 8) {
                tempScore += 5;
                pawnFound++;
            }
            if((fen[0][31] === "wp") && pawnFound < 8) {
                tempScore += 5;
                pawnFound++;
            }
            if((fen[0][16] === "wp") && pawnFound < 8) {
                tempScore += 10;
                pawnFound++;
            }
            if((fen[0][17] === "wp") && pawnFound < 8) {
                tempScore += 10;
                pawnFound++;
            }
            if((fen[0][18] === "wp") && pawnFound < 8) {
                tempScore += 20;
                pawnFound++;
            }
            if((fen[0][19] === "wp") && pawnFound < 8) {
                tempScore += 30;
                pawnFound++;
            }
            if((fen[0][20] === "wp") && pawnFound < 8) {
                tempScore += 30;
                pawnFound++;
            }
            if((fen[0][21] === "wp") && pawnFound < 8) {
                tempScore += 20;
                pawnFound++;
            }
            if((fen[0][22] === "wp") && pawnFound < 8) {
                tempScore += 10;
                pawnFound++;
            }
            if((fen[0][23] === "wp") && pawnFound < 8) {
                tempScore += 10;
                pawnFound++;
            }
            if((fen[0][8] === "wp") && pawnFound < 8) {
                tempScore += 50;
                pawnFound++;
            }
            if((fen[0][9] === "wp") && pawnFound < 8) {
                tempScore += 50;
                pawnFound++;
            }
            if((fen[0][10] === "wp") && pawnFound < 8) {
                tempScore += 50;
                pawnFound++;
            }
            if((fen[0][11] === "wp") && pawnFound < 8) {
                tempScore += 50;
                pawnFound++;
            }
            if((fen[0][12] === "wp") && pawnFound < 8) {
                tempScore += 50;
                pawnFound++;
            }
            if((fen[0][13] === "wp") && pawnFound < 8) {
                tempScore += 50;
                pawnFound++;
            }
            if((fen[0][14] === "wp") && pawnFound < 8) {
                tempScore += 50;
                pawnFound++;
            }
            if((fen[0][15] === "wp") && pawnFound < 8) {
                tempScore += 50;
                pawnFound++;
            }

            let knightCount = 0;
            if((fen[0][0] === "bn") && knightCount < 2) {
                tempScore += 50;
                knightCount++;
            }
            if((fen[0][0] === "bn") && knightCount < 2) {
                knightCount++;
            }
            if((fen[0][0] === "bn") && knightCount < 2) {
                knightCount++;
            }
            if((fen[0][0] === "bn") && knightCount < 2) {
                knightCount++;
            }
            if((fen[0][0] === "bn") && knightCount < 2) {
                knightCount++;
            }
            if((fen[0][0] === "bn") && knightCount < 2) {
                knightCount++;
            }
            if((fen[0][0] === "bn") && knightCount < 2) {
                knightCount++;
            }
            if((fen[0][0] === "bn") && knightCount < 2) {
                knightCount++;
            }
            if((fen[0][0] === "bn") && knightCount < 2) {
                knightCount++;
            }
            if((fen[0][0] === "bn") && knightCount < 2) {
                knightCount++;
            }
            if((fen[0][0] === "bn") && knightCount < 2) {
                knightCount++;
            }
            if((fen[0][0] === "bn") && knightCount < 2) {
                knightCount++;
            }
            if((fen[0][0] === "bn") && knightCount < 2) {
                knightCount++;
            }
            if((fen[0][0] === "bn") && knightCount < 2) {
                knightCount++;
            }
            if((fen[0][0] === "bn") && knightCount < 2) {
                knightCount++;
            }
            if((fen[0][0] === "bn") && knightCount < 2) {
                knightCount++;
            }
            if((fen[0][0] === "bn") && knightCount < 2) {
                knightCount++;
            }
            if((fen[0][0] === "bn") && knightCount < 2) {
                knightCount++;
            }
            if((fen[0][0] === "bn") && knightCount < 2) {
                knightCount++;
            }
            if((fen[0][0] === "bn") && knightCount < 2) {
                knightCount++;
            }
            if((fen[0][0] === "bn") && knightCount < 2) {
                knightCount++;
            }
            if((fen[0][0] === "bn") && knightCount < 2) {
                knightCount++;
            }
            if((fen[0][0] === "bn") && knightCount < 2) {
                knightCount++;
            }
            if((fen[0][0] === "bn") && knightCount < 2) {
                knightCount++;
            }
            if((fen[0][0] === "bn") && knightCount < 2) {
                knightCount++;
            }
            if((fen[0][0] === "bn") && knightCount < 2) {
                knightCount++;
            }
            if((fen[0][0] === "bn") && knightCount < 2) {
                knightCount++;
            }
            if((fen[0][0] === "bn") && knightCount < 2) {
                knightCount++;
            }
            if((fen[0][0] === "bn") && knightCount < 2) {
                knightCount++;
            }
            if((fen[0][0] === "bn") && knightCount < 2) {
                knightCount++;
            }
            if((fen[0][0] === "bn") && knightCount < 2) {
                knightCount++;
            }
            if((fen[0][0] === "bn") && knightCount < 2) {
                knightCount++;
            }
            if((fen[0][0] === "bn") && knightCount < 2) {
                knightCount++;
            }
            if((fen[0][0] === "bn") && knightCount < 2) {
                knightCount++;
            }
            if((fen[0][0] === "bn") && knightCount < 2) {
                knightCount++;
            }
            if((fen[0][0] === "bn") && knightCount < 2) {
                knightCount++;
            }
            if((fen[0][0] === "bn") && knightCount < 2) {
                knightCount++;
            }
            if((fen[0][0] === "bn") && knightCount < 2) {
                knightCount++;
            }
            if((fen[0][0] === "bn") && knightCount < 2) {
                knightCount++;
            }
            if((fen[0][0] === "bn") && knightCount < 2) {
                knightCount++;
            }
            if((fen[0][0] === "bn") && knightCount < 2) {
                knightCount++;
            }
            if((fen[0][0] === "bn") && knightCount < 2) {
                knightCount++;
            }
            if((fen[0][0] === "bn") && knightCount < 2) {
                knightCount++;
            }
            if((fen[0][0] === "bn") && knightCount < 2) {
                knightCount++;
            }
            if((fen[0][0] === "bn") && knightCount < 2) {
                knightCount++;
            }
            if((fen[0][0] === "bn") && knightCount < 2) {
                knightCount++;
            }
            if((fen[0][0] === "bn") && knightCount < 2) {
                knightCount++;
            }
            if((fen[0][0] === "bn") && knightCount < 2) {
                knightCount++;
            }
*/

            /*
            if(moveNumber <= 12) {
                if((fen[0][1] === "bk" || fen[0][0] === "bk" || fen[0][8] === "bk" || fen[0][9] === "bk" || fen[0][6] === "bk" || fen[0][7] === "bk" || fen[0][14] === "bk" || fen[0][15] === "bk") && (fen[0][2] === "br" || fen[0][3] === "br" || fen[0][4] === "br")) {
                    tempScore -= 50;
                }
                if(fen[0][56] === "wk" || fen[0][57] === "wk" || fen[0][48] === "wk" || fen[0][49] === "wk" || fen[0][61] === "wk" || fen[0][62] === "wk" || fen[0][63] === "wk" || fen[0][54] === "wk" || fen[0][55] === "wk" && (fen[0][58] === "wr" || fen[0][59] === "wr" || fen[0][60] === "wr")) {
                    tempScore += 50;
                }
                if(fen[0][2] === "bk" || fen[0][4] === "bk" || fen[0][10] === "bk" || fen[0][11] === "bk" || fen[0][12] === "bk" || (fen[0][5] === "bk" && fen[0][4] !== "br")) {
                    tempScore += 50;
                }
                if(fen[0][58] === "wk" || fen[0][60] === "wk" || fen[0][50] === "wk" || fen[0][51] === "wk" || fen[0][52] === "wk" || (fen[0][61] === "wk" && fen[0][60] !== "wr")) {
                    tempScore -= 50;
                }
                if(fen[0][18] === "bn" || fen[0][21] === "bn" || fen[0][19] === "bn" || fen[0][20] === "bn" || fen[0][26] === "bn" || fen[0][27] === "bn" || fen[0][28] === "bn" || fen[0][29] === "bn" || fen[0][34] === "bn" || fen[0][35] === "bn" || fen[0][36] === "bn" || fen[0][37] === "bn" || fen[0][42] === "bn" || fen[0][43] === "bn" || fen[0][44] === "bn" || fen[0][45] === "bn") {
                    tempScore -= 25;
                }
                if(fen[0][18] === "wn" || fen[0][21] === "wn" || fen[0][19] === "wn" || fen[0][20] === "wn" || fen[0][26] === "wn" || fen[0][27] === "wn" || fen[0][28] === "wn" || fen[0][29] === "wn" || fen[0][34] === "wn" || fen[0][35] === "wn" || fen[0][36] === "wn" || fen[0][37] === "wn" || fen[0][42] === "wn" || fen[0][43] === "wn" || fen[0][44] === "wn" || fen[0][45] === "wn") {
                    tempScore += 25;
                }
                if(fen[0][19] === "bb" || fen[0][20] === "bb" || fen[0][26] === "bb" || fen[0][29] === "bb" || fen[0][33] === "bb" || fen[0][38] === "bb") {
                    tempScore -= 25;
                }
                if(fen[0][43] === "wb" || fen[0][44] === "wb" || fen[0][34] === "wb" || fen[0][37] === "wb" || fen[0][25] === "wb" || fen[0][30] === "wb") {
                    tempScore += 25;
                }
            } else {
                if(fen[0][3] === "br" || fen[0][4] === "br" || fen[0][49] === "br" || fen[0][50] === "br" || fen[0][51] === "br" || fen[0][52] === "br" || fen[0][53] === "br" || fen[0][54] === "br") {
                    tempScore -= 25;
                }
                if(fen[0][59] === "wr" || fen[0][60] === "wr" || fen[0][9] === "wr" || fen[0][10] === "wr" || fen[0][11] === "wr" || fen[0][12] === "wr" || fen[0][13] === "wr" || fen[0][14] === "wr") {
                    tempScore += 25;
                }
                if(fen[0][0] === "bk" || fen[0][1] === "bk" || fen[0][8] === "bk" || fen[0][9] === "bk" || fen[0][6] === "bk" || fen[0][7] === "bk" || fen[0][14] === "bk" || fen[0][15] === "bk") {
                    tempScore -= 25;
                }
                if(fen[0][56] === "wk" || fen[0][57] === "wk" || fen[0][48] === "wk" || fen[0][49] === "wk" || fen[0][62] === "wk" || fen[0][63] === "wk" || fen[0][54] === "wk" || fen[0][55] === "wk") {
                    tempScore += 25;
                }
                if(fen[0][18] === "bn" || fen[0][21] === "bn" || fen[0][19] === "bn" || fen[0][20] === "bn" || fen[0][26] === "bn" || fen[0][27] === "bn" || fen[0][28] === "bn" || fen[0][29] === "bn" || fen[0][34] === "bn" || fen[0][35] === "bn" || fen[0][36] === "bn" || fen[0][37] === "bn" || fen[0][42] === "bn" || fen[0][43] === "bn" || fen[0][44] === "bn" || fen[0][45] === "bn") {
                    tempScore -= 25;
                }
                if(fen[0][18] === "wn" || fen[0][21] === "wn" || fen[0][19] === "wn" || fen[0][20] === "wn" || fen[0][26] === "wn" || fen[0][27] === "wn" || fen[0][28] === "wn" || fen[0][29] === "wn" || fen[0][34] === "wn" || fen[0][35] === "wn" || fen[0][36] === "wn" || fen[0][37] === "wn" || fen[0][42] === "wn" || fen[0][43] === "wn" || fen[0][44] === "wn" || fen[0][45] === "wn") {
                    tempScore += 25;
                }
                if(fen[0][19] === "bb" || fen[0][20] === "bb" || fen[0][26] === "bb" || fen[0][29] === "bb" || fen[0][33] === "bb" || fen[0][38] === "bb") {
                    tempScore -= 25;
                }
                if(fen[0][43] === "wb" || fen[0][44] === "wb" || fen[0][34] === "wb" || fen[0][37] === "wb" || fen[0][25] === "wb" || fen[0][30] === "wb") {
                    tempScore += 25;
                }
            }*/
            if(on) {
                console.log(tempScore/100)
                if(initboard[0][endSquare][0] === "w") {
                    whitePieceCount--;
                    pieceValues["bp"] = (-100) * ((21-whiteMajPieceCount)/13);
                    if(initboard[0][endSquare] === "wp") {
                        whitePawnCount--;
                    } else {
                        whiteMajPieceCount--;
                        if(initboard[0][endSquare] === "wq") {
                            whiteQueenOnBoard = false;
                        }
                    }

                } else if(initboard[0][endSquare][0] === "b") {
                    blackPieceCount--;
                    pieceValues["wp"] = 100 * (21-blackMajPieceCount)/13;
                    if(initboard[0][endSquare] === "bp") {
                        blackPawnCount--;
                    } else {
                        blackMajPieceCount--;
                        if(initboard[0][endSquare] = "bq") {
                            blackQueenOnBoard = false;
                        }
                    }
                }
            }

            return [fen, tempScore, beforeScore];

        },

        orderMoves: function(initboard, moves) {
            let movesObj = [];
            for(let i=0; i<moves.length; i++) {
                let moveGuess = 0;
                let movingPieceType = initboard[0][moves[i][0]]; 
                let capturePieceType = initboard[0][moves[i][1]];

                if(capturePieceType != "00") {
                    moveGuess += Math.abs(10 * pieceValues[capturePieceType] - pieceValues[movingPieceType]);
                }
                if(movingPieceType === "bp") {
                    if(moves[i][1] > 55) {
                        moveGuess += 900;
                    }
                } else if(movingPieceType === "wp") {
                    if(moves[i][1] < 8) {
                        moveGuess += 900;
                    }
                } else {
                    if(movingPieceType[0] === "w") {
                        if((moves[i][1] % 8 !== 7 && initboard[0][moves[i][1] - 7] === "bp") || (moves[i][1] % 8 !== 0 && initboard[0][moves[i][1] - 9] === "bp")) {
                            moveGuess -= 350;
                        }
                    } else {
                        if((moves[i][1] % 8 === 0 && initboard[0][moves[i][1] + 7] === "wp") || (moves[i][1] % 8 === 7 && initboard[0][moves[i][1] + 9] === "wp")) {
                            moveGuess -= 350;
                        }
                    }
                }
                movesObj.push([moves[i], moveGuess]);
            }
            movesObj = movesObj.sort((a, b) => a[1] - b[1]);
            let finalArray = [];
            for(let i = movesObj.length - 1; i>= 0; i--) {
                finalArray.push(movesObj[i][0]);
            }
            return finalArray;
        },
       /* 
        searchAllCaptures: function(initboard, depth, maximisingPlayer, colourToMove, oppositeSide, scoreNext, alpha, beta, moveNumber, scoreCur) {
            let possibleMoves = helperFunction.generateCaptureMoves(initboard, colourToMove, oppositeSide, initboard[2], initboard[3]);
            let tempMoveNum = moveNumber;
            if(possibleMoves.length === 0 || depth === 0) {
                return [scoreCur];
            }
            possibleMoves = helperFunction.orderMoves(initboard, possibleMoves);
            if(maximisingPlayer) {
                let minimaxscore = -Infinity;
                for(let i = 0; i<possibleMoves.length; i++) {
                    let piece = initboard[0][possibleMoves[i][0]];
                    let tempPack = helperFunction.makeMove(possibleMoves[i][0], possibleMoves[i][1], piece, initboard, false, scoreNext, tempMoveNum);
                    let tempBoard = tempPack[0];
                    let tempScore = tempPack[1];
                    let nextScore = tempPack[2];

                    let tempminimaxscore = helperFunction.searchAllCaptures(tempBoard, depth-1, false, oppositeSide, colourToMove, nextScore, alpha, beta, tempMoveNum+1, tempScore)[0];
                    if(tempminimaxscore > minimaxscore) {
                        minimaxscore = tempminimaxscore;
                    }
                    alpha = Math.max(alpha, minimaxscore);
                    if(beta < alpha) {
                        break;
                    }
                }
                return [minimaxscore]
            } else {
                let minimaxscore = Infinity;
                for(let i = 0; i<possibleMoves.length; i++) {
                    let piece = initboard[0][possibleMoves[i][0]];
                    let tempPack = helperFunction.makeMove(possibleMoves[i][0], possibleMoves[i][1], piece, initboard, false, scoreNext, tempMoveNum);
                    let tempBoard = tempPack[0];
                    let tempScore = tempPack[1];
                    let nextScore = tempPack[2];
                    let tempminimaxscore = helperFunction.searchAllCaptures(tempBoard, depth-1, true, oppositeSide, colourToMove, nextScore, alpha, beta, tempMoveNum+1, tempScore)[0];
                    if(tempminimaxscore < minimaxscore) {
                        minimaxscore = tempminimaxscore;
                    }
                    beta = Math.min(beta, minimaxscore);
                    if(alpha > beta) {
                        break;
                    }
                }
                return [minimaxscore];
            }

        },*/

        minimaxHelper: function(initboard, depth, maximisingPlayer, colourToMove, oppositeSide, scoreNext, alpha, beta, moveNumber, scoreCur) {
            if(depth === 0) {
                return [scoreCur];
            }
            let possibleMoves = helperFunction.generateMoves(initboard, colourToMove, oppositeSide, initboard[2], initboard[3]);
            let tempMoveNum = moveNumber;
            possibleMoves = helperFunction.orderMoves(initboard, possibleMoves);
            if(maximisingPlayer) {
                if(possibleMoves.length === 0) {
                    let kingSquare = initboard[0].indexOf("wk");
                    if(helperFunction.squareAttacked(kingSquare, initboard[0], oppositeSide, colourToMove)) {
                        return [-Infinity, depth];
                    } 
                    return [0];
                }
                let minimaxscore = -Infinity;
                for(let i = 0; i<possibleMoves.length; i++) {
                    let piece = initboard[0][possibleMoves[i][0]];
                    let tempPack = helperFunction.makeMove(possibleMoves[i][0], possibleMoves[i][1], piece, initboard, false, scoreNext, tempMoveNum);
                    let tempBoard = tempPack[0];
                    let tempScore = tempPack[1];
                    let nextScore = tempPack[2];
                   /*
                    let fen = tempPack[0];
                    if((fen[6].length >= 6) && ((fen[6][fen[6].length-6] === fen[6][fen[6].length-4] && fen[6][fen[6].length-2] === fen[6][fen[6].length-4]) && (fen[6][fen[6].length-5] === fen[6][fen[6].length-3] && fen[6][fen[6].length-1] === fen[6][fen[6].length-3])) || ((fen[6][fen[6].length-6] === fen[6][fen[6].length-3]) && (fen[6][fen[6].length-5] === fen[6][fen[6].length-2]) && (fen[6][fen[6].length-4] === fen[6][fen[6].length-1]))) {
                        return [0];
                    } 
                    */
                    let tempminimaxscore = helperFunction.minimaxHelper(tempBoard, depth-1, false, oppositeSide, colourToMove, nextScore, alpha, beta, tempMoveNum+1, tempScore)[0];
                    if(tempminimaxscore > minimaxscore) {
                        minimaxscore = tempminimaxscore;
                    }
                    alpha = Math.max(alpha, minimaxscore);
                    if(beta < alpha) {
                        break;
                    }
                }
                return [minimaxscore]
            } else {
                if(possibleMoves.length === 0) {
                    let kingSquare = initboard[0].indexOf("bk");
                    if(helperFunction.squareAttacked(kingSquare, initboard[0], oppositeSide, colourToMove)) {
                        return [Infinity, depth];
                    } 
                    return [0];
                }
                let minimaxscore = Infinity;
                for(let i = 0; i<possibleMoves.length; i++) {
                    let piece = initboard[0][possibleMoves[i][0]];
                    let tempPack = helperFunction.makeMove(possibleMoves[i][0], possibleMoves[i][1], piece, initboard, false, scoreNext, tempMoveNum);
                    let tempBoard = tempPack[0];
                    let tempScore = tempPack[1];
                    let nextScore = tempPack[2];
                   /*
                    let fen = tempPack[0];
                    if((fen[6].length >= 6) && ((fen[6][fen[6].length-6] === fen[6][fen[6].length-4] && fen[6][fen[6].length-2] === fen[6][fen[6].length-4]) && (fen[6][fen[6].length-5] === fen[6][fen[6].length-3] && fen[6][fen[6].length-1] === fen[6][fen[6].length-3])) || ((fen[6][fen[6].length-6] === fen[6][fen[6].length-3]) && (fen[6][fen[6].length-5] === fen[6][fen[6].length-2]) && (fen[6][fen[6].length-4] === fen[6][fen[6].length-1]))) {
                        return [0];
                    } 
                    */
                    let tempminimaxscore = helperFunction.minimaxHelper(tempBoard, depth-1, true, oppositeSide, colourToMove, nextScore, alpha, beta, tempMoveNum+1, tempScore)[0];
                    if(tempminimaxscore < minimaxscore) {
                        minimaxscore = tempminimaxscore;
                    }
                    beta = Math.min(beta, minimaxscore);
                    if(alpha > beta) {
                        break;
                    }
                }
                return [minimaxscore];
            }
        },

        minimaxCounter: function(initboard, depth, maximisingPlayer, colourToMove, oppositeSide, scoreNext, alpha, beta, moveNumber, scoreCur) {
            let tempMoveNum = moveNumber;
            if(depth === 0) {
                return helperFunction.minimaxHelper(initboard, 3, maximisingPlayer, colourToMove, oppositeSide, scoreNext, alpha, beta, tempMoveNum, scoreCur);
            }
            let possibleMinimaxMoves = [];
            let highestDepthCheck = 100;
            if(maximisingPlayer) {
                let minimaxscore = -Infinity;
                let possibleMoves = helperFunction.generateMoves(initboard, colourToMove, oppositeSide, initboard[2], initboard[3]);
                possibleMoves = helperFunction.orderMoves(initboard, possibleMoves);
                for(let i = 0; i<possibleMoves.length; i++) {
                    let piece = initboard[0][possibleMoves[i][0]];
                    let tempPack = helperFunction.makeMove(possibleMoves[i][0], possibleMoves[i][1], piece, initboard, false, scoreNext, tempMoveNum);
                    let tempBoard = tempPack[0];
                    let tempScore = tempPack[1];
                    let nextScore = tempPack[2];
                    let tempminimaxpack = helperFunction.minimaxCounter(tempBoard, depth-1, false, oppositeSide, colourToMove, nextScore, alpha, beta, tempMoveNum+1, tempScore);
                    let tempminimaxscore = tempminimaxpack[0];
                    if(tempminimaxscore === Infinity) {
                        let tempminimaxdepth = tempminimaxpack[1];
                        if(tempminimaxdepth < highestDepthCheck) {
                            highestDepthCehck = tempminimaxdepth;
                            possibleMinimaxMoves = [possibleMoves[i]];
                        }
                    }
                    if(tempminimaxscore === minimaxscore) {
                        possibleMinimaxMoves.push(possibleMoves[i]);
                    } else if(tempminimaxscore > minimaxscore) {
                        minimaxscore = tempminimaxscore;
                        possibleMinimaxMoves = [possibleMoves[i]];
                    }
                    alpha = Math.max(alpha, minimaxscore);
                    if(beta < alpha) {
                        break;
                    }
                }
                return [minimaxscore, possibleMinimaxMoves]
            } else {
                let minimaxscore = Infinity;
                let possibleMoves = helperFunction.generateMoves(initboard, colourToMove, oppositeSide, initboard[2], initboard[3]);
                possibleMoves = helperFunction.orderMoves(initboard, possibleMoves);
                for(let i = 0; i<possibleMoves.length; i++) {
                    let piece = initboard[0][possibleMoves[i][0]];
                    let tempPack = helperFunction.makeMove(possibleMoves[i][0], possibleMoves[i][1], piece, initboard, false, scoreNext, tempMoveNum);
                    let tempBoard = tempPack[0];
                    let tempScore = tempPack[1];
                    let nextScore = tempPack[2];
                    let tempminimaxpack = helperFunction.minimaxCounter(tempBoard, depth-1, true, oppositeSide, colourToMove, nextScore, alpha, beta, tempMoveNum+1, tempScore);
                    let tempminimaxscore = tempminimaxpack[0];
                    if(tempminimaxscore === Infinity) {
                        let tempminimaxdepth = tempminimaxpack[1];
                        if(tempminimaxdepth < highestDepthCheck) {
                            highestDepthCehck = tempminimaxdepth;
                            possibleMinimaxMoves = [possibleMoves[i]];
                        }
                    }
                    if(tempminimaxscore === minimaxscore) {
                        possibleMinimaxMoves.push(possibleMoves[i]);
                    } else if(tempminimaxscore < minimaxscore) {
                        minimaxscore = tempminimaxscore;
                        possibleMinimaxMoves = [possibleMoves[i]]
                    }
                    beta = Math.min(beta, minimaxscore);
                    if(alpha > beta) {
                        break;
                    }
                }
                return [minimaxscore, possibleMinimaxMoves];
            }
        },

        getOpenings: function() {
            return bookOpenings;
        }
    }
})();

let mainFunc = (function(hf) {
    let score = 0;
    let nextScore = 0;
    let lastSquare = 36;
    let startSquare = 52;
    let colourToMove = 'b';
    let opponentColour = 'w';
    let squareChosen = null;
    let check = false;
    let gameOver = false;
    let onOpening = true;
    let moveNumber = 1;
    let openingSeq;
    let bookOpenings = hf.getOpenings();
    let kingSquare;
    let tempPackage;
    /* 
        [
        "br", "bn", "bb", "bk", "bq", "bb", "bn", "br",
        "bp", "bp", "bp", "bp", "bp", "bp", "bp", "bp",
        "00", "00", "00", "00", "00", "00", "00", "00", 
        "00", "00", "00", "00", "00", "00", "00", "00",
        "00", "00", "00", "00", "00", "00", "00", "00",
        "00", "00", "00", "00", "00", "00", "00", "00",
        "wp", "wp", "wp", "wp", "wp", "wp", "wp", "wp",
        "wr", "wn", "wb", "wk", "wq", "wb", "wn", "wr"
        ]
    startboard


    endgame board
            [
            "00", "bk", "br", "00", "00", "00", "00", "00",
            "bp", "00", "00", "00", "bn", "00", "00", "wq",
            "00", "00", "00", "bq", "00", "00", "00", "00", 
            "00", "wp", "00", "00", "00", "bp", "00", "00",
            "00", "00", "00", "00", "00", "wp", "00", "00",
            "00", "00", "00", "00", "00", "00", "00", "wp",
            "wp", "wp", "00", "00", "wp", "wp", "00", "00",
            "00", "wk", "00", "00", "00", "00", "00", "wr"
            ]
    */

    let initArray = [
        [
            "br", "bn", "bb", "bk", "bq", "bb", "bn", "br",
            "bp", "bp", "bp", "bp", "bp", "bp", "bp", "bp",
            "00", "00", "00", "00", "00", "00", "00", "00", 
            "00", "00", "00", "00", "00", "00", "00", "00",
            "00", "00", "00", "00", "00", "00", "00", "00",
            "00", "00", "00", "00", "00", "00", "00", "00",
            "wp", "wp", "wp", "wp", "wp", "wp", "wp", "wp",
            "wr", "wn", "wb", "wk", "wq", "wb", "wn", "wr"
        ],
        "w",
        ["K", "Q", "k", "q"],
        "-",
        "0",
        "1",
        []        
    ];
    let piece;
    hf.convertFromFen(initArray);

    tempPackage = hf.makeMove(52, 36, "wp", initArray, true, nextScore, moveNumber);
    initArray = tempPackage[0];
    score = tempPackage[1];
    nextScore = tempPackage[2];
    hf.convertFromFen(initArray);
    document.querySelector('.--52').classList.add('last-moved');
    document.querySelector('.--36').classList.add('last-moved');
    let possibleMoves = hf.generateMoves(initArray, colourToMove, opponentColour, initArray[2], initArray[3]);
    function setUpEventListeners() {
        document.querySelectorAll('.square').forEach(function(ele) {
            ele.addEventListener('click', function() {
                if(isInteger(squareChosen)) {
                    let targetSquare = parseInt(ele.classList[2].substring(2));
                    let tempMove = [squareChosen, targetSquare];
                    let foundMove = false;
                    for(let i=0; i<possibleMoves.length; i++) {
                        if(tempMove[0] === possibleMoves[i][0] && tempMove[1] === possibleMoves[i][1]) {
                            foundMove = true;  
                            piece = initArray[0][squareChosen];
                            colourToMove = colourToMove === 'w' ? 'b':'w';
                            opponentColour = opponentColour === 'b' ? 'w':'b'; 
                            if(onOpening) {
                                let optq;
                                if(!openingSeq) {
                                    optq = tempMove.join("a");
                                    if(bookOpenings[optq]) {
                                        openingSeq = bookOpenings[optq];
                                    } else {
                                        onOpening = false;
                                    }
                                } else {
                                    optq = tempMove.join("a");
                                    if(openingSeq[optq]) {
                                        openingSeq = openingSeq[optq];
                                    } else {
                                        onOpening = false;
                                    }
                                }
                            }
                            tempPackage = hf.makeMove(squareChosen, targetSquare, piece, initArray, true, nextScore, moveNumber);
                            initArray = tempPackage[0];
                            score = tempPackage[1];
                            nextScore = tempPackage[2];
                            hf.convertFromFen(initArray);
                            document.querySelector(`.--${lastSquare}`).classList.remove('last-moved');
                            document.querySelector(`.--${startSquare}`).classList.remove('last-moved');
                            squareChosen = null;
                            kingSquare = colourToMove === 'w' ? initArray[0].indexOf('wk') : initArray[0].indexOf('bk');
                            check = hf.squareAttacked(kingSquare, initArray[0], opponentColour, colourToMove);
                            possibleMoves = hf.generateMoves(initArray, colourToMove, opponentColour, initArray[2], initArray[3]);
                            if(possibleMoves.length === 0) {
                                gameOver = true;
                                if(check) {
                                    document.querySelector('.move-log').textContent = "Checkmate!";
                                } else {
                                    document.querySelector('.move-log').textContent = "Stalemate!";
                                }
                            } 
                            if(!gameOver && check) {
                                document.querySelector('.move-log').textContent = "Check!";
                            } else {
                                document.querySelector('.move-log').textContent = "";
                            }
                            if(!gameOver) {
                                moveNumber++;
                                let botMove;
                                if(onOpening) {
                                    if(!openingSeq[0]) {
                                        let neededMove = Object.keys(openingSeq)[0];
                                        let tempNot = neededMove;
                                        neededMove = neededMove.split("a");
                                        neededMove[0] = parseInt(neededMove[0]);
                                        neededMove[1] = parseInt(neededMove[1]);
                                        botMove = neededMove;
                                        openingSeq = openingSeq[tempNot];
                                    } else {
                                        let neededMove = openingSeq[0];
                                        let tempNot = neededMove;
                                        neededMove = neededMove.split("a");
                                        neededMove[0] = parseInt(neededMove[0]);
                                        neededMove[1] = parseInt(neededMove[1]);
                                        botMove = neededMove;
                                        openingSeq = openingSeq[tempNot];
                                        onOpening = false;
                                    }
 
                                } else {
                                    let possibleBotMovesPackage = hf.minimaxCounter(initArray, 1, true, 'w', 'b', nextScore, -Infinity, Infinity, moveNumber, score);
                                    let possibleBotMoves = possibleBotMovesPackage[1];
                                    let possibleScores = possibleBotMovesPackage[0];
                                    botMove = possibleBotMoves[Math.floor(Math.random()*possibleBotMoves.length)];
                                }
                
                                piece = initArray[0][botMove[0]];
                                colourToMove = colourToMove === 'w' ? 'b':'w';
                                opponentColour = opponentColour === 'b' ? 'w':'b'; 
                                tempPackage = hf.makeMove(botMove[0], botMove[1], piece, initArray, true, nextScore, moveNumber);
                                initArray = tempPackage[0];
                                score = tempPackage[1];
                                nextScore = tempPackage[2];
                                hf.convertFromFen(initArray);
                                document.querySelector(`.--${botMove[1]}`).classList.add('last-moved');
                                document.querySelector(`.--${botMove[0]}`).classList.add('last-moved');
                                lastSquare = botMove[1];
                                startSquare = botMove[0];
                                kingSquare = colourToMove === 'w' ? initArray[0].indexOf('wk') : initArray[0].indexOf('bk');
                                check = hf.squareAttacked(kingSquare, initArray[0], opponentColour, colourToMove);
                                possibleMoves = hf.generateMoves(initArray, colourToMove, opponentColour, initArray[2], initArray[3]);
                                if(possibleMoves.length === 0) {
                                    gameOver = true;
                                    if(check) {
                                        document.querySelector('.move-log').textContent = "Checkmate!";
                                    } else {
                                        document.querySelector('.move-log').textContent = "Stalemate!";
                                    }
                                } 
                                if(!gameOver && check) {
                                    document.querySelector('.move-log').textContent = "Check!";
                                } else if(!gameOver) {
                                    document.querySelector('.move-log').textContent = "Your move!";
                                }
                            }
                        }
                    }
                    if (!foundMove) {
                        if(initArray[0][targetSquare][0] === colourToMove) {
                            squareChosen = targetSquare;
                        } else {
                            squareChosen = null;
                        }
                    }
                } else {
                    let chosenSquare = parseInt(ele.classList[2].substring(2));
                    if(initArray[0][chosenSquare][0] === colourToMove) {
                        squareChosen = chosenSquare;
                    }
                }
            })
        })
    }
    return {
        init: function() {
            console.log("Starting the application...");
            setUpEventListeners();
        }
    }
})(helperFunction);


mainFunc.init();