const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("score");

const SQUARE_SIZE = 20;
const CANVAS_SIZE = 400;
const GRID_SIZE = CANVAS_SIZE / SQUARE_SIZE;
const SNAKE_SPEED = 150; // Затримка між оновленнями в мілісекундах

let snake = [{ x: 10, y: 10 }];
let direction = "RIGHT";
let nextDirection = "RIGHT";
let food = spawnFood();
let score = 0;
let gameOver = false;

function gameLoop() {
    if (gameOver) return;
    setTimeout(() => {
        direction = nextDirection; // Оновлюємо напрямок раз за оновлення
        updateGame();
        drawGame();
        gameLoop();
    }, SNAKE_SPEED);
}

document.addEventListener("keydown", changeDirection);

gameLoop();

function changeDirection(event) {
    const key = event.keyCode;
    if (key === 37 && direction !== "RIGHT") nextDirection = "LEFT";
    else if (key === 38 && direction !== "DOWN") nextDirection = "UP";
    else if (key === 39 && direction !== "LEFT") nextDirection = "RIGHT";
    else if (key === 40 && direction !== "UP") nextDirection = "DOWN";
}

function updateGame() {
    let head = { ...snake[0] };

    if (direction === "LEFT") head.x -= 1;
    if (direction === "RIGHT") head.x += 1;
    if (direction === "UP") head.y -= 1;
    if (direction === "DOWN") head.y += 1;

    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE || 
        snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        gameOver = true;
        alert("Game Over! Final Score: " + score);
        return;
    }

    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreDisplay.textContent = score;
        food = spawnFood();
    } else {
        snake.pop();
    }
}

function drawGame() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    ctx.fillStyle = "red";
    ctx.fillRect(food.x * SQUARE_SIZE, food.y * SQUARE_SIZE, SQUARE_SIZE, SQUARE_SIZE);

    ctx.fillStyle = "lime";
    snake.forEach((segment) => ctx.fillRect(segment.x * SQUARE_SIZE, segment.y * SQUARE_SIZE, SQUARE_SIZE, SQUARE_SIZE));
}

function spawnFood() {
    return { x: Math.floor(Math.random() * GRID_SIZE), y: Math.floor(Math.random() * GRID_SIZE) };
}
