var tower,towerImage;
var door,doorImage,doorGroup;
var climber,climberImage,climberGroup;
var ghost,ghostImage,jumpImage;
var invisible,invisibleGroup;
var play;
var end ;
var gameState = "play";


function preload(){
  towerImage = loadImage("tower.png");
  doorImage = loadImage("door.png"); 
  climberImage = loadImage("climber.png");
  ghostImage= loadImage("ghost-standing.png");
  jumpImage = loadImage("ghost-jumping.png");
}
function setup(){
  createCanvas(600,600);
  
  tower = createSprite(300,300);
  tower.addImage(towerImage);
  tower.velocityY = 7;
  tower.y = tower.width/2;
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImage);
  ghost.scale = 0.4;
  
 
  doorGroup = new Group();
  climberGroup = new Group();
  invisibleGroup = new Group();
  
}
function draw(){
  background(0);
 if(gameState === "play"){
  if(tower.y>600){
    tower.y = tower.width/2;
  }
  if(keyDown("left_arrow")){
    ghost.x = ghost.x-4;
  }
  if(keyDown("right_arrow")){
    ghost.x = ghost.x+4;
  }
  if(keyDown("space")){
    ghost.addImage(jumpImage);
    ghost.velocityY = -5;
  }
  ghost.velocityY = ghost.velocityY+0.5;
  
  spawndoors();
  if(ghost.isTouching(invisibleGroup)){
    gameState = "end";
    ghost.destroy();
  }
 }
 if(gameState === "end"){
  ghost.velocityY = 0;
  tower.velocityY = 0;
  climberGroup.setVelocityYEach(0);
  doorGroup.setVelocityYEach(0);
  invisibleGroup.setVelocityYEach(0);
   
  climberGroup.setLifetimeEach(-1);
  doorGroup.setLifetimeEach(-1);
  invisibleGroup.setLifetimeEach(-1);
   
   
}

  drawSprites();
}

function spawndoors(){
  if(frameCount%100 === 0){
    door = createSprite(200,-50);
    door.x = Math.round(random(100,500));
    door.addImage(doorImage);
    door.velocityY = 3;
    door.lifetime = 300;
    doorGroup.add(door);
    
    ghost.depth = door.depth;
    ghost.depth = ghost.depth+1;
    
    climber = createSprite(200,10);
    climber.addImage(climberImage);
    climber.x = door.x;
    climber.velocityY = 3;
    climber.lifetime = 300;
    climberGroup.add(climber);
    
    invisible = createSprite(200,15);  
    invisible.width = climber.width;
    invisible.height = 3;
    invisible.x = climber.x;
    invisible.velocityY = 3;
    invisible.lifetime = 300;
    invisible.visible = false;
    invisibleGroup.add(invisible);
  }
}
