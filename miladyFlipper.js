// Define Milady character
class Milady {
    constructor() {
        this.x = 50;
        this.y = 0;
        this.width = 32;
        this.height = 32;
        this.baseSpeed = 2;
        this.runSpeedMultiplier = 1.69; // Speed increase multiplier when running
        this.jumpStrength = 10;
        this.gravity = 0.5;
        this.velocityX = 0;
        this.velocityY = 0;
        this.isJumping = false;
        this.isRunning = false;
        this.direction = 1; // 1 for right, -1 for left
    }

    draw() {
        // Draw Milady on the canvas
        ctx.fillStyle = "pink";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update() {
        // Apply gravity
        this.velocityY += this.gravity;
        this.y += this.velocityY;

        // Apply horizontal velocity
        if (this.isRunning) {
            this.x += this.baseSpeed * this.runSpeedMultiplier * this.direction;
        } else {
            this.x += this.velocityX;
        }

        // Check for ground collision
        if (this.y + this.height >= canvas.height) {
            this.y = canvas.height - this.height;
            this.velocityY = 0;
            this.isJumping = false;
        }

        // Limit horizontal velocity to smooth movement
        this.velocityX *= 0.9; // Friction to slow down movement
    }

    moveLeft() {
        this.velocityX = -this.baseSpeed;
        this.direction = -1;
    }

    moveRight() {
        this.velocityX = this.baseSpeed;
        this.direction = 1;
    }

    jump() {
        if (!this.isJumping && this.y + this.height === canvas.height) {
            this.velocityY = -this.jumpStrength;
            this.isJumping = true;
        }
    }

    run() {
        this.isRunning = true;
    }

    stopRunning() {
        this.isRunning = false;
    }

    runAndJump() {
        if (this.y + this.height === canvas.height) {
            this.velocityY = -this.jumpStrength;
            this.isJumping = true;
        }
        if (this.velocityX < this.baseSpeed * this.runSpeedMultiplier) {
            this.velocityX += 0.5; // Accelerate while running
        }
    }
}

// Game initialization
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const milady = new Milady();

// Game loop
function gameLoop() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the ground
    ctx.fillStyle = "green";
    ctx.fillRect(0, canvas.height - 50, canvas.width, 50);

    // Update and draw Milady
    milady.update();
    milady.draw();

    // Handle user input
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') {
            milady.moveLeft();
        } else if (event.key === 'ArrowRight') {
            milady.moveRight();
        } else if (event.key === 'ArrowUp') {
            milady.jump();
        } else if (event.key === 'Shift') {
            milady.run();
        } else if (event.key === ' ') {
            milady.runAndJump();
        }
    });

    document.addEventListener('keyup', (event) => {
        if (event.key === 'Shift') {
            milady.stopRunning();
        }
    });

    // Request the next frame
    requestAnimationFrame(gameLoop);
}

// Start the game loop
requestAnimationFrame(gameLoop);