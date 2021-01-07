var stars = [];
var canvas = document.getElementById("canvas");
canvas1 = document.getElementById("canvas1");
var ctx = canvas.getContext("2d");
var ctx1 = canvas1.getContext("2d");
var cwidth, cheight;
var randomTime = 0;
var yArray = [];
var sum = 0;
var temp = 0;
var diff = 0;
window.onresize = function(){
  reset();
  insertStars();
}
reset();
function reset(){
  cwidth = window.innerWidth;
  cheight = window.innerHeight;
  canvas.width = cwidth;
  canvas.height = cheight;
  canvas1.width = cwidth;
  canvas1.height = cheight;
}
function newStar(){
  var star = {};
  star.x = Math.random()*cwidth;
  star.y = (Math.random()*cheight*0.5);
  star.radius = (Math.random()*1.5+0.3);
  stars.push(star);
}
function insertStars(){
  stars = [];
  for(let i = 0;i< 250;i++)
  {
    newStar();
  }
  for(let ix in stars){
    var star = stars[ix];
    ctx.beginPath();
    ctx.arc(star.x,star.y,star.radius,0,Math.PI*2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
  }
}
insertStars();
randomTime = 1000;
var starTiming = setInterval(fallingStar,randomTime);
var fStar = {};
var requestId;
var left = 0;
var yPos = 0;
var dt = 0;
function fallingStar(){
  left = (Math.random() > 0.5);
  fStar.x = Math.random()*cwidth;
  dt = (fStar.x>cwidth/2) ? -1 : 1;
  yPos = Math.random() > 0.5;
  fStar.y = cheight/2*(yPos);
  temp = fStar.y;
  fStar.radius = Math.random()*1.8+0.3;
  ctx1.beginPath();
  ctx1.arc(fStar.x,fStar.y,fStar.radius,0,Math.PI*2);
  ctx1.fillStyle = "#ffffff";
  ctx1.fill();
  animate();
  sum = 0;
  diff = 0;
  clearInterval(starTiming);
  randomTime = Math.random()*4000+4000;
  starTiming = setInterval(fallingStar,randomTime);
}
function animate(){
  requestId = window.requestAnimationFrame(animate);
  fStar.x += 3*dt;
  if(yPos)
  {
    fStar.y -= Math.pow((fStar.x*3/cwidth),2);
  }
  else{
    fStar.y += Math.pow((fStar.x*3/cwidth),2);
  }

  diff = Math.abs(fStar.y - temp);
  diff = diff/fStar.y;
  yArray.push(diff);

  temp = fStar.y;

  if(yArray.length > 5){
    yArray.pop();
  }
  if(yArray.length >= 5)
  {
    for(let i = 0;i<yArray.length;i++)
    {
      sum += yArray[i];
    }
  }
    if(dt > 0)
    {
      if(!yPos)
      {
        ctx1.clearRect(0,0,fStar.x-20,fStar.y-20);
      }
      else{
        ctx1.clearRect(0,0,fStar.x-20,cheight);
      }
    }
    else{
      if(yPos)
      {
        ctx1.clearRect(fStar.x+30,0,cwidth - fStar.x - 30,cheight);
      }
      else{
        ctx1.clearRect(fStar.x+30,0,cwidth-fStar.x-30,cheight);
      }
    }

  ctx1.beginPath();
  ctx1.arc(fStar.x,fStar.y,fStar.radius,0,Math.PI*2);
  ctx1.fillStyle = "#ffffff";
  ctx1.fill();
  if((fStar.y > cheight/2) || (fStar.y < 0) || (fStar.x > cwidth) || (fStar.x < 0)){
    window.cancelAnimationFrame(requestId);
    ctx1.clearRect(0,0,cwidth,cheight)
    ctx1.fillStyle = "#000000";
    ctx1.fill();
  }
}
