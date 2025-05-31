const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let bird = { x: 50, y: 150, width: 20, height: 20, gravity: 0.6, lift: -10, velocity: 0 };
let pipes = [];
let frame = 0;

document.addEventListener("keydown", () => {
  bird.velocity = bird.lift;
});

function drawBird() {
  ctx.fillStyle = "yellow";
  ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
}

function drawPipe(pipe) {
  ctx.fillStyle = "green";
  ctx.fillRect(pipe.x, 0, pipe.width, pipe.top);
  ctx.fillRect(pipe.x, canvas.height - pipe.bottom, pipe.width, pipe.bottom);
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  bird.velocity += bird.gravity;
  bird.y += bird.velocity;
  drawBird();

  if (frame % 100 === 0) {
    let top = Math.random() * 200 + 20;
    let bottom = 480 - top - 100;
    pipes.push({ x: 320, width: 40, top, bottom });
  }

  for (let i = 0; i < pipes.length; i++) {
    pipes[i].x -= 2;
    drawPipe(pipes[i]);

    if (
      bird.x < pipes[i].x + pipes[i].width &&
      bird.x + bird.width > pipes[i].x &&
      (bird.y < pipes[i].top || bird.y + bird.height > canvas.height - pipes[i].bottom)
    ) {
      alert("Game Over!");
      document.location.reload();
    }
  }

  frame++;
  requestAnimationFrame(update);
}

update();
