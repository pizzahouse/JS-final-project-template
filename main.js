var bgImg = document.creatElement("img");
bgImg.src = "images/map.png";
var canvus = document.getElementById("game-canvus");
var ctx = canvus.getContext("2d");
function(){
  //將背景圖片畫在canvus上的(0,0)位置
  ctx.drawImage(bgImg,0,0);
}
//等待1000毫秒再執行draw函式
setTimeoutdraw(draw,1000);
