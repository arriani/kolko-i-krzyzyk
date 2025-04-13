let board = ['', '', '', '', '', '', '', '', '']; 
let currentPlayer = 'X'; 
let gameActive = true; 
const winningCombinations = [ 
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6] 
];

function showMessage(msg) {
    const gameMessage = document.getElementById('gameMessage');
    gameMessage.textContent = msg;
}

function cellClick(e) {
    const index = e.target.getAttribute('data-index');

    if (board[index] !== '' || !gameActive) return;

    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    checkGameState();
}

function checkGameState() {

    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            showMessage(`${currentPlayer} wygrał(a)!`);
            gameActive = false;
            document.getElementById('restartBtn').style.display = 'block'; 
            return;
        }
    }

    if (board.every(cell => cell !== '')) {
        showMessage('Remis!');
        gameActive = false;
        document.getElementById('restartBtn').style.display = 'block'; 
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    showMessage(`Teraz ruch gracza: ${currentPlayer}`);
}


function resetGame() {
    board = ['', '', '', '', '', '', '', '', '']; 
    currentPlayer = 'X'; 
    gameActive = true; 
    const cells = document.querySelectorAll('.board-cell');
    cells.forEach(cell => cell.textContent = ''); 
    showMessage(`Teraz ruch gracza: ${currentPlayer}`);
    document.getElementById('restartBtn').style.display = 'none'; 
}

const cells = document.querySelectorAll('.board-cell');
cells.forEach(cell => cell.addEventListener('click', cellClick));


document.getElementById('restartBtn').addEventListener('click', resetGame);
