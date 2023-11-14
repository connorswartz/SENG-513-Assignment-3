Course: SENG 513
Date: NOV 12, 2023
Assignment 3
Name: Connor Swartz
UCID: 30055899

- Approached the game by focusing one small pieces of functionality at a time, one step at a time
- Was able to get help from ChatGPT and able to learn better approaches/methods as I progressed
- Found it best to handle complex pieces of code in steps:
    - First break it down into smaller pieces
    - Then try to get ChatGPT to explain best approach
    - Would try to implement functionality on my own to make sure I had some understanding
    - Would then get ChatGPT to write parts of the functionality to give me a start if I was facing issues
    - Would build off of this, having ChatGPT analyze my code as I progressed to suggest fixes/changes

- First started with basics like making sure I could get the right chips in the right columns
    - Somewhat painless process

- Then started keeping track of chips to see if anyone had won or if board was full
    - Had some issues implementing as logic was a bit tricky
    - ChatGPT helped getting some logic straight for checking 4 in a row
    - Once I was able to fully understand 4 in a row logic, 5 in a row was easy to implement
    - Checking for draw fairly easy, just needed to check if all spots filled
    - Learned how I could easily iterate through each board column and indices to check for chips
    - Learned how easily the html gameboard could be simulated using arrays

- Next focused on updating scores
    - Needed a bit of help from ChatGPT at first to understand approach
    - After getting better grasp on approach implementation not too hard
    - Learned different ways of retrieving and manipulating text content of html data

- Implemented resetting gameboard
    - ChatGPT successfully did most of this with no issues
    - Learned that I could have each cell check for multiple items and remove whichever was there
    - Later learned this would be best place to switch players for next round, so I implemented that here

- Implementation of options menu to set starting player, number of rounds, and number of chips to win
    - Had ChatGPT do starting player so I could get good idea of how this would be implemented
    - Made some changes to ChatGPT's code to include not only starting player, but which player DIDN'T start for later use
    - After getting good understanding of how elements could be chosen by retrieving elements using different cases
    - Used what I learned from ChatGPT to create my own functions for picking number of rounds and number of chips

- Created event listener to make sure options chosen would hold across page changes
    - Used session storage to make sure this information was not lost while session was still open
    - Had ChatGPT help me with approach to functionality and understanding, but wrote this on my own

- Implemented updating displays of each player on turn changes
    - Something needed in my event listener to make sure correct player was shown
    - ChatGPT helped write first part of this function as I was uncertain about using query selector to retrieve info
    - Used retrieved info to make necessary changes to css elements depending whose turn it is
    - Learned about using variables to manipulate css elements using query selection here

- Lastly worked on animation of chips falling
    - Found this difficult to implement on my own
    - ChatGPT was able to provide code and insight for intervals/delays for chips falling through slots after placement

- Key insights learned from using AI (ChatGPT in this case):
    - AI doesn't always get everything full right (sometimes it gets things completely wrong)
    - It is best to try to learn and work with the AI, rather than getting AI to try to do everything
    - Often found that AI was able to get part of the job done, but then I would have to review/change/finish the rest
    - On occasions AI would get something completely right, still best to analyze this as other parts of code could be intertwined with this and may have unknown impacts on previously written or future code
    - Always best to try to understand what every bit of code is doing because AI may not always provide necessary help