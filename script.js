let spots = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

const board = document.getElementById('board');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');

// Initialize the game
function initializeGame() {
    spots = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    message.textContent = `Player ${currentPlayer}'s turn`;
    document.querySelectorAll('.spot').forEach(spot => {
        spot.textContent = '';
    });
}

// Handle click on a spot
function handleSpotClick(event) {
    const spotIndex = parseInt(event.target.id.split('-')[1]) - 1;

    if (spots[spotIndex] === '' && gameActive) {
        spots[spotIndex] = currentPlayer;
        event.target.textContent = currentPlayer;

        if (checkForWin()) {
            gameActive = false;
            message.textContent = `Player ${currentPlayer} wins!`;
        } else if (spots.every(spot => spot !== '')) {
            gameActive = false;
            message.textContent = "It's a tie!";
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            message.textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}

// Check for a win
function checkForWin() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]  // Diagonals
    ];

    return winConditions.some(condition => {
        const [a, b, c] = condition;
        return spots[a] !== '' && spots[a] === spots[b] && spots[b] === spots[c];
    });
}

// Add event listeners
document.querySelectorAll('.spot').forEach(spot => {
    spot.addEventListener('click', handleSpotClick);
});

resetButton.addEventListener('click', initializeGame);

// Start the game
initializeGame();
