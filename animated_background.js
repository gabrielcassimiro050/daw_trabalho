var canvas;
var dots = [];
var nDots = 250;
var maxSpeed = 1;

class Dot {
  constructor() {
    this.pos = createVector(random(windowWidth), random(windowHeight));
    this.vel = createVector(random(-1, 1), random(-1, 1));
    this.a = 0;
  }

  update(){
    this.pos = createVector((this.pos.x+this.vel.x+windowWidth)%windowWidth,(this.pos.y+this.vel.y+windowHeight)%windowHeight);
    if(random(1)<.01) this.vel.add(createVector(random(-1, 1), random(-1, 1)).mult(random(5, 10)));
    if(dist(this.pos.x, this.pos.y, mouseX, mouseY) < 150) this.vel.add(createVector(this.pos.x, this.pos.y).sub(createVector(mouseX, mouseY)).normalize().mult(.9));
    for (let x = 0; x < nDots; x ++) {
        var d1 = dots[x];

        if(d1!=this){
            if(dist(this.pos.x, this.pos.y, d1.pos.x, d1.pos.y) < 30) this.vel.add(createVector(this.pos.x, this.pos.y).sub(createVector(d1.pos.x, d1.pos.y)).normalize().mult(.8));
        }
    }
    this.vel.mult(.9);
    this.a += this.vel.mag()/10.0;
  }

  show() {
        var distance = dist(this.pos.x, this.pos.y, mouseX, mouseY);
        distance/=10.0;
        //distance /= sqrt(pow(windowWidth, 2)+pow(windowHeight, 2));

        fill(255, round(255/distance));
        stroke(255, round(255/distance));
        strokeWeight(2)

        ///line(this.pos.x, this.pos.y, mouseX, mouseY);
        noStroke();
        rectMode(CENTER);
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.a)
        rect(0, 0, 30, 30, 5);
        pop();

    //}
    console.log("ok");
  }
}

function updateDots(){
    for (let x = 0; x < nDots; x ++) {
        dots[x].update();
    }
}

function showDots(){
    for (let x = 0; x < nDots; x ++) {
        dots[x].show();
    }
}

function setup() {
    
    canvas = createCanvas(windowWidth, windowHeight);

    for (let x = 0; x < nDots; x ++) {
        dots.push(new Dot());
    }
    canvas.position(0, 0);
    canvas.style('z-index', '-1');
}

function draw() {
    background(18, 24, 31);
    showDots();
    updateDots();
}