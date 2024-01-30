# MinesweeperJs
A simple minesweeper made in javascript, complete with most functionality of the original game.
Hello! This was made by Jacob Smith, primarily in the p5js web editor,
then ported over to an IDE to polish. This was a re-make of a project
that gave me a lot of trouble in my Object Oriented Programming class.
I decided I wanted to make my own version on my own time, in a much
more realistic way. I had a lot of fun, and I'm glad this was a fun intro
into javascript.
## Adjustable Settings:
- You can adjust the number of cells on the board by editing the numCells variable. If numCells = 10, it will produce a 10x10 cell grid, for a total of 100 cells.
- You can adjust the window size with the cavasSize variable. It will make a rectangle of size canvasSize x (cavasSize * 1.1).
- You can adjust the number of total mines in the grid with the numMines variable.

## Features:
- Cell propagation occurs when a cell with 0 adjacent mines is revealed, and it recursively reveals all adjacent cells with 0 mines plus their own adjacent cells.
- Clicking on a cell that has all surrounding mines flagged (or the correct number of flags, regardless of correctness), will reveal all adjacent cells.
- Hovering over a cell and pressing the Spacebar will mark it with a Flag. Placing a flag will reduce the number of mines, regardless of if it is correct or not.
- The game will end in one of two ways. On a win, all non-mine cells must be revealed, regardless of flags placed. On a lose, a mine is revealed in any manner. The timer will show on win.
- The number of mines left based on number of flags placed is always present in the bottom left corner.

![image](https://github.com/loftzo/MinesweeperJs/assets/58479250/961d23a7-9d74-40a6-91cf-5c1c5eebdbc6)
![image](https://github.com/loftzo/MinesweeperJs/assets/58479250/326ae67d-813e-4ceb-a61e-0af83cc4a4e3)
