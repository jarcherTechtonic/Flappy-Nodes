const TOTAL = 500;
let counter = 0;
let birds = [];
let savedBirds = [];
let pipes = [];
let slider;
let generationCount = 0;

function setup() {
  createCanvas(640, 480);
  slider = createSlider(1, 100, 1)
  createP('Slide right to increase cycle speed');
  createP(generationCount);

  for (let i = 0; i < TOTAL; i++) {
    birds[i] = new Bird();
  }
}

function keyPressed() {
  if (key == 's') {
    let bird = birds[0];
    saveJSON(bird.brain, 'bird.json');
    console.log(json);
  }
}

function draw() {
  // game logic
  for (let n = 0; n < slider.value(); n++) {

    if (counter % 75 == 0) {
      pipes.push(new Pipe());
    }
    counter++;
    
    for (var i = pipes.length - 1; i >= 0; i--) {
      pipes[i].update();
      
      for (let j = birds.length - 1; j >= 0; j--) {
        if (pipes[i].hits(birds[j])) {
          savedBirds.push(birds.splice(j, 1)[0])
        }
      }
      
      if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
      }
    }

    for (let i = birds.length - 1; i >= 0; i--) {
      if (birds[i].offScreen()) {
        savedBirds.push(birds.splice(i, 1)[0])
      }
    }

    for (let bird of birds) {
      bird.think(pipes);
      bird.update();
    }
    
    if (birds.length === 0) {
      counter = 0;
      nextGeneration();
      pipes = [];
    }
  }

  // drawing logic
  background(0);

  for (let bird of birds) {
    bird.show();
  }

  for (let pipe of pipes) {
    pipe.show();
  }
}

// function keyPressed() {
//   if (key == ' ') {
//     bird.up();
//     //console.log("SPACE");
//   }
// }