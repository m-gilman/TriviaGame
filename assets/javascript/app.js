// FUTURE IMPROVEMENTS:
//streamline and make the code more efficient! 

$(document).ready(function () {
    
//cache DOM SELECTORS....
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
        statusPage: $("#statusPage"),
        questionPage: $("#questionPage"),
        correctAnswer: $("#correctAnswer"),
        statusLocation: $("#statusLocation"),
        endPage: $("#endPage"),
        correct: $("#correct"),
        incorrect: $("#incorrect"),
        unanswered: $("#unanswered"),
        quote: $("#quote"),
        tiny: $(".tiny"),
        startOver: $("#startOver")
    };

    // GAME VARs
    var numberCorrect = 0;
    var numberIncorrect = 0;
    var numberUnanswered = 0;
    var userAnswer = ""
    var startingTime = 11  //add 1 to desired timer because the first second is not displayed 
    var seconds = startingTime // this will change when counting down, startingTime will stay the same
    var timer;
    var answer = "is empty"
    var currentIndex = 1;
    
    

    //START GAME
    //clicking the startButton will hide splashScreen, show gameCanvas, run-countDown-timer, run-nextQuestion-display q&a's
    game.startButton.on('click', function () {
        game.splashScreen.hide();
        game.gameCanvas.show();
        nextQuestion ();         
    });    
    

//  TIMERS
    //question timer
    function countDown() {
        clearInterval(timer);
        timer = setInterval(function() {
        seconds--;  
        game.timeHolder.text(seconds +" Seconds");
        checkTheTime ();
        }, 1000);      
    }

    //Determines if the time is up!
    function checkTheTime () {
        if (seconds===0) {
            stopTimer ();
            moveToStatus ();
            showTimesUpMessage (); 
            numberUnanswered ++;
            };
    };

    //stops the timer
    function stopTimer() {
        clearInterval(timer);
    }

//---TimeOut for status page
    //  statusPage appears for only 5 seconds
    function statusTimeout () {
    setTimeout (function(){
        moveToQuestion ();
    }, 5000);
}
    

// QUESTIONS AND ANSWSERS
//-I was trying to put the quiz#'s into an array, but I couldn't navigate through all the syntax errors... this might be worth some time in the future.
    var quizlist = {
        quiz1: {
            question: "Wall-E’s name stands for Waste Allocation Load Lifter. What does the E refer to?",
            option1: "Exceptional", 
            option2: "The 5th Version", 
            option3: "Earth-Class", 
            option4: "Effective",
            answer: "Earth-Class",
            quote: '"Waste Allocation Load Lifter - Earth-Class"', 
            imgSrc: "https://media.giphy.com/media/R4jb0LHqHlPtC/giphy.gif"
        },
        quiz2: { 
            question: "What is the name of the ship on which humans now live?",
            option1: "Avalon", 
            option2: "Axiom", 
            option3: "Andromeda", 
            option4: "A-Wing",
            answer: "Axiom",
            quote: '"A is for Axiom, your home sweet home."', 
            imgSrc: "https://media.giphy.com/media/679eRADudl13q/giphy.gif"
        },
        quiz3: {
            question: "What is the name of the robot that tries to clean Wall-E’s foreign contaminants?",
            option1: "M-O", 
            option2: "Curl-E", 
            option3: "Lar-E", 
            option4: "Sid",
            answer: "M-O",
            quote: 'M-O stands for "Microbe Obliterator"',
            imgSrc: "https://media.giphy.com/media/95pCDbEGyLuUg/giphy.gif"
            },
        quiz4: {
            question: "Who is Wall-E’s only companion on earth?",
            option1: "A Spider", 
            option2: "A Cockroach", 
            option3: "A Volleyball Named Wilson", 
            option4: "Another Wall-E Robot",
            answer: "A Cockroach",
            quote: 'A pair of handcuffs were used to make the sounds of the roach',
            imgSrc: "https://media.giphy.com/media/13fiyC0AQY0vWU/giphy.gif"
        },
        quiz5: {
            question: "What does EVE stand for?",
            option1: "Extraterrestrial Vegetation Evaluator", 
            option2: "Earth Value Estimator", 
            option3: "Everyone Versus Everyone", 
            option4: "Emergency Virtual Environment",
            answer: "Extraterrestrial Vegetation Evaluator",
            quote: '"EeeeeVaaaa"',
            imgSrc: "https://media.giphy.com/media/ktI31VYb7oG6k/giphy.gif"
        }, 
        quiz6: {
            question: "What VHS tape does Wall-E have that he watches over and over?",
            option1: "Oklahoma", 
            option2: "Bye Bye Birdie", 
            option3: "Singing In The Rain", 
            option4: "Hello Dolly",
            answer: "Hello Dolly",
            quote: "Put on your Sunday clothes, there's lots of world out there",
            imgSrc: "https://media.giphy.com/media/eV85OQfpnbNew/giphy.gif"
            },
        quiz7: {
            question: "What free gift is offered to the humans for their 700th anniversary of their five-year cruise?",
            option1: "Ice Cream Shake", 
            option2: "New Blue Hoverchairs", 
            option3: "Cupcake in a Cup", 
            option4: "Spa Treatment from Pr-T bot",
            answer: "Cupcake in a Cup",
            quote: '"So, be sure next mealtime to ask for your "Free Septuacentennial Cupcake In A Cup!"',
            imgSrc: "https://media.giphy.com/media/HSLbIjLk2GsBa/giphy.gif  "
        },
        quiz8: {
            question: "The Captain tells the kids that they are going to grow Vegetable Plants and what other kind of plants when they return to Earth?",
            option1: "Pizza Plants", 
            option2: "Jelly Bean Plants", 
            option3: "Fruit Plants", 
            option4: "Cupcake Plants",
            answer: "Pizza Plants",
            quote: '"This is called farming! You kids are gonna grow all kinds of plants! Vegetable plants, pizza plants."',
            imgSrc: "https://media.giphy.com/media/XVPMKPPYa3Gp2/giphy.gif"
            }
    }
    
    // I know there is a MORE EFFICIENT way to do this, but I haven't yet figured it out so... it's ugly, but it works. 
    function checkCurrentIndex () {
    if (currentIndex === 1) {
            question = quizlist.quiz1.question;
            option1 = quizlist.quiz1.option1;
            option2 = quizlist.quiz1.option2;
            option3 = quizlist.quiz1.option3;
            option4 = quizlist.quiz1.option4;
            answer = quizlist.quiz1.answer;
            imgSrc = quizlist.quiz1.imgSrc;
            quote = quizlist.quiz1.quote;
        } else if (currentIndex === 2) {
            question = quizlist.quiz2.question;
            option1 = quizlist.quiz2.option1;
            option2 = quizlist.quiz2.option2;
            option3 = quizlist.quiz2.option3;
            option4 = quizlist.quiz2.option4;
            answer = quizlist.quiz2.answer;
            imgSrc = quizlist.quiz2.imgSrc;
            quote = quizlist.quiz2.quote;
        } else if (currentIndex === 3) {
            question = quizlist.quiz3.question;
            option1 = quizlist.quiz3.option1;
            option2 = quizlist.quiz3.option2;
            option3 = quizlist.quiz3.option3;
            option4 = quizlist.quiz3.option4;
            answer = quizlist.quiz3.answer;
            imgSrc = quizlist.quiz3.imgSrc;
            quote = quizlist.quiz3.quote;
        } else if (currentIndex === 4) {
            question = quizlist.quiz4.question;
            option1 = quizlist.quiz4.option1;
            option2 = quizlist.quiz4.option2;
            option3 = quizlist.quiz4.option3;
            option4 = quizlist.quiz4.option4;
            answer = quizlist.quiz4.answer;
            imgSrc = quizlist.quiz4.imgSrc;
            quote = quizlist.quiz4.quote;
        } else if (currentIndex === 5) {
            question = quizlist.quiz5.question;
            option1 = quizlist.quiz5.option1;
            option2 = quizlist.quiz5.option2;
            option3 = quizlist.quiz5.option3;
            option4 = quizlist.quiz5.option4;
            answer = quizlist.quiz5.answer;
            imgSrc = quizlist.quiz5.imgSrc;
            quote = quizlist.quiz5.quote;
        } else if (currentIndex === 6) {
            question = quizlist.quiz6.question;
            option1 = quizlist.quiz6.option1;
            option2 = quizlist.quiz6.option2;
            option3 = quizlist.quiz6.option3;
            option4 = quizlist.quiz6.option4;
            answer = quizlist.quiz6.answer;
            imgSrc = quizlist.quiz6.imgSrc;
            quote = quizlist.quiz6.quote;
        } else if (currentIndex === 7) {
            question = quizlist.quiz7.question;
            option1 = quizlist.quiz7.option1;
            option2 = quizlist.quiz7.option2;
            option3 = quizlist.quiz7.option3;
            option4 = quizlist.quiz7.option4;
            answer = quizlist.quiz7.answer;
            imgSrc = quizlist.quiz7.imgSrc;
            quote = quizlist.quiz7.quote;
        } else if (currentIndex === 8) {
            question = quizlist.quiz8.question;
            option1 = quizlist.quiz8.option1;
            option2 = quizlist.quiz8.option2;
            option3 = quizlist.quiz8.option3;
            option4 = quizlist.quiz8.option4;
            answer = quizlist.quiz8.answer;
            imgSrc = quizlist.quiz8.imgSrc;
            quote = quizlist.quiz8.quote;
            game.tiny.hide();
        } else {
            endOfGame();
        };
    }

    // Populate the html fields with questions and set the answers and images for each question & Start Timer
    function nextQuestion () {
        checkCurrentIndex ();    
        game.questionLocation.text (question);
        game.dispOption1.text (option1);
        game.dispOption2.text (option2);
        game.dispOption3.text (option3);
        game.dispOption4.text (option4);
        countDown ();
    }

    //This is the stuff that happens when user clicks on any button 
    function clickingOptions () {
    $("button").on("click", function(){
        //$(this) I FIGURED OUT A WAY TO USE THIS!! #proud
        userAnswer = ($(this).text()); //makes userAnswer = the text of the button clicked
        checkForWinsLosses ();  //if userAnswer = answer +correct, else +incorrect
        stopTimer ();
        moveToStatus (); 
        })
    }
    clickingOptions (); //calls the function

    //After user makes a choice OR runs out of time
    function moveToStatus () {
        stopTimer ();
        statusTimeout ()
        game.questionPage.hide ();
        game.statusPage.show ();
        showStatus ();
    };

    //After status page timer runs out
    function moveToQuestion () {
        game.statusPage.hide ();
        game.questionPage.show ();
        seconds = startingTime; 
        nextQuestion (); //this will populate with next questions
    };

    //After all questions have run, show endOfGame Page
    function endOfGame () {
        game.timeHolder.hide ();
        seconds = "empty";
        runGameStats ();
        game.questionPage.hide ();
        game.endPage.show();        
        currentIndex = 0
    };

    function runGameStats () {
        game.correct.text (numberCorrect);
        game.incorrect.text (numberIncorrect);
        game.unanswered.text (numberUnanswered);
    };

    // Populate html fields with status
    function showStatus () {
        game.correctAnswer.text (answer);
        game.questionImg.attr("src", imgSrc);
        game.quote.text(quote)
    };

    function checkForWinsLosses () {
        if (userAnswer == answer) {
            numberCorrect ++;
            showCorrectMessage ();
        } else {
            numberIncorrect ++; 
            showIncorrectMessage ();
        }
    };

    function showCorrectMessage() {
        game.statusLocation.text ("Correct!");
        currentIndex +=1;
    };

    function showIncorrectMessage () {
        game.statusLocation.text ("No, that's not correct!");
        currentIndex +=1;
    };

    function showTimesUpMessage () {
        game.statusLocation.text ("Time's Up!");
        currentIndex +=1;
    }

    game.startOver.on('click', function () {
        seconds = startingTime;
        currentIndex = 1;
        numberCorrect = 0;
        numberIncorrect = 0;
        numberUnanswered = 0;
        game.timeHolder.show ();
        game.endPage.hide();
        moveToQuestion ()
        });    

}); //ends the "document.ready" code