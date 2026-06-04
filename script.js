const questions = [
    {
        question: "what does HTML stand for?",
        answers: [
            { text: "hyper Link Markup Language",correct: false },
            { text: "Hyper Text Markup language",correct: true },
            { text: "Hyper Test Marcup Language",correct: false },
            { text: "None",correct: false },
        ]
    },
    {
        question: "which one of these is Hyperlink Tag?",
        answers: [
            { text: "&lt;h&gt;",correct: false },
            { text: "&lt;link&gt;",correct: false },
            { text: "&lt;p&gt;",correct: false },
            { text: "&lt;a&gt;",correct: true },
        ]
    },
    {
        question: "How do you select elements with class name 'box' in css?",
        answers: [
            { text: ".box",correct: true },
            { text: "#box",correct: false },
            { text: "box",correct: false },
            { text: "*box",correct: false },
        ]
    },
    {
        question: "How do you create a function in JavaScript?",
        answers: [
            { text: "function = myFunction()",correct: false },
            { text: "create myFunction()",correct: false },
            { text: "function myFunction()",correct: true },
            { text: "def myFunction()",correct: false },
        ]
    },
    {
        question: "Which event occurs when the user clicks on an HTML element?",
        answers: [
            { text: "onchange",correct: false },
            { text: "onclick",correct: true },
            { text: "onmouseclick",correct: false },
            { text: "onmouseover",correct: false },
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    if(selectedBtn.disabled)
        return;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
            button.disabled = true;
        }
        
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `you scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click",() => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz(); 
