function init() {

  //******* DO NOT LINK THIS FILE IT IS A SCRATCHPAD FOR NEW IDEAS ********// 

  
  //variables
  const grid = document.querySelector('.grid-container')
  const timer = document.querySelector('.timer')
  const mineDisplay = document.querySelector('.mine-display')
  const welcomeScreen = document.querySelector('.welcome-screen')
  const pageWrapper = document.querySelector('.page-wrapper')
  const beginnerButton = document.querySelector('.beginner-button')
  const advancedButton = document.querySelector('.advanced-button')
  const expertButton = document.querySelector('.expert-button')
  const electronicButton = document.querySelector('.electronic')
  const lofiButton = document.querySelector('.lofi')
  const jazzButton = document.querySelector('.jazz')
  const endGameMessage = document.querySelector('.end-game')
  const finalMessage = document.createElement('h1')
  const playAgain = document.querySelector('.play-again')
  const changeMode = document.querySelector('.change-mode')
  const winner = document.querySelector('.winner')
  const audio = document.querySelector('audio')
  const musicInfo = document.querySelector('.music-info')
  let mineDensity = 0
  

  let width = 0
  let gridSize = 0
  const cellsArray = []
  let minesArray = []
  let objectArray = []
  let correctFlagPlaced = []
  let mineCount = 0
  let flagsPlaced = 0
  timer.innerText = 0

  welcomeScreen.classList.remove('hide')
  pageWrapper.classList.add('hide')
  playAgain.style.display = 'none'

  function createGrid() {
    // create a grid
    for (let i = 0; i < gridSize; i++){
      const cell = document.createElement('div')
      cell.setAttribute('id', `${i}`)
      cell.innerText = i
      grid.appendChild(cell)
      cellsArray.push(cell)
    }
  }

  // functions that define different states of the game --> win, lose, reset
  
  function resetBoard() {
    minesArray.forEach(item => {
      console.log(objectArray)
      objectArray[item].gridPosition.classList.remove('mine')
      objectArray[item].mine = 'off'
    })
    minesArray.forEach(item => {
      objectArray[item].gridPosition.classList.remove('flag')
      objectArray[item].flag = 'off'
    })
    objectArray = []
    minesArray = []
    console.log(objectArray)
    generateGame()
    pageWrapper.classList.remove('hide')
    playAgain.style.display = 'none'
    endGameMessage.classList.add('hide')
    timer.style.display = 'flex'
    mineDisplay.style.display = 'flex'
  }
  
  function endGameLoss() {
    objectArray.forEach(item => {
      item.clicked()
      if (item.gridPosition.classList.contains('flag')) {
        item.gridPosition.classList.remove('flag')
      }
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
    finalMessage.innerText = 'Victory!'
    finalMessage.style.animation = 'fadeIn 3s'
    endGameMessage.appendChild(finalMessage)
    winner.style.display = 'flex'
    playAgain.style.display = 'flex'
    timer.style.display = 'none'
    mineDisplay.style.display = 'none'
    grid.style.height = '400px'
    const mineTime = document.createElement('p')
    mineTime.innerText = `You found the mines in ${timer.innerText} seconds`
    winner.appendChild(mineTime)
    const scoreTime = document.createElement('p')
    scoreTime.innerText = `Your final score is ${Math.round(timer.innerText / mineDensity)}`
    winner.appendChild(scoreTime)
  }


  //define a funcction that sets the grid size & number of mines according to difficulty level chosen 

  function gameState(event) {
    if (event.target.classList.contains('beginner-button')){ 
      mineCount = 1
      mineDisplay.innerText = mineCount
      width = 9
      gridSize = 81
      flagsPlaced = mineCount
      grid.style.height = '400px'
      grid.style.width = '400px'
      welcomeScreen.classList.add('hide')
      pageWrapper.classList.remove('hide')
      mineDensity = 1.2
      createGrid()
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
      mineDensity = 1.5
      createGrid()
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
      createGrid()
      generateGame()
    } 
  }

  // attach functions to respective buttons via eventListeners
  
  beginnerButton.addEventListener('click', gameState)
  advancedButton.addEventListener('click', gameState)
  expertButton.addEventListener('click', gameState)
  playAgain.addEventListener('click', gameState)
  // changeMode.addEventListener('click', () => location.reload(true))
  
  
  // define functions for music choice & add event listeners to respective buttons
  
  function electronic() {
    audio.src = './assets/Metre - Portamento.mp3.mp3'
    audio.play()
    audio.loop = true
    musicInfo.innerText = 'Metre by Portamento, nultiel records'
    musicInfo.style.display = 'inline'
  }
  function lofi() {
    audio.src = './assets/Chill_David_Fesliyan.mp3'
    audio.play()
    audio.loop = true
    musicInfo.innerText = 'Chill Gaming by David Fesliyan'
    musicInfo.style.display = 'inline'
  }
  function jazz() {
    audio.src = './assets/Smoky_Lounge.mp3'
    audio.play()
    audio.loop = true
    musicInfo.innerText = 'Smoky Lounge by David Renda'
    musicInfo.style.display = 'inline'
  }
  
  electronicButton.addEventListener('click', electronic)
  lofiButton.addEventListener('click', lofi)
  jazzButton.addEventListener('click', jazz)

  
  
  
  
  //define a function which handles the main conent of the game including 
  // --> generating a grid, a Cell Class constructor (methods of which will control the flow of the gameplay) and each cell object
  
  function generateGame() {
    
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
        this.gridPosition.innerText = ''
        this.mine = 'on' 
      }
      // win condition based on flags placed, insert conditional to prevent overflagging!
      placeFlag(){
        if (flagsPlaced === 0) {
          const autoRemoveFlag = objectArray.filter(item => item.flag === 'on')
          autoRemoveFlag[0].gridPosition.classList.remove('flag')
          autoRemoveFlag[0].flag = 'off'
          flagsPlaced += 1
          mineDisplay.innerText = flagsPlaced
        }
        else {
          this.gridPosition.classList.toggle('flag')
          console.log('flag on')
          this.innerText = ''
          this.flag = 'on'
          this.gridPosition.classList.contains('flag') ? flagsPlaced -= 1 : flagsPlaced += 1
          this.gridPosition.classList.contains('flag') ? this.state = 'clicked' : this.state = 'unclicked'
          mineDisplay.innerText = flagsPlaced
        }
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
      unclicked() {
        this.state = 'unclicked'
        this.gridPosition.innerText = ''
        this.gridPosition.style.backgroundColor = 'rgba(93, 65, 87, 1)'
      } 
      clicked() {
        this.gridPosition.style.animation = 'jello-horizontal .9s both'
        if (this.mine === 'on'){
          this.gridPosition.style.animation = 'shake-horizontal .8s cubic-bezier(.455,.03,.515,.955) both'
          this.state = 'clicked'
          this.gridPosition.style.backgroundColor = 'rgba(168, 202, 186, 0.8)'
          this.gridPosition.innerText = ''
          this.gridPosition.classList.add('mine')
          return
        }
        else if (this.number > 0) {
          this.state = 'clicked'
          this.gridPosition.innerText = this.number
          this.gridPosition.style.backgroundColor = 'rgba(168, 202, 186, 0.5)'
          return
        }
        // this 'else if' is where the functionality will live for auto opening surrounding cells 
        // route => for any clicked cell, check its surrounding cells (this means a cell won't check undefined cells given how
        // 'surroundingCells' was constructed relative to each cell) then IF any of those cells are 'unclicked' pass them back to the
        // the clicked method for checking. 
        
        else if (this.number === 0) {
          this.gridPosition.innerText = ''
          this.gridPosition.style.backgroundColor = 'rgba(168, 202, 186, 0.5)'
          this.surroundingCells.forEach(item => {
            if (item.state === 'unclicked') {
              item.state = 'clicked'
              item.clicked()
            }
            else {return}
          })
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
          cellObject.gridPosition.classList.add('beginner-cells')
          cellObject.gridPosition.style.animation = 'bounce-top .9s both';
          break;
          case 256: 
          cellObject.gridPosition.classList.add('advanced-cells');
          cellObject.gridPosition.style.animation = 'bounce-top .9s both';
          break;
          case 576:
            cellObject.gridPosition.classList.add('expert-cells');
            cellObject.gridPosition.style.animation = 'bounce-top .9s both';
            break;
          }
          objectArray.push(cellObject)
        }
        
        objectArray.forEach(item => item.unclicked())
        //randomly generate a number call the placeMine method in corresponding objects
        // in the objectsArray, and avoid duplicates using set()
        const randomNumbers = new Set()
        while (randomNumbers.size < mineCount) {
          randomNumbers.add(Math.floor(Math.random() * objectArray.length))
        } 
        minesArray = Array.from(randomNumbers)
        minesArray.forEach(item => objectArray[item].placeMine())
        objectArray.forEach(item => item.unclicked())
        console.log(minesArray)
        
        // create arrays corresponding to cell structures that have different restrictions e.g., corner cells, column cells
    // these will be used to 
    
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

    //nested forloop to push the rest of the numbers into an array, should be scalable, using map() as a above to get indexes
    let remainingCells = []
    let startingId = width+1
    for (let i=0; i < width-2; i++) {
      for (let j = startingId; j < startingId + width-2; j++){
        remainingCells.push(j); 
      }
      startingId += width
    }
    const mainGrid = remainingCells.map(item => objectArray[item])

    // use each array to call the checkField method on its elements(cell objects), passing the appriopriate parameters 
    // given the position of the elements on the grid.

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

    //event listeners & their functions to handle gameplay clicks (clicking on cells)

    // this is the way the game will start
    objectArray.forEach(item => item.unclicked())

    function handleLeftClick (event){
      console.log('left click')
      objectArray[event.target.id].clicked()
      if (objectArray[event.target.id].mine === 'on') {
        endGameLoss() 
      }
      if (objectArray[event.target.id].number === 0){
        objectArray[event.target.id].clicked() 
      }
    } 
     
    
    function handleRightClick(event) {
      event.preventDefault()
      objectArray[event.target.id].placeFlag()
      console.log(objectArray)
      correctFlagPlaced = objectArray.filter(item => item.mine === 'on' && item.flag === 'on')
      correctFlagPlaced.length === mineCount ? endGameWin() : correctFlagPlaced = []
    }

    objectArray.forEach(item => {
      item.gridPosition.addEventListener('contextmenu', handleRightClick)
    })
    
    objectArray.forEach(item => {
      item.gridPosition.addEventListener('click', handleLeftClick)
    })
    
    // build a second count timer & attach it to an eventlistener, make sure it triggers only once
    function startTimer () {
      let timerInterval = setInterval(() => timer.innerText ++, 1000)
    } 
    
    grid.addEventListener('click', startTimer, { once: true })

  }
}
 window.addEventListener('DOMContentLoaded', init)