Course: SENG 513
Date: NOV 12, 2023
Assignment 3
Name: Connor Swartz
UCID: 30055899

Below I have outlined what I feel to be three of the most complex parts of my code.

1. placeToken function
    - One of the most, if not the most complex parts of my code, the placeToken function is a key component. I had help from ChatGPT with parts of this function, especially the animations.
    - Primary function is to place chips on the gameboard and update game accordingly.
    - Animation Guard: The function starts with a check for the "isAnimating" flag. If "isAnimating" is true, it means an animation (chip falling effect) is currently in progress, and the function will not proceed further. This prevents users from placing new chips while an animation is happening. This avoids an issue involving multiple chips of the same colour being placed back to back, without the other player getting to go.
    - Setting Animation Flag: If no animation is in progress, the function sets "isAnimating" to "true", indicating that an animation is about to start. This allows the entire animation to play out before game continues.
    - Finding an Empty Spot: The function then looks for the first empty spot in the specified column to place the chip. It starts from the bottom (index 5) and goes upwards. If it finds an empty spot (where board[columnIndex][i] is null), it will record the row index in "emptyRow". If no empty spot is found ("emptyRow" remains as "-1") and an alert will be given saying that the column is full. The "isAnimating" flag will then reset and exit.
    - Animation Loop: The function then uses "setInterval" to create a falling animation for the chips. This loop will run every 150 milliseconds and simulate the chips falling down the column.
        - Removing Previous Chip: If the current row ("currentRow") is not the top row, the function removes the placed chip from the cell in the previous (above). This creates the visual effect of the token moving down one cell at a time.
        - Ending the Animation: If the current row exceeds the "emptyRow" (the target row for the chip), the loop clears the interval and stops the animation.
        - Updating Board State: The function then updates the game board array (board[columnIndex][emptyRow]) to show the placement of the new chip.
        - Visual Chip Placement: It then updates the corresponding cell in the HTML with the appropriate class to display the red or blue chip on the gameboard. 
    - Post-Placement Actions: After placing the chip, the function checks if the player than placed the chip has won or if their placement has result in a draw by calling the "checkWin and "checkDraw" functions. Depending on the result, it may update the score, reset the game, or switch the current player. The "updatePlayerDisplay" function is then called to switch to the other player's turn.
    - Resetting Animation Flag: At the end of the function, "isAnimating" is set back to false, allowing new chips to be placed by the other player, starting the whole process over again.
    - Overall, the "placeToken" function manages the logic of placing a chip on the gameboard, animating this action, updating the game state, and preparing for the next turn.

2. checkWin function
    - I had help from ChatGPT with parts of the logic in this function.
    - The "checkWin" function is meant to check if the current player has achieved a winning condition in the game with their most recent chip placement.
    - Nested Helper Function "checkDirection": Inside "checkWin," there is a helper function called "checkDirection" which takes five parameters: "columnIndex," "rowIndex," "directionX," "directionY," and "player." It is used to check how many consecutive chips of the same player are in a given direction (horizontal, vertical, or diagonal). It does this by starting at the given cell ("columnIndex," "rowIndex") and moves in the specified direction ("directionX," "directionY"), counting the number of consecutive cells with the current player's chip until it encounters a cell without one.
    - Determining Winning Condition: The function first checks the "chipsToWin" setting stored in session storage. Depending on whether it's set to "4" or "5," the function changes its logic to check for either four or five consecutive chips, respectively.
    - Iterating Through the Board: The function iterates through each cell on the gameboard using two nested loops. The outer loop iterates over columns, and the inner loop iterates over rows.
    - Checking Each Direction for a Win: For each cell, if the cell contains the current player's chip, the function checks in four directions to see if there's a winning line:
        - Vertical
        - Horizontal
        - Diagonal (Bottom Left to Top Right): Diagonal upwards to the right (directionX = 1, directionY = 1).
        - Diagonal (Top Left to Bottom Right): Diagonal downwards to the right (directionX = 1, directionY = -1).
    - For each direction, the "checkDirection" function is called with the current cell's coordinates and the direction to check. If the return value from "checkDirection" meets or exceeds the "chipsToWin" (4 or 5), the "checkWin" function will return "true," indicating a win.
    - Returning the Result: If no winning line is found after iterating through all cells, the function returns "false," indicating that there is no winner yet and the game will continue.
    - Overall, the "checkWin" function checks each cell on the board for the current player's chips, then checks in all four possible directions from each chip to determine if a winning line exists.

3. updateScore function
    -The "updateScore" function plays a crucial role in updating and managing the game's score after a player wins a round. This function is less important when only one round is required to win the game.
    - Identifying the Score Element: The function first identifies the score element in the HTML document corresponding to the current player. If the current player is "Blue," it selects the element with the ID "player1-score;" if the current player is "Red," it selects the element with the ID "player2-score." This element represents the current score of the player that one the previous round.
    - Updating the Score: The function retrieves the current score from the selected element/user and increments it by one, as the current player has won the most recent round. This is achieved by parsing the existing score to an integer, adding one, and then updating the text content of the score element with this new value.
    - Checking for Game Win Condition: After updating the score, the function checks if the current player's score equals the number of rounds required to win the game ("roundsToWin" from session storage). This check determines if the current player has won the entire game by reaching the required number of round wins.
    - Handling Game Win: If the player's score matches the required number of rounds to win, the function announces the player as the champion using an alert message. The message format varies slightly depending on whether the "roundsToWin" is set to "1" or a higher number. The function also resets both players' scores to zero in preparation for a new game.
    - Handling Round Win: Similar to handling a game win, but if the game win condition is not met, the function simply displays an alert that the current player has won the current round, but not the game as a whole.
    - Resetting the Game Board: In both scenarios (winning the game or just the round), the game board is reset for the next round or game. This is handled by the "resetGame."
    - Overall, "updateScore" is responsible for incrementing the winner's score, checking if the winning condition for the game has been met, displaying appropriate alerts based on the game's state (round win or game win), and preparing the game for the next round or a new game.