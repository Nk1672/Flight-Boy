var  boy, backgroundIMG, ground, boyIMG, back,roof,obstaclesGroup,gameState, bombGroup, i,count,ground2;
var gameOver, gameOverIMG,restart,restartIMG,obstacleIMG, bombIMG, explosionIMG, explosion;

var victory,victoryImg;

function preload() {
    backgroundIMG=loadImage("background2.png");
    boyIMG=loadAnimation("boy1.png", "boy2.png", "boy4.png", "boy5.png", "boy6.png", "boy7.png", "boy8.png", "boy9.png", "boy10.png", "boy11.png", "boy12.png");
    gameOverIMG=loadImage("game.png");
    restartIMG=loadImage("rest.png");
    obstacleIMG=loadImage("spike.png");
    bombIMG=loadImage("bomb.png");
    explosionIMG=loadAnimation("explosion1.png", "explosion2.png", "explosion3.png", "explosion4.png", "explosion5.png", "explosion6.png", 
    "explosion7.png", "explosion8.png", "explosion9.png", "explosion10.png", "explosion11.png", "explosion12.png", "explosion13.png", 
    "explosion14.png", "explosion15.png", "explosion16.png", "explosion17.png", "explosion18.png", "explosion19.png", "explosion20.png",
    "explosion21.png", "explosion22.png", "explosion23.png", "explosion24.png", "explosion25.png"); 
  
  victoryImg=loadImage("victory.png"); 
}

function setup(){
    createCanvas(windowWidth,windowHeight)
    back=createSprite(100,450,windowWidth,windowHeight)
    boy=createSprite(50, height-200,10,10)
    boy.scale=0.25
    boy.addAnimation("boy",boyIMG)
    back.addImage(backgroundIMG)
    back.scale = width/270
    
    ground= createSprite(750, height-10, width, 10);
    ground2= createSprite(750, height-10, width, 10);
    ground2.visible=false;
    ground2.shapeColor="white"
    ground.visible=true;
    roof = createSprite(width/2,0,width,10)
    gameOver=createSprite(width/2,height/2 -100,10,10);
    gameOver.addImage(gameOverIMG)
    gameOver.visible=false
    gameOver.scale=1
    victory=createSprite(width/2,height/2 -100,10,10)
    victory.addImage(victoryImg);
    victory.visible=false
    restart=createSprite(width/2, height/2, 10,10)
    restart.addImage(restartIMG)
    restart.visible=false
    restart.scale=0.6
    restart.debug=true
    obstaclesGroup=new Group();
    bombGroup=new Group();
    explosionGroup=new Group();
    count=0
    gameState=0
}

function draw(){
    //background(backgroundIMG)

    if(gameState==0){
        i=0
        count = count + round(getFrameRate()/60 );
        boy.visible=true;
        ground.velocityX=3
        ground.visible=false;
        ground.x=ground.width/2
        ground2.x=ground2.width/2
        ground2.velocityX=3
        
        back.velocityX=-10
        if(back.x<100){
          back.x=back.width + back.width/10
        }
        
        console.log(back.x);
        
        if(keyDown(UP_ARROW)){
            boy.velocityY=-20
        }

        boy.velocityY=boy.velocityY+0.8
        boy.collide(ground);
        boy.bounceOff(roof);
        
        spawnObstacles();
        spawnBombs();

        
        if(boy.isTouching(bombGroup)){
            gameState=2
        }

        if(obstaclesGroup.isTouching(boy)){
            gameState=1
        }

        if(count > 2000 && count<3000){
            var number = random(1,10);
            if(number==5){
                //floor is lava text here
                console.log(number)
                if(boy.isTouching(ground2)){
                    console.log(gameState)
                    gameState=1
                }
            }
        }

        

    
    if(gameState==1){
        
        obstaclesGroup.setVelocityXEach(0);
        bombGroup.setVelocityXEach(0);
        boy.velocityY=0;
        back.velocityX=0
        ground.velocityX=0
        restart.visible=true
        gameOver.visible=true
        restart.debug=false
            
    }

    


    if(gameState==2){
        obstaclesGroup.setVelocityXEach(0);
        bombGroup.destroyEach();
        explosion();
        boy.velocityY=0;
        boy.visible=false
        back.velocityX=0
        ground.velocityX=0
        restart.visible=true
        gameOver.visible=true
    }



    if(count>=1000 && count<2000){
        obstaclesGroup.setVelocityXEach(-8)
        bombGroup.setVelocityXEach(-10)
    }

    if(count>=2000 && count<3000){
        obstaclesGroup.setVelocityXEach(-10)
        bombGroup.setVelocityXEach(-12)
    }

    if(count>=3000 && count <4000){
        obstaclesGroup.setVelocityXEach(-12)
        bombGroup.setVelocityXEach(-14)
    }

    if(count>=4000 && count<5000){
        obstaclesGroup.setVelocityXEach(-20)
        bombGroup.setVelocityXEach(-20)
    }
      
    if(count>=5000){
        gameState=3
    
    }
    
    if(gameState==3){
        obstaclesGroup.destroyEach();
        bombGroup.destroyEach();
        boy.velocityY=0;
        back.velocityX=0
        ground.velocityX=0
        victory.visible=true
    }
      
    
      

    drawSprites();
    
    
    
    fill("red");
    textSize(50)
    textFont("Impact")
    text("Score: "+count,30, 50)
}
  
  
  if(mousePressedOver(restart)){
      reset();
    }
  

  
  
}



function spawnObstacles(){
    if(frameCount % 80 === 0){
        var obstacle=createSprite(width, height-100,20,20)
        obstacle.addImage(obstacleIMG)
        obstacle.scale=0.3
        obstacle.velocityX=-4
        var position=Math.round(random(1,2))
        if(position==1){
            obstacle.y=boy.y-Math.round(random(10,20))
        }
        if(position==2){
            obstacle.y=boy.y+Math.round(random(10,20))
        }
        obstaclesGroup.add(obstacle);
    }

    
}

function spawnBombs(){
    if(frameCount % 250 === 0){
        var bomb = createSprite(width,height/2,50,50)
        bomb.addImage(bombIMG)
        bomb.scale=0.4;
        bomb.velocityX= -6
        bomb.setCollider("circle",10,10,100)
        bombGroup.add(bomb);
    }
}

function explosion(){
  var explosion=createSprite(10,10,10,10)
  explosion.addAnimation("explosion" ,explosionIMG)
  explosion.scale=1.5
  explosion.x=boy.x+10
  explosion.y=boy.y-60
  explosionGroup.add(explosion);
  
}

function reset(){
    gameOver.visible=false
    restart.visible=false;
    gameState=0;
    bombGroup.destroyEach();
    obstaclesGroup.destroyEach();
    explosionGroup.destroyEach();
    count=0;
}

