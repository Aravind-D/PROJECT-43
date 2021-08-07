
var backImage,backgr,backImage2;
var player, player_running;
var ground,ground_img;

var FoodGroup, bananaImage;
var obstaclesGroup, obstacle_img;

var gameOver,over;
var score=0;
var PLAY = 1;
var END =0;
var gameState = PLAY

var count =0;
function preload(){
  backImage=loadImage("jungle2.jpg");
  backImage2=loadImage("jungle3.jpg");

  player_running = loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png");
  
  gameOver = loadImage("gameOver.png");
  
  bananaImage = loadImage("banana.png");
  obstacle_img = loadImage("obstacle.png"); 
  
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400); 
  backgr.addImage("bg",backImage);
  
  backgr.addImage("bg1",backImage2);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);

  ground.x=ground.width/2;
  ground.visible=false;
  
  over = createSprite(350,200,10,10);
  over.addImage(gameOver);
  over.scale = 0.4;
  FoodGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  
  background(255);
  
    if(gameState ===PLAY){
      over.visible = false;

      backgr.velocityX=-4;
      
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
    for(var i = 0 ; i < FoodGroup.length ; i++){
    if(FoodGroup.isTouching(player)){
      FoodGroup.get(i).destroy();
    score = score + 2;
    }
    }
    switch(score){
        case 10: player.scale=0.12;
                break;
        case 20: player.scale=0.14;
                break;
        case 30: player.scale=0.16;
                break;
        case 40: player.scale=0.18;
                break;
        default: break;
    }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    
    spawnFood();
    spawnObstacles();
 
    if(obstaclesGroup.isTouching(player)){ 
        player.scale=0.08;
       count =count+1;
        
       }
       if (count >2){
        gameState = END;
      }
      
      if(frameCount >100){
        backgr.changeImage("bg1",backImage2);
      }
    }
  else if(gameState === END){
     
    backgr.velocityX=0;
    
    over.visible = true;
    
     obstaclesGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1)
    
   obstaclesGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    
  }
  player.collide(ground);
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);
}

function spawnFood() {

  if (frameCount % 80 === 0) {
    var banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -5;

    banana.lifetime = 300;
    player.depth = banana.depth + 1;
    
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 80 === 0) {
    var obstacle = createSprite(800,350,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacle_img);
    
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;

    obstaclesGroup.add(obstacle);
  }
}


  
