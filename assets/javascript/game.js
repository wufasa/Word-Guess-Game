//generate random words into an array words
//When a key is pressed the following occurs
//Checks if the key hasnt been pressed before
//Checks if the key is correct, if correct
//updates the _____
//updates guessed keys
//updates  # of guesses
//Once when all the characters are guessed, restart the game, increment a win counter

//organize game code as an object?
//game functions as methods
$(document).ready(function() {
    
var pressedKeys = [];
var deathcounter =7;
var numWin = 0;

var fruits = ["Apples", "Apricots", "Banana", "Cantaloupe", 'Cherry', 'Avocado', 'Carissa', 'Carob', 'Citron', 'Clementines', 'Cordia', 'Crabapple', 'Grapes', 'Grapefruit', 'Lemons', 'Limes', 'Oranges', 'Mandarin', 'Mangos', 'Papayas', 'Peaches', 'Pears', 'Pineapple', 'Plantains', 'Plums', 'Pomelo', 'Tangarines', 'Watermelon', 'Rasberry', 'Strawberry', 'Blackberry'];


//generate random word
function gen(){
    return fruits[Math.floor(Math.random() * fruits.length)].toLowerCase();
}
var genWord = gen();
    
function set(){
    for (i=0;i<genWord.length;i++){
        var letter = $("<d-inline-block>");
        letter.text(" _");
        letter.attr("value", i)
        $("#letterspace").append(letter);
    }
}
set();
console.log(genWord);
document.onkeyup = function(key){
    //check if key is pressed
    var guess = key.key;
    guess = guess.toLowerCase();
    if (genWord.indexOf(guess) == -1 && pressedKeys.indexOf(guess) == -1){
        console.log("no");
        pressedKeys.push(guess);
        //append pressed key to guess box
        var letter = $("<d-inline-block>");
        letter.text(guess)
        $("#wrongletters").append(letter);
        //decrement death
        deathcounter--;
        $("#death").text(deathcounter);
        if(deathcounter==0){
            reset();
            genWord = gen();
            set();
            deathcounter = 7;
            $("#death").text(deathcounter);
        }
    }
    else{
        var loc = [];
        var j = 0;
        while(index != -1){
            var index = genWord.indexOf(guess,j);
            loc.push(index);
            j = index + 1;
        }
        //update words
        for(i=0;i<loc.length;i++){
            $("d-inline-block").each(function(j){
                if(loc[i] == j){
                    $(this).text(guess);
                }
            })
        }
        
        //Check for a win
        if(win()){
            numWin++;
            $("#wins").text(numWin);
            genWord = gen();
            reset();
            set();
            deathcounter = 7;
            $("#death").text(deathcounter);
        }
        //increment a win counter
    }

}

$("#start-button").on("click", function(){
     genWord = gen();
     reset();
     set();
     deathcounter = 7;
     $("#death").text(deathcounter);
})
     

})

function win(){
    var empty = 0;
    $("d-inline-block").each(function(j){
        if($(this).text() == " _"){
            empty++;
        }
    })
    if(empty == 0){
        return true;
    }
    else{
        return false;
    }
}

function reset(){
    $("#letterspace").empty();
    $("#wrongletters").empty();
}



