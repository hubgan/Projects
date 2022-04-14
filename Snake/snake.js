import { getInputDirection } from "./input.js";

let newPiece = 0;

const snakeBody = [
    { x: 11, y: 11 },
];

export function getSnakeHead() {
    return snakeBody[0];
}

export function update() {
    addPieces();
    for (let i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i + 1] = {...snakeBody[i]};
    }

    const inputDirection = getInputDirection();
    const snakeHead = getSnakeHead();
    snakeHead.x += inputDirection.x;
    snakeHead.y += inputDirection.y;
}

export function draw(gameBoard) {
    snakeBody.forEach(piece => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = piece.y;
        snakeElement.style.gridColumnStart = piece.x;
        snakeElement.classList.add('snake');
        gameBoard.appendChild(snakeElement);
    })
}

export function expandSnake(amount) {
    newPiece += amount;
}

function addPieces() {
    for (let i = 0; i < newPiece; i++) {
        snakeBody.push({...snakeBody[snakeBody.length - 1]});
    }
    newPiece = 0;
}

export function collision(head, { ignoreHead = false }) {
    return snakeBody.some((piece, index) => {
        if (ignoreHead && index == 0) {
            return false;
        }

        return equalCoordinates(head, piece);
    })
}

export function snakeOnFood(foodCoordinates) {
    return snakeBody.some(piece => {
        return equalCoordinates(piece, foodCoordinates);
    })
}

function equalCoordinates({x: x1, y: y1}, {x: x2, y: y2}) {
    if (x1 == x2 && y1 == y2) {
        return true;
    }

    return false;
}