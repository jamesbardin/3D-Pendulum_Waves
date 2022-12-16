class Pendulum {
  constructor(l) {
    this.bob = createVector()
    this.origin = createVector(width / 2, height / 2)
    this.len = l;
    this.angle = PI;
    this.angleV = 0;
    this.angleA = 0.01;
    this.gravity = 1;
    this.size = 6;
    this.c = "#000000";
    this.m = 60;
    this.m2 = 100;
    this.up_m = false;
    this.up_m2 = true;
  }

  display() {
    stroke(this.c)
    strokeWeight(.5);
    line(this.origin.x, this.origin.y, this.bob.x, this.bob.y)
    //strokeWeight(1);
    circle(this.bob.x, this.bob.y, this.size)
    fill(this.m, 100, this.m2)
  }

  update() {
    // let force = this.gravity * sin(this.angle);
    //this.angleA = (-0.75 * force) / this.len;
    let d = 0.0275;
    this.angleA = (360 * d)/(2 * Math.PI * this.len)
    // this.angleV += this.angleA;
    this.angle += this.angleA;
    this.bob.x = this.len * sin(this.angle) + this.origin.x;
    this.bob.y = this.len * cos(this.angle) + this.origin.y;
  }
  
  played() {
    this.c = "#36454F";

    if (this.m < 10){
      this.up_m = true;
    }
    else if (this.m > 340) {
      this.up_m = false;
    }
    if (this.m > -10 && this.up_m == false){
      this.m -= 10;
    }
    else if (this.m < 370 && this.up_m == true){
      this.m += 10;
    }    

    if (this.m2 < 10){
      this.up_m2 = true;
    }
    else if (this.m2 > 340) {
      this.up_m2 = false;
    }
    if (this.m2 > -10 && this.up_m2 == false){
      this.m2 -= 15;
    }
    else if (this.m2 < 370 && this.up_m2 == true){
      this.m2 += 15;
    }  
  }
  
  notPlayed() {
    this.c = "#36454F";
    // this.fill = fill('rgba(' + this.colormod1 + ',' + this.colormod3 + ',' + this.colormod2 + ', 0.75)'); 
    // this.fill = fill('green')
  }
}