// Tic Tac Toe Game Logic
const cells = document.querySelectorAll(".cell");
const turnText = document.getElementById("turnText");
const startGameBtn = document.getElementById("startGame");
const newGameBtn = document.getElementById("newGame");
const resetAllBtn = document.getElementById("resetAll");
// Player name input fields
const playerXInput = document.getElementById("playerX");
const playerOInput = document.getElementById("playerO");
// Score display elements
const scoreXSpan = document.getElementById("scoreX");
const scoreOSpan = document.getElementById("scoreO");
const scoreDrawSpan = document.getElementById("scoreDraw");
// Audio elements
const clickSound = document.getElementById("clickSound");
const winSound = document.getElementById("winSound");
// Game state variables
let board = Array(9).fill("");
let currentPlayer = "X";
let gameActive = false;
// Scores
let scoreX = 0;
let scoreO = 0;
let scoreDraw = 0;
// Winning combinations
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
// Helper functions
function getPlayerName(symbol) {
  if (symbol === "X") {
    return playerXInput.value.trim() || "Player X";
  }
  return playerOInput.value.trim() || "Player O";
}
// Update turn text display
function updateTurnText() {
  if (!gameActive) return;
  const name = getPlayerName(currentPlayer);
  turnText.textContent = `${name}'s turn (${currentPlayer})`;
}
// Start a new game
function startGame() {
  gameActive = true;
  currentPlayer = "X";
  clearBoardOnly();
  updateTurnText();
}
// Clear the game board
function clearBoardOnly() {
  board = Array(9).fill("");
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("filled", "win");
  });
}
// Start a new round
function newGame() {
  gameActive = true;
  currentPlayer = "X";
  clearBoardOnly();
  updateTurnText();
}

// Reset all scores and game state
function resetAll() {
  scoreX = 0;
  scoreO = 0;
  scoreDraw = 0;
  scoreXSpan.textContent = "0";
  scoreOSpan.textContent = "0";
  scoreDrawSpan.textContent = "0";
  clearBoardOnly();
  gameActive = false;
  turnText.textContent = "Click “Start Game”";
}

// Play click sound effect
function playClickSound() {
  if (!clickSound) return;
  clickSound.currentTime = 0;
  clickSound.play().catch(() => {});
}

// Play win sound effect
function playWinSound() {
  if (!winSound) return;
  winSound.currentTime = 0;
  winSound.play().catch(() => {});
}

// Handle cell click event
function handleCellClick(e) {
  const cell = e.target;
  const index = parseInt(cell.getAttribute("data-index"), 10);

  if (!gameActive) return;
  if (board[index] !== "") return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add("filled");

  playClickSound();
// Check for win or draw
  const result = checkResult();
  if (result) {
    endGame(result);
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateTurnText();
  }
}
// Check for a win or draw
function checkResult() {
  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {
      return { winner: board[a], combo };
    }
  }
// Check for draw
  if (board.every((cell) => cell !== "")) {
    return { draw: true };
  }

  return null;
}
// End the game and update scores
function endGame(result) {
  gameActive = false;

  if (result.winner) {
    playWinSound();

    result.combo.forEach((i) => {
      cells[i].classList.add("win");
    });
// Update scores
    const winnerSymbol = result.winner;
    const winnerName = getPlayerName(winnerSymbol);

    if (winnerSymbol === "X") {
      scoreX += 1;
      scoreXSpan.textContent = scoreX;
    } else {
      scoreO += 1;
      scoreOSpan.textContent = scoreO;
    }
// Display win message
    turnText.textContent = `${winnerName} (${winnerSymbol}) wins!`;
  } else if (result.draw) {
    scoreDraw += 1;
    scoreDrawSpan.textContent = scoreDraw;
    turnText.textContent = "It's a draw!";
  }
}
// Event listeners
cells.forEach((cell) => {
  cell.addEventListener("click", handleCellClick);
});
// Button event listeners
startGameBtn.addEventListener("click", startGame);
newGameBtn.addEventListener("click", newGame);
resetAllBtn.addEventListener("click", resetAll);

turnText.textContent = "Click “Start Game”";
// End of Tic Tac Toe Game Logic
// made by BlueSky//