let ball;
let pipes;
let scoreL;
let scoreR;

let cubLeft;
let cubRight;

function setup() {
  createCanvas(720, 400);
  ball = new Ball();
  background(0);
  scoreL = 0;
  scoreR = 0;
  textAlign(CENTER, CENTER);
  textSize(30);
  cubLeft = new Cuboid(20);
  cubRight = new Cuboid(width-50);
}

function draw() {
  background(0, 0, 0, 40);
  if(keyIsDown(81)) {
    cubLeft.y-=5
  }
  if(keyIsDown(65)) {
    cubLeft.y+=5;
  }
  if(keyIsDown(UP_ARROW)) {
    // q, left up
    cubRight.y -=5;
  }
  if(keyIsDown(DOWN_ARROW)) {
    cubRight.y +=5;
  }

  ball.update();
  cubLeft.update();
  cubRight.update();
  if (ball.px <= cubLeft.x+cubLeft.w) {
    if(cubLeft.hit(ball)) {
      cubLeft.calcVy(ball)
      ball.vx = -ball.vx;
    } else {
      scoreR += 1;
      ball.reset();
    }
  }
  if (ball.px >= cubRight.x) {
    if(cubRight.hit(ball)) {
      ball.vy = -ball.vy;
      ball.vx = -ball.vx;
    } else {
      scoreL += 1;
      ball.reset();
    }
  }
  stroke('white');
  fill('white');
  text(String(scoreL), 40, 30);
  text(String(scoreR), width - 40, 30);
}

class Ball {
  maxSpeed = 4;
  // minSpeed = 7;
  constructor() {
    this.reset();
  }

  reset() {
    this.px = width / 2;
    this.py = height / 2;
    this.vx = this.maxSpeed;
    this.vy = random(-this.maxSpeed, this.maxSpeed);
    if (random(0, 1) < 0.5) {
      this.vx = -this.vx;
    }
  }

  update() {
    this.px += this.vx;
    this.py += this.vy;
    if (this.py > height) {
      this.py = height;
      this.vy = -this.vy;
    }
    if (this.py < 0) {
      this.py = 0;
      this.vy = -this.vy;
    }
    if (this.px > width) {
      this.px = width;
    }
    if (this.px < 0) {
      this.px = 0;
    }
    fill('white');
    stroke('yellow');
    ellipse(this.px, this.py, 20, 20);
  }
}

class Cuboid {
  constructor(x) {
    this.size = 70;
    this.x = x;
    this.y = height / 2;
    this.w = 20;
  }

  update() {
    rect(this.x, this.y, this.w, this.size);
  }

  hit(ball) {
    return ball.py >= this.y && ball.py < (this.y+this.size);
  }

  calcVy(ball) {
    ball.vy = -ball.vy * map(ball.py, cubLeft.y, cubLeft.y+cubLeft.size, -1, 1, true);
  }
}