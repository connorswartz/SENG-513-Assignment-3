/* Course: SENG 513 */
/* Date: OCT 28, 2023 */
/* Assignment 3 */
/* Name: Connor Swartz */
/* UCID: 30055899 */

function selectStarterOption(optionNumber) {
    // Remove 'selected' class from all starter options to reset the visual state of the options
    document.getElementById('starterOption1').classList.remove('selected');
    document.getElementById('starterOption2').classList.remove('selected');
    document.getElementById('starterOption3').classList.remove('selected');
    
    // Use a switch statement to handle different starter options based on the passed optionNumber
    switch (optionNumber) {
        case 1:
            // If option 1 is selected, set the starting player to "Blue" and the non-starter to "Red"
            startingPlayer = "Blue";
            nonStarter = "Red";
            // Visually indicate that option 1 is selected by adding 'selected' class
            document.getElementById('starterOption1').classList.add('selected');
            break;
        case 2:
            // If option 2 is selected, set the starting player to "Red" and the non-starter to "Blue"
            startingPlayer = "Red";
            nonStarter = "Blue";
            // Visually indicate that option 2 is selected by adding 'selected' class
            document.getElementById('starterOption2').classList.add('selected');
            break;
        case 3:
            // If option 3 is selected, randomly choose "Blue" or "Red" as the starting player
            startingPlayer = (Math.random() < 0.5) ? "Blue" : "Red";
            // Set the non-starter to the opposite color of the starting player
            nonStarter = (startingPlayer === "Blue") ? "Red" : "Blue";
            // Visually indicate that option 3 is selected by adding 'selected' class
            document.getElementById('starterOption3').classList.add('selected');
            break;
    }
    // Store the chosen starting player and non-starter in sessionStorage for later use
    sessionStorage.setItem('nonStarter', nonStarter);
    sessionStorage.setItem('startingPlayer', startingPlayer);
}

function selectRoundOption(optionNumber) {
    // Remove 'selected' class from all round options to reset the visual state of the options
    document.getElementById('roundOption1').classList.remove('selected');
    document.getElementById('roundOption3').classList.remove('selected');
    document.getElementById('roundOption5').classList.remove('selected');

    // Use a switch statement to handle different round options based on the passed optionNumber
    switch (optionNumber) {
        case 1:
            // If option 1 is selected, set the rounds to win to 1
            roundsToWin = 1;
            // Visually indicate that option 1 is selected by adding 'selected' class
            document.getElementById('roundOption1').classList.add('selected');
            break;
        case 3:
            // If option 3 is selected, set the rounds to win to 3
            roundsToWin = 3;
            // Visually indicate that option 3 is selected by adding 'selected' class
            document.getElementById('roundOption3').classList.add('selected');
            break;
        case 5:
            // If option 5 is selected, set the rounds to win to 5
            roundsToWin = 5;
            // Visually indicate that option 5 is selected by adding 'selected' class
            document.getElementById('roundOption5').classList.add('selected');
            break;
    }
    // Store the chosen rounds to win in sessionStorage for later use
    sessionStorage.setItem('roundsToWin', roundsToWin);
}

function selectChipOption(optionNumber) {
    // Remove 'selected' class from chip options to reset the visual state of the options
    document.getElementById('option4').classList.remove('selected');
    document.getElementById('option5').classList.remove('selected');

    // Use a switch statement to handle different chip options based on the passed optionNumber
    switch (optionNumber) {
        case 4:
            // If option 4 is selected, set the chips to win to 4
            chipsToWin = 4;
            // Visually indicate that option 4 is selected by adding 'selected' class
            document.getElementById('option4').classList.add('selected');
            break;
        case 5:
            // If option 5 is selected, set the chips to win to 5
            chipsToWin = 5;
            // Visually indicate that option 5 is selected by adding 'selected' class
            document.getElementById('option5').classList.add('selected');
            break;
    }
    // Store the chosen chips to win in sessionStorage for later use
    sessionStorage.setItem('chipsToWin', chipsToWin);
}

// Game Initialization
document.addEventListener('DOMContentLoaded', () => {
    // Check if the 'startingPlayer' item has already been set in sessionStorage
    if (!sessionStorage.getItem('startingPlayer')) {
        // If not set, default the 'startingPlayer' to "Blue" and 'nonStarter' to "Red"
        sessionStorage.setItem('startingPlayer', "Blue");
        sessionStorage.setItem('nonStarter', "Red");
    }
    
    // Call updatePlayerDisplay to refresh the UI with the current player's info
    updatePlayerDisplay();

    // Check if the 'roundsToWin' item has already been set in sessionStorage
    if (!sessionStorage.getItem('roundsToWin')) {
        // If not set, default the 'roundsToWin' to 1
        sessionStorage.setItem('roundsToWin', 1);
    }

    // Check if the 'chipsToWin' item has already been set in sessionStorage
    if (!sessionStorage.getItem('chipsToWin')) {
        // If not set, default the 'chipsToWin' to 4
        sessionStorage.setItem('chipsToWin', 4);
    }
    // The above settings ensure that the game has default values for its configuration
    // when it loads for the first time
});

// Game Board
/* Initialized game board here */
let board = [
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null]
];

let currentPlayer = sessionStorage.getItem('startingPlayer');
let isAnimating = false;

// Custom algorithm for getting chips to land in correct positions
function placeToken(columnIndex) {
    // Exit function early if an animation is currently in progress
    if (isAnimating) return;
    // Mark the start of a new animation sequence
    isAnimating = true;

    // Search for the lowest empty row in the specified column to place the token
    let emptyRow = -1; 
    for (let i = 5; i >= 0; i--) {
        if (board[columnIndex][i] === null) {
            emptyRow = i;
            break; // Exit the loop as soon as the empty row is found
        }
    }

    // If no empty rows are found, notify the user and reset the animation flag
    if (emptyRow === -1) {
        alert("Column is full!");
        isAnimating = false;
        return;
    }

    // Initialize the row index for the animation of the token "falling" down
    let currentRow = 0;
    // Start the interval that will animate the token dropping
    let fallAnimation = setInterval(() => {
        // Remove the token from the previous cell as it "falls" to the next one
        if (currentRow > 0) {
            let previousCell = document.querySelector(`.column:nth-child(${columnIndex + 1}) .cell:nth-child(${currentRow})`);
            previousCell.classList.remove(currentPlayer === "Blue" ? "blue" : "red");
        }

        // When the token reaches the target row, clear the interval and finalize the token placement
        if (currentRow > emptyRow) {
            clearInterval(fallAnimation);
            board[columnIndex][emptyRow] = currentPlayer; // Update the game state
            let cell = document.querySelector(`.column:nth-child(${columnIndex + 1}) .cell:nth-child(${emptyRow + 1})`);
            cell.classList.add(currentPlayer === "Blue" ? "blue" : "red"); // Visually place the token

            // Perform a win check and update the game accordingly
            if (checkWin()) {
                updateScore(); // Update the score if there's a win
                resetGame(); // Prepare for a new round
            } else if (checkDraw()) {
                alert("It's a draw!"); // Notify the players of a draw
                resetGame(); // Reset the game in case of a draw
            } else {
                // If no win or draw, switch to the other player
                currentPlayer = (currentPlayer === "Blue") ? "Red" : "Blue";
                updatePlayerDisplay(); // Update the display to reflect the current player
            }
            isAnimating = false; // Animation is complete, reset the flag
            return;
        }

        // Visualize the token in the current cell as it "falls"
        let currentCell = document.querySelector(`.column:nth-child(${columnIndex + 1}) .cell:nth-child(${currentRow + 1})`);
        currentCell.classList.add(currentPlayer === "Blue" ? "blue" : "red");
        currentRow++; // Move to the next row down for the next iteration of the animation
    }, 150); // The time in milliseconds between each "frame" of the animation
}

function checkWin() {
    // After chip has been placed, checks rows, columns, and diagonals for wins
    // This should check for four in a row or five in a row depending on game option chosen

    // Helper function to count consecutive tokens/chips in a specified direction
    const checkDirection = (columnIndex, rowIndex, directionX, directionY) => {
        let count = 0; // Initialize count of consecutive tokens
        let x = columnIndex; // Start checking from the columnIndex passed
        let y = rowIndex; // Start checking from the rowIndex passed

        // Continue while the cell is within the board bounds and contains the current player's token
        while (x >= 0 && x < 7 && y >= 0 && y < 6 && board[x][y] === currentPlayer) {
            count++; // Increment count for each matching token found
            x += directionX; // Move to the next cell in the horizontal direction
            y += directionY; // Move to the next cell in the vertical direction
        }

        // Return the total count of consecutive tokens found in the specified direction
        return count;
    };

    if (sessionStorage.getItem('chipsToWin') === "4") {
        console.log('Check');
        for (let columnIndex = 0; columnIndex < 7; columnIndex++) {
            for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
                if (board[columnIndex][rowIndex] === currentPlayer) {
                    if (checkDirection(columnIndex, rowIndex, 0, 1) >= 4) { // Vertical
                        return true;
                    }
                    if (checkDirection(columnIndex, rowIndex, 1, 0) >= 4) { // Horizontal
                        return true;
                    }
                    if (checkDirection(columnIndex, rowIndex, 1, 1) >= 4) { // Diagonal (bottom left to top right)
                        return true;
                    }
                    if (checkDirection(columnIndex, rowIndex, 1, -1) >= 4) { // Diagonal (top left to bottom right)
                        return true;
                    }
                }
            }
        }
    }

    else {
        console.log('Check2');
        for (let columnIndex = 0; columnIndex < 7; columnIndex++) {
            for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
                if (board[columnIndex][rowIndex] === currentPlayer) {
                    if (checkDirection(columnIndex, rowIndex, 0, 1) >= 5) { // Vertical
                        return true;
                    }
                    if (checkDirection(columnIndex, rowIndex, 1, 0) >= 5) { // Horizontal
                        return true;
                    }
                    if (checkDirection(columnIndex, rowIndex, 1, 1) >= 5) { // Diagonal (bottom left to top right)
                        return true;
                    }
                    if (checkDirection(columnIndex, rowIndex, 1, -1) >= 5) { // Diagonal (top left to bottom right)
                        return true;
                    }
                }
            }
        }

    }
    return false;  
}

function checkDraw() {
    // Check if entire board has been filled out
    // If board filled out and nobody has won, return true
    for (let col of board) {
        for (let cell of col) {
            if (cell === null) {
                return false;
            }
        }
    }
    return true;
}

function updateScore() {
    // Select the correct score element based on the current player
    let scoreElem = (currentPlayer === "Blue") ? document.getElementById("player1-score") : document.getElementById("player2-score");
    // Increment the score of the current player
    scoreElem.textContent = parseInt(scoreElem.textContent) + 1;

    // Check if the current player's score matches the required rounds to win
    if (scoreElem.textContent === sessionStorage.getItem("roundsToWin")) {
        // Check if the game was set to a single round win condition
        if (sessionStorage.getItem('roundsToWin') === "1") {
            // Notify that the current player won the single round and is the champion
            alert(`${currentPlayer} won ` + sessionStorage.getItem('roundsToWin') + ` round! They are the champion!`);
        }
        else {
            // Notify that the current player won multiple rounds and is the champion
            alert(`${currentPlayer} won ` + sessionStorage.getItem('roundsToWin') + ` rounds! They are the champion!`);
        }
        // Reset both players' scores to zero for a new game
        scoreElem = document.getElementById("player1-score");
        scoreElem.textContent = 0;
        scoreElem = document.getElementById("player2-score");
        scoreElem.textContent = 0;
    }
    else {
        // Notify that the current player has won the current round
        alert(`${currentPlayer} wins this round!`);
    }
}

function resetGame() {
    // Reset each column in the board array to be filled with null values, indicating empty cells
    board = board.map(col => col.fill(null));

    // Select all cell elements on the board and remove any class indicating a player's token
    let cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        cell.classList.remove("blue", "red");
    });

    // Retrieve the non-starter player from sessionStorage and set them as the current player
    currentPlayer = sessionStorage.getItem('nonStarter');
    
    // Call updatePlayerDisplay to refresh the UI for the new round
    updatePlayerDisplay();

    // Determine the new non-starter by switching to the other player
    nonStarter = (currentPlayer === "Blue") ? "Red" : "Blue";

    // Save the new non-starter in sessionStorage for the next round
    sessionStorage.setItem('nonStarter', nonStarter);
}

function updatePlayerDisplay() {
    // Retrieve the DOM elements for player 1's display and chip
    var player1Element = document.querySelector('.players-info .player:first-child span');
    var player1Chip = document.querySelector('.players-info .player:first-child .chip');
    // Retrieve the DOM elements for player 2's display and chip
    var player2Element = document.querySelector('.players-info .player:last-child span');
    var player2Chip = document.querySelector('.players-info .player:last-child .chip');

    // Adjust the visual display of the player's info to indicate the current player
    if (currentPlayer === "Blue") {
        // If current player is Blue, highlight player 1's display and chip
        player1Element.style.opacity = '1';
        player1Chip.style.opacity = '1'; // Make player 1 fully visible
        player2Element.style.opacity = '0.3';
        player2Chip.style.opacity = '0.3'; // Dim player 2 to indicate it's not their turn
    } else {
        // If current player is Red, do the opposite
        player1Element.style.opacity = '0.3';
        player1Chip.style.opacity = '0.3'; // Dim player 1 to indicate it's not their turn
        player2Element.style.opacity = '1';
        player2Chip.style.opacity = '1'; // Make player 2 fully visible
    }
}