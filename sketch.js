let canv;

let osc, envelope, fft;

let scaleArray = [60, 62, 64, 65, 67, 69, 71, 72];
let note = 0;

let btn0, btn1, btn2, btn3, btn4, btn5;
let au;
let aux = [];
let auxName = [];
let fft1, fft2;

let n_width = 1024; //1024;
let n_height = 768; // 768;

let peo_0 = [];
let peo_1 = [];
let peo_2 = [];
let peo_3 = [];
let peobody_blue = [];
let peobody_mad = [];
let peobody_sad;
let peobody_yel;

let curFrame0 = 0;
let curFrame = 0;
let curFrame2 = 0;
let curFrame3 = 0;
let curFrame4 = 0;
let curFrame5 = 0;
let i = 0;
let j = 0;
let k = 20;
let inst = 0;
let myColor ;
let c1, c2;
let m, m1;
let num = 8;
let col,fcol;
let spectrum;
let radVal;
function preload(){
  for(let i = 0; i<10;i++){ //peo_0.length
  let imgName0 = "peabody1_" + nf(i,1) +".png";
    peo_0[i] = loadImage(imgName0);
  }


  for(let i = 0; i<16;i++){ //peo_1.length
  let imgName1 = "peacock_0_7" + nf(i,2) +".png";
    peo_1[i] = loadImage(imgName1);
  }

  for(let i = 0; i<20;i++){ //peo_2.length
  let imgName2 = "peacock_8_2" + nf(i,3) +".png";
    peo_2[i] = loadImage(imgName2);
  }

  for(let i = 0; i<8;i++){ //peo_3.length
  let imgName3 = "peacock_9_08" + nf(i,1) +".png";
    peo_3[i] = loadImage(imgName3);
  }

  for(let i = 0; i<4;i++){ //peobody_blue.length
  let imgName3 = "peacock_9_08_b" + nf(i,1) +".png";
    peobody_blue[i] = loadImage(imgName3);
  }

  for(let i = 0; i<4;i++){ //peobody_mad.length
  let imgName4 = "peacock_mad" + nf(i,1) +".png";
    peobody_mad[i] = loadImage(imgName4);
  }

  peobody_sad = loadImage("peacock_9_08_sad1.png");
  peobody_yel = loadImage("body_yel0.png");

  auxName[0] = "01_T_marimba_120bpm_DbMajoj_happy2.mp3";
  auxName[1] = "03_Twinkle_Twinkle_cello.mp3";
  auxName[2] = "07_sad.mp3";
  auxName[3] = "06_angry2.mp3";
  auxName[4] = "05_MozartTwinkle_pipa.mp3";
  auxName[5] = "06_MozartTwinkle_cla.mp3";

  for( let i = 0; i <6 ; i++){ //aux.length
    aux[i] = loadSound(auxName[i]);
  }
   au = aux[inst];


}

function setup() {

 createCanvas(n_width, n_height); // canv =   n_width, n_height
// canv.position(1920/5, 1080/5); // (1920/5, 1080/5)
  frameRate(10);
  colorMode(RGB);
  m =0;
  myColor = color(0);
  c1 = color(0);
  c2 = color(128);

  // au.play();
  fft = new p5.FFT();
  col = color(96,100,198);
  fcol = color(255,255,255);
//buttons
btn0 = createButton('마림바');
btn0.style('width', '100px');
btn0.style('height', '20px');
btn0.style('background-color', col);
btn0.style('border', '0px');
btn0.style('color', fcol);
btn0.position(50,700);
btn0.mousePressed(Marimba);

btn1 = createButton('첼로');
btn1.style('width', '100px');
btn1.style('height', '20px');
btn1.style('background-color', col);
btn1.style('border', '0px');
btn1.style('color', fcol);
btn1.position(200,700);
btn1.mousePressed(Cello);

btn2 = createButton('피아노');
btn2.style('width', '100px');
btn2.style('height', '20px');
btn2.style('background-color', col);
btn2.style('border', '0px');
btn2.style('color', fcol);
btn2.position(350,700);
btn2.mousePressed(Piano);

btn3 = createButton('신디사이저');
btn3.style('width', '100px');
btn3.style('height', '20px');
btn3.style('background-color', col);
btn3.style('border', '0px');
btn3.style('color', fcol);
btn3.position(500,700);
btn3.mousePressed(Synth);

btn4 = createButton('비파');
btn4.style('width', '100px');
btn4.style('height', '20px');
btn4.style('background-color', col);
btn4.style('border', '0px');
btn4.style('color', fcol);
btn4.position(650,700);
btn4.mousePressed(Pipa); //pipa

btn5 = createButton('클라리넷');
btn5.style('width', '100px');
btn5.style('height', '20px');
btn5.style('background-color', col);
btn5.style('border', '0px');
btn5.style('color', fcol);
btn5.position(800,700);
btn5.mousePressed(Cla); //cla
/*
  osc = new p5.Oscillator();

  // Instantiate the envelope
  envelope = new p5.Envelope();

  // set attackTime, decayTime, sustainRatio, releaseTime
  envelope.setADSR(0.001, 0.5, 0.1, 0.5);

  // set attackLevel, releaseLevel
  envelope.setRange(1, 0);

  osc.start();

  fft = new p5.FFT();
 noStroke();
 */
}

function draw() {

  background(0);

  myColor = lerpColor(c1,c2,m);
  m += (1-m)*0.1;

 curFrame0 = (curFrame0 + 1) % peo_0.length;
 curFrame = (curFrame + 1) % peo_1.length;
 curFrame2 = (curFrame2 + 1) % peo_2.length;
 curFrame3 = (curFrame3 + 1)  % peobody_blue.length;
 curFrame4 = (curFrame4 + 1) % peo_3.length;
 curFrame5 = (curFrame5 + 1) % peobody_mad.length;


 spectrum = fft.analyze();

colorMode(HSB);

  stroke(i, 255,255); //i
  fill(i, 255,255); //i

  push();

   beginShape();
   for( let j = 0; j<spectrum.length/num; j++){ // num 변수화 적을수록 가시 많아짐// fft.specSize()8
    stroke(j,255,255);
      let leng = random(0.1,1.1);
    strokeWeight(leng);
    let angle = map(j,0, 512, 0,360);
    let freqAmp =spectrum[j];
    let calFF =  freqAmp/1024*44100;// *44100;//
    let r = map(freqAmp, 0, 200,10, 200); //변수화 100 적을수록 많이 움직임
    //let r = map(freqAmp, 0, 100,10, 500);
    let x =  n_width /2+200 +r*cos(angle); // 변수화 2 + 값 50에서 커질수록 큰원
    let y = n_height /2-50 +r*sin(angle); //
    let rad = random(5,20);
//  console.log(freqAmp);
 // noFill();
//console.log(leng);

   line(n_width /2+200,n_height/2+50, x,y); // // 변수화 2 + 값 100에서 커질수록 큰원

  // curveVertex(x,y);
  // ellipse(x,y,rad,rad);

 if(inst == 3){
  radVal = rad;
}else{
  radVal = rad*0.6;
}
   Elipee(x,y,num, radVal);
   mElp(x,y,rad,rad);
   translate(n_width /2+500,n_height/2+50);
   rotate(-10);
   line(n_width /2+100,n_height /2+50, x,y);


   if(inst == 0) num = 6;

   else if(inst == 2) num = 9;
   else if(inst == 4) num = 8;
   //else if(inst == 5) num = 10;

   else num = 12;

 }
 endShape(CLOSE);
 pop();
 i++;
 if(i >= 255) i = 0;
//colorMode(RGB);
tint(myColor);
//console.log(myColor);

if(inst == 0){

  image(peo_3[curFrame4],-150,0);
  noTint();
  image(peobody_blue[curFrame3], 50,150);

//num = 8;
}else if( inst == 1 || inst == 4){

       image(peo_1[curFrame], -150, 0);
       noTint();
       if(inst == 4)  image(peobody_yel, 50,150);
       else image(peobody_blue[curFrame3], 50,150);
 //num = 16;
}else if(inst == 2){

    push();
    scale(0.7);
    image(peo_0[curFrame0], 350,370);
    pop();
    noTint();
    image(peobody_sad, 50,150);
  //num = 24;

}else if(inst == 5){

      push();
      scale(0.7);
         tint(147,20,200);
      image(peo_3[curFrame4], 80,150);
      pop();
      noTint();
       push();
       translate(width-100,0);
       scale(-1, 1);
      image(peobody_yel, 50,150);
       pop();
}else if(inst == 3 ){

   image(peo_2[curFrame2], -150,0);
   /*
   push();
  // tint(20,20,100);
   scale(0.8);
    image(peo_2[curFrame2], -40,100);
   pop();
   */
   push();
   scale(0.4);
   tint(47,200,80);
    image(peo_2[curFrame2], 480,700);
   pop();
   noTint();
  image(peobody_mad[curFrame5], 50,150);;
 //num = 12;
  }


  /*
au = aux[inst];
if (au.isPlaying()) {
    // .isPlaying() returns a boolean
    au.stop();
  } else {
   au.play();
 }
/*
  if (frameCount % 60 === 0 || frameCount === 1) {
    let midiValue = scaleArray[note];
    let freqValue = midiToFreq(midiValue);
    osc.freq(freqValue);

    envelope.play(osc, 0, 0.1);
    note = (note + 1) % scaleArray.length;
  }

  // plot FFT.analyze() frequency analysis on the canvas
  let spectrum = fft.analyze();
  for (let i = 0; i < spectrum.length / 20; i++) {
    fill(spectrum[i], spectrum[i] / 10, 0);
    let x = map(i, 0, spectrum.length / 20, 0, width);
    let h = map(spectrum[i], 0, 255, 0, height);
    rect(x, height, spectrum.length / 20, -h);
  }
  */


}

function Marimba(){
  colorMode(RGB);
  c1 = c2;
  c2 = color(246,147,156);
  if(!au.isPlaying())  {
    inst = 0;
    au = aux[inst];
    au.play();
  }else{
    au.pause();
  //  au.rewind();
  }

}

function Cello(){

  colorMode(RGB);
  c1 = c2;
 c2 = color(108,124,73);

  if(!au.isPlaying())  {
    inst = 1;
    au = aux[inst];
  au.play();
  }else{
    au.pause();
  //  au.rewind();
  }
}

function Piano(){

  colorMode(RGB);
  c1 = c2;
  c2 = color(59,83,94);

  if(!au.isPlaying())  {
  inst = 2;
  au = aux[inst];
  au.play();
  }else{
    au.pause();
  //  au.rewind();
  }
}

function Synth(){

  colorMode(RGB);
  c1 = c2;
  c2 = color(188,50,47); //188,50,47
  if(!au.isPlaying())  {
  inst = 3;
  au = aux[inst];
  au.play();
  }else{
    au.pause();
  //  au.rewind();
  }
}

function Pipa(){

  colorMode(RGB);
  c1 = c2;
  c2 = color(188,50,47); //188,50,47
  if(!au.isPlaying())  {
  inst = 4;
  au = aux[inst];
  au.play();
  }else{
    au.pause();
  //  au.rewind();
  }
}

function Cla(){

  colorMode(RGB);
  c1 = c2;
  c2 = color(188,50,47); //188,50,47
  if(!au.isPlaying())  {
  inst = 5;
  au = aux[inst];
  au.play();
  }else{
    au.pause();
  //  au.rewind();
  }
}

function mousePressed(){
// console.log("mouseP");
 if(j > 30) j = 0;
 j++;
for( let a=0; a<j;a++){
  noFill();
  stroke(random(58), random(158),random(255) );
  //noStroke();
  //fill(random(58), random(158),random(255),20 );
   ellipse(mouseX, mouseY, 8*a,8*a)
}
}

function mElp(xx, yy, rr){

  for(let i = 0; i <5; i++){
    ellipse(xx-i*rr/2, yy+i*rr/2, rr*0.25, rr*0.25);
  }

}

function Elipee(xxx, yyy, num, r){
  push();
  translate(xxx, yyy);
  beginShape();
       for(let i = 0; i<270; i+=num){ //6,8,9
         xx = r*cos(i);
         yy = r*sin(i);
         vertex(xx,yy);
        }
 //console.log(xx);
   endShape(CLOSE);
   pop();
}
