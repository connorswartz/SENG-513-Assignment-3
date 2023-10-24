/* Course: SENG 513 */
/* Date: OCT 23, 2023 */
/* Assignment 2 */
/* Name: Connor Swartz */
/* UCID: 30055899 */

// Options Menu
/* Initialize startingPlayer here */
/* Initialize roundsToWin here */
/* Initialize chipsToWin here */

function selectStarterOption(optionNumber) {
    // Function to handle the selection of the starting player
    // Clear any existing selection
    // Should then set starting player according to selected option
    // Should make a random selection if "Random" is chosen
}

function selectRoundOption(optionNumber) {
    // Function to handle the selection of the rounds needed to win
    // Clear any existing selection
    // Set the amount of rounds required to win according to selected option
}

function selectChipOption(optionNumber) {
    // Function to handle the selection of the chips needed to win
    // Clear any existing selection
    // Set amount of chips in a row needed to win according to selected option
}

// Game Board
/* Initialized game board here */

function placeToken(columnIndex) {
    // Function to handle token placement on game board
    // If column full, do not allow placement
    // Check if placement results in win, if it does update score and reset board
    // Check if placement fills up board and results in draw, reset board, don't update scores
    // Change starting player to opposite of player who started previous game
}

function checkWin() {
    // After chip has been placed, checks rows, columns, and diagonals for wins
    // This should check for four in a row or five in a row depending on game option chosen
}

function checkDraw() {
    // Check if entire board has been filled out
    // If board filled out and nobody has won, return true
}

function updateScore() {
    // If a player has won, update their score at bottom of the screen accordingly
}

function resetGame() {
    // Reset game board so all slots are empty
}