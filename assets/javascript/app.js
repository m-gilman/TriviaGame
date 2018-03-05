// FUTURE IMPROVEMENTS:

$(document).ready(function () {

    
//cache DOM selectors....
    var game = {
        startButton: $("#startButton"),
        gameCanvas: $("#gameCanvas"),
        splashScreen: $("#splashScreen"),
        questionLocation: $("#questionLocation"),
        dispOption1: $("#dispOption1"),
        dispOption2: $("#dispOption2"),
        dispOption3: $("#dispOption3"),
        dispOption4: $("#dispOption4"),
        questionImg: $("#questionImg"),
        timeHolder: $("#timeHolder"),
        displayOptions: $("#displayOptions")
    };

// clicking the starButton will hide the splashScreen and show the gameCanvas
game.startButton.on('click', function () {
    game.splashScreen.hide();
    game.gameCanvas.show();
});

//  Timer 
var seconds = 30

var countDown;
var timesUp = false;
game.startButton.on("click", function() {
    countDown = setInterval(function() {
        seconds--;  
        game.timeHolder.text(seconds +" Seconds");
        if (seconds===0){clearInterval(countDown);
            timesUp="True";}    
        }, 1000);                
    });

    // var userAnswer = "";

// QUESTIONS AND ANSWSERS
var quizlist = { 
    quiz1: {
        question: "Wall-E’s name stands for Waste Allocation Load Lifter. What does the E refer to?",
        options: [ "Exceptional", "The 5th Version", "Earth-Class", "Effective"],
        answer: "Earth-Class"
    },
    quiz2: { 
        question: "What is the name of the ship on which humans now live on?",
        options: ["Avalon", "Axiom", "Andromeda", "A-Wing"],
        answer: "Axiom"
        },
    quiz3: {
        question: "What is the name of the robot that tries to clean Wall-E’s foreign contaminants?",
        options: ["M-O", "Curl-E", "Lar-E", "Sid"],
        answer: "M-O"
    },
    quiz4: {
        question: "Who is Wall-E’s only companion on earth?",
        options: ["A Spider", "A Cockroach", "A Volleyball Named Wilson", "Another Wall-E Robot"],
        answer: "A Cockroach"
    },
    quiz5: {
        question: "What does EVE stand for?",
        options: ["Extraterrestrial Vegetation Evaluator", "Earth Value Estimator", "Everyone Versus Everyone", "Emergency Virtual Environment"],
        answer: "Extraterrestrial Vegetation Evaluator"
    }, 
    quiz6: {
        question: "What VHS tape does Wall-E have that he watches over and over?",
        options: ["Oklahoma", "Bye Bye Birdie", "Singing In The Rain", "Hello Dolly"],
        answer: "Hello Dolly"
    },
    quiz7: {
        question: "What free gift is offered to the humans for their 700th anniversary of their five-year cruise?",
        options: ["Ice Cream Shake", "New Blue Hoverchairs", "Septua-centennial Cupcake in a Cup", "Spa Treatment from Pr-T bot"],
        answer: "Septua-centennial Cupcake in a Cup"
    },
    quiz8: {
        question: "The Captain tells the kids that they are going to grow Vegetable Plants and what other kind of plants when they return to Earth?",
        options: ["Pizza Plants", "Jelly Bean Plants", "Fruit Plants", "Cupcake Plants"],
        answer: "Pizza Plants"
    }
};
var answer = quizlist.quiz1.answer

// If the user clicks on option 1, the user's answer is set to this option
$("#dispOption1").on('click', function (id) {
    var userAnswer = ($(this).text());
    console.log('userAnswer =' + userAnswer);
    if (userAnswer = answer) {
        alert ("YES!")
    }

    
});

// If the user clicks on option 2, the user's answer is set to this option
$("#dispOption2").on('click', function (id) {
    var userAnswer = ($(this).text());
    console.log('userAnswer =' + userAnswer);
});

// If the user clicks on option 1, the user's answer is set to this option
$("#dispOption3").on('click', function (id) {
    var userAnswer = ($(this).text());
    console.log('userAnswer =' + userAnswer);
});

// If the user clicks on option 1, the user's answer is set to this option
$("#dispOption4").on('click', function (id) {
    var userAnswer = ($(this).text());
    console.log('userAnswer =' + userAnswer);
});

// if (userAnswer = answer) {
//     alert ("correct!");
// }


// Populate the html fields with questions
function firstQuestion () {    
    game.questionLocation.text (quizlist.quiz1.question);
    game.dispOption1.text (quizlist.quiz1.options[0]);
    game.dispOption2.text (quizlist.quiz1.options[1]);
    game.dispOption3.text (quizlist.quiz1.options[2]);
    game.dispOption4.text (quizlist.quiz1.options[3]);
    game.questionImg.attr("src", "./assets/images/Wall-E.png");
}
firstQuestion ();

function secondQuestion () {    
    game.questionLocation.text (quizlist.quiz2.question);
    game.dispOption1.text (quizlist.quiz2.option[0]);
    game.dispOption2.text (quizlist.quiz2.option[1]);
    game.dispOption3.text (quizlist.quiz2.option[2]);
    game.dispOption4.text (quizlist.quiz2.option[3]);
    game.questionImg.attr("src", "./assets/images/Wall-E.png");
}
// secondQuestion ();




}); //ends the "document.ready" code