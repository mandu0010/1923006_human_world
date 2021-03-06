// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com
// let song;

let img;
// A reference to our box2d world
let world;

// A list for all of our particles
let particles = [];

let boundaries = [];

let wall;

function preload() {
  img = loadImage('man.jpg');
  // soundFormats('mp3');
  // song = loadSound('A');
}

function setup() {
  createCanvas(300, 700);
  // background(img);
  // Initialize box2d physics and create the world
  // sound.play();

  world = createWorld();

  world.SetContactListener(new CustomListener());

  // wall = new Boundary(width / 2, height - 5, width, 10);

  boundaries.push(new Boundary(width / 2, height - 5, width, 10, 0));
  // boundaries.push(new Boundary(width / 2, 5, width, 10, 0));
  boundaries.push(new Boundary(width - 5, height / 2, 10, height, 0));
  boundaries.push(new Boundary(5, height / 2, 10, height, 0));


}

function draw() {
  background(51);
  background(img);
  // We must always step through time!
  let timeStep = 1.0 / 30;
  // 2nd and 3rd arguments are velocity and position iterations
  world.Step(timeStep, 10, 10);

  if (random(1) < 0.1) {
    let sz = random(4, 8);
    particles.push(new Particle(random(width), 20, sz));
  }


  // Look at all particles
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].display();
    // Particles that leave the screen, we delete them
    // (note they have to be deleted from both the box2d world and our list
    if (particles[i].done()) {
      particles.splice(i, 1);
    }
  }

  for (let i = 0; i < boundaries.length; i++) {
    boundaries[i].display();
  }

  // wall.display();

}
