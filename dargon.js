let dino;
let isAnimating = false;


document.addEventListener('keydown', function(e) {
  console.log("key code is: ", e.keyCode);
  if (e.keyCode == 40 && !isAnimating) { // Check if down key is pressed and animation is not already running
    isAnimating = true; 
    dino = document.querySelector('.dino');
    dino.classList.add('animateDino');
  }
});

document.addEventListener('keyup', function(e) {
  if (e.keyCode == 40) { // Check if down key is released
    isAnimating = false; // Set flag to false to indicate animation is stopped
    dino.classList.remove('animateDino');
  }
});
document.addEventListener('keydown', function(e) {
  if (e.keyCode == 40) {
      const dino = document.querySelector('.dino');
      const dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
      dino.style.left = (dinoX + 112) + "px";
  }
  if (e.keyCode == 38) {
      const dino = document.querySelector('.dino');
      const dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
      dino.style.left = (dinoX - 112) + "px";
  }
});
document.addEventListener('DOMContentLoaded', function() {
    let isJumping = false;
    let gameover = false;
    let score = 0;
    let obstacleSpeed = 2; // Initial speed of the obstacle

    setInterval(() => {
        if (gameover) return; // Stop checking collision if game is over

        const dino = document.querySelector('.dino');
        const gameoverElement = document.querySelector('.gameover');
        const obstacle = document.querySelector('.obstacle');

        const dinoRect = dino.getBoundingClientRect();
        const obstacleRect = obstacle.getBoundingClientRect();

        const collision = !(
            dinoRect.right < obstacleRect.left || 
            dinoRect.left > obstacleRect.right || 
            dinoRect.bottom < obstacleRect.top || 
            dinoRect.top > obstacleRect.bottom
        );

        if (collision && !isJumping) {
            gameoverElement.style.visibility = "visible";
            gameover = true;
        }
    }, 100);

    setInterval(() => {
        if (gameover) return; // Stop moving obstacle if game is over

        const obstacle = document.querySelector('.obstacle');
        const obstacleX = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
        obstacle.style.left = (obstacleX - (112 * obstacleSpeed)) + "px"; // Increase obstacle speed

        if (obstacleX < -100) {
            obstacle.style.left = "100%";
            score++; // Increase score when obstacle passes
            document.querySelector('.score').innerText = score; // Update score in the DOM
        }

        if (score % 5 === 0 && score !== 0) {
            obstacleSpeed += 0.5; // Increase obstacle speed every 5 points
        }
    }, 100);

    document.addEventListener('keydown', function(e) {
        if (e.key === "ArrowUp" && !isJumping) {
            const dino = document.querySelector('.dino');
            const dinoY = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));
            isJumping = true;
            dino.style.top = (dinoY - 112) + "px";

            setTimeout(() => {
                dino.style.top = (dinoY) + "px";
                isJumping = false;
            }, 1000);
        }
    });
});
