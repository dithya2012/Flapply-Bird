var flippyImg,flippy,bgImg,bg,topPipeImg,bottomPipeImg,topPipe,bottomPipe,fakeGround , pipesGroup,gameover,gameoverImg,coinsImg,coins
var gamestate= "intro"
var coinGroup,coins
var score=0
function preload(){
    flippyImg=loadImage("assets/flippy.png");
    bgImg = loadImage("assets/bgflappy.webp");
    topPipeImg = loadImage("assets/toppipes.png");
    bottomPipeImg = loadImage("assets/bottomPipes.png");
    gameoverImg = loadImage("assets/flappyBirdGameOver.png");
    coinsImg = loadImage("assets/coins.png");
}
function setup(){
    createCanvas(1000,700);
    bg=createSprite(250,350);
    bg.addImage(bgImg);
   

    flippy=createSprite(350,350);
    flippy.debug = false
    flippy.setCollider("circle", 0,0,160)
    flippy.addImage(flippyImg);
    flippy.scale=0.2;
    


    fakeGround=createSprite(500,640,1000,10);
    fakeGround.visible=false;

    pipesGroup = createGroup();
    gameover =createSprite(500,350)
    gameover.addImage(gameoverImg);
    gameover.scale=0.4;
    coinGroup = createGroup();


   
}
function draw(){
    background("black");

    drawSprites(); 
    textSize(24) 
    fill("blue")

    text("COINS : " + score,20,40)

    if (gamestate=="intro"){
        flippy.y=350;
        flippy.velocityY=0;
        gameover.visible = false
        
        if(keyDown("space")){
            gamestate="play"
        }
    }
    
    if(gamestate=="play"){
        gameover.visible = false
        if(keyDown("space")){   
            flippy.velocityY=-5;
        }
        pipes();
        flippy.velocityY=flippy.velocityY+0.4;
        if(flippy.collide(fakeGround) || flippy.isTouching(pipesGroup) ){
            gamestate = "end"
        }
        coin();      
        
        for(var i = 0; i<coinGroup.length; i=i+1){
            if(flippy.isTouching(coinGroup[i])){
                coinGroup[i].destroy();
                score=score+2;
                
            }
            
        }

        

       
        

       
    }
    if(gamestate=="end"){
        gameover.visible = true;
        coinGroup.setVelocityXEach(0);
        flippy.velocityY=0;
        pipesGroup.setVelocityXEach(0); 
        coinGroup.destroyEach();

        textSize(35)
        fill("red")
        text("Press space to play again!", 300,440)
        if(keyDown("space")){
            gamestate="intro"
            pipesGroup.destroyEach()
            
            score=0;


       }
       
    }
    
    
    
    
    

     
}

function pipes(){
    if(frameCount%100==0){
        topPipe = createSprite(1000,random(-30,150))
        topPipe.addImage(topPipeImg);
        topPipe.scale=3.5
        topPipe.velocityX=-(6+score/10);
        pipesGroup.add(topPipe)
        bottomPipe = createSprite(1000,topPipe.y+550)
        bottomPipe.addImage(bottomPipeImg);
        bottomPipe.scale=3.5
        bottomPipe.velocityX=-(6+score/10);
        pipesGroup.add(bottomPipe)
       
        console.log(bottomPipe.velocityX)
    }
}
function coin(){
   
    if(frameCount%100==0){
        coins=createSprite(1000,topPipe.y+250)
        coins2=createSprite(1300,random(100,500))
        coins2.addImage(coinsImg);
        coin.scale=0.7;
        coins2.scale=0.7;
        coins2.velocityX=-(6+score/10);
        coinGroup.add(coins2);
        coins.addImage(coinsImg);
        coins.velocityX=-(6+score/10);
        coinGroup.add(coins);
        coins.setCollider("circle",40,40,40)
        coins2.setCollider("circle",40,40,40)
        

    }
    

}


// Assignment : make coins appear randomly on screen(mostly between pipes).
// add score when you collect coin everytime. 
