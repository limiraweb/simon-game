/* A Simon Game
    for Free Code Camp by Lisarko8077 */

/* DEFINE VARIABLES */
    var powerOn = false;
    var strict = false;
    var error = false;
    var id, color, level = 0;
    var sounds = [
        "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3",
        "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3",
        "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3",
        "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"
    ];
    var wrongMatch = "https://www.soundjay.com/button/sounds/button-4.mp3";
    var winMatch = "https://www.soundjay.com/misc/sounds/magic-chime-01.mp3";
    var computerSeq = [];
    var playerSeq = [];
    const LEVELS_LIMIT = 5;



$(document).ready(function(){

    $("#num").empty();

    /*  Power Handler */

    $("#power").on('click', function(){

        powerOn = (powerOn == false) ? true : false;

        console.log("powerOn " + powerOn);

        if (powerOn) {

            $("#switch-box .switch").toggleClass("switch-on");
            $("#start div").removeClass(" unclickable").addClass(" clickable");
            $("#num").append("--");
        }
        else {
            $("#switch-box .switch").toggleClass("switch-on");
            $("#start div").removeClass(" clickable st-on").addClass(" unclickable");
            $("#num").empty();
        }



    });

    /*  Start Click Handler*/

    $("#start div").on('click', function() {

        strict = false;
        error= false;
        level = 0;
        addLevel();
        computerSeq = [];
        playerSeq = [];
        $(".rect .but").addClass(" unclickable");
        $("#strict .butt").removeClass(" unclickable").addClass(" clickable");
        $(".but").removeClass(" unclickable").addClass(" clickable");
        $("#start div").addClass(" st-on");
        computerSequence();

    });

    /* Stricy Click Handler*/
    $("#strict .butt").on('click', function(){

        $("#strict .butt").toggleClass("st-on");

        strict = (strict) ? false : true;

        console.log(strict);

        level = 0;
        addLevel();
        computerSeq = [];
        playerSeq = [];
        computerSequence();

    });


    $(".but").on("click", function(){
        id = $(this).attr("id");
        color = $(this).attr("class").split(" ")[1];
        playerSequence();

    });


    /* GAME FUNCTIONS*/

    function computerSequence () {
          console.log("level "+level);

          $("#num").text(level);

          if(!error) {
            getRandomId();
          }

          if(error && strict) {
            getRandomId();
          }
          var i = 0;
          var myInterval = setInterval(function() {
            id = computerSeq[i];
            color = $("#"+id).attr("class");
            color = color.split(" ")[1];
            console.log(id+" "+color);
            pressButton(id, color);
            i++;
            if(i == computerSeq.length) {
              clearInterval(myInterval);
            }
          }, 1000);
    }

    function playerSequence () {
        playerSeq.push(id);
        console.log(playerSeq);
        console.log(id+" "+color);
        pressButton(id, color);

        if (!checkPlayerSequence()) {
            if (strict) {
                console.log("Play strict!");
                level = 1;
                computerSeq = [];
            }

            error = true;
            displayError();
            playerSeq = [];
            setTimeout(function(){
                computerSequence();
            }, 2000);


        } else if (playerSeq.length == computerSeq.length && playerSeq.length < LEVELS_LIMIT) {

            console.log(level);
            playerSeq = [];
            error = false;
            console.log("Player's turn");
            setTimeout(function(){
                addLevel();
                computerSequence();
            }, 1000);
        }

        if (playerSeq.length == LEVELS_LIMIT) {
            displayWinner();
            resetGame();
        }
    }

    function checkPlayerSequence() {
        for (var i = 0; i < playerSeq.length; i++) {
            if (playerSeq[i] != computerSeq[i]) {
                return false;
            }
        }
        return true;
    }

    function displayError () {
        console.log("Got Error");
        var counter = 0;
        var errorInterval = setInterval(function() {
            $("#num").text("!!");
            var sound = new Audio(wrongMatch);
            sound.play();
            counter++;
            if(counter == 3) {
                $("#num").text(level);
                clearInterval(errorInterval);
                playerSeq = [];
                counter = 0;
            }
        }, 500);
    }

    function displayWinner () {
        console.log("You Win");
        var count = 0;
        var winInterval = setInterval(function() {
            count++;
            $("#num").text("Win");
            var sound = new Audio(winMatch);
            sound.play();
            if(count == 5) {
            clearInterval(winInterval);
            $("#num").text("00");
            $("#start div").removeClass(" st-on");
            count = 0;
            }
        }, 500);
    }

    function pressButton (id, color) {
        $("#"+id).css("opacity", "0.5");
        playSound(id)
        setTimeout(function(){
            $("#"+id).css("opacity", "1.0");
        }, 300);

    }

    function playSound (id) {

        var sound = new Audio(sounds[id]);
        sound.play();

    }

    function addLevel(){
        level++;
    }

    function getRandomId () {
        var random = Math.floor(Math.random() * 4);
        computerSeq.push(random);
    }


    function resetGame() {
        playerSeq = [];
        computerSeq = [];
        level = 0;
        $("#num").text("00");
    }


});