// const questions = [
//     {
//         key: 1,
//         question:"What is your your goal?",
//         answers:[
//             {txt:"I still have to decide",correct:false},
//             {txt:"I don't want to tell you",correct:false},
//             {txt:"To give a wrong answer",correct:false},
//             {txt:"To find the correct answer",correct:true}
//         ]
//     },
//     {
//         key: 2,
//         question:"Why are you idiot?",
//         answers:[
//             {txt:"I don't know",correct:false},
//             {txt:"Because you just made me",correct:true},
//             {txt:"I am not",correct:false},
//             {txt:"The writer is the idiot",correct:false}
//         ]
//     }
// ]

// localStorage.setItem("questions",JSON.stringify(questions));

let questions =[];

const questionElem = document.querySelector('.question');
const answerBox = document.querySelector('.answer-box');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');

// console.log(Array.from(answerBox.children));

let score = 0;
let currentIndex = 0;
let totalQuestions = 0;

const loadAllQuestions=()=>{
    questions =  JSON.parse(localStorage.getItem("questions"));
    totalQuestions = questions.length;
}

const startQuiz = ()=>{
    currentIndex = 0;
    score = 0;
    loadAllQuestions();
    questions.map((q)=>{
        q.answered = "false";
    })
    setQuestion()
}
const handelNextBtn = ()=>{
    currentIndex++;
    if(currentIndex > 0){
        prevBtn.disabled = false;
    }
    if(currentIndex === totalQuestions){
        alert("Quiz finished your score is "+score);
        nextBtn.innerHTML = "Next";
        nextBtn.classList.remove("submit-btn");
        startQuiz();
    }
    if(currentIndex === totalQuestions -1){
        nextBtn.innerHTML = "Submit";
        nextBtn.classList.add("submit-btn");
    }
    setQuestion();
}

const handelPrevBtn=()=>{
    if(currentIndex>0){
        currentIndex--;
        if(currentIndex == 0){
            prevBtn.disabled = true;
        }
    }
    if(currentIndex<totalQuestions-1){
        nextBtn.innerHTML = "Next";
        nextBtn.classList.remove("submit-btn");
    }
    setQuestion();
}

const setQuestion=()=>{
    let htmlContent = "";
    let currentQuestion = questions[currentIndex];
    questionElem.innerHTML = currentQuestion.key.toString() + "- "+currentQuestion.question;
    currentQuestion.answers.map((ans)=>{
        htmlContent += `<button class="btn ${(currentQuestion.answered == true)?(ans.correct==true?"correct":"wrong"):""}" ${currentQuestion.answered =="false"?"":"disabled = true"} data-correct = "${ans.correct}">${ans.txt}</button>`
    });
    answerBox.innerHTML = htmlContent;
}


// Adding click functionality//
answerBox.addEventListener("click",(e)=>{
    if(e.target.tagName == "BUTTON"){
        if(e.target.dataset.correct === "true"){
            e.target.classList.add("correct");
            score+=10;
        }else{  
            e.target.classList.add("wrong");
        }
        questions[currentIndex].answered = true;
        Array.from(answerBox.children).map((ans)=>{
            if(ans.dataset.correct === "true"){
                ans.classList.add("correct");
            }
            ans.disabled = true;
        })
    }
})


startQuiz()


