var bgImg = document.createElement("img");
bgImg.src = "images/map.png";
var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");
var enemyImg = document.createElement("img");
enemImg.src = "images/slime.gif"
function draw(){
  //將背景圖片畫在canvus上的(0,0)位置
  ctx.drawImage(bgImg,0,0);
  //
  ctx.drawImage(enemyImg,0,0)
  
}
//等待1000毫秒再執行draw函式
setTimeoutdraw(draw,1000);
