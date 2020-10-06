   var monkey, monkey_running;

  var banana, bananaImage, obstacle,                 obstacleImage;

  var foodGroup, obstaclesGroup;
  var score;
  var survivalTime = 0;
  var ground;
  var score;


  function preload() {

    monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

    bananaImage = loadImage("banana.png");
    obstacleImage = loadImage("obstacle.png");

  }



  function setup() {
    createCanvas(650, 400);

    //Creating monkey
    monkey = createSprite(100, 315, 20, 20);
    monkey.addAnimation("moving", monkey_running);
    monkey.scale = 0.1;

    //Creating ground
    ground = createSprite(100, 360, 1000, 50);
    ground.velocityX = -7;
    ground.x = ground.width / 2;
    ground.shapeColor = "rgb(139, 69, 19)"

    //Creating groups for obstcles & food
    obstaclesGroup = new Group();
    foodGroup = new Group();


    survivalTime = 0;
    monkey.setCollider("rectangle", 1, 0,1,monkey.hieght);
    monkey.debug = false;
    
    survivalTime = 0;
    score = 0;

  }


  function draw() {

    background("White")
    //Scoring system
    stroke("pink");
    textSize(20);
    strokeWeight(2)
    fill("red")
    text("Survival Time : " + survivalTime, 200, 50);
    if (frameCount % 20 === 0) {
      survivalTime = survivalTime + 1;
    }
    
    
    
     text("Score : " + score, 390, 50);

    //moving ground
    if (ground.x < 150) {
      ground.x = ground.width / 2;
    }

    //jump when the space key is pressed
    if (keyDown("space")&& monkey.y >= 304 ) {
      monkey.velocityY = -20;
     }
    
    console.log(monkey.y)
    
    //add gravity to the ground
       monkey.velocityY = monkey.velocityY + 0.9;

    
    //Destroy bananas
    if (foodGroup.isTouching(monkey)){
      foodGroup.destroyEach();
      score = score+2;
      
      
    }

    food();
    obstacles();
monkey.collide(ground); 
     
    if(obstaclesGroup.isTouching(monkey)){
        ground.velocityX = 0;
        monkey.velocityY = 0;
        obstaclesGroup.setVelocityXEach(0);
        foodGroup.setVelocityXEach(0);
        obstaclesGroup.setLifetimeEach(-1);
        foodGroup.setLifetimeEach(-1);
        text("GameOver", 200,200);
        survivaltime =0

    
    
    }
    drawSprites();
  }

  //function food
  function food() {
    if (frameCount % 150 === 0) {
      banana = createSprite(600, 600, 10, 10);
      banana.y = Math.round(random(120, 100));
      banana.addImage(bananaImage);
      banana.scale = 0.1;
      banana.velocityX = ground.velocityX;
      banana.lifetime = 300;
      foodGroup.add(banana);
    }

  }

  //function obstacles
  function obstacles() {
    if (frameCount % 150 === 0) {
      obstacle = createSprite(600, 325, 10, 40);
      obstacle.velocityX = banana.velocityX;
      obstacle.addImage(obstacleImage);
      obstacle.scale = 0.2;
      obstacle.lifetime = 300;
      obstaclesGroup.add(obstacle);
    }

  }