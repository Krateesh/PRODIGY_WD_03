const boardElement = document.getElementById('board');
const restartButton = document.getElementById('restart');
const statusElement = document.getElementById('status');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function createBoard() {
    board.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.setAttribute('data-cell-index', index);
        cellElement.textContent = cell;

        cellElement.addEventListener('click', handleCellClick);
        boardElement.appendChild(cellElement);
    });
}

function handleCellClick(event) {
    const cellIndex = event.target.getAttribute('data-cell-index');

    if (board[cellIndex] || !isGameActive) {
        return;
    }

    board[cellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;

    checkResult();
}

function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] === '' || board[b] === '' || board[c] === '') {
            continue;
        }
        if (board[a] === board[b] && board[b] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusElement.textContent = `Player ${currentPlayer} Wins!`;
        isGameActive = false;
        return;
    }

    if (!board.includes('')) {
        statusElement.textContent = 'It\'s a Draw!';
        isGameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusElement.textContent = `Current Player: ${currentPlayer}`;
}

restartButton.addEventListener('click', restartGame);

function restartGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    currentPlayer = 'X';
    statusElement.textContent = `Current Player: ${currentPlayer}`;
    boardElement.innerHTML = '';
    createBoard();
}

createBoard();
statusElement.textContent = `Current Player: ${currentPlayer}`;
