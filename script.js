const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function handleCellClick(e) {
  const index = e.target.dataset.index;
  if (gameState[index] !== '' || !gameActive) return;

  gameState[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  checkResult();
}

function checkResult() {
  for (const condition of winningConditions) {
    const [a, b, c] = condition;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      document.querySelectorAll('.cell')[a].classList.add('win');
      document.querySelectorAll('.cell')[b].classList.add('win');
      document.querySelectorAll('.cell')[c].classList.add('win');
      statusText.textContent = `Player ${currentPlayer} Wins! 🎉`;
      gameActive = false;
      return;
    }
  }

  if (!gameState.includes('')) {
    statusText.textContent = "It's a Draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function resetGame() {
  currentPlayer = 'X';
  gameActive = true;
  gameState = ['', '', '', '', '', '', '', '', ''];
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('win');
  });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
