const state = {
};
'use strict';

/* global item */




// State modification functions

const gameState = {
     //Load Board and it is empty
        board: [null, null, null, null, null, null, null, null, null], //[0] = row 1. [1] = row 2, [2] = row 3
        xIsNext: false,
        win: []
    };

    //dynamically updates the board based on the board in gameState
    //move should be the board passedIn after being updated
    function generateARow(move) {   
       return `
            <div class="row" data-row-index = "1">
                <div class="cell" id="0">
                    <p>${move[0]}</p>
                </div>
                <div class="cell" id="1">
                    <p>${move[1]}</p>
                </div>
                <div class="cell" id="2">
                    <p>${move[2]}</p>
                </div>
            </div>
            <div class="row" data-row-index = "2">
                <div class="cell" id="3">
                    <p>${move[3]}</p>
                </div>
                <div class="cell" id="4">
                    <p>${move[4]}</p>
                </div>
                <div class="cell" id="5">
                    <p>${move[5]}</p>
                </div>
            </div>
            <div class="row" data-row-index = "3">
            <div class="cell" id="6">
                <p>${move[6]}</p>
            </div>
            <div class="cell" id="7">
                <p>${move[7]}</p>
            </div>
            <div class="cell" id="8">
                <p>${move[8]}</p>
            </div>
        </div>
    `;
    }
    
    //Afer a user completes their turn, the board should update the DOM.
    //If it was 1 turn, then we should display an X in the appropriate square and same for player 2
    //Should return the entire board to the DOM.
    function renderBoard() {
        //Afer a user completes their turn, the board should update the DOM.
        //If it was 1 turn, then we should display an X in the appropriate square and same for player 2
        //Should return the entire board to the DOM.
        let gameBoard = generateARow(gameState.board);
        $('.board').html(gameBoard);
    }

    function toggleAndReturnPlayersTurn() {
        //Toggle Players Turn
        gameState.xIsNext = !gameState.xIsNext;
        //return the move
        if(gameState.xIsNext) {
            return 'X';
        } else { return 'O';}
    }

    function checkLegalPlay(index) {
        //receives cell ID from handleATurn, and checks to see if that cell is in play.
        //if it doesn't contain X or O, then return true
        
        if(gameState.board[index] === null && gameState.win.length === 0 ) {
            return true;
        } else {
            return false;
        }
    }

    function makeMove(index) {
        const cellNum = Math.abs(index);
        const winPattern = checkWinner(gameState.board);
        
        if(!checkLegalPlay(cellNum)) {
            return;
        } if(checkLegalPlay(cellNum)) {
           let marker = toggleAndReturnPlayersTurn();
           gameState.board[cellNum] = marker;
        } if (winPattern) {
            gameState.win = winPattern;
            return;
        }
    }



    function handleATurn() {
        //Listen for when a user clicks on the game board.
        $('.board').on('click', function(event) {

        //get ID of cell and pass as the index to checkLegalPlay
        let index = $(event.target).closest('.cell').attr('id');
        
        //initate move
        makeMove(index);

        //Re-Render
        
        renderBoard();
        });


    }

    function checkWinner(board) {
        const winArray = [[0,3,6], [1,4,7], [2,5,8],[0,1,2],[3,4,5],[6,7,8], [0,4,8],[2,4,7]];
        
        for(let i = 0; i < winArray.length; i++) {
            const winnerFound = winArray[i];

            if(!gameState.board[winnerFound[0]]) continue;

            if (gameState.board[winnerFound[0]] === gameState.board[winnerFound[1]] &&   gameState.board[winnerFound[1]] === gameState.board[winnerFound[2]]){
                return winnerFound;
            }
        }

        return null;
    }

    function newGame () {
        gameState.board = Array(9).fill(null),
        gameState.xIsNext = false,
        gameState.winPattern = null
    }

    function handleResetGame() {
        newGame();
        renderBoard();
    }


   

    //POSSIBLE SCENARIOS
        //Load Board and it is empty
        //User 1 plays and clicks a cell causing an X to appear in top left
        //User 2 plays and clacks a cell causing an X to appear
        //A user clicks a cell that already has been played in
        //A user clicks outside of the gameboard
        //A user gets 3 in a row and it should highlight the winning row.
        //After game is over, only click should be to reset game
        //I clikc a new game at any time it would reset the game board







// Render functions

function handleGameBoard() {
    renderBoard();
    handleATurn();

}

// Event Listeners

$(handleGameBoard);
$('#new-game').click(handleResetGame());