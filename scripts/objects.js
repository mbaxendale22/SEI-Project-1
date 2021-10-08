function init() {
  //variables
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
  // class for constructing cell objects, calling methods on which will define the behaviour of each cell
  // and ultimately the game.
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
      return objectArray[this.identifier - width]
    }
    down(){
      return objectArray[this.identifier + width]
    }
    left(){
      return objectArray[this.identifier - 1]
    }
    right(){
      return objectArray[this.identifier + 1]
    }
    dul(){
      return (objectArray[(this.identifier - width) - 1])
    }
    dur(){
      return (objectArray[(this.identifier - width) + 1])
      
    }
    ddl(){
      return (objectArray[(this.identifier + width) - 1])
    }
    ddr(){
      return (objectArray[(this.identifier + width) + 1])
    }
    // each method passed as parameter to the main checkField methods with control flow
    // to prevent 'undefined' returning from unpassed parameters
    // ? would like to refactor this to condense it
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
      if (howManyMines.length === 0 ) {
        this.gridPosition.innerText = ''
      }
      else {this.gridPosition.innerText = howManyMines.length
      }
    }
  }

 // instantiate objects to fill the grid (one for each cell). Also pushing objects to an array to open 
 // up more methods for manipulating the data later 
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

// create arrays corresponding to cell structures that have different restrictions e.g., corner cells, column cells
// to make it easier to call different methods on each for the checkField method.
  
  const corners = [objectArray[0], objectArray[width-1], objectArray[gridSize-width], objectArray[gridSize-1]]
  
  const topRow = []
  objectArray.forEach(item => {
    if (item.identifier > 0 && item.identifier < (width-1)){
      topRow.push(item)}})

  const bottomRow = []    
  objectArray.forEach(item => {
    if (item.identifier > (gridSize - width) && item.identifier < (gridSize - 1)){
      bottomRow.push(item)}})
  
  // populate an array with the correct identifiers and then map those array items to indexes of the objectArray
  // this will provide an array of a numbers that can be mapped to give both left and right columns
 const leftColumnNumbers = []
  for (let i = 1; i < width-1; i++){
    leftColumnNumbers.push(i * width)
  }
  const leftColumn = leftColumnNumbers.map(item => objectArray[item]) 
  const rightColumn = leftColumnNumbers.map(item => objectArray[item + (width-1)])

  //nested forloop to push the rest of the numbers into an array, should be scalable, using a map as a above to get indexes
  let remainingCells = []
  let startingId = width+1
  for (let i=0; i < width-2; i++) {
    for (let j = startingId; j < startingId + width-2; j++){
      remainingCells.push(j); 
    }
    startingId += width
  }
  const mainGrid = remainingCells.map(item => objectArray[item])

  // use each array to call the checkField method on its elements, passing the appriopriate parameters given the position of the elements on the grid. Corners is a bit awkward because each is different but the other arrays are uniform. 

  mainGrid.forEach(item => {
    item.checkField(item.up(), item.down(), item.left(), item.right(), item.dur(), item.dul(), item.ddl(), item.ddr())
  })

  bottomRow.forEach(item => {
    item.checkField(item.up(), item.left(), item.right(), item.dur(), item.dul())
  })

  topRow.forEach(item => {
    item.checkField(item.down(), item.right(), item.left(), item.ddl(), item.ddr())
  })

  leftColumn.forEach(item=> {
    item.checkField(item.up(), item.down(), item.right(), item.dur(), item.ddr())
  })
  rightColumn.forEach(item=> {
    item.checkField(item.up(), item.down(), item.left(), item.dul(), item.ddl())
  })




 

  // objectArray[33].checkField(objectArray[33].up(), objectArray[33].left(), objectArray[33].down(), objectArray[33].right(),
  // objectArray[33].dur(), objectArray[33].dul(), objectArray[33].ddr(), objectArray[33].ddl())

 










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