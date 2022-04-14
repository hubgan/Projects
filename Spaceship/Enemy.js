export class Enemy {
    constructor(container, intervalTime, enemyClass, explosionClass, lives = 1) {
        this.lives = lives;
        this.container = container;
        this.enemyClass = enemyClass;
        this.explosionClass = explosionClass;
        this.element = document.createElement('div');
        this.intervalTime = intervalTime;
        this.interval = null;
    }

    init() {
        this.#setEnemy();
        this.#updatePosition();
    }

    #updatePosition() {
        this.interval = setInterval(() => this.#setNewPosition(), this.intervalTime);
    }

    #setNewPosition() {
        this.element.style.top = `${this.element.offsetTop + 1}px`
    }

    #setEnemy() {
        this.element.classList.add(this.enemyClass);
        this.container.appendChild(this.element);
        this.element.style.top = `0px`;
        this.element.style.left = `${this.#randomPosition()}px`;
    }

    #randomPosition() {
        return Math.floor(Math.random() * window.innerWidth - this.element.offsetWidth);
    }

    hit() {
        this.lives--;
        if (!this.lives) {
            this.explode()
        }
    }

    explode() {
        this.element.classList.remove(this.enemyClass);
        this.element.classList.add(this.explosionClass);
        clearInterval(this.interval);
        const animationTime = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--explosions-animation-time'), 10)
        setTimeout(() => this.element.remove(), animationTime);
    }
}