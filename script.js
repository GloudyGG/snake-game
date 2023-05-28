document.addEventListener("DOMContentLoaded", function() {
    const boardSize = 20; // Number of cells per row and column
    const cellSize = 20; // Size of each cell in pixels
    const initialSnakeLength = 4; // Initial length of the snake
  
    const gameBoard = document.getElementById("game-board");
    const cells = [];
    let snake = [];
    let direction = "right";
    let food = {};
  
    // Create the game board
    for (let row = 0; row < boardSize; row++) {
      for (let col = 0; col < boardSize; col++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.style.top = row * cellSize + "px";
        cell.style.left = col * cellSize + "px";
        gameBoard.appendChild(cell);
        cells.push(cell);
      }
    }
  
    // Initialize the snake
    for (let i = 0; i < initialSnakeLength; i++) {
      const cellIndex = (boardSize * Math.floor(boardSize / 2)) + i;
      const cell = cells[cellIndex];
      cell.classList.add("snake", "snake-body");
      snake.push(cell);
    }
  
    // Generate random food location
    function generateFood() {
      const emptyCells = cells.filter(cell => !cell.classList.contains("snake"));
      const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      randomCell.classList.add("food");
      food = randomCell;
    }
  
    // Move the snake
    function moveSnake() {
      const head = snake[snake.length - 1];
      const headIndex = cells.indexOf(head);
      let nextIndex;
  
      if (direction === "right") {
        nextIndex = headIndex + 1;
      } else if (direction === "left") {
        nextIndex = headIndex - 1;
      } else if (direction === "up") {
        nextIndex = headIndex - boardSize;
      } else if (direction === "down") {
        nextIndex = headIndex + boardSize;
      }
  
      const nextCell = cells[nextIndex];
  
      // Check for collisions
      if (nextCell === undefined || nextCell.classList.contains("snake")) {
        endGame();
        return;
      }
  
      snake.push(nextCell);
      nextCell.classList.add("snake", "snake-body");
  
      // Check if the snake ate the food
      if (nextCell === food) {
        nextCell.classList.remove("food");
        generateFood();
      } else {
        const tail = snake.shift();
        tail.classList.remove("snake", "snake-body");
      }
    }
  
    // Handle keyboard events
    document.addEventListener("keydown", function(event) {
      if (event.key === "ArrowRight" && direction !== "left") {
        direction = "right";
      } else if (event.key === "ArrowLeft" && direction !== "right") {
        direction = "left";
      } else if (event.key === "ArrowUp" && direction !== "down") {
        direction = "up";
      } else if (event.key === "ArrowDown" && direction !== "up") {
        direction = "down";
      }
    });
  
    // End the game
    function endGame() {
      clearInterval(gameInterval);
      alert("Game Over!");
      location.reload();
    }
  
    generateFood();
    const gameInterval = setInterval(moveSnake, 150);
  });
  