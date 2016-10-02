var FPS = 60;
var bgImg = document.createElement("img");
bgImg.src = "images/map.png";
var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");
var enemyImg = document.createElement("img");
enemyImg.src = "images/slime.gif"
var tower_btn_Img = document.createElement("img");
tower_btn_Img.src = "images/tower-btn.png"
var towerImg = document.createElement("img");
towerImg.src = "images/tower.png"
//防禦塔跟著滑鼠游標(移動時有一格一格的感覺)
var cursor = {x:0,y:0}
$("#game-canvas").on("mousemove",function(event){
  cursor.x = event.offsetX - (event.offsetX%32);
  cursor.y = event.offsetY - (event.offsetY%32);
});
//在建造塔的圖示範圍內點才算然後蓋防禦塔
var isBuilding = false;
var tower = {x:0,y:0};
$("#game-canvas").on("click",function(){
  if(cursor.x >= 640-64 && cursor.y >= 480-64){
    if(isBuilding == false){
      isBuiling = true;
    }else{
      isBuilding = false;
    }
  }else{
    if(isBuilding == true){
      tower.x = cursor.x;
      tower.y = cursor.y;
    }
  }
});
//畫上去
function draw(){
  //將背景圖片畫在canvus上的(0,0)位置
  ctx.drawImage(bgImg,0,0);
  //
  ctx.drawImage(enemyImg,enemy.x,enemy.y);
  //建造塔放右下角
  ctx.drawImage(tower_btn_Img,640-64,480-64,64,64);
  //
  ctx.drawImage(towerImg,tower.x,tower.y);
  //
  if(isBuilding = true){
    ctx.drawImage(towerImg,cursor.x,cursor.y);    
  }
  //
  enemy.move();
}
//等待16毫秒再執行draw函式(重複畫)
setInterval(draw,1000/FPS);
var enemy = {
  x:96,
  y:448,
  speedX:0,
  speedY:-64,
  if(pathDes == 1){
    speedX = 64;
    speedY = 0;
  }
  //pathDes為設定路徑點編號
  pathDes:0,
  move:function(){
    this.x = this.x + this.speedX/FPS;
    this.y = this.y + this.speedY/FPS;
  }
};
//轉彎路徑點
var enemyPath = [
  {x:96, y:64},
  {x:384, y:64},
  {x:384, y:192},
  {x:224, y:192},
  {x:224, y:320},
  {x:544, y:320},
];
//判斷是否在路徑點附近
function iscollided(pointX,pointY,targetX,targetY,targetWidth,targetHeight){
  if(pointX >= pointY && pointX <= pointY + targetWidth && pointY <= targetY + targetHeight){
    return true;
  }else{
    return false;
  }
}














