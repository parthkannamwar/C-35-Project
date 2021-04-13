var balloon,position,database;

var bg,balloonimg,balloonimg2;

function preload()
{
    bg=loadImage("cityImage.png");
    balloonimg=loadAnimation("hotairballoon3.png","hotairballoon2.png","hotairballoon1.png")
    balloonimg2=loadAnimation("hotairballoon3.png")
}

function setup(){
    createCanvas(1300,700);

    database=firebase.database();

    balloonpos=database.ref('balloon/position');
    balloonpos.on("value",readPosition);

    balloon = createSprite(250,200);
    balloon.addAnimation("hot air balloon",balloonimg);
}

function draw(){

    
    
    balloon.scale=balloon.y/1000+0.5;


    background(bg);
    if(position!==undefined)
    {
    if(keyDown(LEFT_ARROW)){
        writePosition(-10,0);
        balloon.changeAnimation("balloon",balloonimg);    
    }

    else if(keyDown(RIGHT_ARROW)){
        writePosition(10,0);
        balloon.changeAnimation("balloon",balloonimg);
    }

    else if(keyDown(UP_ARROW)){
        writePosition(0,-10);
        balloon.changeAnimation("balloon",balloonimg);
     }

    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+10);
        balloon.changeAnimation("balloon",balloonimg);
    }
    drawSprites();
    }


}



function readPosition(data)
{
    position=data.val();

    balloon.x=position.x
    balloon.y=position.y
}

function writePosition(x,y)
{
    database.ref('balloon/position').set(
                                        {
                                             x: position.x+x ,
                                             y: position.y+y
                                         });
}