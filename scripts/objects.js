function init() {
  const grid = document.querySelector('.grid-container')
  const width = 10
  const gridSize = width * width
  const cellsArray = []
  const minesArray = []
  const objectArray = []
 
   // create a grid
   for (let i = 0; i < gridSize; i++){
    const cell = document.createElement('div')
    cell.setAttribute('id', `${i}`)
    cell.innerText = i
    grid.appendChild(cell)
    cellsArray.push(cell)
  }
  class Cell {
    constructor (gridPosition, mine, identifier, number, flag, state) {
      this.gridPosition = gridPosition 
      this.mine = mine,
      this.identifier = identifier
      this.number = number,
      this.flag = flag,
      this.state = state
    }
    placeMine() {
      this.gridPosition.classList.add('mine');
      this.gridPosition.innerText = ''
      this.mine = 'on' 
    }
    changeState(currentState){
      this.gridPosition.classList.add(`${currentState}`)
      this.state = currentState
    }
    // methods for checking for mines in each direction of surrounding field, field is 8 squares around
    // allows for bespoke checking depending on position of the cell (corner, top row, side column etc.)
    up(){
      console.log(objectArray[this.identifier - width])
      return objectArray[this.identifier - width]
    }
    down(){
      console.log(objectArray[this.identifier + width])
      return objectArray[this.identifier + width]
    }
    left(){
      console.log(objectArray[this.identifier - 1])
      return objectArray[this.identifier - 1]
    }
    right(){
      console.log(objectArray[this.identifier + 1])
      return objectArray[this.identifier + 1]
    }
    dul(){
      console.log(objectArray[(this.identifier - width) - 1])
      return (objectArray[(this.identifier - width) - 1])
    }
    dur(){
      console.log(objectArray[(this.identifier - width) + 1])
      return (objectArray[(this.identifier - width) + 1])
      
    }
    ddl(){
      console.log(objectArray[(this.identifier + width) - 1])
      return (objectArray[(this.identifier + width) - 1])
    }
    ddr(){
      console.log(objectArray[(this.identifier + width) + 1])
      return (objectArray[(this.identifier + width) + 1])
    }
    // each method passed as parameter to the main checkField methods with control flow
    // to prevent 'undefined' returning from unpassed parameters
    checkField(a, b, c, d, e, f, g, h){
      let fieldArray = []
      if (a !== undefined){fieldArray.push(a)}
      if (b !== undefined){fieldArray.push(b)}
      if (c !== undefined){fieldArray.push(c)}
      if (d !== undefined){fieldArray.push(d)}
      if (e !== undefined){fieldArray.push(e)}
      if (f !== undefined){fieldArray.push(f)}
      if (g !== undefined){fieldArray.push(g)}
      if (h !== undefined){fieldArray.push(h)}
      const howManyMines = fieldArray.filter(item => item.mine === 'on')
      this.number = howManyMines.length
      if (howManyMines.length === 0) {
        this.gridPosition.innerText = ''
      }
      else {this.gridPosition.innerText = howManyMines.length
      }
    }
  }

 // create an array of objects with their position specified on the grid
 for (let i = 0; i < gridSize; i++){
   const cellObject = new Cell(document.getElementById(`${i}`), 'off', i, 'none', 'none', 'unclicked')
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

 
  const diagonalUpleft = (width)-1
  const diagonalUpRight = (width)+1
  const diagonalDownLeft = (+width)-1
  const diagonalDownRight = (+width)+1

  // const newArray = [objectArray[33], objectArray[34], objectArray[35]]

objectArray[33].checkField(objectArray[33].up(), objectArray[33].left(), objectArray[33].down(), objectArray[33].right(),
objectArray[33].dur(), objectArray[33].dul(), objectArray[33].ddr(), objectArray[33].ddl())












//  function check (x){
//   const directlyAbove = objectArray[x+width]
//   return directlyAbove
//  }

//  console.log(check(5))
  
//   function checkIt (item) {
//     let fieldArray = [];
//     fieldArray.push(
//       objectArray[item+1], objectArray[item+width], objectArray[(item+width+1)]);
//       const howManyMines = fieldArray.filter(item => item.mine === 'on')
//       objectArray[item].number = howManyMines.length
//       objectArray[item].gridPosition.innerText = howManyMines.length
//     }
    
//     const corners = [1, 2, 3, 4]
  
//     corners.forEach(item => {
//       if (item === corners[0]) {
//         checkIt(item);
//         console.log(item)
//       }
//     })
    
    
    
    
    




  //  const columnLeft = []
  //  const columnRight = []
  //  const topRow = []
  //  const mainGrid = []
  //  const bottomRow = []
 
   
  //  for (let i = 0; i < gridSize; i++) {
  //    if (i === 0 && i ) {
  //      columnLeft.push(i)
  //    }
  //   }
  
  //    else if (i > 0 && i < width) {
  //      topRow.push(i)
  //    }
  //    else if (i > width && i < (88)) {
  //      mainGrid.push(i)
  //    }
  //    else if (i >= (gridSize-width) && i < (gridSize-1)) {
  //      bottomRow.push(i)
  //    }
  //    else if (i === (gridSize-1)) {
  //      lastIndex.push(i)
  //    }
  //  }
  //  console.log(columnLeft)
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
 
 

 
 
}
 window.addEventListener('DOMContentLoaded', init)