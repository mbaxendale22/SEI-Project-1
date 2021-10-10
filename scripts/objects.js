function init() {
  
  //variables
  let stage = 1
  const grid = document.querySelector('.grid-container')
  let timer = document.querySelector('.timer')
  const scoreBoard = document.querySelector('.scoreboard')
  const welcomeScreen = document.querySelector('.welcome-screen')
  const pageWrapper = document.querySelector('.page-wrapper')
  const beginnerButton = document.querySelector('.beginner-button')
  const advancedButton = document.querySelector('.advanced-button')
  const expertButton = document.querySelector('.expert-button')
  let width = 0
  let gridSize = 0
  const cellsArray = []
  const minesArray = []
  const objectArray = []
  let mineCount = 0
  let flagsPlaced = mineCount
  timer.innerText = 0
  let clickCount = 0
  const finalScore = timer.innerText / clickCount
  
  
  if (stage === 1) {
    welcomeScreen.classList.remove('hide')
    pageWrapper.classList.add('hide')
  }
  // else if (stage === 2) {
  //   welcomeScreen.classList.add('hide')
  //   pageWrapper.classList.remove('hide')
  // }
  
  // this will be attached to an event listener on choosing the game mode

  function gameState(event) {
    console.log(event.target)
    if (event.target.classList.contains('beginner-button')){ 
      console.log('working')
      mineCount = 12
      scoreBoard.innerText = mineCount
      width = 9
      gridSize = 81
      grid.style.height = '400px'
      grid.style.width = '400px'
      welcomeScreen.classList.add('hide')
      pageWrapper.classList.remove('hide')
      generateGame()
    }   
    else if (event.target.classList.contains('advanced-button')){
      mineCount = 40
      scoreBoard.innerText = mineCount
      width = 16
      gridSize = 256
      grid.style.height = '500px'
      grid.style.width = '500px'
      welcomeScreen.classList.add('hide')
      pageWrapper.classList.remove('hide')
      generateGame()
    }
    else if (event.target.classList.contains('expert-button')) {
      mineCount = 115
      width = 24
      scoreBoard.innerText = mineCount
      gridSize = 576
      grid.style.height = '600px'
      grid.style.width = '600px'
      welcomeScreen.classList.add('hide')
      pageWrapper.classList.remove('hide')
      generateGame()
    } 
  }
    beginnerButton.addEventListener('click', gameState)
    advancedButton.addEventListener('click', gameState)
    expertButton.addEventListener('click', gameState)


  function generateGame() {
  
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
      this.gridPosition.classList.toggle('flag')
      this.innerText = ''
      this.flag = 'on'
      this.gridPosition.classList.contains('flag') ? flagsPlaced -= 1 : flagsPlaced += 1
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

    // autoOpen () {
    //   if (this.state === 'clicked' && this.number === 0) {
    //     this.surroundingCells.forEach(item => {
    //       if (this.state === 'clicked' && this.mine === 'off') {
    //       item.gridPosition.style.backgroundColor = 'lightGrey'
    //       item.number === 0 ? item.gridPosition.innerText = '' : item.gridPosition.innerText = item.number
    //     }})
    //   }
    // }

    unclicked() {
      this.state = 'unclicked'
      this.gridPosition.innerText = ''
      this.gridPosition.style.backgroundColor = 'grey'
    } 
    
    clicked() {
      if (this.mine === 'on'){
        this.state = 'clicked'
        this.gridPosition.style.backgroundColor = 'lightGrey'
        this.gridPosition.innerText = ''
        this.gridPosition.classList.add('mine')
      }
      // this 'else if' is where the functionality will live for auto opening surrounding cells
      else if (this.number === 0) {
        this.gridPosition.innerText = ''
        this.gridPosition.style.backgroundColor = 'lightGrey'
        this.surroundingCells.forEach(item => {
          if (item.mine === 'off') {
            item.gridPosition.style.backgroundColor = 'lightGrey'
            item.number === 0 ? item.gridPosition.innerText = '' : item.gridPosition.innerText = item.number
          }
          if (item.number === 0) {
            item.surroundingCells.forEach(item => {
              if (item.mine === 'off') {
                item.gridPosition.style.backgroundColor = 'lightGrey'
                item.number === 0 ? item.gridPosition.innerText = '' : item.gridPosition.innerText = item.number
              }
            })
          }
        }
        )}
      else if (this.number > 0) {
        this.gridPosition.innerText = this.number
        this.gridPosition.style.backgroundColor = 'lightGrey'
      }
    }
  }
  
 // instantiate objects to fill the grid (one for each cell). Also pushing objects to an array to open 
 // up more methods for manipulating the data later 
 // add the correct class for the mode 

 for (let i = 0; i < gridSize; i++){
   const cellObject = new Cell(document.getElementById(`${i}`), 'off', i, 'none', 'none', 'unclicked', [])
    switch (gridSize) {
      case 81:
        cellObject.gridPosition.classList.add('beginner-cells');
        break;
      case 256: 
        cellObject.gridPosition.classList.add('advanced-cells');
        break;
      case 576:
        cellObject.gridPosition.classList.add('expert-cells');
        break;
    }
   objectArray.push(cellObject)
  }


  //randomly generate a number and push into array, call the placeMine method in corresponding objects
  // in the objectsArray
  function placeMines (){
    for (let i = 0; i <= mineCount; i++){
      const randomNumber = Math.floor(Math.random() * objectArray.length)
      console.log(objectArray.length)
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

  //event listeners

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

}


}
 window.addEventListener('DOMContentLoaded', init)