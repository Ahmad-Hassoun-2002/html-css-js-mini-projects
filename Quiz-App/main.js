const questions = [
    {
        question: "Which is the largest animal in the world?",
        answer:[
            {text: "Shark" , correct: false},
            {text: "Blue whale" , correct: true},
            {text: "Elephant" , correct: false},
            {text: "Giraffe" , correct: false}
        ]
    },
    {
        question: "Which is the smallest country in the world?",
        answer:[
            {text: "Vatican City" , correct: true},
            {text: "Bhutan" , correct: false},
            {text: "Nepal" , correct: false},
            {text: "Syria" , correct: false}
        ]
    },
    {
        question: "Which is the largest desert in the world?",
        answer:[
            {text: "Kalahari" , correct: false},
            {text: "Gobi" , correct: false},
            {text: "Sahara" , correct: false},
            {text: "Antarctica" , correct: true}
        ]
    },
    {
        question: "Which is the smallest continent in the world?",
        answer:[
            {text: "Asia" , correct: false},
            {text: "Australia" , correct: true},
            {text: "Arctic" , correct: false},
            {text: "Africa" , correct: false}
        ]
    }
]

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next"
    showQuestion();
}

function showQuestion(){
    nextButton.style.display = "none";
    answerButton.innerHTML="";
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    currentQuestion.answer.forEach(ele => {
        const button = document.createElement("button");
        button.classList.add("btn");
        button.innerHTML = ele.text;
        answerButton.appendChild(button);
        if(ele.correct){
            button.dataset.correct = ele.correct;
        }
        button.addEventListener("click" , selectAnswer);
    })
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(ele => {
        if(ele.dataset.correct === "true"){
            ele.classList.add("correct");
        }
        ele.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    answerButton.innerHTML = "";
    questionElement.innerHTML = `Your scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

nextButton.addEventListener("click" , () => {
    if(currentQuestionIndex < questions.length){
        currentQuestionIndex++;
        if(currentQuestionIndex < questions.length){
            showQuestion()
        }else{
            showScore();
        }
    }else{
        startQuiz();
    }
})

startQuiz();