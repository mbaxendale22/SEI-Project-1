function init() {
  //variables
  const grid = document.querySelector('.grid-container')
  const width = 10
  const gridSize = width * width
  const cellsArray = []
  const minesArray = []
  const objectArray = []
  const mineCount = 12
  let flagsPlaced = mineCount
  let timer = document.querySelector('.timer')
  timer.innerText = 0
  const scoreBoard = document.querySelector('.scoreboard')
  scoreBoard.innerText = mineCount
  let clickCount = 0
  const finalScore = timer.innerText / clickCount
  
  // object for managing the current game state
  const gameManagement = {
    start: 'on',
    end: 'off',
    beginner: 'on',
    intermediate: 'off',
    expert: 'off'
  }
 
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
    constructor (gridPosition, mine, identifier, number, flag, state, surroundingCells) {
      this.gridPosition = gridPosition 
      this.mine = mine,
      this.identifier = identifier
      this.number = number,
      this.flag = flag,
      this.state = state,
      this.surroundingCells = surroundingCells
    }

    placeMine() {
      // this.gridPosition.classList.add('mine');
      this.gridPosition.innerText = ''
      this.mine = 'on' 
    }

    placeFlag(){
      this.gridPosition.classList.add('flag')
      this.innerText = ''
      this.flag = 'on'
      flagsPlaced -= 1
      scoreBoard.innerText = flagsPlaced
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
      if (a !== undefined){this.surroundingCells.push(a)}
      if (b !== undefined){this.surroundingCells.push(b)}
      if (c !== undefined){this.surroundingCells.push(c)}
      if (d !== undefined){this.surroundingCells.push(d)}
      if (e !== undefined){this.surroundingCells.push(e)}
      if (f !== undefined){this.surroundingCells.push(f)}
      if (g !== undefined){this.surroundingCells.push(g)}
      if (h !== undefined){this.surroundingCells.push(h)}
      const howManyMines = this.surroundingCells.filter(item => item.mine === 'on')
      this.number = howManyMines.length
      if (howManyMines.length === 0 ) {
        this.gridPosition.innerText = ''
      }
      else {this.gridPosition.innerText = howManyMines.length
      }
    }    

    autoOpen () {
      if (this.state === 'clicked' && this.number === 0) {
        this.surroundingCells.forEach(item => {
          item.state = 'clicked'
          item.gridPosition.style.backgroundColor = 'lightGrey'
          item.number === 0 ? item.gridPosition.innerText = '' : item.gridPosition.innerText = item.number
        })
      }
    }

    unclicked() {
      this.state = 'unclicked'
      this.gridPosition.innerText = ''
      this.gridPosition.style.backgroundColor = 'grey'
    } 
    
    clicked() {
      this.state = 'clicked'
      this.gridPosition.style.backgroundColor = 'lightGrey'
      if (this.mine === 'on'){
        this.gridPosition.innerText = ''
        this.gridPosition.classList.add('mine')
      }
      // this 'else if' is where the functionality will live for auto opening surrounding cells
      else if (this.number === 0) {
        this.gridPosition.innerText = ''
        console.log(this.surroundingCells)
        this.surroundingCells.forEach(item => {
          item.state = 'clicked'
          item.gridPosition.style.backgroundColor = 'lightGrey'
          item.number === 0 ? item.gridPosition.innerText = '' : item.gridPosition.innerText = item.number
          item.autoOpen()
        })
        // const checkForBlanks = this.surroundingCells.filter(item => item.number === 0)
        // checkForBlanks.forEach(item => item.clicked())
      } 
      else {
        this.gridPosition.innerText = this.number
      }
    }
  }
  
 // instantiate objects to fill the grid (one for each cell). Also pushing objects to an array to open 
 // up more methods for manipulating the data later 
 for (let i = 0; i < gridSize; i++){
   const cellObject = new Cell(document.getElementById(`${i}`), 'off', i, 'none', 'none', 'unclicked', [])
   objectArray.push(cellObject)
 }
 
  //randomly generate a number and push into array, call the placeMine method in corresponding objects
  // in the objectsArray
  function placeMines (){
    for (let i = 0; i < mineCount; i++){
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

  // use each array to call the checkField method on its elements, passing the appriopriate parameters 
  // given the position of the elements on the grid. In the checkField() method, these will be used to check 
  // for mines and for blank squares in the surrounding field of a cell. 
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
  corners.forEach(item => {
    if (item === corners[0]){item.checkField(item.down(), item.right(), item.ddr())} 
    if (item === corners[1]){item.checkField(item.down(), item.left(), item.ddl())}
    if (item === corners[2]){item.checkField(item.up(), item.right(), item.dur())}
    if (item === corners[3]){item.checkField(item.up(), item.left(), item.dur())}
  })
  //running this to remove numbers from mine cells
 

  // this is the way the game will start
  objectArray.forEach(item => item.unclicked())

function handleLeftClick (event){
    objectArray[event.target.id].clicked()
    clickCount += 1
}

  objectArray.forEach(item => {
    item.gridPosition.addEventListener('click', handleLeftClick)
})
  function handleRightClick(event) {
    event.preventDefault()
    objectArray[event.target.id].placeFlag()
    clickCount += 1
  }
  objectArray.forEach(item => {
    item.gridPosition.addEventListener('contextmenu', handleRightClick)
})



  // build a simple second count timer 
  const startTimer = () => setInterval(() => timer.innerText ++, 1000)

  grid.addEventListener('click', startTimer, { once: true })


if (objectArray[33] === 'clicked') {
  objectArray[33].surroundingCells.forEach(item => {
    item.state = 'clicked'
    item.gridPosition.style.backgroundColor = 'lightGrey'
    item.number === 0 ? item.gridPosition.innerText = '' : item.gridPosition.innerText = item.number
  })
}

  // build the auto open blank function 
  

  // function autoOpen(){
  //   objectArray.forEach(item => {
  //     if (item.number === 0){

  //     }
  //   })
  // }




    
    
    
    
    





 

 
 
}
 window.addEventListener('DOMContentLoaded', init)