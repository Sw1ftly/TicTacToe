let playerText = document.getElementById('playerText');
let restartBtn = document.getElementById('restartBtn');
let boxes = Array.from(document.getElementsByClassName('box'));
let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks');
const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = X_TEXT;
let spaces = Array(9).fill(null);

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked));
    boxes.forEach(box => box.addEventListener('click', clickSound));
}
function clickSound(){
    let clicknoise = new Audio("click1.mp3")
    clicknoise.play()
}
function winSound(){
    let winNoise = new Audio("win.mp3")
    winNoise.play()
}
function boxClicked(e) {
    const id = e.target.id;
    if (!spaces[id]) {
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;

        if (playerHasWon() !== false) {
            playerText.innerHTML = `${currentPlayer} has won!`;
            winSound()
            let winning_blocks = playerHasWon();
            winning_blocks.forEach(box => boxes[box].style.backgroundColor = winnerIndicator);
            return;
        }
        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT;
    }
}

const winningCombos = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal from top-left to bottom-right
    [2, 4, 6]  // Diagonal from top-right to bottom-left
];

function playerHasWon() {
    for (const condition of winningCombos) {
        let [a, b, c] = condition;
        if (spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a, b, c];
        }
    }
    return false;
}

restartBtn.addEventListener('click', restart);

function restart() {
    spaces.fill(null);
    boxes.forEach(box => {
        box.innerText = '';
        box.style.backgroundColor = '';  // Reset the background color of the boxes
    });
    playerText.innerHTML = 'Tic Tac Toe';
    currentPlayer = X_TEXT;
}

startGame();