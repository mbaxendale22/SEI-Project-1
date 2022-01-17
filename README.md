# Minesweeper Clone in Vanilla Javascript

This minesweeper clone was built while undertaking General Assembly’s Software Engineering Immersive Bootcamp. The purpose of the project was to deploy skills learnt during the HTML, CSS, and Javascript module of the course. The game retains the main aspects of the original, three game modes, a score calculator, and a choice of music. The game is designed to look good as well as functioning correctly by containing CSS animations and transitions, and is mobile responsive. The time frame for development was five days.

The game is deployed via GitHub Pages [here](https://mbaxendale22.github.io/SEI-Project-1/)

## Tech Stack 
* HTML
* CSS
* Vanilla Javascript
* Git & GitHub

## How to play 
The goal of minesweeper is to ‘clear’ all the mines on the board by marking them with a flag. Opening a cell containing a mine will result in an immediate loss. A cell will either show a number, which denotes how many adjacent cells contain mines, or it will be blank, denoting that none of its adjacent cells contain mines. If any of the adjunct cells are also blank, they will open automatically. This process will continue until an edge is hit or a numbered cell is hit, creating a cascade of self-opening cells. Left click to open a cell and right click to place (or remove)  a flag.  A user’s final score is calculated by weighting the time taken to clear the mines by the mine density of the difficulty level. 

## Game Snapshot 
Users are given a choice of game modes and three music genres: 

![Landing Page](./readme_assets/landing.png)

On selecting a game mode, users open cells and place flags: 

![Gameplay](./readme_assets/gameplay.png)

If a mine is clicked on, the game is over:

![loss](./readme_assets/loss.png)

If all mines are successfully marked with a flag, the game is won and the user receives a score. 

![win](./readme_assets/win.png)


## Featured Code Snippet
Each cell in the game is an instantiation of a Cell class, properties of which define the state of a given cell and methods define its behaviour. 
The clicked() method below handles the user left-clicking on a cell, it includes a recursive option should the correct condition 
be met (i.e., the cell is blank)

First of all we've got an event listener on every cell, listening for a click: 


```javascript
objectArray.forEach(item => {
      item.gridPosition.addEventListener('click', handleLeftClick)
    })
```

Then the function itself: 

```javascript


  function handleLeftClick (event){
      objectArray[event.target.id].clicked()
      if (objectArray[event.target.id].mine === 'on') {
        endGameLoss() 
      }
      if (objectArray[event.target.id].number === 0){
        objectArray[event.target.id].clicked() 
      }
    } 

  ```

  A few things are happening here: 
  1. the `clicked()` method is called on the cell (as noted above, each cell is an instantiation of the `Cell` class and so has access to the `clicked()` method)
  2. We're checking to see whether the cell object has the `mine` property on. At the beginning of each game, a random selection of cells have their `mine` property set to 'on' depending on the difficult level chosen. This process is achieved with a function called `placeMines()`, which looks like this: 
   
   ```javascript 

    function placeMines (){
      const randomNumbers = new Set()
      while (randomNumbers.size < mineCount) {
        randomNumbers.add(Math.floor(Math.random() * objectArray.length))
      } 
      minesArray = Array.from(randomNumbers)
      minesArray.forEach(item => objectArray[item].placeMine())
    }
  ```

  A problem with setting these mines was creating an array with no duplicate numbers. Mines are 'placed' by creating an array of numbers and then selecting the cells with corresponding positions on the grid to have their mine 'switched on'. However, if duplicate numbers are put into the array then too few cells across the grid will be chosen to have mines in them. This seems to happen a suprising amount when using `Math.random()` to generate random numbers.
  
  I looked into shuffling the array using the Fisher-Yates algorithm. While I was researching the implementation of this algorithm, I stumbled across the fact that JavaScript has now added a `Set` constructor into the language - a `Set` being an array of numbers with no duplicates. This seemed like a great new feature to take advantage of, so I was able to use a `Set` to store the indexes of selected cells, knowing it would reject any duplicates automatically. I then used the `Array` constructor to convert the Set to an array, on which I was able to loop through an call the `.placeMine()` method, which simply sets the cell's `mine` property to 'on'.

  1. Back to `handleLeftClick()` function. After checking to see if the clicked cell contains a mine, I have a further check to call the `clicked()` method on cells with a 0 value. In hindsight this may be a redundant check, already handles by the first `.clicked()` call. 

  So then we get to the `clicked()` method itself. Firstly, the method treats cells with different properties in different ways. 

  1. If the cell has a mine, then certain UI changes happen, specifically changes to represent 'opening' the cell (an animation, background color change, and displaying a mine) 

  ```javascript

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
  ```

  2. If a cell has ta value greater than 0, then again we'll get UI changes to reflect it being 'opened', as well as displaying that number to the user (the number represents how many mines are in cells adjacent to that one)

  ```javascript

  If 
        else if (this.number > 0) {
          this.state = 'clicked'
          this.gridPosition.innerText = this.number
          this.gridPosition.style.backgroundColor = 'rgba(168, 202, 186, 0.5)'
          return
        }

  ```

  Finally, we get to the recursive function. If the cell's value is 0, meaning it has no mines in its adjacent cells, then all of its adjacent cells have the `.clicked()` method callled on them. All of the mine's adjacent cells are collected in its `surroundingCells` property. As each of those cells is 'passed back' to the `clicked()` function they run through the conditional checks above. If they make it all the way down to here (because their value is also 0), then all of their surrounding cells will have the `clicked()` method called on them. This recursive process is what enables the 'cascade' opening of cells, which is a quintessential feature of minesweeper.

  ```javascript 

        // for any clicked cell, check only its surrounding cells then if any of those cells are 'unclicked' pass them back to the
        // the clicked method for checking. 
        else if (this.number === 0) {
          this.gridPosition.innerText = ''
          this.gridPosition.style.backgroundColor = 'rgba(168, 202, 186, 0.5)'
          this.surroundingCells.forEach(item => {
            if (item.state === 'unclicked') {
              item.state = 'clicked'
              item.clicked()
            }
            else {
              return
              }
          })
  ```



## Known Bugs 
* Not a bug but a missing feature from the original minesweeper is the ability to ‘peak’ at opening all adjacent cells by holding both left and right click down simultaneously. During development I wasn't aware of this feature from the original game and subsequently could not implement it within the time-frame of the project. 

## Development Challenges & Wins

By far the most challenging aspect of developing this minesweeper clone was generating the cascade of self-opening cells. Developing this functionality easily took more time than any part of the game. In the end it was a great way to learn about recursive functions, about which I knew nothing at the outset. It was also a challenge to place constraints on which cells comprise a given cell’s adjacent field (cells which may contain mines or that should auto-open if they are blank) depending on where on the grid they appear (i.e. the first column of cells should not have cells to their immediate left in their adjacent cell fields; failure to properly impose these constraints either caused errors or resulted in the auto-opening cascade to fail to stop at edges.) These two problems probably comprised around 75% of the development time. Another challenge was offering three difficulty levels, defined by increased grid size and mine density. I enjoyed styling the game to give it a modern feel and adding responsive design features. Overall it was a really enjoyable way to deepen my javascript skills at the outset of my learning journey.  
