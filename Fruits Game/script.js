var playing = false;
var score = 0;
var trialsLeft = 3;
var fruits = ['Apple', 'Banana', 'Grapes', 'Orange', 'PineA', 'StrawB', 'WaterM'];
var step;
var action;

$(function() {
  //click on start/reset button
  $("#startreset").click(function() {
    $("#gameOver").hide();
    //check if playing
    if (playing == true) {
      //reload page
      location.reload();
    } else {

      playing = true;
      score = 0;
      $("#scoreValue").html(score);
      //show trials left
      $("#livesLeft").css("visibility", "visible");
      trialsLeft = 3;
      addHearts();
      //change button to reset game
      $(this).text("Reset Game");
      fruitGenerator();
    }
  });

  $("#fruit1").mouseover(function() {
    score++;
    $("#scoreValue").html(score);
    $("#sound")[0].play(); //plays sound.
    //stop fruit
    clearInterval(action);
    //hide fruit
    $("#fruit1").hide("explode", {
      pieces: 4
    }, 390);
    //new fruit
    setTimeout(fruitGenerator, 400);

  });

  ///functions
  function addHearts() {
    $("#livesLeft").empty();
    for (i = 0; i < trialsLeft; i++) {
      $("#livesLeft").append('<img src="lives.png" class="lives">');
    }
  }

  function fruitGenerator() {
    //1. create a random fruit
    $("#fruit1").show();
    chooseFruit(); //chooses random fruit
    //generate random position
    $("#fruit1").css({
      'left': Math.round(Math.random() * 550),
      'top': 10
    });
    //generate random step
    step = 1 + Math.round(2 * Math.random());
    //change step
    action = setInterval(function() {
      //move fruit down on step every time
      $("#fruit1").css("top", $("#fruit1").position().top + step);
      //check if fruit is too low
      if ($("#fruit1").position().top > $("#fruitBox").height()) {
        //check trails left
        if (trialsLeft > 1) {
          $("#fruit1").show();
          chooseFruit(); //chooses random fruit
          //generate random position
          $("#fruit1").css({
            'left': Math.round(Math.random() * 550),
            'top': 10
          });
          //generate random step
          step = 0.5 + Math.round(Math.random());
          trialsLeft = trialsLeft - 1; //reduce trials
          addHearts();
        } else {
          playing = false;
          $("#livesLeft").css("visibility", "hidden");
          $("#startreset").text("Start Game");
          $("#gameOver").show();
          $("#gameOver").html("<p>Game Over!</p><p>Your Score is " + score + "</p>");
          step = 0;
          stopAction()
        }
      }
    }, 0.1);
  }

  function chooseFruit() {
    $("#fruit1").attr("src", "images/" + fruits[Math.floor(Math.random() * 7)] + ".png");
  }

  function stopAction() {
    clearInterval(action);
    $("#fruit1").hide();

  }

});