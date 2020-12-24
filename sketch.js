var dog, happyDog, database, foodS, foodStock;
var canvas,database;

function preload()
{
    dogImage = loadImage("images/dogImg.png");
    happydogImage = loadImage("images/dogImg1.png");
}

function setup()
{
    database = firebase.database();
    canvas = createCanvas(500,500);
    dog = createSprite(250,250,50,50);
    dog.addImage(dogImage);
    dog.scale = 0.1;
    foodStock = database.ref('Food');
    foodStock.on("value", readStock, showError);
}

function draw()
{
    background(46, 139, 87);

    if(keyWentDown(UP_ARROW))
    {
        writeStock(foodS);
        dog.addImage(happydogImage);
    }
    drawSprites();
    fill(0);
    stroke(4);
    textSize(20);
    text("Milk left:" + foodS,100,100);
    text("Press the up arrow key to feed Drago milk!!",100,200);
}

function readStock(data)
{
    foodS = data.val();
}

function writeStock(x)
{
    if(x<=0)
    {
        x = 0;
    }
    else
    {
        x--;
    }
    database.ref('/').update({
        Food: x
    });
}

function showError()
{
    console.log("Error in writing to database");
}