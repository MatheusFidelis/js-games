

// variaveis bolinha
let xB = 300;
let yB = 200;
let d = 20;
let r = d/2;

// velocidade da bolinha
let vX = 10;
let vY = 10;

let hit = false;

// variaveis raquete
let xR1 = 5;
let yR1 = 150;
let wR = 10;
let hR = 100;

// variaveis raquete oponente
let xRO = 585;
let yRO = 150;
let vYRO; 
let errorChance = 0;

// variaveis placar do jogo
let myPoints = 0;
let opponentPoints = 0;

// sons do jogo
let racketSong;
let pointSong;
let soundtrack;

function preload () {
  soundtrack = loadSound("trilha.mp3");
  pointSong = loadSound("ponto.mp3");
  racketSong = loadSound("raquetada.mp3");
  
}

function setup() {
  createCanvas(600, 400);
  soundtrack.loop();
}

function draw() {
  
  background(0);
  rect(-10,0, 650, 5);
  rect(-10, 395, 650, 5)
  showBall();
  moveBall();
  verifyCollision();
  showRacket(xR1, yR1);
  showRacket(xRO, yRO);
  moveRacket();
  moveOpponentRacket();
  //verifyRacketCollision();s
  libraryCollision(xR1, yR1);
  libraryCollision(xRO, yRO);
  scoreboard();
  scorePoint();
  calcErrorChance();
}

function showBall() {
   circle(xB, yB, d);
}

function moveBall() {
  xB += vX;
  yB += vY;
}

function verifyCollision() {
  
    if ((xB + r) > width || (xB - r) < 0 ) {
    vX *= -1;
  }
  
    if ((yB + r) > height || (yB - r) < 0) {
    vY *= -1;
  }
}

function showRacket (xB,yB) {
   rect(xB, yB, wR, hR)
 }

function moveRacket() {
  
  if (keyIsDown(UP_ARROW)) {
    yR1 -= 10;
  }
  
   if (keyIsDown(DOWN_ARROW)) {
    yR1 += 10;
  }
}

// function verifyRacketCollision() {
//   if (xB - r < xR1 + wR && yB - r < yR1 + hR && yB + r > yR1) {
//     vX *= -1;
//   }
  
//   if (xB - r < 580 + wR && yB - r < 150 + hR && yB + r > yR1) {
//     vX *= -1;
//   }
// }

function libraryCollision(xR, yR) {
  
  hit = collideRectCircle(xR, yR, wR, hR, xB, yB, r);
  
  if (hit) {
    vX *= -1;
    racketSong.play();
  }
}

function moveOpponentRacket() {
  vyRO = yB - yRO - wR/2 - 30;
  yRO += vyRO + errorChance;
  calcErrorChance()
}

function scoreboard() {
  stroke(255);
  fill(color(255,140,0));
  rect(220,26, 60, 30);
  rect(320,26, 60, 30);
  fill(255);
  text(myPoints, 250, 50);
  fill(255);
  text(opponentPoints, 350, 50);
  textSize(25);
  textAlign(CENTER);
}

function scorePoint() {
  if(xB > 590) {
    myPoints += 1;
    pointSong.play();
  }
    if(xB < 10) {
    opponentPoints += 1;
    pointSong.play();
  }
  
}
function calcErrorChance() {
  if (opponentPoints >= myPoints) {
    if (errorChance >= 39) {
    errorChance = 40
    }
  } else {
    errorChance -= 1
    if (errorChance <= 35){
    errorChance = 35
    }
  }
}