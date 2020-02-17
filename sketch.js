//variaveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 16;
let raio = diametro/2;

//velocidade da bolinha
let velocidadeXBolinha=2;
let velocidadeYBolinha=2;

//variaveis da raquete
let xRaquete = 10;
let yRaquete = 150;
let widthRaquete = 10;
let heightRaquete = 80;

//variaveis da raquete oponente
let xRaqueteOp = 580;
let yRaqueteOp = 150;
let velocidadeYOp; 

//variaveis placar
let myPts = 0;
let ptsOp = 0;

let colidiu = false;


//sons do jogo
let racket;
let ponto;
let track;

//error
let chanceErrar = 0;


function preload(){
  track = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  racket = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  track.loop();
}

function draw() {
  background(0);
  mostrarBolinha();
  moverBolinha();
  colidirBorda();
  mostrarRaquete(xRaquete, yRaquete);
  moverRaquete();
  tocarRaquete();
  colisaoRaquete(xRaquete, yRaquete);
  mostrarRaquete(xRaqueteOp, yRaqueteOp);
  moverRaqueteOp();
  colisaoRaquete(xRaqueteOp, yRaqueteOp);
  incluirPlacar();
  marcarPonto();
}

function mostrarBolinha(){
  circle(xBolinha, yBolinha, diametro);
}

function moverBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function colidirBorda(){
  if(xBolinha+raio>width || xBolinha-raio < 0){
    velocidadeXBolinha *= -1;
  }
  if(yBolinha+raio>height || yBolinha-raio < 0){
    velocidadeYBolinha *= -1;
  }
}

function mostrarRaquete(x, y){
  rect(x, y, widthRaquete, heightRaquete);
}

function moverRaquete(){
  if(keyIsDown(UP_ARROW)){
    yRaquete -=10;
   }
  if(keyIsDown(DOWN_ARROW)){
    yRaquete +=10;
}
}

function tocarRaquete(){
  if(xBolinha-raio < xRaquete+widthRaquete && yBolinha-raio < yRaquete + heightRaquete && yBolinha+raio > yRaquete){
    velocidadeXBolinha *= -1;
    racket.play();
     }
}

function RaqueteAdversaria(){
  rect(xRaquete, yRaquete, widthRaquete, heightRaquete);
}

function colisaoRaquete(x, y){
  let colidiu = collideRectCircle(x, y, widthRaquete,heightRaquete,xBolinha,yBolinha,raio);
  if (colidiu){
    velocidadeXBolinha *= -1;
    racket.play();
  } 
}

function moverRaqueteOp(){
  velocidadeYOp = yBolinha - yRaqueteOp - widthRaquete/2 - 30;
  yRaqueteOp += velocidadeYOp + chanceErrar;
  calculaChanceErrar();
  
}

function incluirPlacar(){
    stroke(255);
    textAlign(CENTER);
    textSize(16);
    fill(color(255, 140, 0));
    rect(150, 10, 40, 20);
    fill(255);
    text(myPts, 170, 26);
    fill(color(255, 140, 0));
    rect(450, 10, 40, 20);
    fill(255);
    text(ptsOp, 470, 26);
}

function marcarPonto(){
  if(xBolinha > 593) {
    myPts +=1;
    ponto.play();
    }
  if(xBolinha < 7){
    ptsOp += 1;
    ponto.play();
    }
}

function calculaChanceErrar(){
  if(ptsOp >= myPts){
  chanceErrar +=1;
  if(chanceErrar >=38){
  chanceErrar =39;
  }}
  else{
    chanceErrar -= 1;
    if(chanceErrar <= 34){
      chanceErrar = 34;
    }
  }
}