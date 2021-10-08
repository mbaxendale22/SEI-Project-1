function init() {
  const grid = document.querySelector('.grid-container')
  const width = 10
  const gridSize = width * width
  const cellsArray = []
  const minesArray = []
  const objectArray = []
 
 
   class Cell {
     constructor (gridPosition, mine, number, flag, state) {
       this.gridPosition = gridPosition 
       this.mine = mine,
       this.number = number,
       this.flag = flag,
       this.state = state
     }
     placeMine() {
       this.gridPosition.classList.add('mine');
       this.mine = 'on' 
     }
     // showMineProx(num){
     //   this.gridPosition.innerText = num
     //   this.number = num
     //   if (this.gridPosition)
     // }
     changeState(currentState){
       this.gridPosition.classList.add(`${currentState}`)
       this.state = currentState
     }
   }
 
  
 // create a grid
 for (let i = 0; i < gridSize; i++){
   const cell = document.createElement('div')
   cell.setAttribute('id', `${i}`)
   cell.innerText = i
   grid.appendChild(cell)
   cellsArray.push(cell)
 }
 // create an array of objects with their position specified on the grid
 for (let i = 0; i < gridSize; i++){
   const cellObject = new Cell(document.getElementById(`${i}`), 'off', 'none', 'none', 'unclicked')
   objectArray.push(cellObject)
 }
 
   //randomly generate a number and push into array, call the placeMine method in corresponding objects
   // in the objectsArray
 
 function placeMines (){
   for (let i = 0; i < 25; i++){
     const randomNumber = Math.floor(Math.random() * objectArray.length)
     minesArray.push(randomNumber)
   }
   minesArray.forEach(item => objectArray[item].placeMine())
 }  
 
 placeMines()
 
 //   for (i=11; i < (gridSize-width)-1; i++){
 //  if objectArray[]
 
 //   }
 
   // for (let i = 11; i < 89; i++){
   //   const fieldArray = []
   //   fieldArray.push(
   //     objectArray[i-1], objectArray[i+1], objectArray[i-width], objectArray[i+width], objectArray[(i-width)-1], objectArray[(i-width+1)], objectArray[(i+width+1)], objectArray[(i+width-1)]);
   //   const howManyMines = fieldArray.filter(item => item.mine === 'on')
   //   objectArray[i].number = howManyMines.length
   //   objectArray[i].gridPosition.innerText = howManyMines.length
   // }
 
  
   const columnLeft = []
   const columnRight = []
   const topRow = []
   const mainGrid = []
   const bottomRow = []
 
   
   for (let i = 0; i < width; i + width) {
     if (i === 0) {
       columnLeft.push(i)
     }
     else if (i > 0 && i < width) {
       topRow.push(i)
     }
     else if (i > width && i < (88)) {
       mainGrid.push(i)
     }
     else if (i >= (gridSize-width) && i < (gridSize-1)) {
       bottomRow.push(i)
     }
     else if (i === (gridSize-1)) {
       lastIndex.push(i)
     }
   }
   console.log(columnLeft)
   // zeroIndex.forEach(item => {
   //   let fieldArray = [];
   //   fieldArray.push(
   //    objectArray[item+1], objectArray[item+width], objectArray[(item+width+1)]);
   //   const howManyMines = fieldArray.filter(item => item.mine === 'on')
   //   objectArray[item].number = howManyMines.length
   //   objectArray[item].gridPosition.innerText = howManyMines.length
   // })
   // topRow.forEach(item => {
   //   let fieldArray = [];
   //   fieldArray.push(
   //     objectArray[item-1], objectArray[item+1], objectArray[item+width], objectArray[(item+width+1)], objectArray[(item+width-1)]);
   //   const howManyMines = fieldArray.filter(item => item.mine === 'on')
   //   objectArray[item].number = howManyMines.length
   //   objectArray[item].gridPosition.innerText = howManyMines.length
   // })
   // mainGrid.forEach(item => {
   //   let fieldArray = [];
   //   fieldArray.push(
   //     objectArray[item-1], objectArray[item+1], objectArray[item-width], objectArray[item+width], objectArray[(item-width)-1], objectArray[(item-width+1)], objectArray[(item+width+1)], objectArray[(item+width-1)]);
   //   const howManyMines = fieldArray.filter(item => item.mine === 'on')
   //   objectArray[item].number = howManyMines.length
   //   objectArray[item].gridPosition.innerText = howManyMines.length
   // })
   // bottom.forEach(item => {
   //   let fieldArray = [];
   //   fieldArray.push(
   //     objectArray[item-1], objectArray[item+1], objectArray[item-width], objectArray[(item-width)+1], objectArray[(item-width)-1]);
   //   const howManyMines = fieldArray.filter(item => item.mine === 'on')
   //   objectArray[item].number = howManyMines.length
   //   objectArray[item].gridPosition.innerText = howManyMines.length
   // })
   // lastIndex.forEach(item => {
   //   let fieldArray = [];
   //   fieldArray.push(
   //    objectArray[item-1], objectArray[item-width], objectArray[(item-width-1)]);
   //   const howManyMines = fieldArray.filter(item => item.mine === 'on')
   //   objectArray[item].number = howManyMines.length
   //   objectArray[item].gridPosition.innerText = howManyMines.length
   // })
 
  
     
     
     // objectArray[item-1], objectArray[item+1], objectArray[item-width], objectArray[item+width], objectArray[(item-width)-1], objectArray[(i-width+1)], objectArray[(item+width+1)], objectArray[(item+width-1)]);
 
 
 // function findField (arr, i) {
 
 
 
 
 }
 window.addEventListener('DOMContentLoaded', init)