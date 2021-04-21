var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keypress(function() {

  if (!started) {
    $("h1").html("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  var len = userClickedPattern.length;
  checkAnswer(userClickedPattern.length - 1);

});


function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length)
      setTimeout(function() {
        nextSequence();
      }, 1000);
  } else {
    console.log("failed");
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press any key to Restart");
    startOver();
  }
}


function nextSequence() {

  level++;
  userClickedPattern = [];
  $("h1").html("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  console.log(gamePattern);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeIn(100);
  playSound(randomChosenColor);
  animatePress(randomChosenColor);
}





function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {

  var makeSound = new Audio("sounds/" + name + ".mp3");
  makeSound.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
