function init () {

  const grid = document.querySelector('.grid-container')
  const width = 10
  const gridSize = width * width
  const cellsArray = []
  const minesArray = []

// create a grid
  for (let i = 0; i < gridSize; i++){
    const cell = document.createElement('div')
    cell.innerText = i
    grid.appendChild(cell)
    cellsArray.push(cell)
  }
//a function for placing mines on the grid randomly each new game.
  function placeMines (){
    for (let i = 0; i < 25; i++){
      const randomNumber = Math.floor(Math.random() * cellsArray.length)
      minesArray.push(randomNumber)
    }
    minesArray.forEach(item => cellsArray[item].classList.add('mine'))
  }  

  placeMines()


  // a function for checking the classlist of surrounding cells 
  // works for specified cell needs to be abstracted for all cells 
  // needs to set the inner text of the cell to cellValue 
  // needs to exclude mines 
  // needs special conditions for numbers < 10 and > 89
  // this works for all grid positions but is really bloated code. Need to try and refactor this. 

  let cellValue = 0
  function checkForMines(){
    for (i = 10; i < (gridSize - width) - 1; i ++){
      //immediate right
      if (cellsArray[i+1].classList.contains('mine')){
        cellValue += 1
      }
      //immediate left
      if (cellsArray [i-1].classList.contains('mine')){
        cellValue += 1
      }
      // directly above
      if (cellsArray[i-width].classList.contains('mine')){
        cellValue += 1
      }
      //directly below
      if (cellsArray[i+width].classList.contains('mine')){
        cellValue +=1
      }
      //left diagonal above
      if (i !==10 && cellsArray[(i-width)-1].classList.contains('mine')){
        cellValue += 1
      }
      //right diagonal above
      if (cellsArray[(i-width)+1].classList.contains('mine')){
        cellValue += 1
      }
      //left diagonal below
      if (cellsArray[(i+width)-1].classList.contains('mine')){
        cellValue += 1
      }
      //right diagonal below
      if (cellsArray[(i+width)+1].classList.contains('mine')){
        cellValue += 1
      }     
      if (cellsArray[i].classList.contains('mine')){
        cellValue = 0
        cellsArray[i].innerText = ''
      }
      else {cellsArray[i].innerText = cellValue 
      }
      cellValue = 0
    }
            // checking first row
    for (let i = 0; i < width-1; i ++) {
      // diretly below
      if (cellsArray [i+width].classList.contains('mine')){
        cellValue ++
      }
      // immediate right
      if (cellsArray[i+1].classList.contains('mine')){
        cellValue += 1
      }
      //left diagonal below
      if (i !== 0 && cellsArray [(i+width)-1].classList.contains('mine')){
        cellValue ++
      }
      //right diagonal below
      if (cellsArray [(i+width)+1].classList.contains('mine')){
        cellValue ++
      }   
      // immediate left
      if (i !== 0 && cellsArray [i-1].classList.contains('mine')){
        cellValue += 1
      } 
      if (cellsArray[i].classList.contains('mine')){
        cellValue = 0
        cellsArray[i].innerText = ''
      }
      else {cellsArray[i].innerText = cellValue 
      }
      cellValue = 0
    }
            //checking last row
    for (let i = 89; i < gridSize; i ++) {
      // directly above
      if (cellsArray [i-width].classList.contains('mine')){
        cellValue += 1
      }
      //left diagonal above
      if (cellsArray [(i-width)-1].classList.contains('mine')){
        cellValue += 1
      }
      //right diagonal above
      if (i !== 99 && cellsArray [(i-width)+1].classList.contains('mine')){
        cellValue += 1
      }
      // immediate right
      if (i !== 99 && cellsArray[i+1].classList.contains('mine')){
        cellValue += 1 
      }
      // immediate left
      if (cellsArray [i-1].classList.contains('mine')){
        cellValue += 1
      } 
      if (cellsArray[i].classList.contains('mine')){
        cellValue = 0
        cellsArray[i].innerText = ''
      }
      else {cellsArray[i].innerText = cellValue 
      }
      cellValue = 0
    }

  checkForMines()

}

window.addEventListener('DOMContentLoaded', init)