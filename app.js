var stars = [];
var canvas = document.getElementById("canvas");
canvas1 = document.getElementById("canvas1");
var ctx = canvas.getContext("2d");
var ctx1 = canvas1.getContext("2d");
var cwidth, cheight;
var randomTime = 0;
var opacity = 1;
var grd = ctx.createLinearGradient(0,0,0,canvas.height);
window.onresize = function(){
  reset();
  insertStars();
  animate();
}
reset();
function reset(){
  cwidth = window.innerWidth;
  cheight = window.innerHeight;
  canvas.width = cwidth;
  canvas.height = cheight;
  canvas1.width = cwidth;
  canvas1.height = cheight;
  grd = ctx1.createLinearGradient(0,0,0,canvas.height);
  grd.addColorStop(0, "rgba(0,0,0,1)");
  grd.addColorStop(0.25, "rgba(37, 24, 0,1)");
  grd.addColorStop(0.5, "rgba(94, 63, 0,1)");
  grd.addColorStop(0.75, "rgba(166, 108, 1,1)");
  ctx1.fillStyle = grd;
  ctx1.fillRect(0, 0, canvas.width, canvas.height);
}
function newStar(){
  var star = {};
  star.x = Math.random()*cwidth;
  star.y = (Math.random()*cheight*0.8);
  star.radius = (Math.random()*1.5+0.3);
  stars.push(star);
}
function insertStars(){
  stars = [];
  for(let i = 0;i< 350;i++)
  {
    newStar();
  }
  for(let ix in stars){
    var star = stars[ix];
    if(star.y < cheight/2)
    {
      ctx.beginPath();
      ctx.arc(star.x,star.y,star.radius,0,Math.PI*2);
      ctx.fillStyle = "#ffffff";
      ctx.fill();
      ctx.closePath();
    }
    else{
      ctx.beginPath();
      ctx.arc(star.x,star.y,star.radius,0,Math.PI*2);
      opacity = 0.1*(cheight/2)/(star.y - cheight/2);
      ctx.fillStyle = `rgba(255,255,255,${opacity})`;
      ctx.fill();
      ctx.closePath();
    }
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
  fStar.y = cheight*(yPos);
  fStar.radius = Math.random()*1.8+0.3;
  ctx1.beginPath();
  ctx1.arc(fStar.x,fStar.y,fStar.radius,0,Math.PI*2);
  ctx1.fillStyle = "#ffffff";
  ctx1.fill();
  ctx1.closePath();
  animate();
  clearInterval(starTiming);
  randomTime = Math.random()*5000+5000;
  starTiming = setInterval(fallingStar,randomTime);
}
function animate(){
  requestId = window.requestAnimationFrame(animate);
  grd = ctx1.createLinearGradient(0,0,0,canvas.height);
  grd.addColorStop(0, "rgba(0,0,0,0.12)");
  grd.addColorStop(0.25, "rgba(37, 24, 0,0.12)");
  grd.addColorStop(0.5, "rgba(94, 63, 0,0.12)");
  grd.addColorStop(0.75, "rgba(166, 108, 1,0.2)");
  ctx1.fillStyle = grd;
  ctx1.fillRect(0, 0, canvas.width, canvas.height);
  fStar.x += 3*dt;
  if(yPos)
  {
    fStar.y -= Math.pow((fStar.x*2/cwidth),2);
  }
  else{
    fStar.y += Math.pow((fStar.x*2/cwidth),2);
  }

  if(fStar.y < cheight/2)
  {
    ctx1.beginPath();
    ctx1.arc(fStar.x,fStar.y,fStar.radius,0,Math.PI*2);
    ctx1.fillStyle = "#ffffff";
    ctx1.fill();
    ctx1.closePath();
  }
  else
  {
    ctx1.beginPath();
    ctx1.arc(fStar.x,fStar.y,fStar.radius,0,Math.PI*2);
    opacity = 0.1*cheight*0.5/(fStar.y - cheight/2);
    ctx1.fillStyle = `rgba(255,255,255,${opacity})`;
    ctx1.fill();
    ctx1.closePath();
  }
  if((fStar.y > (cheight)+30) || (fStar.y < -30) || (fStar.x > cwidth+30) || (fStar.x < -30)){
    window.cancelAnimationFrame(requestId);
  }
}
