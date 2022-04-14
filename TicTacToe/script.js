const CIRCLE_CLASS = 'circle';
const X_CLASS = 'x';
let isCircleTurn = false;

const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const cells = [...document.querySelectorAll('[data-cell]')];
const board = document.querySelector('.board');
const endGameMessage = document.querySelector('.end_game');
const restartButton = document.querySelector('.restart_game');
const endGameText = document.querySelector('[data-end-game-message-text]');

function cellClick(e) {
    const cell = e.target;
    const currentClass = isCircleTurn ? CIRCLE_CLASS : X_CLASS;
    cell.classList.add(currentClass);
    if (isWin(currentClass)) {
        endGame(true);
    }
    else if (isDraw()) {
        endGame(false);
    }
    else {
        switchTurn();
        setHover();
    }
}

function endGame(win) {
    endGameMessage.classList.add('show');
    if (win) {
        endGameText.textContent = `${isCircleTurn ? "O's" : "X's"} Wins!`;
    }
    else {
        endGameText.textContent = 'Draw';
    }
}

function isWin(currentClass) {
    return WINNING_COMBINATIONS.some(singleCombination => {
        return singleCombination.every(index => {
            return cells[index].classList.contains(currentClass);
        })
    })
}

function isDraw() {
    return cells.every(cell => {
        return cell.classList.contains(CIRCLE_CLASS) || cell.classList.contains(X_CLASS);
    })
}

function switchTurn() {
    isCircleTurn = !isCircleTurn;
}

function setHover() {
    board.classList.remove(CIRCLE_CLASS);
    board.classList.remove(X_CLASS);

    if (isCircleTurn) {
        board.classList.add(CIRCLE_CLASS);
    }
    else {
        board.classList.add(X_CLASS);
    }
}

function startGame() {
    endGameMessage.classList.remove('show');
    isCircleTurn = false;
    cells.forEach(cell => {
        cell.classList.remove(CIRCLE_CLASS);
        cell.classList.remove(X_CLASS);
        cell.addEventListener('click', cellClick, { once: true });
    })
    setHover();
}

restartButton.addEventListener('click', startGame);

startGame();