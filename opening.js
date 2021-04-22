
planets = []

function setup() {
  createCanvas(windowWidth,windowHeight);
  colorMode(HSB);

  for(let y = 1; y < 6; y++){

    p = new Planet(windowWidth/6 * y - 20, windowHeight/2);
    p.randomChord();
    planets.push(p);
  }
}

function draw() {
  let c1 = color(236, 68, 1)
  let c2 = color(236, 68, 20)
  //background(236, 68, 10)
  for(let y=0; y<width/2; y++){
    n = map(y,0,width/2,0,1);
    let newc = lerpColor(c1,c2,n);
    stroke(newc);
    line(y,0,y, width);
  }
  for(let y=width/2; y<width; y++){
    n = map(y,width/2,width,0,1);
    let newc = lerpColor(c2,c1,n);
    stroke(newc);
    line(y,0,y, width);
  }

  textSize(32);
  fill(0,0,100)
  text('Select 3 Planets for your System', 30, 100);
  for(let y = 0; y < 5; y++){
    planets[y].create();
  }


}

class Planet {
  constructor(x, y) {
    this.colors = [];
    this.arc_colors = [];

    this.from = color(random(0, 360), random(50, 100), random(30, 100));
    this.to = color(random(0, 360), random(50, 100), random(10, 30));
    this.c1 = lerpColor(this.from, this.to, 0.33);
    this.c2 = lerpColor(this.from, this.to, 0.66);
    this.pos = {'x': x, 'y': y}
    this.d = random(50, 200)
    this.beziers = 2
    this.rate = random(0.02, 0.15)
    this.slice = PI * random(1, 2)

    this.x1_lines = [];
    this.x2_lines = [];
    this.y1_lines = [];
    this.y2_lines = [];
    this.x3_lines = [];
    this.x4_lines = [];
    this.y3_lines = [];
    this.y4_lines = [];
  }

  create() {
    noStroke();
    fill(this.to)
    ellipse(this.pos.x , this.pos.y, this.d)

    fill(this.from)
    arc(this.pos.x, this.pos.y, this.d, this.d, this.slice, this.slice + PI);

    for(let y = 0; y < this.beziers; y++) {
      let c3 = lerpColor(this.from, this.to, y/this.beziers)
      noStroke()
      fill(c3)
      bezier(this.pos.x + this.x1_lines[y], this.pos.y + this.y1_lines[y],
            this.pos.x + this.x3_lines[y], this.pos.y + this.y3_lines[y],
            this.pos.x + this.x4_lines[y], this.pos.y + this.y4_lines[y],
            this.pos.x + this.x2_lines[y], this.pos.y + this.y2_lines[y]);
     }

  }

  randomChord() {
    // find a random point on a circle
    for(let y = 0; y < this.beziers; y++) {
      // find a random point on a circle
      let angle1 = random(0, 2 * PI);
      this.x1_lines.push(this.d * cos(angle1) * .5);
      this.y1_lines.push(this.d * sin(angle1) * .5);

      // find another random point on the circle
      let angle2 = random(0, 2 * PI);
      this.x2_lines.push(this.d * cos(angle2) * .5);
      this.y2_lines.push(this.d * sin(angle2) * .5);

      this.x3_lines.push(this.d * cos(angle2 - PI * random(2)) * .5);
      this.y3_lines.push(this.d * sin(angle2 - PI * random(2)) * .5);

      this.x4_lines.push(this.d * cos(angle2 + PI * random(2)) * .5);
      this.y4_lines.push(this.d * sin(angle2 + PI * random(2)) * .5);

    }
  }
}
