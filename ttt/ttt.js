let availSpace = Array(3).fill().map(() => Array(3).fill(true));
let injectX = `<img src="x.png" class="button-img">`;
let injectO = `<img src="o.png" class="button-img">`;
let injectBlank = `<img src="blank.png" class="button-img">`;
let roundCount = 1;
let buttonElement;
let convert, row, col;
let position = [];
let moveCountX = [[],[]]; // 0 = row, 1 = col
let moveCountO = [[],[]];
let xWinCount = 0;
let oWinCount = 0; //count pieces in correct positions
let xSameRow = { top:0, mid:0, bot:0};
let oSameRow = { top:0, mid:0, bot:0};
let xSameCol = { top:0, mid:0, bot:0};
let oSameCol = { top:0, mid:0, bot:0};
let rop = 0; //or left - also, it threw an error calling it "top" so rop
let mid = 1; 
let bot = 2; //or right
let max = 2;

let gameboard = document.querySelector('.js-gameboard');

document.body.querySelector('.js-play-again')
  .addEventListener('click', () => {
    resetBoard();
  });

gameboard.addEventListener('click', event => {
  buttonElement = event.target.closest('.space-button');
  console.log(buttonElement);
  console.log(roundCount);
  if (checkMove()){
    console.log(buttonElement);
    playMove();
  }else{
    alert('Please pick a valid position.');
  }

});

function checkMove(){
  gatherMove();
  if (!availSpace[row][col]){
    clearVars();
    return false;
  }else{
    clearVars();
    return true;
  }
}//check if space is available

function gatherMove(){
  convert = JSON.stringify(buttonElement.id);
  console.log(convert);
  position = convert.split('');
  row = Number(position[4]) - 1; // 
  col = Number(position[8]) - 1;
} //just places the user stuff into variables

function clearVars(){
  convert='';
  position.length = 0;
  row = 0;
  col = 0;
}

function pushMove(player, rowNum, colNum){
  if(player === 'x'){
    availSpace[rowNum][colNum] = false;
    moveCountX[0].push(rowNum);
    moveCountX[1].push(colNum);
  }else if(player === 'o'){
    availSpace[rowNum][colNum] = false;
    moveCountO[0].push(rowNum);
    moveCountO[1].push(colNum);
  }
}

async function playMove(){
  if(roundCount % 2 == 1){
    buttonElement.innerHTML = injectX;
    gatherMove();
    pushMove('x', row, col);
    clearVars();
    console.log('played x');
    roundCount++;
    buttonElement.querySelector('.button-img').classList.add('loaded');
  }else{
    buttonElement.innerHTML = injectO;
    gatherMove();
    pushMove('o', row, col);
    clearVars();
    console.log('played o');
    roundCount++;
    buttonElement.querySelector('.button-img').classList.add('loaded');
  }

  await new Promise(resolve => setTimeout(resolve, 10));

  if((roundCount == 9) && checkWinO()){
    alert('O Wins!');
    resetBoard();
  }else if(checkWinX()){
    alert('X Wins!');
    resetBoard();
  }else if(checkWinO()){
    alert('O Wins!');
    resetBoard();
  }else if(roundCount == 10 && (!checkWinX() && !checkWinO())){
    alert('Tie game!');
    resetBoard();
  }
}

function checkWinX(){ 
  if (!(roundCount>4 && (roundCount%2 == 0))) return false;
  moveCountX[0].forEach((valRow, index) => {
    let rowValue = moveCountX[0][index];
    let colValue = moveCountX[1][index];
    
    switch(rowValue){ //rows
      case rop:
        xSameRow.top++;
        break;
      case mid:
        xSameRow.mid++;
        break;
      case bot:
        xSameRow.bot++;
        break;
    }
    switch(colValue){ //cols
      case rop:
        xSameCol.top++;
        break;
      case mid:
        xSameCol.mid++;
        break;
      case bot:
        xSameCol.bot++;
        break;
    }
  }); // counts values in each row & col for x

  moveCountX[0].forEach((valRow, index) => {
    if(moveCountX[0][index] === moveCountX[1][index]){
      xWinCount++;
    }
  }); 

  if (xWinCount === 3){
    return true;
  }else{
    xWinCount = 0; 
  }

  moveCountX[0].forEach((valRow, index) => {
    if(moveCountX[0][index] === (max - moveCountX[1][index])){
      xWinCount++;
    }
  });

  if (xWinCount === 3){
    return true;
  }else{
    xWinCount = 0; 
  }
  
  for(let rowCheck in xSameRow){
    if(xSameRow[rowCheck] === 3){
      return true;
    }else if (xSameCol[rowCheck] === 3){
      return true;
    }
  }

  for(let prop in xSameRow){ //clearing these for fresh iteration on new pass
    xSameRow[prop] = 0;
  }
  for(let prop in xSameCol){
    xSameCol[prop] = 0;
  }
  return false;
}

function checkWinO(){
  if (!(roundCount>4 && (roundCount%2 == 1))) return false;
  moveCountO[0].forEach((valRow, index) => {
    let rowValue = moveCountO[0][index];
    let colValue = moveCountO[1][index];
    switch(rowValue){ //rows
      case rop:
        oSameRow.top++;
        break;
      case mid:
        oSameRow.mid++;
        break;
      case bot:
        oSameRow.bot++;
        break;
    }
    switch(colValue){ //cols
      case rop:
        oSameCol.top++;
        break;
      case mid:
        oSameCol.mid++;
        break;
      case bot:
        oSameCol.bot++;
        break;
    }
  }); // counts values in each row & col for x

  moveCountO[0].forEach((valRow, index) => {
    if(moveCountO[0][index] === moveCountO[1][index]){
      oWinCount++;
    }
  }); 

  if (oWinCount === 3){
    return true;
  }else{
    oWinCount = 0; 
  }

  moveCountO[0].forEach((valRow, index) => {
    if(moveCountO[0][index] === (max - moveCountO[1][index])){
      oWinCount++;
    }
  }); 

  if (oWinCount === 3){
    return true;
  }else{
    oWinCount = 0; 
  }

  for(let rowCheck in oSameRow){
    if(oSameRow[rowCheck] === 3){
      return true;
    }else if (oSameCol[rowCheck] === 3){
      return true;
    }
  }

  for(let prop in oSameRow){
    oSameRow[prop] = 0;
  }
  for(let prop in oSameCol){
    oSameCol[prop] = 0;
  }
  return false;
}

function resetBoard (){
  for(let row = 1; row<=3; row++){
    for(let col = 1; col<=3; col++){
      let labelChange = `row${row}col${col}`;
      document.getElementById(labelChange)
        .innerHTML = injectBlank;
    }
  }
  roundCount=1;
  clearVars();
  availSpace.forEach((array, index) =>{
    availSpace[index].forEach((array2, index2)=>{
      availSpace[index][index2] = true;
    });
  });
  moveCountX[0].length = 0;
  moveCountX[1].length = 0;
  moveCountO[0].length = 0;
  moveCountO[1].length = 0; 
  
  for(let prop in xSameRow){ 
    xSameRow[prop] = 0;
  }
  for(let prop in xSameCol){
    xSameCol[prop] = 0;
  }
  for(let prop in oSameRow){
    oSameRow[prop] = 0;
  }
  for(let prop in oSameCol){
    oSameCol[prop] = 0;
  }
}