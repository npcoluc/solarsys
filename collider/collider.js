let config = {}

function preload() {
  // Get the most recent planets
  let url = 'http://3.15.100.29/api'; //"http://127.0.0.1:8001/"//
  config = loadJSON(url);
}

planets = []
let button;
let err_msg = false;

function setup() {
  createCanvas(windowWidth,windowHeight);
  colorMode(HSB);
  numPlanets = config.planets.length
  for (let i = 0; i < numPlanets; i++) {
    planetPos = {'x': windowWidth/(numPlanets + 1) * i + 300, 'y':windowHeight/2}
    console.log(config.planets[i].to)
    planets.push( new Planet(config.planets[i].d, planetPos,
                           config.planets[i].from, config.planets[i].to, false,
                           config.planets[i].x1_lines, config.planets[i].y1_lines,
                           config.planets[i].x2_lines, config.planets[i].y2_lines,
                           config.planets[i].x3_lines, config.planets[i].y3_lines,
                           config.planets[i].x4_lines, config.planets[i].y4_lines,
                           config.planets[i].beziers, config.planets[i].angle) )
  }

  button = createButton("Collide");
  button.mouseClicked(collide);
  button.size(100,50);
  button.position(windowWidth - 200, windowHeight - 75)
  button.style("font-family", "Helvetica");
  button.style("font-size", "20px");
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

  textSize(24);
  fill(0,0,100)
  textFont('Helvetica')
  text('Select 2 Planets to collide using Genetic Programming!', 30, 100);

  if(err_msg){
    textSize(18);
    fill(0,100,100)
    textFont('Helvetica')
    text('Please select 2 planets', windowWidth-250, 100);
  }

  for(let y = 0; y < numPlanets; y++){
    planets[y].create();
  }




}

function collide(){

   let count = 0
  // let config = {"sun":{
  //                 "col": [60, 100, 100],
  //                 "d": 150 },
  //               "planets": []};
   for(let y = 0; y < numPlanets; y++){
     if(planets[y].selected){
       count += 1;
  //     saveP(planets[y], config)
     }
   }
   if(count != 2){
     err_msg = true;
   }
   else{
     err_msg = false
     console.log("collide")
   }
  //   let url = "http://127.0.0.1:8001/"; //'http://3.15.100.29/api';
  //   res = httpPost(url, 'json', config)
  //   window.location.replace('http://127.0.0.1:8080/sys/sys.html');
  // }
}

function saveP(p, config){
  dict = { "from": p.from_arr,
          "to": p.to_arr,
          "d": p.d,
          "beziers": p.beziers,
          "angle": p.slice,
          "x1_lines": p.x1_lines,
          "y1_lines": p.y1_lines,
          "x2_lines": p.x2_lines,
          "y2_lines": p.y2_lines,
          "x3_lines": p.x3_lines,
          "y3_lines": p.y3_lines,
          "x4_lines": p.x4_lines,
          "y4_lines": p.y4_lines
  };


  config.planets.push(dict)
}

function mouseClicked(){
  for(let y = 0; y < numPlanets; y++){
    d = dist(mouseX, mouseY, planets[y].pos.x, planets[y].pos.y)
    if(d < planets[y].d / 2){
      planets[y].clicked();
    }
  }
}

class Planet {
  constructor(_d, _pos, _from, _to, _ring, _x1, _y1, _x2, _y2, _x3, _y3, _x4, _y4, _bez, _angle) {
    this.mass = _d / 2
    this.pos = _pos
    this.ring = _ring
    this.beziers = _bez
    this.arc_angle = _angle
    this.d = _d

    this.from = color(_from[0], _from[1], _from[2]);
    this.to = color(_to[0], _to[1], _to[2]);
    this.selected = false

    this.x1_lines = _x1;
    this.y1_lines = _y1;
    this.x2_lines = _x2;
    this.y2_lines = _y2;
    this.x3_lines = _x3;
    this.y3_lines = _y3;
    this.x4_lines = _x4;
    this.y4_lines = _y4;
  }

  create() {
    noStroke();
    if(this.selected){
      fill(0,0, 40)
      ellipse(this.pos.x , this.pos.y, this.d + 7)
    }


    fill(this.to)
    ellipse(this.pos.x , this.pos.y, this.d)

    fill(this.from)
    arc(this.pos.x, this.pos.y, this.d, this.d, this.arc_angle, this.arc_angle + PI);

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

  clicked(){
    if(this.selected) this.selected = false;
    else this.selected = true;
  }

}
