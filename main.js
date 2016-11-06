var bgImg = document.createElement("img");
bgImg.src = "images/map.png";
var eImg = document.createElement("img");
eImg.src = "images/rukia.gif";
var tImg = document.createElement("img");
tImg.src = "images/tower-btn.png";
var towerImg = document.createElement("img");
towerImg.src = "images/tower.png";
var crosshairImg = document.createElement("img");
crosshairImg.src = "images/crosshair.png";
var canvas = document.getElementById("game-canvas");
var hp = 100;
var money = 100;
var score = 0;
var ctx = canvas.getContext("2d");
var fps = 30;
var enemies = [];
var towers = [];
var clock = 0;
var enemyPath = [
  {x: 96, y: 64},
  {x: 384, y: 64},
  {x: 384, y: 192},
  {x: 224, y: 192},
  {x: 224, y: 320},
  {x: 544, y: 320},
  {x: 544, y: 96},  
];
function Enemy(){
  this.x = 96,
  this.y = 448,
  this.hp = 10,
  this.pathDes = 0,
  this.speedX = 0,
  this.speedY = -64,
  this.move = function(){
    if(isCollided(enemyPath[this.pathDes].x, enemyPath[this.pathDes].y, this.x, this.y, 64/fps, 64/fps)) {
      if(this.pathDes == enemyPath.length-1){
        this.hp = 0;
        hp -= 20;
        return;
      }
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
  if(hp == 0){
    ctx.font = "72px Arial";
    ctx.fillText("GAME OVER",150,200);
    ctx.font = "50px Arial";
    ctx.fillText("you got:",150,290);
    ctx.font = "50px Arial";
    ctx.fillText(score + " points",150,340);
    clearInterval(intervalId);
  }
  for(var i=0;i<towers.length;i++){
      ctx.drawImage(eImg,towers[i].x,towers[i].y);
  }
  ctx.fillStyle = "white";
  ctx.font = "24px Arial";
  ctx.fillText("HP:" + hp,10,30);
  ctx.fillText("Score:" + score,10,50);
  ctx.fillText("Money:" + money,10,70);
  if(isBuilding == true){
    ctx.drawImage(towerImg, cursor.x, cursor.y);  
  }
  clock++;
  if(clock%80 == 0){
    var newEnemy = new Enemy();
    enemies.push(newEnemy);
  }
  for(var i=0;i<enemies.length;i++){
    if(enemies[i].hp <= 0){
      score += 5;
      money += 20;
      enemies.splice(i,1);
    }else{
      enemies[i].move();
      ctx.drawImage(eImg,enemies[i].x,enemies[i].y);
    }
  }
  for(var i=0;i<towers.length;i++){
    towers[i].searchEnemy();
    if(towers[i].aimingEnemyId != null){
      var id = towers[i].aimingEnemyId;
      ctx.drawImage(crosshairImg, enemies[id].x, enemies[id].y);
    }
  }
}
var intervalId = setInterval(draw,1000/fps);

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

function Tower(){
  this.x = 0; 
  this.y = 0;
  this.range = 96;
  this.aimingEnemyId = null;
  this.fireRate = 0.3;
  this.readyToShootTime = 0.3;
  this.damage = 5;
  this.searchEnemy = function(){
    //減少距離下個射擊的時間
    this.readyToShootTime -= 1/fps;
    this.aimingEnemyId = null;
    for(i=0;i<enemies.length;i++){
      var distance = Math.sqrt(
        Math.pow(this.x - enemies[i].x,2) + Math.pow(this.y - enemies[i].y,2)
      );
      if(distance <= this.range){
        this.aimingEnemyId = i;
        if(this.readyToShootTime <= 0){
          this.shoot(this.aimingEnemyId);
          this.readyToShootTime = this.fireRate;
        }
        return;
      }
    }
  };
  this.shoot = function(id){
    ctx.beginPath();
    ctx.moveTo(this.x,this.y);
    ctx.lineTo(enemies[id].x, enemies[id].y);
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 3;
    ctx.stroke();
    enemies[id].hp -= this.damage;
  }
};
$("#game-canvas").on("click", function() {
  if(cursor.x >= 640-64 && cursor.y >= 480-64) {
    if(isBuilding == false) {
      isBuilding = true;
    } else {
      isBuilding = false;
    }
  } else {
    if(isBuilding == true) {
      if(money >= 50){
        var tower = new Tower();
        tower.x = cursor.x;
        tower.y = cursor.y;
        towers.push(tower);
        money -=10;
      }
      isBuilding = false;
    }
  }
})
