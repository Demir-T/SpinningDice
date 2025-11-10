let go;
let dice = [];
let counts = [];
let rolling = [];

function preload() {
  // Load images from the assets folder
  go = loadImage("assets/go_button1.png");
  for (let i = 0; i < 6; i++) {
    dice[i] = loadImage(`assets/dice${i + 1}.gif`);
  }
}

function setup() {
  createCanvas(800, 600);
  textFont("Arial");
  textAlign(LEFT, CENTER);

  // Initialize dice
  for (let i = 0; i < 6; i++) {
    counts[i] = floor(random(6));
    rolling[i] = false;
  }
}

function draw() {
  background(255);

  // Draw the Go button
  image(go, 0, 0, 200, 200);

  // Draw and update dice
  for (let i = 0; i < 6; i++) {
    let x = 250 + i * 90;
    let y = 100;
    image(dice[counts[i]], x, y, 80, 80);

    if (rolling[i]) {
      counts[i] = (counts[i] + 1) % 6;
    }
  }

  checkWin();
}

function mousePressed() {
  // If Go button is clicked, start all dice rolling
  if (mouseX < 200 && mouseY < 200) {
    for (let i = 0; i < 6; i++) {
      rolling[i] = true;
    }
  }

  // If a die is clicked, stop it
  for (let i = 0; i < 6; i++) {
    let x = 250 + i * 90;
    let y = 100;
    if (mouseX > x && mouseX < x + 80 && mouseY > y && mouseY < y + 80) {
      rolling[i] = false;
    }
  }
}

function checkWin() {
  fill(0);
  textSize(20);

  // 1️⃣ Win if the first 3 dice are all different
  if (
    counts[0] !== counts[1] &&
    counts[0] !== counts[2] &&
    counts[1] !== counts[2]
  ) {
    fill(0, 200, 0);
    text("🎉 You win! (First 3 dice are all different)", 50, 400);
  }

  // 2️⃣ Win if no dice show 1
  let noOnes = true;
  for (let i = 0; i < 6; i++) {
    if (counts[i] === 0) noOnes = false;
  }
  if (noOnes) {
    fill(0, 0, 200);
    text("💪 You win! (No dice show 1)", 50, 430);
  }

  // 3️⃣ Win if total > 20
  let total = 0;
  for (let i = 0; i < 6; i++) {
    total += counts[i] + 1;
  }
  if (total > 20) {
    fill(200, 0, 0);
    text(`🔥 You win! (Total > 20: ${total})`, 50, 460);
  }
}
