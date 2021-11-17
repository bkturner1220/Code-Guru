
// Designated variables
let quizQuestions = document.getElementById("quiz-questions");
let timer = document.getElementById("timer");
let btnStart = document.getElementById("btn-start");
let timecounter = document.getElementById("timecounter");
let titleitem = document.getElementById("title-item");
let nextQuestions 
let questionanswers = document.getElementById("question-answers");
let myScore = document.getElementById("score");
let btnScore = document.getElementById("btnScore");
let currentindex = 0;
let score = 0;
let count = 75;
let alert =document.getElementById("alert");
let info = document.getElementById("info");
let allScores = [];
let storedScores = JSON.parse(localStorage.getItem("userData"));

// questions array
let questions = [
    {
        title: "Where is the correct place to insert a JavaScript?",
        choices: ["The <head> section","Both the <head> section and the <body> section","The <body> section"],
        answer : "The <body> section"    
    },
    {
        title: "The external JavaScript file must contain the <script> tag.",
        choices: ["True","False"],
        answer : "False"    
    },
    {
        title: "How do you write 'Hello World' in an alert box?",
        choices: ["msg('Hello World')","alertbox('Hello World')","msgbox('Hello World')", "alert('Hello World')"],
        answer : "alert('Hello World')"    
    },
    {
        title: "How do you create a function in JavaScript?",
        choices: ["function = myFunction()","function:myFunction()","function myFunction()"],
        answer : "function myFunction()"    
    },
    {
        title: "A very useful tool used during development and debugging for printing content to the debugger is:---",
        choices: ["JavaScript","terminal/bash","alerts", "console.log"],
        answer : "console.log"    
    },
]

btnStart.addEventListener("click", starQuiz);
function starQuiz(){
    if(storedScores !==null) {
        allScores = storedScores;
    }
    info.classList.add("d-none")
    btnStart.classList.add("d-none")
    timecounter.classList.remove("d-none")
    quizQuestions.classList.remove("d-none")
    nextQuestions= questions[currentindex]
    console.log(nextQuestions.title)
    
        displayQuestion(nextQuestions)

    gametime()
}

btnScore.addEventListener("click" , function(){
    let name = document.getElementById("inputScore").value
    scorePage(name, count)
});

function gametime(){

    let timeinterval = setInterval(function(){
        timer.innerText = count
         count--;
        }, 1000);

}

function scorePage(a, b) {

    let userData = {
        inits: a,
        userScore: b
    };
    allScores.push(userData);

    localStorage.setItem("userData", JSON.stringify(allScores));
    location.href = "./highscore.html";
}

function displayQuestion(question){
    titleitem.innerText=question.title
    question.choices.forEach(element => {
     let button =document.createElement("button")
    button.className="btn-primary btn-block text-left"
    button.innerText=element
    questionanswers.appendChild(button)
    button.addEventListener("click", displaynextQuestion)
    });
}

function displaynextQuestion(e){
    currentindex++
    if(currentindex < questions.length){
        correction(e.target.innerText == nextQuestions.answer)
        questionanswers.innerHTML=""
        if(currentindex < questions.length){    
            nextQuestions= questions[currentindex]
            displayQuestion(nextQuestions)  
        }else {
            currentindex = 0
            displayQuestion(nextQuestions)  
        }

    }else{
        console.log("endgame")
        endgame()
    } 
  
}
function correction(response){
    
    if(response){
        alert.innerText= "Good"
        console.log("Good")
    }else {
        alert.innerText="Wrong"
        count = count -15
        timer.innerHTML = count
        console.log("Wrong")

    }
    setTimeout(function(){
        alert.innerText=""
    
        }, 1000);

}
 function endgame (){
    myScore.innaText = count
    addscore.classList.remove("d-none")
    timecounter.classList.add("d-none")
    quizQuestions.classList.add("d-none")
    addscore.classList.remove("d-none")
 }