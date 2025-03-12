const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("score");

let snake = [{ x: 10, y: 10 }];
let direction = "RIGHT";
let nextDirection = "RIGHT"; // Окрема змінна для запобігання миттєвих змін
let food = { x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) };
let score = 0;
let gameOver = false;
let lastRenderTime = 0;
const SNAKE_SPEED = 4; // Зменшена швидкість

window.requestAnimationFrame(gameLoop);
document.addEventListener("keydown", changeDirection);

function gameLoop(currentTime) {
    if (gameOver) return;

    window.requestAnimationFrame(gameLoop);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

    lastRenderTime = currentTime;
    direction = nextDirection; // Напрям змінюється лише раз за кадр
    updateGame();
    drawGame();
}

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

    if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20 || 
        snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        gameOver = true;
        alert("Game Over! Final Score: " + score);
        return;
    }

    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreDisplay.textContent = score;
        food = { x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) };
    } else {
        snake.pop();
    }
}

function drawGame() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "red";
    ctx.fillRect(food.x * 20, food.y * 20, 20, 20);

    ctx.fillStyle = "lime";
    snake.forEach((segment) => ctx.fillRect(segment.x * 20, segment.y * 20, 20, 20));
}
