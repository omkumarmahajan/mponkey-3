var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var score
var invisibleground;
var sprite1Image
var obstacle1;
var obstacle1Image;
var gameOverImg,restartImg;
var sun;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
 obstacleImage = loadImage("obstacle.png");
 sprite1Image = loadImage("sprite_1.png")
  obstacle1Image = loadImage("obstacle.png")
  gameOverImg = loadImage("gameOver-1.png")
  restartImg = loadImage ("restart-1.png")
  backgroundImg = loadImage("background.jpg")
  sunImg = loadImage("Om ha.png")
}



function setup() {
  createCanvas(windowWidth,windowHeight);

  sun = createSprite(width-5,100,10,10)
  sun.addImage("s",sunImg)
  sun.scale = 0.1;
  
  ground = createSprite(600,200,500,500);
  ground.addImage("ground",backgroundImg);
  ground.scale = 1.6;
  ground.x = ground.width /2;
  
  monkey = createSprite(100,height-100,20,50)
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.3;

 gameOver = createSprite(300,190,50,50)
  gameOver.addImage("go",gameOverImg) 
  gameOver.scale = 0.9

  restart= createSprite(300,300,50,50)
  restart.addImage("rs",restartImg)
  
  invisibleground = createSprite(600,500,1200,10)
  invisibleground.visible = false;
    foodGroup = createGroup();
   obstacleGroup = createGroup();
}
Time = 0;

function draw() {

  text("Survival Time :"+ Time,240,50);
  stroke = "red"
  if (gameState ===PLAY)
  {
    gameOver.visible = false;
    restart.visible = false;
    
    
     monkey.collide(invisibleground);
    
      ground.velocityX = -(4 + 6* Time/50000)
    
     if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
   Time = Time + Math.round(frameCount/60);
  
  if (touches.length >0 ||  keyDown("space"))
    {
     monkey.velocityY = -15;
     touches =[]
    }
    
    
    
    
        monkey.velocityY = monkey.velocityY + 0.8
    
  
   if (foodGroup.isTouching(monkey)) 
   {
     foodGroup.destroyEach()
   }
  
  if (obstacleGroup.isTouching(monkey))
{
  
   gameState = END;
  
}  
  banana()
 obstacle()
  } 
  if (gameState === END)
{
  gameOver.visible = true;
  restart.visible = true;    
   ground.velocityX = 0;
  monkey .velocityY = 0;
   obstacleGroup.setVelocityXEach(0)
  foodGroup.setVelocityXEach(0)
  
}  
  
  
  
  
  

  
  
  
   
  if(mousePressedOver(restart)) {
      reset();
    }

  
  
  
  
  drawSprites()
  
}

  function reset () {
gameState = PLAY;
Time = 0
gameOver.visible = false;
restart.visible = false;
 monkey.collide(invisibleground);
    
  }

function banana (){
if (frameCount % 120 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(80,80));
    banana.addImage(bananaImage );
    banana.scale = 0.2;
    banana.velocityX = -7;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
   foodGroup.add(banana)
}    
    
   
  }
  function obstacle(){
    if(frameCount % 300 === 0){
    var obstacle = createSprite(600,500,10,40)
  
 obstacle.addImage( obstacleImage)
  obstacle.scale = 0.4;
  obstacle.velocityX = -7;
      obstacle.lifetime = 200;
      obstacle.collide(invisibleground);
  
      banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
      
     
      
      obstacleGroup.add(obstacle)
      
      
       if(obstacle.isTouching(monkey))
      {
        obstacleGroup.velocityX = 0;
      }
      
      
    }
  }
