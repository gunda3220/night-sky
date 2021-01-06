// var c = document.getElementById("canvas");
// var ctx = c.getContext("2d");
// var cwidth, cheight;
// var shells = [];
// window.onresize = function(){
//   reset();
// }
// reset();
// function reset(){
//   cwidth = window.innerWidth;
//   cheight = window.innerHeight;
//   c.width = cwidth;
//   c.height = cheight;
// }
// function newShell(){
//   var left = (Math.random() > 0.5);
//   var shell = {};
//   shell.x = (1*left);
//   shell.y = 0.3;
//   shell.xoff = (0.01+Math.random()*0.007)*(left ? 1:-1);
//   shell.yoff = 0.01+ Math.random()*0.007;
//   shell.size = Math.random()*6 + 3;
//   shell.color = '#ffffff';
//   shells.push(shell);
// }
// var lastRun = 0;
// Run();
// function Run(){
//   var dt = 1;
//   if(lastRun != 0)
//   {
//     dt = Math.min(50,(performance.now()-lastRun));
//   }
//   lastRun = performance.now();
//   ctx.fillStyle = "rgba(0,0,0,0.25)";
//   ctx.fillRect(0,0,cwidth,cheight);
//   if((shells.length < 10) && (Math.random() > 0.9))
//   {
//     console.log("inside new shell");
//     newShell();
//   }
//   for (let ix in shells)
//   {
//     var shell = shells[ix];
//     ctx.beginPath();
//     ctx.arc(shell.x*cwidth,shell.y*cheight,shell.size,0,2*Math.PI);
//     ctx.fillStyle = shell.color;
//     ctx.fill();
//     shell.x -=shell.xoff;
//     shell.y -= shell.yoff;
//     shell.xoff -= (shell.xoff*dt*0.001);
//     shell.yoff -= ((shell.yoff+0.2)*dt*0.00005);
//     if(shell.yoff < -0.005){
//       // newPass(shell);
//       shells.splice(ix,1);
//     }
//   }
//   // for(let ix in pass){
//   //   var pas = pass[ix];
//   //   ctx.beginPath();
//   //   ctx.arc(pas.x,pas.y,pas.size,0,2*Math.PI);
//   //   ctx.fillStyle = pas.color;
//   //   ctx.fill();
//   //   pas.x -= pas.xoff;
//   //   pas.y -= pas.yoff;
//   //   pas.xoff -= (pas.xoff*dt*0.001);
//   //   pas.yoff -= ((pas.yoff + 5)*dt*0.005);
//   //   pas.size -= (dt*0.002*Math.random())
//   //   if((pas.y > cheight) || (pas.y < -50) || (pas.size <= 0)){
//   //     pass.splice(ix,1);
//   //   }
//   // }
//   requestAnimationFrame(Run);
// }
var stars = [];
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
var cwidth, cheight;
window.onresize = function(){
  reset();
}
reset();
function reset(){
  cwidth = window.innerWidth;
  cheight = window.innerHeight;
  c.width = cwidth;
  c.height = cheight;
}
function newStar(){
  var star = {};
  star.x = Math.random()*cwidth;
  star.y = (Math.random()*cheight*0.5);
  star.size = (Math.random()*6+3);
  star.color = '#ffffff';
  stars.push(star);
}
for(let i = 0;i< 120;i++)
{
  newStar();
}
for(let ix in stars){
  var star = stars[ix];
  ctx.moveTo(star.x,star.y);
  ctx.lineTo(star.x+1, star.y+1);
  console.log(star.x+","+star.y);
  ctx.fillStyle = star.color;
  ctx.strokeStyle = "white";
  // ctx.stroke();
  ctx.fill();
}
