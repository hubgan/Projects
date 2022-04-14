import { snakeOnFood, expandSnake } from './snake.js';

let foodCoordinates = getRandomPosition();
const HOW_MANY_SEGMEWNTS = 1;

export function draw(gameBoard) {
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = foodCoordinates.y;
    foodElement.style.gridColumnStart = foodCoordinates.x;
    foodElement.classList.add('food');
    gameBoard.appendChild(foodElement);
}

export function update() {
    if (snakeOnFood(foodCoordinates)) {
        expandSnake(HOW_MANY_SEGMEWNTS);
        foodCoordinates = getRandomPosition();
    }
}

function randomCoordinates() {
    return { x: Math.floor(Math.random() * 21) + 1, y: Math.floor(Math.random() * 21) + 1 };
}

function getRandomPosition() {
    let newFoodCoordinates;
    while (newFoodCoordinates == null || snakeOnFood(newFoodCoordinates)) {
        newFoodCoordinates = randomCoordinates();
    }

    return newFoodCoordinates;
}