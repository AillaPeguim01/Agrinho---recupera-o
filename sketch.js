// 0 = tela inicial, 1 = jogando, 2 = fim
let estadoDoJogo = 0;

// Caminhão
let caminhaoX, caminhaoY;
let larguraCaminhao = 130;
let alturaCaminhao = 35;

// Itens caindo
let itens = [];
let pontosUva = 0;
let pontosMilho = 0;
let tempoRestante = 40; // segundos
let tempoDoJogo = 0;

let img;
let somInicio, somFim;

function preload() {

  img = loadImage('Design sem nome (1).png')
  somInicio = loadSound('letx27s-go-352481.mp3');
  somFim = loadSound('goodresult-82807.mp3');
}

function setup() {
  createCanvas(600, 450);
  caminhaoY = height - 70;
  caminhaoX = width / 2 - larguraCaminhao / 2;
  textAlign(CENTER, CENTER);
  textFont('Arial');
}

function draw() {
  background(200, 240, 255);

  if (estadoDoJogo == 0) {
    telaInicial();
  } else if (estadoDoJogo == 1) {
    jogar();
  } else if (estadoDoJogo == 2) {
    telaFinal();
  }
}

function telaInicial() {
  fill("#EC81A5");
  textSize(36);
  text("Colheita Feliz", width / 2, 70);

  fill(0);
  textSize(20);
  text("Clique para jogar!\n\nComo jogar:\n- Clique nas uvas ou milhos para colher.\n- Cada uva, vira vinho 🍷, cada milho, vira bolo 🎂!\n- Pegue o máximo que puder.\n- Você tem 40 segundos!\n\nDivirta-se!", width / 2, 200);

  textSize(22);
  fill(40, 60, 110);
  text("Clique para começar", width / 2, 350);
}

function iniciarJogo() {
  estadoDoJogo = 1;
  pontosUva = 0;
  pontosMilho = 0;
  itens = [];
  for (let i = 0; i < 6; i++) {
    criarItem();
  }
  tempoDoJogo = millis();
}

function jogar() {
  // Timer
  let tempoPassado = floor((millis() - tempoDoJogo) / 1000);
  tempoRestante = max(0, 40 - tempoPassado);

  // Desenhar caminhão
  desenhaCaminhao(caminhaoX, caminhaoY);

  // Itens caindo
  for (let i = itens.length - 1; i >= 0; i--) {
    let item = itens[i];
    item.y += item.velocidade;
    if (item.tipo == "milho") {
      desenhaMilho(item.x, item.y);
    } else {
      desenhaUva(item.x, item.y);
    }

    // Se cair no caminhão ou fora da tela
    if ((item.y > caminhaoY && item.x > caminhaoX && item.x < caminhaoX + larguraCaminhao) || item.y > height) {
      itens.splice(i, 1);
      criarItem();
    }
  }

  // Placar e tempo
  fill("blue");
  textSize(22);
  textAlign(LEFT, TOP);
  text("Uvas: " + pontosUva + "   Milhos: " + pontosMilho, 24, 15);
  textAlign(RIGHT, TOP);
  text("Tempo: " + tempoRestante + "s", width - 24, 15);

  // Fim do jogo
  if (tempoRestante <= 0) {
    estadoDoJogo = 2;
  }
}

function telaFinal() {
function preload() {
  img=loadImage('Design sem nome (1).png');
}
  
  fill("rgb(168,62,81)");
  textSize(34);
  textAlign(CENTER,CENTER);
  text("Festa da Colheita!",width / 2, 100);

  textSize(20);
  text("Você colheu:\n" + pontosUva + " uvas 🍇 → " + pontosUva + " taças de vinho 🍷\n" + pontosMilho + " milhos 🌽 → " + pontosMilho + " fatias de bolo 🎂", width / 2, 180);
  
  textSize(18);
  fill(40, 60, 110);
  text("Parabéns! A festa entre o campo e a cidade começou!", width / 2, 310);
}

function criarItem() {
  let tipo = random() < 0.5 ? "milho" : "uva";
  itens.push({
    tipo: tipo,
    x: random(45, width - 45),
    y: random(-140, -40),
    velocidade: random(2.1, 4.3)
  });
}

function mousePressed() {
  if (estadoDoJogo == 0) {
    if (somInicio && somInicio.isLoaded()) somInicio.play();
    iniciarJogo();
    return;
  }
  if (estadoDoJogo == 2) {
    if (somFim && somFim.isLoaded()) somFim.play();
  
    return;
  }

  // Só pode clicar durante o jogo
  for (let i = itens.length - 1; i >= 0; i--) {
    let item = itens[i];
    if (dist(mouseX, mouseY, item.x, item.y) < 28) {
      if (item.tipo == "milho") pontosMilho++;
      else pontosUva++;
      itens.splice(i, 1);
      criarItem();
      break;
    }
  }
}

// Desenhar milho 
function desenhaMilho(x, y) {
  fill("yellow");
  ellipse(x, y, 32, 50);
  fill("lightgreen");
  triangle(x - 16, y + 10, x, y + 36, x + 16, y + 10);
}

// Desenhar uva 
function desenhaUva(x, y) {
  fill("purple");
  ellipse(x, y, 24, 24);
  ellipse(x - 12, y + 7, 18, 18);
  ellipse(x + 12, y + 7, 18, 18);
  ellipse(x, y + 15, 14, 14);
  stroke("brown")
  strokeWeight(3);
  line(x, y - 12, x, y - 19);
  noStroke();
}

// Caminhão (retângulo + rodas)
function desenhaCaminhao(x, y) {
  fill("gray");
  rect(x, y, larguraCaminhao, alturaCaminhao, 10);
  fill("lightpink");
  rect(x + 90, y - 20, 40, 30, 8);
  fill("rgb(240,58,90)");
  ellipse(x + 30, y + alturaCaminhao, 24, 24);
  ellipse(x + 110, y + alturaCaminhao, 24, 24);
}

