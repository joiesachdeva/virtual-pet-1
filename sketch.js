//Create variables here
var dog, happyDog, dogSprite;
var database;
var foodS, foodStock;

function preload()
{
  //load images here
  dog=loadImage("images/dogImg.png");
  happyDog=loadImage("images/dogImg1.png");
}

function setup() {
  database=firebase.database();

	createCanvas(500, 500);
  
  dogSprite= createSprite(250,390,20,20);
  dogSprite.addImage(dog);
  dogSprite.scale=0.3;

  

  foodStock=database.ref('food');
  foodStock.on("value",readStock);


}


function draw() {  
  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dogSprite.addImage(happyDog);
  }

  drawSprites();
  //add styles here
  textSize(30);
  fill("red");
  stroke("black");
  text("food remaining " +foodS,170,200);

}

function readStock(data){
  foodS=data.val();

}

function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }
  database.ref('/').update({
    food:x
  })
}


