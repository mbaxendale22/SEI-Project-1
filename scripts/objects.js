function init() {
  
  //variables
  const grid = document.querySelector('.grid-container')
  let timer = document.querySelector('.timer')
  const mineDisplay = document.querySelector('.mine-display')
  const welcomeScreen = document.querySelector('.welcome-screen')
  const pageWrapper = document.querySelector('.page-wrapper')
  const beginnerButton = document.querySelector('.beginner-button')
  const advancedButton = document.querySelector('.advanced-button')
  const expertButton = document.querySelector('.expert-button')
  const endGameMessage = document.querySelector('.end-game')
  const finalMessage = document.createElement('h1')
  const playAgain = document.querySelector('.play-again')
  const winner = document.querySelector('.winner')
  let mineDensity = 0

  let width = 0
  let gridSize = 0
  const cellsArray = []
  let minesArray = []
  const objectArray = []
  let clickedArray = []
  let mineCount = 0
  let flagsPlaced = 0
  timer.innerText = 0
  let clickCount = 0
  let finalScore = 0

  // functions that define different states of the game
  
  function gameReset() {
    welcomeScreen.classList.remove('hide')
    pageWrapper.classList.add('hide')
    playAgain.style.display = 'none'
  }
  
  function endGameLoss() {
    objectArray.forEach(item => {
      item.clicked()
      if (item.gridPosition.classList.contains('flag')) {item.gridPosition.classList.remove('flag')}
    })
    clearInterval(1)
    finalMessage.innerText = 'Game Over'
    endGameMessage.appendChild(finalMessage)
    playAgain.style.display = 'flex'
    finalMessage.style.animation = 'fadeIn 4s'
    timer.style.display = 'none'
    mineDisplay.style.display = 'none'
    grid.style.height = '400px'
    
  }

  function endGameWin() {
    objectArray.forEach(item => item.clicked())
    finalMessage.innerText = 'Victory!'
    finalMessage.style.animation = 'fadeIn 3s'
    endGameMessage.appendChild(finalMessage)
    winner.style.display = 'flex'
    playAgain.style.display = 'flex'
    timer.style.display = 'none'
    mineDisplay.style.display = 'none'
    grid.style.height = '400px'
    winner.lastElementChild.innerText = `You found the mines in ${timer.innerText} seconds

    Your final score is ${Math.round(timer.innerText / mineDensity)}`
  }

  gameReset()
  

  //function to define the grid size & number of mines according to diffiuclty level

  function gameState(event) {
    if (event.target.classList.contains('beginner-button')){ 
      mineCount = 0
      mineDisplay.innerText = mineCount
      width = 9
      gridSize = 81
      flagsPlaced = mineCount
      grid.style.height = '400px'
      grid.style.width = '400px'
      welcomeScreen.classList.add('hide')
      pageWrapper.classList.remove('hide')
      mineDensity = 1.2
      // finalScore = Math.ceil(timer.innerText / 1.2)
      generateGame()
    }   
    else if (event.target.classList.contains('advanced-button')){
      mineCount = 40
      flagsPlaced = mineCount
      mineDisplay.innerText = mineCount
      width = 16
      gridSize = 256
      grid.style.height = '500px'
      grid.style.width = '500px'
      welcomeScreen.classList.add('hide')
      pageWrapper.classList.remove('hide')
      // finalScore = Math.ceil(timer.innerText / 1.5)
      mineDensity = 1.5
      generateGame()
    }
    else if (event.target.classList.contains('expert-button')) {
      mineCount = 115
      flagsPlaced = mineCount
      width = 24
      mineDisplay.innerText = mineCount
      gridSize = 576
      grid.style.height = '600px'
      grid.style.width = '600px'
      welcomeScreen.classList.add('hide')
      pageWrapper.classList.remove('hide')
      mineDensity = 2
      // finalScore = Math.ceil(timer.innerText / 2)
      generateGame()
    } 
  }

    beginnerButton.addEventListener('click', gameState)
    advancedButton.addEventListener('click', gameState)
    expertButton.addEventListener('click', gameState)
    playAgain.addEventListener('click', () => location.reload(true))


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
      constructor (gridPosition,state, mine, identifier, number, flag, surroundingCells) {
        this.gridPosition = gridPosition 
        this.state = state,
        this.mine = mine,
        this.identifier = identifier
        this.number = number,
        this.flag = flag,
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
        mineDisplay.innerText = flagsPlaced
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
        this.gridPosition.style.backgroundColor = 'rgba(93, 65, 87, 1)'
      } 
      clicked() {
        if (this.mine === 'on'){
          this.state = 'clicked'
          this.gridPosition.style.backgroundColor = 'rgba(168, 202, 186, 0.8)'
          this.gridPosition.innerText = ''
          this.gridPosition.classList.add('mine')
        }
        // this 'else if' is where the functionality will live for auto opening surrounding cells
        else if (this.number === 0) {
          this.state = 'clicked'
          this.gridPosition.innerText = ''
          this.gridPosition.style.backgroundColor = 'rgba(168, 202, 186, 0.5)'
          this.surroundingCells.forEach(item => {
            if (item.mine === 'off') {
              item.gridPosition.style.backgroundColor = 'rgba(168, 202, 186, 0.5)'
              item.number === 0 ? item.gridPosition.innerText = '' : item.gridPosition.innerText = item.number
              item.state = 'clicked'
            }
            if (item.number === 0) {
              item.surroundingCells.forEach(item => {
                if (item.mine === 'off') {
                  item.gridPosition.style.backgroundColor = 'rgba(168, 202, 186, 0.5)'
                  item.number === 0 ? item.gridPosition.innerText = '' : item.gridPosition.innerText = item.number
                  item.state = 'clicked'
                }
              })
            }
          }
          )}
        else if (this.number > 0) {
          this.state = 'clicked'
          this.gridPosition.innerText = this.number
          this.gridPosition.style.backgroundColor = 'rgba(168, 202, 186, 0.5)'
        }
      }     
    }
      
      // instantiate objects to fill the grid (one for each cell). Also pushing objects to an array to open 
      // up more methods for manipulating the data later 
      // add the correct class for the mode 

  for (let i = 0; i < gridSize; i++){
    const cellObject = new Cell(document.getElementById(`${i}`),'unclicked', 'off', i, 'none', 'none', [])
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

    objectArray.forEach(item => item.unclicked())
    //randomly generate a number call the placeMine method in corresponding objects
    // in the objectsArray, and avoid duplicates using set()
    function placeMines (){
      const randomNumbers = new Set()
      while (randomNumbers.size < mineCount) {
        randomNumbers.add(Math.floor(Math.random() * objectArray.length))
      } 
      minesArray = Array.from(randomNumbers)
      console.log(minesArray)
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
      if (objectArray[event.target.id].mine === 'on'){
        endGameLoss()
      } 
      if (objectArray[event.target.id].number === 0){
        objectArray[event.target.id].surroundingCells.forEach(item => item.state = 'clicked')
      }
      objectArray.forEach(item => {
        if (item.state === 'clicked') {clickedArray.push(item)} 
      } )
      clickedArray.length === (gridSize - mineCount) ? endGameWin() : clickedArray = []
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
    function startTimer () {
      let timerInterval = setInterval(() => timer.innerText ++, 1000)
    }
    
    
    grid.addEventListener('click', startTimer, { once: true })

  }


}
 window.addEventListener('DOMContentLoaded', init)



          // objectArray.forEach(item => {
          //   if (item.status === 'clicked') {
          //     clickedArray.push(item) 
          //   }}) 
          // console.log(clickedArray)