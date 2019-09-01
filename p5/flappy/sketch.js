let bird;
let pipes;
let score;

function setup() {
  createCanvas(720, 400);
  bird = new Bird();
  pipes = [];
}

function play() {
  if(keyIsDown(UP_ARROW)) {
    bird.v = -5;
  }
  if(keyIsDown(DOWN_ARROW)) {
    bird.v = 5;
  }
  if(frameCount % 20 == 0) {
    pipes.push(new Pipe);
  }
  bird.update();

  for(var i=pipes.length-1; i>=0; i--) {
    pipes[i].update();
    if(pipes[i].hit(bird)) {
      console.log("HIT");
      bird.life --;
    }
    if(pipes[i].x < -20) {
      pipes.splice(0, 1);
    }
  }
}

function draw() {
  background(0);
  if(bird.life > 0) {
    play();
    score = frameCount;
  } else {
    background('red');
    textSize(32);
    fill(50);
    text('GAME OVER!', 250, 200);
    text('Score: ' + str(score), 250, 300);
  }
}

// function keyPressed() {
//   if (key === ' ') {
//     bird.v = -3;
//   }
// }

class Bird {
  constructor() {
    this.x = 30;
    this.y = height / 30;
    this.a = 0.1;
    this.v = 0;
    this.life = 3;
  }

  update() {
    this.v += this.a;
    this.y += this.v;
    if(this.y > height) {
      this.y = height;
      this.v = -this.v;
    }
    if(this.y < 0) {
      this.y = 0;
      this.v = 0;
    }
    if(this.life == 3) {
      fill('green');
    } else if(this.life == 2) {
      fill('orange');
    } else if(this.life == 1) {
      fill('red');
    } else if(this.life == 0) {
      fill('blue');
    } 
    ellipse(30, this.y, 20, 20);
  }
}

class Pipe {
  constructor() {
    this.bottom = random(40, 150);
    this.top = random(40, 150);
    this.x = width;
    this.speed = 5;
  }

  update() {
    fill('brown');
    this.x -= this.speed;
    rect(this.x, 0, 20, this.top);
    rect(this.x, height-this.bottom, 20, this.bottom);
  }

  hit(bird) {
    if(bird.x == this.x) {
      if(bird.y < this.top || bird.y>height-this.bottom) {
        return true;
      }
    }
    return false;
  }
}