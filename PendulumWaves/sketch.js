let pendulums = [];
let notes = [];

let spacing = 8;
let gravity = 9.8;
let periodmax = 600;
let numcycles = 30;
let modifier = 0.05;

let midi = 100;

let osc = [];
let env = [];

// equation to populate len is from https://www.education.com/science-fair/article/pendulum-waves/
let len = [];
for (let i = 0; i < 200; i++) {
  l = (gravity * (Math.pow((periodmax/(2*Math.PI*(numcycles+i+1))),2)))/modifier
  len.push(l);
}

function addSlider(variable, min, max, val, step, text) {
  let slider = createSlider(min, max, val, step);
  let label = createSpan(text.replace("#", val.toFixed(2)));
  createElement("br");
  
  let onInput = () => {
    vars[variable] = slider.value();
    label.html(text.replace("#", slider.value().toFixed(2)));
    background(245);
    stroke(vars.r, vars.g, vars.z, vars.o); 
  };
  
  slider.input(onInput);
  
  vars[variable] = val;
}

function setup() {
  createCanvas(windowWidth, windowHeight);  
  for (let i = 0; i < 200; i++) {
    if (i % 2 == 0){
      notes.push(midi - i)
    }
    else {
      notes.push(0)
    }
    // assigns note to every other pendulum
  }
  for (let i = 0; i < 200; i++) {
    pendulums.push(new Pendulum(len[i]));
   
    env.push(new p5.Envelope())
    env[i].setADSR(0.001, 0.01, 1, 0.3);
    env[i].setRange(1, 0);
       
    osc.push(new p5.Oscillator());
    osc[i].start();
    osc[i].freq(midiToFreq(notes[i]))
    osc[i].amp(env[i]);
    // fix for mystery color-changing pendulum
    // pendulums[0].size = 0;
  }
}

function draw() {
  background('black');

  for (let i = 0; i < pendulums.length; i++) {
    pendulums[i].display();
    pendulums[i].update();
    
    if(Math.abs(pendulums[i].bob.x - width/2) < 8) {
      // env[i].play();
      pendulums[i].played();
      // pendulums[i].incrementColor();
    } else {
      pendulums[i].notPlayed();
    }
  }
}