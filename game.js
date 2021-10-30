let buttonColors = ["green", "red", "yellow", "blue"];

var gamePattern = [];

var userPattern = [];

var isStart = false;

var level = 0;

var wrongSound = new Audio("sounds/wrong.mp3");

const startgame = () => {
    if (isStart == false){
        
        $(".btn-game").fadeOut(200);
        $("h1").text("READY").fadeOut(200).fadeIn(200);
        setTimeout(() => {
            $("h1").text("GO").fadeOut(200).fadeIn(200);
        }, 1000);   
        setTimeout(() => {
            
            // $("h1").text("Level " + level);
            nextSequence();
            
        }, 2000); 
        
        isStart = true;
        
    };
    
}

$(document).keypress(function(e) {
    startgame();  
    
});

$(".btn-game").on("click", function(e) {
    startgame();
})

const nextSequence = () => {
    userPattern = [];
    level++;
    $("h1").text("Level " + level)
    var randomBoxNumber = Math.floor(Math.random()*4);
    var randomPickedColor = buttonColors[randomBoxNumber];
    gamePattern.push(randomPickedColor);
    $("#" + randomPickedColor).fadeOut(100).fadeIn(100);
    buttonColorSounds(randomPickedColor);
    
}

const buttonColorSounds = (key) => {
    switch (key) {
        case "green":
            var greenSound = new Audio("sounds/green.mp3");
            greenSound.play();
            break;
        case "red":
            var redSound =  new Audio("sounds/red.mp3");
            redSound.play();
            break;
        case "yellow":
            var yellowSound = new Audio("sounds/yellow.mp3");
            yellowSound.play();
            break;
        case "blue":
            var blueSound = new Audio("sounds/blue.mp3");
            blueSound.play();
            break;
        
    
        default:
            break;
    }
};
const buttonPressed = (key)=> {
    $("#"+key).addClass("pressed");
    setTimeout(() => {
        $("#"+key).removeClass("pressed")
    }, 100);
    
}
const startover = () => {
    level = 0;
    gamePattern = [];
    isStart = false;
}

const checkAnswer = (index) => {
    if (userPattern[index] === gamePattern[index]) {
        if (userPattern.length === gamePattern.length){
            setTimeout(() => {
                nextSequence();
            }, 1000);
        };
    }
    else {
        wrongSound.play();
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press any Key to Start Again.")
        $(".btn-game").text("Start Again").fadeIn(200);
        startover();
    }
}


$(".btn").on("click", function(e) {
    if (isStart) {
        var userPickedColor = e.target.id;
        userPattern.push(userPickedColor);
        buttonPressed(userPickedColor);
        buttonColorSounds(userPickedColor);
        
        checkAnswer(userPattern.length -1);
    }
    
});


    
    
    
    
    
    
    
    
    
    
