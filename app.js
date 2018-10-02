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
        let template = '<div class="board">';

        gameState.board.forEach((cell, index) => {
            if(index === 0 || index === 3 || index === 6 ) {
                template += '<div class="row">';
            }

        let winClass = gameState.win.includes(index) ? ' win' : '';
            
        
            template += ` 
                <div class="cell${winClass}" id="${index}">
                    <p> ${cell || '&nbsp;'} </p>
                </div>`;

            if(index === 2 || index === 5 || index === 8 ) {
                template += '</div>';
            }
        });

        template += '</div>';

        return template;

    }
    
    //Afer a user completes their turn, the board should update the DOM.
    //If it was 1 turn, then we should display an X in the appropriate square and same for player 2
    //Should return the entire board to the DOM.
    function renderBoard() {
        //Afer a user completes their turn, the board should update the DOM.
        //If it was 1 turn, then we should display an X in the appropriate square and same for player 2
        //Should return the entire board to the DOM.

        let gameBoard = generateARow(gameState.board);
        $('.game').html(gameBoard);
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
        //const winPattern = checkWinner(gameState.board); // returns null
        
        if(!checkLegalPlay(cellNum)) {
            return;
        } else {
           let marker = toggleAndReturnPlayersTurn();
           gameState.board[cellNum] = marker;
        } 
        const winPattern = checkWinner(gameState.board);
        if (winPattern) {
            gameState.win = winPattern;
            return;
        }
    }



    function handleATurn() {
        //Listen for when a user clicks on the game board.
        $('.game').on('click', function(event) {

        //get ID of cell and pass as the index to checkLegalPlay
        let index = $(event.target).closest('.cell').attr('id');
        
        //initate move
        makeMove(index);

        //Re-Render
        
        renderBoard();
        });


    }

    function checkWinner(board) {
        const winArray = [[0,3,6], [1,4,7], [2,5,8],[0,1,2],[3,4,5],[6,7,8], [0,4,8],[2,4,6]];
        
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
        gameState.win = []
    }

    function handleResetGame() {
        $('#new-game').on('click', function() {
            newGame();
            renderBoard();
        });
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
    handleResetGame();
}

// Event Listeners

$(handleGameBoard);
