var bgImg = document.createElement("img");
bgImg.src = "images/map.png";
var eImg = document.createElement("img");
eImg.src = "images/rukia.gif";
var tImg = document.createElement("img");
tImg.src = "images/tower-btn.png";
var towerImg = document.createElement("img");
towerImg.src = "images/tower.png";
var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");
var fps = 60;
var enemies = []
var clock = 0
var enemyPath = [
  {x: 96, y: 64},
  {x: 384, y: 64},
  {x: 384, y: 192},
  {x: 224, y: 192},
  {x: 224, y: 320},
  {x: 544, y: 320},
];
function Enemy(){
  this.x = 96,
  this.y = 448,
  this.pathDes = 0,
  this.speedX = 0,
  this.speedY = -64,
  this.move = function(){
    if(isCollided(enemyPath[this.pathDes].x, enemyPath[this.pathDes].y, this.x, this.y, 64/fps, 64/fps)) {
      this.x = enemyPath[this.pathDes].x;
      this.y = enemyPath[this.pathDes].y;
      
      if(this.x == enemyPath[this.pathDes+1].x) {
        if(this.y > enemyPath[this.pathDes+1].y) {
          this.speedY = -64;
          this.speedX = 0;
        } else {
          this.speedY = 64;
          this.speedX = 0;
        }
      } else if (this.y == enemyPath[this.pathDes+1].y) {
        if(this.x > enemyPath[this.pathDes+1].x) {
          this.speedY = 0;
          this.speedX = -64;
        } else {
          this.speedY = 0;
          this.speedX = 64;
        }
      }
      
      this.pathDes += 1;
      
    } else {
      this.x += this.speedX/fps;
      this.y += this.speedY/fps;
    }
  }
};
var cursor = {x: 0, y: 0};
var isBuilding = false;

function isCollided(pointX, pointY, targetX, targetY, targetWidth, targetHeight){
  if(pointX >= targetX && pointX <= targetX + targetWidth && pointY >= targetY && pointY <= targetY + targetHeight) {
    return true;
  } else {
    return false;
  }
}

function draw(){
  ctx.drawImage(bgImg,0,0);
  ctx.drawImage(tImg,640-64,480-64,64,64);
  ctx.drawImage(towerImg, tower.x, tower.y);
  if(isBuilding == true) {
    ctx.drawImage(towerImg, cursor.x, cursor.y);  
  }
  clock++;
  if(clock%80 == 0){
    var newEnemy = new Enemy();
    emenies.push(newEnemy);
  }
  for(var i=0;i<enemies.length;i++){
    enemies[i].move;
    ctx.drawImage(eImg,enemies[i].x,enemies[i].y);
  }
}
setInterval(draw,1000/fps);
$("body").on("keypress",key);
function key(event){
  console.log(event.which)
  if(event.which === 119){
    enemy.y -= enemy.v[1]
    enemy.v[1] *= 1.1
  }
  if(event.which === 115){
    enemy.y += enemy.v[1]
    enemy.v[1] *= 1.1
  }
  if(event.which === 100){
    enemy.x += enemy.v[0]
    enemy.v[0] *= 1.1
  }
  if(event.which === 97){
    enemy.x -= enemy.v[0]
    enemy.v[0] *= 1.1
  }
}

$("#game-canvas").on("mousemove", function(event) {
  cursor.x = event.offsetX - (event.offsetX%32);
  cursor.y = event.offsetY - (event.offsetY%32);
});

var tower = {x:0, y:0};
$("#game-canvas").on("click", function() {
  if(cursor.x >= 640-64 && cursor.y >= 480-64) {
    if(isBuilding == false) {
      isBuilding = true;
    } else {
      isBuilding = false;
    }
  } else {
    if(isBuilding == true) {
      tower.x = cursor.x;
      tower.y = cursor.y;
      
      isBuilding = false;
    }
  }
})
