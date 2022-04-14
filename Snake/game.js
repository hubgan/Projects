import { update as updateSnake, draw as drawSnake, getSnakeHead, collision } from './snake.js';
import { update as updateFood, draw as drawFood } from './food.js';

const gameBoard = document.querySelector('.board');
let gameOver = false;

let lastRender = 0;
const SNAKE_SPEED = 5;

function main(currentTime) {
    if (gameOver) {
        if (confirm("You lost!")) {
            window.location = './';
        }
    }
    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - lastRender) / 1000;
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) {
        return;
    }

    lastRender = currentTime;
    update();
    draw();
}

function checkEndGame() {
    const head = getSnakeHead();
    if (head.x < 1 || head.x > 21 || head.y < 1 || head.y > 21 || collision(head, { ignoreHead: true })) {
        return true;
    }

    return false;
}

function update() {
    updateSnake();
    updateFood();
    gameOver = checkEndGame();
}

function draw() {
    gameBoard.innerHTML = '';
    drawSnake(gameBoard);
    drawFood(gameBoard);
}

window.requestAnimationFrame(main);
