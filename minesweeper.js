/**
 * Hello! This was made by Jacob Smith, primarily in the p5js web editor,
 * then ported over to an IDE to polish. This was a re-make of a project
 * that gave me a lot of trouble in my Object Oriented Programming class.
 * I decided I wanted to make my own version on my own time, in a much
 * more realistic way. I had a lot of fun, and I'm glad this was a fun intro
 * into javascript.
 */

//TODO:  replace mines with images
//       reveal mines on loss / win

//=====CUSTOMIZEABLES=====
//const for N*N cell grid
let numCells = 20;
//number of mines in the grid
let numMines = 30;
//const for N*N pixel size canvas
let canvasSize = 300;

//Time tracker
let timeStopped = 0;
let time = 0;
//0 = playing, 1 = win, 2 = lose
let gameState = 0;

const cells = [];
const bombs = [];
let cellsToOpen = [];
//init cells and bombs arrays
for(let i = 0; i < numCells; i++){
  cells[i] = [];
  bombs[i] = [];
  for(let j = 0; j < numCells; j++){
    cells[i][j] = 0;
    bombs[i][j] = 0;
  }
}
//Init
function setup() {
  createCanvas(canvasSize, canvasSize*1.1);
  let startTime = (hour() * 60 + minute() * 60 + second());
  genMines();
}
//Almight draw
function draw() {
  background(220);
  drawCells();
  drawText();
}

//Writes info text at bottom
function drawText(){
  let minesLeft = getMinesLeft();
  textSize(canvasSize * 0.03);
  fill('black');
  text("Mines Left: " + minesLeft, 0, canvasSize + textSize());
  //Gamestate text
  
  //If Lose, display lose
  if(gameState == 2){
    if(timeStopped == 0){
      time = stopTime();
      timeStopped = 1;
    }
    text("You Lose!", canvasSize * 0.5, canvasSize + textSize());
  }
  if(gameState == 1){
    if(timeStopped == 0){
      time = stopTime();
      timeStopped = 1;
    }
    text("You Win!", canvasSize * 0.5, canvasSize + textSize());
    text("Time: " + time, canvasSize * 0.5, canvasSize + 2*textSize()) 
  }
}

//Draw proper cells every tick
function drawCells(){
  if(verifyWin()){
    gameState = 1;
  }
  for(let i = 0; i < numCells; i++){
    for(let j = 0; j < numCells; j++){
      //Draw appropriate sized cells
      fill('white')
      rect((canvasSize / numCells) * i, (canvasSize / numCells) * j, (canvasSize / numCells), (canvasSize / numCells));
      //If cell is "open", display adjacent mines
      if(cells[i][j] == 1 && bombs[i][j] == 0){
        //Count adjacent bombs
        let surroundingMines = 0;
        for(let x = -1; x < 2; x++){
          for(let y = -1; y < 2; y++){
            //If outside array, skip
            if(i+x < 0 || i+x > numCells-1 || j+y < 0 || j+y > numCells-1){
              continue;
            }
            //Check if bomb
            if(bombs[i + x][j + y] === 1){
              surroundingMines++;
            }
          }
        }
        //Propogate cells on 0 mines
        if(surroundingMines == 0){
          for(let x = -1; x < 2; x++){
            for(let y = -1; y < 2; y++){
              //If outside array, skip
              if(i+x < 0 || i+x > numCells-1 || j+y < 0 || j+y > numCells-1){
                continue;
              }
              if(cells[i+x][j+y] == 0){
                //If coords not in to-do list or already open, add em to the list
                cells[i+x][j+y] = 1;
              }
            }
          }
        }
        //Display Open Cells
        if(surroundingMines != 0){
        textSize(Math.floor((canvasSize / numCells) * 0.80));
        fill('black');
        text(surroundingMines, (canvasSize / numCells) * i + (canvasSize / numCells) * 0.2, (canvasSize / numCells) * (j+1) - (canvasSize / numCells) * 0.2);
        }
        else{
          fill('lightgray');
          rect((canvasSize / numCells) * i, (canvasSize / numCells) * j, (canvasSize / numCells), (canvasSize / numCells));
        }
      }
      //Display Mines
      if(bombs[i][j] == 1 && cells[i][j] == 1){
        textSize(Math.floor((canvasSize / numCells) * 0.80));
        fill('red');
        text("M", (canvasSize / numCells) * i + (canvasSize / numCells) * 0.15, (canvasSize / numCells) * (j+1) - (canvasSize / numCells) * 0.15);
      }
      //Display Flags
      if(cells[i][j] == 2){
        textSize(Math.floor((canvasSize / numCells) * 0.80));
        fill('limegreen');
        text("F", (canvasSize / numCells) * i + (canvasSize / numCells) * 0.15, (canvasSize / numCells) * (j+1) - (canvasSize / numCells) * 0.15)
      }
    }
  }
}

//Generates mines in random spots (can technically run forever)
function genMines(){
  let minesLeft = numMines;
  if(numMines > numCells*numCells){
    gameState = 1;
    return;
  }
  while(minesLeft > 0){
    let coords = [Math.floor(Math.random() * numCells), Math.floor(Math.random() * numCells)];
    if(bombs[coords[0]][coords[1]] == 0){
      bombs[coords[0]][coords[1]] = 1;
      minesLeft--;
    }
  }
}
//Determine if a space is safe to open all surrounding cells
function isSafe(i, j){
  let surroundingMines = 0;
  let surroundingFlags = 0;
  //Count surrounding mines and flags
  for(let x = -1; x < 2; x++){
    for(let y = -1; y < 2; y++){
      //If outside array, skip
      if(i+x < 0 || i+x > numCells-1 || j+y < 0 || j+y > numCells-1){
        continue;
      }
      //Check if bomb
      if(bombs[i + x][j + y] === 1){
        surroundingMines++;
      }
      //Check if flag
      if(cells[i+x][j+y] === 2){
        surroundingFlags++;
      }
    }
  }
  //If num flags == num bombs, is safe!
  if(surroundingFlags >= surroundingMines){
    return true;
  }
  return false;
}
//Left click detection to reveal cell
function mousePressed(){
  if(mouseX > 0 && mouseX < canvasSize && mouseY > 0 && mouseY < canvasSize && gameState == 0){
    let col = floor(mouseX / (canvasSize / numCells));
    let row = floor(mouseY / (canvasSize / numCells));
    //if left click on un-opened cell, open it
    if(mouseButton === LEFT && cells[col][row] == 0){
      cells[col][row] = 1;
    }
    //if left click on opened cell, open surrounding cells if player thinks it's safe
    else if(isSafe(col, row) && mouseButton === LEFT && cells[col][row] == 1){
      //Open Surrounding cells
      for(let x = -1; x < 2; x++){
        for(let y = -1; y < 2; y++){
          //If outside array, skip
          if(col+x < 0 || col+x > numCells-1 || row+y < 0 || row+y > numCells-1){
            continue;
          }
          if(cells[col+x][row+y] == 0){
            //If coords not in to-do list or already open, add em to the list
            cells[col+x][row+y] = 1;
          }
        }
      }
    }
    //If clicked on a mine, set game state to 2 (lose)
    if(bombs[col][row] == 1 && cells[col][row] != 2){
      gameState = 2;
    }
  }
}

//Spacebar check to flag / unflag
function keyTyped(){
  if(keyCode === 32 && gameState == 0){
    if(mouseX > 0 && mouseX < canvasSize && mouseY > 0 && mouseY < canvasSize){
      let minesLeft = getMinesLeft();
      let col = floor(mouseX / (canvasSize / numCells));
      let row = floor(mouseY / (canvasSize / numCells));
      if(cells[col][row] == 0 && minesLeft > 0){
        cells[col][row] = 2;
        return;
      }
      else if(cells[col][row] == 2){
        cells[col][row] = 0;
        return;
      }
    }
  }
}

//Gets number of mines left, numMines - flags
function getMinesLeft(){
  let minesLeft = numMines;
  for(let i = 0; i < numCells; i++){
    for(let j = 0; j < numCells; j++){
      if(cells[i][j] === 2){
        minesLeft--;
      }
    }
  }
  return minesLeft;
}

//Verifies win
function verifyWin(){
  let openCells = 0;
  for(let i = 0; i < numCells; i++){
    for(let j = 0; j < numCells; j++){
      if(cells[i][j] === 1 && bombs[i][j] === 0){
        openCells++;
      }
    }
  }
  return ((openCells == (numCells * numCells) - numMines));
}

//Stops the runtime and saves it
function stopTime(){
  let sec = round(millis() / 1000, 2);
  return sec;
}
